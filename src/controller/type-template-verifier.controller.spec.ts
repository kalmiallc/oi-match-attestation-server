import { Test, TestingModule } from "@nestjs/testing";
import { TypeTemplateVerifierService } from "../service/type-template-verifier.service";
import { TypeTemplateVerifierController } from "./type-template-verifier.controller";
import { readFileSync } from "fs";
import { ExampleData } from "../external-libs/ts/interfaces";
import { TypeTemplate_RequestNoMic, TypeTemplate_Request, TypeTemplate_Response } from "../dto/TypeTemplate.dto";

describe("AppController", () => {
    let appController: TypeTemplateVerifierController;
    let exampleData: ExampleData<TypeTemplate_RequestNoMic, TypeTemplate_Request, TypeTemplate_Response>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TypeTemplateVerifierController],
            providers: [TypeTemplateVerifierService],
        }).compile();

        appController = app.get<TypeTemplateVerifierController>(TypeTemplateVerifierController);
        exampleData = JSON.parse(readFileSync("src/example-data/TypeTemplate.json", "utf8"));
    });

    describe("root", () => {
        it("should 'verify' pass", async () => {
            const actualRes = await appController.verify({
                abiEncodedRequest: exampleData.encodedRequestZeroMic,
            });
            expect(actualRes.status).toEqual("VALID");
            expect(actualRes.response).toStrictEqual(exampleData.response);
        });
        it("should prepare response", async () => {
            const actualRes = await appController.prepareResponse(exampleData.requestNoMic);
            expect(actualRes.status).toEqual("VALID");
            expect(actualRes.response).toStrictEqual(exampleData.response);
        });
        it("should obtain 'mic'", async () => {
            const actualMic = await appController.mic({
                ...exampleData.requestNoMic,
            });
            expect(actualMic.messageIntegrityCode).toStrictEqual(exampleData.messageIntegrityCode);
        });
        it("should prepare request", async () => {
            const actualRequest = await appController.prepareRequest(exampleData.requestNoMic);
            expect(actualRequest.abiEncodedRequest).toStrictEqual(exampleData.encodedRequest);
        });
    });
});
