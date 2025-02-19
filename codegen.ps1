# generate-clients.ps1

# Извлечение версии из тега Git
$VERSION = git describe --tags --abbrev=0
if ($VERSION.StartsWith("v")) {
    $VERSION = $VERSION.Substring(1)
}
Write-Host "Extracted version: $VERSION"

# Создание директорий для клиентов
New-Item -ItemType Directory -Force -Path "./generated-client-axios"
New-Item -ItemType Directory -Force -Path "./generated-client-nestjs"

# Генерация TypeScript Axios клиента с помощью OpenAPI Generator (через Docker)
Write-Host "Generating TypeScript Axios client using OpenAPI Generator (Docker)..."
try {
    docker run --rm `
      -v "${PWD}:/local" `
      openapitools/openapi-generator-cli generate `
      -g typescript-axios `
      -i /local/openapi.json `
      -o /local/generated-client-axios `
      --additional-properties "npmName=your-axios-package-name,npmVersion=$VERSION,npmRepository=https://registry.npmjs.org/"
} catch {
    Write-Host "Error during Axios client generation: $_"
    exit 1
}

if (-Not (Test-Path "./generated-client-axios/package.json")) {
    Write-Host "Error: Axios client generation failed!"
    exit 1
}

# Генерация NestJS клиента с помощью OpenAPI Generator (через Docker)
Write-Host "Generating NestJS client using OpenAPI Generator (Docker)..."
try {
    docker run --rm `
      -v "${PWD}:/local" `
      openapitools/openapi-generator-cli generate `
      -g typescript-nestjs `
      -i /local/openapi.json `
      -o /local/generated-client-nestjs `
      --additional-properties "npmName=your-nestjs-package-name,npmVersion=$VERSION,npmRepository=https://registry.npmjs.org/"
} catch {
    Write-Host "Error during NestJS client generation: $_"
    exit 1
}

if (-Not (Test-Path "./generated-client-nestjs/package.json")) {
    Write-Host "Error: NestJS client generation failed!"
    exit 1
}

Write-Host "Client generation completed successfully!"
