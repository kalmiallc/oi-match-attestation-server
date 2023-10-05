import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { TypeTemplate_Request, TypeTemplate_RequestNoMic, TypeTemplate_Response } from "../dto/TypeTemplate.dto";
import { AttestationDefinitionStore } from "../external-libs/ts/AttestationDefinitionStore";
import { AttestationResponse, AttestationResponseStatus } from "../external-libs/ts/AttestationResponse";
import { ExampleData } from "../external-libs/ts/interfaces";
import { MIC_SALT } from "../external-libs/ts/utils";

@Injectable()
export class TypeTemplateVerifierService {
    store!: AttestationDefinitionStore;
    exampleData!: ExampleData<TypeTemplate_RequestNoMic, TypeTemplate_Request, TypeTemplate_Response>;

    //-$$$<start-constructor> Start of custom code section. Do not change this comment.

    constructor() {
        this.store = new AttestationDefinitionStore("type-definitions");
        this.exampleData = JSON.parse(readFileSync("src/example-data/TypeTemplate.json", "utf8"));
    }

    //-$$$<end-constructor> End of custom code section. Do not change this comment.

    public async verifyEncodedRequest(abiEncodedRequest: string): Promise<AttestationResponse<TypeTemplate_Response>> {
        const requestJSON = this.store.parseRequest<TypeTemplate_Request>(abiEncodedRequest);
        console.dir(requestJSON, { depth: null });

        //-$$$<start-verifyEncodedRequest> Start of custom code section. Do not change this comment.

        // PUT YOUR CUSTOM CODE HERE

        //-$$$<end-verifyEncodedRequest> End of custom code section. Do not change this comment.

        // Example of response body. Delete this example and provide value for variable 'response' in the custom code section above.
        const response: AttestationResponse<TypeTemplate_Response> = {
            status: AttestationResponseStatus.VALID,
            response: this.exampleData.response,
        };

        return response;
    }

    public async prepareResponse(request: TypeTemplate_RequestNoMic): Promise<AttestationResponse<TypeTemplate_Response>> {
        console.dir(request, { depth: null });

        //-$$$<start-prepareResponse> Start of custom code section. Do not change this comment.

        // PUT YOUR CUSTOM CODE HERE

        //-$$$<end-prepareResponse> End of custom code section. Do not change this comment.

        // Example of response body. Delete this example and provide value for variable 'response' in the custom code section above.
        const response: AttestationResponse<TypeTemplate_Response> = {
            status: AttestationResponseStatus.VALID,
            response: {
                ...this.exampleData.response,
                ...request,
            } as TypeTemplate_Response,
        };

        return response;
    }

    public async mic(request: TypeTemplate_RequestNoMic): Promise<string | undefined> {
        console.dir(request, { depth: null });

        //-$$$<start-mic> Start of custom code section. Do not change this comment.

        // PUT YOUR CUSTOM CODE HERE

        //-$$$<end-mic> End of custom code section. Do not change this comment.

        // Example of response body. Delete this example and provide value for variable 'response' in the custom code section above.
        const response: TypeTemplate_Response = {
            ...this.exampleData.response,
            ...request,
        };

        if (!response) return undefined;
        return this.store.attestationResponseHash<TypeTemplate_Response>(response, MIC_SALT)!;
    }

    public async prepareRequest(request: TypeTemplate_RequestNoMic): Promise<string | undefined> {
        console.dir(request, { depth: null });

        //-$$$<start-prepareRequest> Start of custom code section. Do not change this comment.

        // PUT YOUR CUSTOM CODE HERE

        //-$$$<end-prepareRequest> End of custom code section. Do not change this comment.

        // Example of response body. Delete this example and provide value for variable 'response' in the custom code section above.
        const response: TypeTemplate_Response = {
            ...this.exampleData.response,
            ...request,
        };

        if (!response) return undefined;
        const newRequest = {
            ...request,
            messageIntegrityCode: this.store.attestationResponseHash<TypeTemplate_Response>(response, MIC_SALT)!,
        } as TypeTemplate_Request;

        return this.store.encodeRequest(newRequest);
    }
}
