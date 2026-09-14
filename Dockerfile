# Estagio 1: build - instala as dependencias e gera o client do Prisma
FROM node:22-slim AS build
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY app/package*.json ./
COPY app/prisma ./prisma
RUN npm ci
RUN npx prisma generate

# Estagio 2: imagem final enxuta, apenas o necessario
FROM node:22-slim
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production

# Copia as dependencias (inclui o CLI do prisma para o db push) e o codigo
COPY --from=build /app/node_modules ./node_modules
COPY app/package*.json ./
COPY app/prisma ./prisma
COPY app/server.js ./
COPY app/db.js ./
COPY app/public ./public

# Executa a aplicacao como usuario nao-root (boa pratica de seguranca)
RUN useradd --create-home appuser && chown -R appuser /app/node_modules/@prisma
USER appuser

EXPOSE 3000
# Sincroniza o schema com o banco e inicia a aplicacao
CMD ["sh", "-c", "npx prisma db push --skip-generate && node server.js"]