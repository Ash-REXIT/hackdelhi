import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../lib/config';
import { prisma } from '../lib/prisma';
import { signToken } from '../middleware/auth';
import { authenticate } from '../middleware/auth';

const router = Router();

if (config.google.clientId && config.google.clientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackUrl,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) return done(new Error('No email from Google'));

          let user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            user = await prisma.user.create({
              data: {
                email,
                name: profile.displayName,
                image: profile.photos?.[0]?.value,
                googleId: profile.id,
                role: 'CLIENT',
              },
            });
          } else if (!user.googleId) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { googleId: profile.id, image: profile.photos?.[0]?.value },
            });
          }
          done(null, user);
        } catch (err) {
          done(err as Error);
        }
      }
    )
  );
}

router.get('/google', (req, res, next) => {
  if (!config.google.clientId) {
    return res.status(503).json({ success: false, error: 'Google OAuth not configured' });
  }
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);
});

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${config.frontendUrl}/login?error=auth` }),
  (req, res) => {
    const user = req.user as { id: string; email: string; name: string | null; role: string; clientId: string | null };
    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'CLIENT' | 'FINOPS' | 'FINANCE',
      clientId: user.clientId,
    });
    res.redirect(`${config.frontendUrl}/auth/callback?token=${token}`);
  }
);

// Dev login for hackathon demo (no Google OAuth required)
router.post('/dev-login', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found. Run db:seed first or use a seeded demo email.',
      });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      clientId: user.clientId,
    });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          clientId: user.clientId,
          image: user.image,
        },
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.tiaUser!.id },
      include: { client: { select: { id: true, name: true, clientCode: true } } },
    });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

export default router;
