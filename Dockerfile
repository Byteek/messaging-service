FROM node:20-alpine AS builder

WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Сборка приложения
RUN npm run build

# Финальный образ
FROM node:20-alpine

WORKDIR /app

# Копируем результаты сборки из stage builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/main"]
