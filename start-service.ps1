Write-Host "Installing dependencies..."
npm install

Write-Host "Building the application..."
npm run build

Write-Host "Building Docker images..."
docker-compose build

Write-Host "Starting containers..."
docker-compose up -d

Write-Host "Build and deployment completed successfully!"
