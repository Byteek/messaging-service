#!/bin/bash

# 1. Установка зависимостей
echo "Installing dependencies..."
npm install

# 2. Сборка приложения
echo "Building the application..."
npm run build

# 3. Сборка Docker-образов
echo "Building Docker images..."
docker-compose build

# 4. Запуск контейнеров
echo "Starting containers..."
docker-compose up -d

echo "Build and deployment completed successfully!"
