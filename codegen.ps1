
Write-Host "Generating TypeScript Axios client using Docker..."
docker run --rm `
  -v "${PWD}:/local" `
  openapitools/openapi-generator-cli generate `
  -g typescript-axios `
  -i /local/openapi.json `
  -o /local/generated-client-axios

Write-Host "Generating NestJS client using Docker..."
docker run --rm `
  -v "${PWD}:/local" `
  openapitools/openapi-generator-cli generate `
  -g typescript-nestjs `
  -i /local/openapi.json `
  -o /local/generated-client-nestjs

Write-Host "Client generation completed successfully!"
