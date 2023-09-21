import { Test, TestingModule } from '@nestjs/testing';
import { TypeTemplate } from './dto/TypeTemplate.dto';
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
        it('should test your base path ( verifier/{chain}/ )', async () => {
            const expectedRes: TypeTemplate.Response = {
                attestationType: '0',
                sourceId: "0",
                votingRound: "0",
                lowestUsedTimestamp: "0",
                requestBody: { templateRequestField: 'decoded request body template' },
                responseBody: { templateResponseField: 'decode response body template' },
            };
            const actualRes = await appController.verify({
                abiEncodedRequest: "0x5479706554656d706c617465000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111b4ec0c374d35cd66eef1522d55d0d870a398636a4c088a062dabf8041f69a02e",
            });
            expect(actualRes).toStrictEqual(expectedRes);
        });
        it('should test your base path ( verifier/{chain}/ )', async () => {
            const expectedRes: TypeTemplate.Response = {
                attestationType: '0',
                sourceId: "0",
                votingRound: "0",
                lowestUsedTimestamp: "0",
                requestBody: { templateRequestField: 'decoded request body template' },
                responseBody: { templateResponseField: 'decode response body template' },
            };
            const actualRes = await appController.verify({
                abiEncodedRequest: "",
            });
            expect(actualRes).toStrictEqual(expectedRes);
        });

    });
});
