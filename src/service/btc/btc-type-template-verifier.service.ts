import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { EncodedRequestResponse, MicResponse } from "../../dto/generic.dto";
import {
    AttestationResponseDTO_TypeTemplate_Response,
    TypeTemplate_Request,
    TypeTemplate_RequestNoMic,
    TypeTemplate_Response,
} from "../../dto/TypeTemplate.dto";
import { AttestationDefinitionStore } from "../../external-libs/ts/AttestationDefinitionStore";
import { AttestationResponseStatus } from "../../external-libs/ts/AttestationResponse";
import { ExampleData } from "../../external-libs/ts/interfaces";
import { MIC_SALT, encodeAttestationName, serializeBigInts } from "../../external-libs/ts/utils";

@Injectable()
export class BTCTypeTemplateVerifierService {
    store!: AttestationDefinitionStore;
    exampleData!: ExampleData<TypeTemplate_RequestNoMic, TypeTemplate_Request, TypeTemplate_Response>;

    //-$$$<start-constructor> Start of custom code section. Do not change this comment.

    // Add additional class members here.
    // Augment the constructor with additional (injected) parameters, if required. Update the constructor code.
    constructor() {
        this.store = new AttestationDefinitionStore("type-definitions");
        this.exampleData = JSON.parse(readFileSync("src/example-data/TypeTemplate.json", "utf8"));
    }

    // Implement the verifyRequest method returning attestation response
    async verifyRequest(request: TypeTemplate_Request | TypeTemplate_RequestNoMic): Promise<AttestationResponseDTO_TypeTemplate_Response> {
        if (request.attestationType !== encodeAttestationName("TypeTemplate") || request.sourceId !== encodeAttestationName("BTC")) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: `Attestation type and source id combination not supported: (${request.attestationType}, ${request.sourceId}). This source supports attestation type 'TypeTemplate' (0x5479706554656d706c6174650000000000000000000000000000000000000000) and source id 'BTC' (0x4254430000000000000000000000000000000000000000000000000000000000).`,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        // PUT YOUR CODE HERE
        console.dir(request, { depth: null });

        // Example response - return your own response instead
        const response: AttestationResponseDTO_TypeTemplate_Response = serializeBigInts({
            status: AttestationResponseStatus.VALID,
            response: {
                ...this.exampleData.response,
                attestationType: request.attestationType,
                sourceId: request.sourceId,
                requestBody: request.requestBody,
            } as TypeTemplate_Response,
        });

        return response;
    }

    //-$$$<end-constructor> End of custom code section. Do not change this comment.

    public async verifyEncodedRequest(abiEncodedRequest: string): Promise<AttestationResponseDTO_TypeTemplate_Response> {
        const requestJSON = this.store.parseRequest<TypeTemplate_Request>(abiEncodedRequest);
        //-$$$<start-verifyEncodedRequest> Start of custom code section. Do not change this comment.

        const response = await this.verifyRequest(requestJSON);

        //-$$$<end-verifyEncodedRequest> End of custom code section. Do not change this comment.

        return response;
    }

    public async prepareResponse(request: TypeTemplate_RequestNoMic): Promise<AttestationResponseDTO_TypeTemplate_Response> {
        //-$$$<start-prepareResponse> Start of custom code section. Do not change this comment.

        const response = await this.verifyRequest(request);

        //-$$$<end-prepareResponse> End of custom code section. Do not change this comment.

        return response;
    }

    public async mic(request: TypeTemplate_RequestNoMic): Promise<MicResponse> {
        //-$$$<start-mic> Start of custom code section. Do not change this comment.

        const result = await this.verifyRequest(request);
        if (result.status !== AttestationResponseStatus.VALID) {
            return new MicResponse({ status: result.status });
        }
        const response = result.response;

        //-$$$<end-mic> End of custom code section. Do not change this comment.

        if (!response) return new MicResponse({ status: result.status });
        return new MicResponse({
            status: AttestationResponseStatus.VALID,
            messageIntegrityCode: this.store.attestationResponseHash<TypeTemplate_Response>(response, MIC_SALT),
        });
    }

    public async prepareRequest(request: TypeTemplate_RequestNoMic): Promise<EncodedRequestResponse> {
        //-$$$<start-prepareRequest> Start of custom code section. Do not change this comment.

        const result = await this.verifyRequest(request);
        if (result.status !== AttestationResponseStatus.VALID) {
            return new EncodedRequestResponse({ status: result.status });
        }
        const response = result.response;

        //-$$$<end-prepareRequest> End of custom code section. Do not change this comment.

        if (!response) return new EncodedRequestResponse({ status: result.status });
        const newRequest = {
            ...request,
            messageIntegrityCode: this.store.attestationResponseHash<TypeTemplate_Response>(response, MIC_SALT)!,
        } as TypeTemplate_Request;

        return new EncodedRequestResponse({
            status: AttestationResponseStatus.VALID,
            abiEncodedRequest: this.store.encodeRequest(newRequest),
        });
    }
}
