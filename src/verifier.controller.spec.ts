import { Test, TestingModule } from "@nestjs/testing";
import { TypeTemplate } from "./dto/TypeTemplate.dto";
import { VerifierController } from "./verifier.controller";
import { TEST_ENCODED_REQUEST, TEST_ENCODED_REQUEST_NO_MIC, TEST_MIC, TEST_REQUEST_NO_MIC, TEST_RESPONSE, VerifierService } from "./verifier.service";

describe("AppController", () => {
    let appController: VerifierController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [VerifierController],
            providers: [VerifierService],
        }).compile();

        appController = app.get<VerifierController>(VerifierController);
    });

    describe("root", () => {
        it("should 'verify' pass", async () => {
            const actualRes = await appController.verify({
                abiEncodedRequest: TEST_ENCODED_REQUEST_NO_MIC
            });
            expect(actualRes).toStrictEqual(TEST_RESPONSE);
        });
        it("should prepare response", async () => {
            const actualRes = await appController.prepareResponse(TEST_REQUEST_NO_MIC);
            expect(actualRes).toStrictEqual(TEST_RESPONSE);
        });
        it("should obtain 'mic'", async () => {
            const actualMic = await appController.mic({
                ...TEST_REQUEST_NO_MIC,
            });
            expect(actualMic).toStrictEqual(TEST_MIC);
        });
        it("should prepare request", async () => {
            // const expectedRes: TypeTemplate.Response = TEST_RESPONSE;
            const actualRequest= await appController.prepareRequest(TEST_REQUEST_NO_MIC);
            console.log(actualRequest)
            expect(actualRequest.abiEncodedRequest).toStrictEqual(TEST_ENCODED_REQUEST);
        });

    });
});
