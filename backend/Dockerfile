# Базовый образ
FROM node:18-alpine

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

# Рабочая папка
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Устанавливаем tsx глобально
RUN npm add -g tsx

# Копируем весь код
COPY . .

COPY .env .env

# Указываем порт
EXPOSE 3001

# Запускаем через tsx вместо ts-node
CMD ["tsx", "src/routes/server.ts"]