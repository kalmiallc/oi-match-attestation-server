import { Test, TestingModule } from '@nestjs/testing';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';
import { AttResponse } from './dto/response.dto';
import { ZERO_MIC } from './utils';

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
        it('should test your base path ( verifier/{chain}/ )', async () => {
            const expectedRes: AttResponse = {
                attestationType: '0',
                sourceId: 0,
                votingRound: 0,
                messageIntegrityCode: ZERO_MIC,
                requestBody: { templateRequestField: 'decoded request body template' },
                responseBody: { templateResponseField: 'decode response body template' },
            };
            const actualRes = await appController.verify({
                abiEncodedRequest: '0x12',
            });
            expect(actualRes).toStrictEqual(expectedRes);
        });
    });
});
