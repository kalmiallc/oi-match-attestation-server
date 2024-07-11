import { Test, TestingModule } from "@nestjs/testing";
import { WEBMatchResultVerifierService } from "../../service/web/web-match-result-verifier.service";
import { WEBMatchResultVerifierController } from "./web-match-result-verifier.controller";
import { readFileSync } from "fs";
import { ExampleData } from "../../external-libs/ts/interfaces";
import { MatchResult_RequestNoMic, MatchResult_Request, MatchResult_Response } from "../../dto/MatchResult.dto";

describe("AppController", () => {
    let appController: WEBMatchResultVerifierController;
    let exampleData: ExampleData<MatchResult_RequestNoMic, MatchResult_Request, MatchResult_Response>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [WEBMatchResultVerifierController],
            providers: [WEBMatchResultVerifierService],
        }).compile();

        appController = app.get<WEBMatchResultVerifierController>(WEBMatchResultVerifierController);
        exampleData = JSON.parse(readFileSync("src/example-data/MatchResult.json", "utf8"));
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
