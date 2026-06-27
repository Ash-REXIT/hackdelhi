FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json* ./
COPY backend/package.json ./backend/
COPY shared/package.json ./shared/
COPY frontend/package.json ./frontend/

RUN npm install --workspace=backend --workspace=shared

COPY shared ./shared
COPY backend ./backend

WORKDIR /app/backend
RUN npx prisma generate
RUN npm run build

RUN mkdir -p uploads generated
EXPOSE 3001
CMD ["sh", "-c", "npx prisma db push && node dist/index.js"]
