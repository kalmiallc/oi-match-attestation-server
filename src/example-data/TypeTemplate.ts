import {
    TypeTemplate_Proof,
    TypeTemplate_RequestBody,
    TypeTemplate_RequestNoMic,
    TypeTemplate_Response,
    TypeTemplate_ResponseBody,
} from "../dto/TypeTemplate.dto";
import { MIC_SALT, encodeAttestationName } from "../external-libs/ts/utils";
import { randSol } from "../external-libs/ts/random";
import { AttestationDefinitionStore } from "../external-libs/ts/AttestationDefinitionStore";

const ATTESTATION_TYPE_NAME = "TypeTemplate";

function randomProof(votingRound: number = 1234, sourceId?: string): TypeTemplate_Proof {
    const bodies = randomBodies();
    const response = {
        attestationType: encodeAttestationName(ATTESTATION_TYPE_NAME),
        sourceId: encodeAttestationName(sourceId ?? "BTC"),
        votingRound: votingRound.toString(),
        lowestUsedTimestamp: "1234",
        requestBody: bodies.requestBody,
        responseBody: bodies.responseBody,
    } as TypeTemplate_Response;

    const proof = {
        merkleProof: [] as string[],
        data: response,
    } as TypeTemplate_Proof;
    return proof;
}

function randomBodies() {
    const requestBody = {
        bytes32Field: randSol("bytes32", "TypeTemplate"),
        boolField: randSol("bool", "TypeTemplate"),
        requestSubstruct1: {
            templateStructField: randSol("bytes32", "TypeTemplate"),
            uintArrayField: [randSol("uint256", "TypeTemplate"), randSol("uint256", "TypeTemplate"), randSol("uint256", "TypeTemplate")],
            boolArrayField: [randSol("bool", "TypeTemplate"), randSol("bool", "TypeTemplate"), randSol("bool", "TypeTemplate")],
        },
        requestSubstruct2Array: [
            {
                templateStructField: randSol("bytes32", "TypeTemplate"),
                intArrayField: [randSol("int256", "TypeTemplate"), randSol("int256", "TypeTemplate"), randSol("int256", "TypeTemplate")],
                boolArrayField: [randSol("bool", "TypeTemplate"), randSol("bool", "TypeTemplate"), randSol("bool", "TypeTemplate")],
            },
            {
                templateStructField: randSol("bytes32", "TypeTemplate"),
                intArrayField: [randSol("int256", "TypeTemplate"), randSol("int256", "TypeTemplate"), randSol("int256", "TypeTemplate")],
                boolArrayField: [randSol("bool", "TypeTemplate"), randSol("bool", "TypeTemplate"), randSol("bool", "TypeTemplate")],
            },
            {
                templateStructField: randSol("bytes32", "TypeTemplate"),
                intArrayField: [randSol("int256", "TypeTemplate"), randSol("int256", "TypeTemplate"), randSol("int256", "TypeTemplate")],
                boolArrayField: [randSol("bool", "TypeTemplate"), randSol("bool", "TypeTemplate"), randSol("bool", "TypeTemplate")],
            },
        ],
    } as TypeTemplate_RequestBody;

    const responseBody = {
        templateResponseField: randSol("bytes32", "TypeTemplate"),
        responseSubstruct1Array: [
            {
                templateStructField: randSol("bytes32", "TypeTemplate"),
            },
            {
                templateStructField: randSol("bytes32", "TypeTemplate"),
            },
            {
                templateStructField: randSol("bytes32", "TypeTemplate"),
            },
        ],
    } as TypeTemplate_ResponseBody;
    return { requestBody, responseBody };
}

export function randomExample(votingRound: number = 1234, sourceId?: string) {
    const store = new AttestationDefinitionStore();
    const proof = randomProof(votingRound, sourceId);
    const requestNoMic = {
        attestationType: proof.data.attestationType,
        sourceId: proof.data.sourceId,
        requestBody: proof.data.requestBody,
    } as TypeTemplate_RequestNoMic;
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

export function randomTypeTemplateExample(votingRound: number = 1234, sourceId?: string) {
    return randomExample(votingRound, sourceId);
}
