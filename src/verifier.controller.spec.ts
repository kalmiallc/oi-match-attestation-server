import { Test, TestingModule } from '@nestjs/testing';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';

describe('AppController', () => {
    let appController: VerifierController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [VerifierController],
            providers: [VerifierService],
        }).compile();

        appController = app.get<VerifierController>(VerifierController);
    });

    describe('root', () => {
        it('should test your base path ( verifier/{chain}/ )', () => {
            expect(
                appController.verify({
                    abiEncodedRequest: '0x12',
                }),
            ).toBe('Verified response');
        });
    });
});
