import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AiModule (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        );

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/ai/summary (POST) - doit renvoyer un résumé simulé', async () => {
        const response = await request(app.getHttpServer())
            .post('/ai/summary')
            .send({ text: 'Ceci est un texte assez long pour déclencher un résumé.' })
            .expect(201);

        expect(response.body).toHaveProperty('summary');
        expect(response.body.summary).toContain('Résumé simulé');
    });

    it('/ai/summary (POST) - doit renvoyer 400 si texte trop court', async () => {
        const response = await request(app.getHttpServer())
            .post('/ai/summary')
            .send({ text: 'court' })
            .expect(400);

        expect(response.body.message[0]).toContain('10 caractères');
    });
});
