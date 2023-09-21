import { Injectable } from "@nestjs/common";
import { TypeTemplate } from "./dto/TypeTemplate.dto";
import { EncodedRequestBody } from "./dto/encoded-request.dto";
import { AttestationDefinitionStore } from "./external-libs/ts/AttestationDefinitionStore";
import { MIC_SALT } from "./external-libs/ts/utils";

//////// DUMMY DATA FOR TEMPLATE ////////
export const TEST_REQUEST_NO_MIC: TypeTemplate.RequestNoMic = {
    attestationType: "0x5479706554656d706c6174650000000000000000000000000000000000000000",
    sourceId: "0x0000000000000000000000000000000000000000000000000000000000000000",
    // messageIntegrityCode: "0x0000000000000000000000000000000000000000000000000000000000111111",
    requestBody: {
        templateRequestField: "0xb4ec0c374d35cd66eef1522d55d0d870a398636a4c088a062dabf8041f69a02e"
    }
}


export const TEST_RESPONSE: TypeTemplate.Response = {
    ...TEST_REQUEST_NO_MIC,
    votingRound: "0",
    lowestUsedTimestamp: "0",
    responseBody: { templateResponseField: "0xb4ec0c374d35cd66eef1522d55d0d870a398636a4c088a062dabf8041f69a02e" },
};

export const TEST_ENCODED_REQUEST_NO_MIC: string = "0x5479706554656d706c617465000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111b4ec0c374d35cd66eef1522d55d0d870a398636a4c088a062dabf8041f69a02e";

export const TEST_ENCODED_REQUEST: string = "0x5479706554656d706c6174650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000047ee7cb207fc5e7ae59aee5ce3982b3187555288a9663e7b1cc399bd5745de5cb4ec0c374d35cd66eef1522d55d0d870a398636a4c088a062dabf8041f69a02e"

export const TEST_MIC = "0x47ee7cb207fc5e7ae59aee5ce3982b3187555288a9663e7b1cc399bd5745de5c";
@Injectable()
export class VerifierService {
    store!: AttestationDefinitionStore

    constructor() {
        this.store = new AttestationDefinitionStore("type-definitions");
    }

    public async verifyEncodedRequest(request: EncodedRequestBody): Promise<TypeTemplate.Response> {
        let requestJSON = this.store.parseRequest(request.abiEncodedRequest);
        console.dir(requestJSON, { depth: null });

        // Put here logic to verify the request and produce response body

        // Example of response body
        const res: TypeTemplate.Response = TEST_RESPONSE;
    
        return res;
    }

    public async prepareResponse(request: TypeTemplate.RequestNoMic): Promise<TypeTemplate.Response> {
        console.dir(request);
        // Put here logic to verify the request and produce response body

        // Example of response body
        const res: TypeTemplate.Response = {
            ...TEST_RESPONSE,
            ...request,
        };

        return res;
    }

    public async mic(request: TypeTemplate.RequestNoMic): Promise<string> {
        console.dir(request);

        // Put here logic to verify the request and produce response body

        // Example of response body
        const response: TypeTemplate.Response = {
            ...TEST_RESPONSE,
            ...request,
        };

        return this.store.attestationResponseHash(response, MIC_SALT)!;
    }

    public async prepareRequest(request: TypeTemplate.RequestNoMic): Promise<EncodedRequestBody> {
        console.dir(request);

        // Put here logic to verify the request and produce response body

        // Example of response body
        const response: TypeTemplate.Response = {
            ...TEST_RESPONSE,
            ...request,
        };

        const newRequest = {
            ...request,
            messageIntegrityCode: this.store.attestationResponseHash(response, MIC_SALT)!
        } as TypeTemplate.Request;

        const res: EncodedRequestBody = {
            abiEncodedRequest: this.store.encodeRequest(newRequest),
        };
        return res;
    }
}
