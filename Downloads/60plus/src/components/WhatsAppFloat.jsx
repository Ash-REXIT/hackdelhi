import { useLocation } from 'react-router-dom';
import { getWhatsAppUrl } from '../data/whatsappMessages';

const WhatsAppFloat = () => {
  const location = useLocation();

  return (
    <div className="wa-container">
      <style>{`
            .wa-container {
              position: fixed;
              bottom: calc(30px + var(--sb-h, 0px));
              right: 24px;
              z-index: 999;
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 8px;
              transition: bottom 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            }

            /* TEXT - always visible */
            .wa-text {
              background: white;
              color: #1a0a2e;
              padding: 8px 14px;
              border-radius: 999px;
              font-size: 13px;
              font-weight: 500;
              box-shadow: 0 6px 20px rgba(0,0,0,0.08);
              white-space: nowrap;
            }

            /* BUTTON */
            .wa-btn {
              position: relative;
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background: #25D366;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 25px rgba(0,0,0,0.15);
              transition: transform 0.22s;
            }

            .wa-btn:hover {
              transform: translateY(-3px);
            }

            /* ICON */
            .wa-btn svg {
              width: 26px;
              height: 26px;
              fill: #fff;
            }

/* MOBILE */
            @media (max-width: 768px) {
              .wa-text {
                display: none;
              }

              .wa-container {
                right: 16px;
                bottom: calc(30px + var(--sb-h, 0px));
              }
            }
          `}</style>

          <div className="wa-text">
            Talk to our team
          </div>

          <a
            href={getWhatsAppUrl(location.pathname)}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-btn"
          >
            <svg viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z" />
            </svg>
          </a>
        </div>
  );
};

export default WhatsAppFloat;
