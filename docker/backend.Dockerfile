FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat postgresql-client wget

WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY shared/package.json ./shared/

RUN npm ci --ignore-scripts 2>/dev/null || npm install

COPY shared ./shared
COPY backend ./backend
COPY data ./data

RUN npm run build -w shared

WORKDIR /app/backend
RUN npx prisma generate

COPY docker/backend-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3001
ENTRYPOINT ["/entrypoint.sh"]
