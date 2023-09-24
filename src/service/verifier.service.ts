import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { ExampleData } from "src/utils";
import { TypeTemplate } from "../dto/TypeTemplate.dto";
import { EncodedRequestBody } from "../dto/encoded-request.dto";
import { AttestationDefinitionStore } from "../external-libs/ts/AttestationDefinitionStore";
import { MIC_SALT } from "../external-libs/ts/utils";
import { AttestationResponse, AttestationStatus } from "../external-libs/ts/AttestationResponse";

@Injectable()
export class VerifierService {
    store!: AttestationDefinitionStore
    exampleData!: ExampleData<TypeTemplate.RequestNoMic, TypeTemplate.Request, TypeTemplate.Response>;

    constructor() {
        this.store = new AttestationDefinitionStore("type-definitions");
        this.exampleData = JSON.parse(readFileSync("src/example-data/TypeTemplate.json", "utf8"));
    }

    public async verifyEncodedRequest(request: EncodedRequestBody): Promise<AttestationResponse<TypeTemplate.Response>> {
        let requestJSON = this.store.parseRequest(request.abiEncodedRequest);
        console.dir(requestJSON, { depth: null });

        // Put here logic to verify the request and produce response body

        // Example of response body
        const res: AttestationResponse<TypeTemplate.Response> = {
            status: AttestationStatus.VALID,
            response: this.exampleData.response
        };

        return res;
    }

    public async prepareResponse(request: TypeTemplate.RequestNoMic): Promise<AttestationResponse<TypeTemplate.Response>> {
        console.dir(request);

        // Put here logic to verify the request and produce response body

        // Example of response body
        const res: AttestationResponse<TypeTemplate.Response> = {
            status: AttestationStatus.VALID,
            response: {
                ...this.exampleData.response,
                ...request,
            } as TypeTemplate.Response
        }

        return res;
    }

    public async mic(request: TypeTemplate.RequestNoMic): Promise<string> {
        console.dir(request);

        // Put here logic to verify the request and produce response body

        // Example of response body
        const response: TypeTemplate.Response = {
            ...this.exampleData.response,
            ...request,
        };

        return this.store.attestationResponseHash(response, MIC_SALT)!;
    }

    public async prepareRequest(request: TypeTemplate.RequestNoMic): Promise<EncodedRequestBody> {
        console.dir(request);

        // Put here logic to verify the request and produce response body

        // Example of response body
        const response: TypeTemplate.Response = {
            ...this.exampleData.response,
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
