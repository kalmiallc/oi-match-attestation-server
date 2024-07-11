import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { EncodedRequestResponse, MicResponse } from "../../dto/generic.dto";
import { AttestationResponseDTO_MatchResult_Response, MatchResult_Request, MatchResult_RequestNoMic, MatchResult_Response } from "../../dto/MatchResult.dto";
import { AttestationDefinitionStore } from "../../external-libs/ts/AttestationDefinitionStore";
import { AttestationResponseStatus } from "../../external-libs/ts/AttestationResponse";
import { ExampleData } from "../../external-libs/ts/interfaces";
import { MIC_SALT, ZERO_BYTES_32, encodeAttestationName, serializeBigInts } from "../../external-libs/ts/utils";

@Injectable()
export class WEBMatchResultVerifierService {
    store!: AttestationDefinitionStore;
    exampleData!: ExampleData<MatchResult_RequestNoMic, MatchResult_Request, MatchResult_Response>;

    //-$$$<start-constructor> Start of custom code section. Do not change this comment.

    // Add additional class members here.
    // Augment the constructor with additional (injected) parameters, if required. Update the constructor code.
    constructor() {
        this.store = new AttestationDefinitionStore("type-definitions");
        this.exampleData = JSON.parse(readFileSync("src/example-data/MatchResult.json", "utf8"));
    }

    //-$$$<end-constructor> End of custom code section. Do not change this comment.

    async verifyRequestInternal(request: MatchResult_Request | MatchResult_RequestNoMic): Promise<AttestationResponseDTO_MatchResult_Response> {
        if (request.attestationType !== encodeAttestationName("MatchResult") || request.sourceId !== encodeAttestationName("WEB")) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: `Attestation type and source id combination not supported: (${request.attestationType}, ${
                        request.sourceId
                    }). This source supports attestation type 'MatchResult' (${encodeAttestationName(
                        "MatchResult",
                    )}) and source id '${"WEB"}' (${encodeAttestationName("WEB")}).`,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const fixedRequest = {
            ...request,
        } as MatchResult_Request;
        if (!fixedRequest.messageIntegrityCode) {
            fixedRequest.messageIntegrityCode = ZERO_BYTES_32;
        }

        return this.verifyRequest(fixedRequest);
    }

    async verifyRequest(fixedRequest: MatchResult_Request): Promise<AttestationResponseDTO_MatchResult_Response> {
        //-$$$<start-verifyRequest> Start of custom code section. Do not change this comment.

        return {
            status: AttestationResponseStatus.VALID,
            response: {
                ...this.exampleData.response,
                attestationType: fixedRequest.attestationType,
                sourceId: fixedRequest.sourceId,
                requestBody: serializeBigInts(fixedRequest.requestBody),
                lowestUsedTimestamp: "0xffffffffffffffff",
            } as MatchResult_Response,
        };

        //-$$$<end-verifyRequest> End of custom code section. Do not change this comment.
    }

    public async verifyEncodedRequest(abiEncodedRequest: string): Promise<AttestationResponseDTO_MatchResult_Response> {
        const requestJSON = this.store.parseRequest<MatchResult_Request>(abiEncodedRequest);
        const response = await this.verifyRequestInternal(requestJSON);
        return response;
    }

    public async prepareResponse(request: MatchResult_RequestNoMic): Promise<AttestationResponseDTO_MatchResult_Response> {
        const response = await this.verifyRequestInternal(request);
        return response;
    }

    public async mic(request: MatchResult_RequestNoMic): Promise<MicResponse> {
        const result = await this.verifyRequestInternal(request);
        if (result.status !== AttestationResponseStatus.VALID) {
            return new MicResponse({ status: result.status });
        }
        const response = result.response;
        if (!response) return new MicResponse({ status: result.status });
        return new MicResponse({
            status: AttestationResponseStatus.VALID,
            messageIntegrityCode: this.store.attestationResponseHash<MatchResult_Response>(response, MIC_SALT),
        });
    }

    public async prepareRequest(request: MatchResult_RequestNoMic): Promise<EncodedRequestResponse> {
        const result = await this.verifyRequestInternal(request);
        if (result.status !== AttestationResponseStatus.VALID) {
            return new EncodedRequestResponse({ status: result.status });
        }
        const response = result.response;

        if (!response) return new EncodedRequestResponse({ status: result.status });
        const newRequest = {
            ...request,
            messageIntegrityCode: this.store.attestationResponseHash<MatchResult_Response>(response, MIC_SALT)!,
        } as MatchResult_Request;

        return new EncodedRequestResponse({
            status: AttestationResponseStatus.VALID,
            abiEncodedRequest: this.store.encodeRequest(newRequest),
        });
    }
}
