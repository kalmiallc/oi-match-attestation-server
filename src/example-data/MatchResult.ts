import {
    MatchResult_Proof,
    MatchResult_Request,
    MatchResult_RequestBody,
    MatchResult_RequestNoMic,
    MatchResult_Response,
    MatchResult_ResponseBody,
} from "../dto/MatchResult.dto";
import { MIC_SALT, encodeAttestationName } from "../external-libs/ts/utils";
import { randSol } from "../external-libs/ts/random";
import { AttestationDefinitionStore } from "../external-libs/ts/AttestationDefinitionStore";
import { ExampleData } from "../utils";

const ATTESTATION_TYPE_NAME = "MatchResult";

function randomProof(votingRound: number = 1234, sourceId?: string, fullRandom = false): MatchResult_Proof {
    const bodies = randomBodies(fullRandom);
    const response = {
        attestationType: encodeAttestationName(ATTESTATION_TYPE_NAME),
        sourceId: encodeAttestationName(sourceId ?? "BTC"),
        votingRound: votingRound.toString(),
        lowestUsedTimestamp: "0xffffffffffffffff",
        requestBody: bodies.requestBody,
        responseBody: bodies.responseBody,
    } as MatchResult_Response;

    const proof = {
        merkleProof: [] as string[],
        data: response,
    } as MatchResult_Proof;
    return proof;
}

function randomBodies(fullRandom = false) {
    const requestBody = {
        date: randSol("uint256", "MatchResult" + (fullRandom ? Math.random().toString() : "")),
        sport: randSol("uint32", "MatchResult" + (fullRandom ? Math.random().toString() : "")),
        gender: randSol("uint8", "MatchResult" + (fullRandom ? Math.random().toString() : "")),
        teams: randSol("string", "MatchResult" + (fullRandom ? Math.random().toString() : "")),
    } as MatchResult_RequestBody;

    const responseBody = {
        timestamp: randSol("uint256", "MatchResult" + (fullRandom ? Math.random().toString() : "")),
        result: randSol("uint8", "MatchResult" + (fullRandom ? Math.random().toString() : "")),
    } as MatchResult_ResponseBody;
    return { requestBody, responseBody };
}

export function randomExample(votingRound: number = 1234, sourceId?: string, fullRandom = false) {
    const store = new AttestationDefinitionStore("type-definitions");
    const proof = randomProof(votingRound, sourceId, fullRandom);
    const requestNoMic = {
        attestationType: proof.data.attestationType,
        sourceId: proof.data.sourceId,
        requestBody: proof.data.requestBody,
    } as MatchResult_RequestNoMic;
    const encodedRequestZeroMic = store.encodeRequest(requestNoMic as any);
    const response = proof.data;
    const messageIntegrityCode = store.attestationResponseHash(response, MIC_SALT);
    const request = {
        ...requestNoMic,
        messageIntegrityCode,
    };
    const encodedRequest = store.encodeRequest(request as any);
    return { requestNoMic, response, request, messageIntegrityCode, encodedRequestZeroMic, encodedRequest, proof };
}

export function randomMatchResultExample(votingRound: number = 1234, sourceId?: string, fullRandom = false) {
    return randomExample(votingRound, sourceId, fullRandom);
}


