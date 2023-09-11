import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Verifier server template')
        .setDescription('The template to verifier server')
        .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    console.log(`Your template is available on PORT: ${PORT}`);
    await app.listen(PORT);
}
void bootstrap();
