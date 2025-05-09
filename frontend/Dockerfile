#Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

# Expor a porta que a aplicação irá rodar
ENV NODE_ENV=production
EXPOSE 3000

#Etapa 2: Runtime com Next.js
FROM node:18-alpine AS runtime

WORKDIR /app

# Apenas o necessário para rodar a aplicação
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json


CMD ["npm", "start"]