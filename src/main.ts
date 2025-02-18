// src/main.ts
import * as fs from 'fs';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Messaging Service')
    .setDescription('API for real-time messaging')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Экспорт OpenAPI спецификации в файл
  fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
