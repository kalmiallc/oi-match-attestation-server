import { Test, TestingModule } from "@nestjs/testing";
import { WEBMatchResultVerifierService } from "../../service/web/web-match-result-verifier.service";
import { WEBMatchResultVerifierController } from "./web-match-result-verifier.controller";
import { readFileSync } from "fs";
import { ExampleData } from "../../external-libs/ts/interfaces";
import { MatchResult_RequestNoMic, MatchResult_Request, MatchResult_Response, MatchResult_RequestBody, MatchResult_ResponseBody } from "../../dto/MatchResult.dto";
import { AttestationDefinitionStore } from "../../external-libs/ts/AttestationDefinitionStore";
import { encodeAttestationName } from "../../external-libs/ts/utils";


describe("AppController", () => {
    let appController: WEBMatchResultVerifierController;
    let exampleData: ExampleData<MatchResult_RequestNoMic, MatchResult_Request, MatchResult_Response>;



    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [WEBMatchResultVerifierController],
            providers: [WEBMatchResultVerifierService],
        }).compile();

        appController = app.get<WEBMatchResultVerifierController>(WEBMatchResultVerifierController);
        // exampleData = JSON.parse(readFileSync("src/example-data/MatchResult.json", "utf8"));
        exampleData = generateSampleRequestResponse();
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



// moved this here as we had some problems with not a function in MatchResult.ts
export function generateSampleRequestResponse(timestamp = "1721833200", result= "1") {
    const ATTESTATION_TYPE_NAME = "MatchResult";
    const MIC_SALT = "Flare";
    
    const startOfDay = Math.floor(Number(timestamp) - (Number(timestamp) % 86400));

    const requestBody: MatchResult_RequestBody = {
        date: startOfDay.toString(),
        sport: "0",
        gender: "0",
        teams: "Argentina,Morocco",
    };

    const responseBody: MatchResult_ResponseBody = {
        timestamp,
        result
    };

    const store = new AttestationDefinitionStore("type-definitions");
    const requestNoMic = {
        attestationType: encodeAttestationName(ATTESTATION_TYPE_NAME),
        sourceId: encodeAttestationName("WEB"),
        requestBody: requestBody,
    } as MatchResult_RequestNoMic;
    const encodedRequestZeroMic = store.encodeRequest(requestNoMic as any);
    const response = {
        attestationType: encodeAttestationName(ATTESTATION_TYPE_NAME),
        sourceId: encodeAttestationName("WEB"),
        votingRound: "123",
        lowestUsedTimestamp: "0xffffffffffffffff",
        requestBody: requestBody,
        responseBody: responseBody,
    } as MatchResult_Response;
    const messageIntegrityCode = store.attestationResponseHash(response, MIC_SALT);
    const request = {
        ...requestNoMic,
        messageIntegrityCode,
    };
    const encodedRequest = store.encodeRequest(request as any);
    return { requestNoMic, response, request, messageIntegrityCode, encodedRequestZeroMic, encodedRequest };
}

