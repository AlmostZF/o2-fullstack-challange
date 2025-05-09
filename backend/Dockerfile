# Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .

RUN npx prisma generate
RUN npm run build

# Runtime
FROM node:18-alpine AS runtime

WORKDIR /src

COPY --from=builder /src /src

ENV NODE_ENV=production

EXPOSE 5001

CMD ["sh", "-c", "until nc -z db 3306; do echo 'Esperando o banco de dados...'; sleep 2; done && npx prisma migrate deploy && npm start"]


