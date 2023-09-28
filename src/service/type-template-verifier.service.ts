import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { ExampleData } from "src/utils";
import { EncodedRequestBody } from "../dto/encoded-request.dto";
import { TypeTemplate_Request, TypeTemplate_RequestNoMic, TypeTemplate_Response } from "../dto/TypeTemplate.dto";
import { AttestationDefinitionStore } from "../external-libs/ts/AttestationDefinitionStore";
import { AttestationResponse, AttestationStatus } from "../external-libs/ts/AttestationResponse";
import { MIC_SALT } from "../external-libs/ts/utils";

@Injectable()
export class TypeTemplateVerifierService {
    store!: AttestationDefinitionStore;
    exampleData!: ExampleData<TypeTemplate_RequestNoMic, TypeTemplate_Request, TypeTemplate_Response>;

    constructor() {
        this.store = new AttestationDefinitionStore("type-definitions");
        this.exampleData = JSON.parse(readFileSync("src/example-data/TypeTemplate.json", "utf8"));
    }

    public async verifyEncodedRequest(request: EncodedRequestBody): Promise<AttestationResponse<TypeTemplate_Response>> {
        const requestJSON = this.store.parseRequest(request.abiEncodedRequest);
        console.dir(requestJSON, { depth: null });

        //-$$$<start-verifyEncodedRequest> Start of custom code section. Do not change this comment.

        // PUT YOUR CODE HERE

        //-$$$<end-verifyEncodedRequest> End of custom code section. Do not change this comment.

        // Example of response body. Delete this example and provide value for variable 'response' in the custom code section above.
        const response: AttestationResponse<TypeTemplate_Response> = {
            status: AttestationStatus.VALID,
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
            status: AttestationStatus.VALID,
            response: {
                ...this.exampleData.response,
                ...request,
            } as TypeTemplate_Response,
        };

        return response;
    }

    public async mic(request: TypeTemplate_RequestNoMic): Promise<string> {
        console.dir(request, { depth: null });

        //-$$$<start-mic> Start of custom code section. Do not change this comment.

        // PUT YOUR CODE HERE

        //-$$$<end-mic> End of custom code section. Do not change this comment.

        // Example of response body. Delete this example and provide value for variable 'response' in the custom code section above.
        const response: TypeTemplate_Response = {
            ...this.exampleData.response,
            ...request,
        };

        return this.store.attestationResponseHash(response, MIC_SALT)!;
    }

    public async prepareRequest(request: TypeTemplate_RequestNoMic): Promise<EncodedRequestBody> {
        console.dir(request, { depth: null });

        //-$$$<start-prepareRequest> Start of custom code section. Do not change this comment.

        // PUT YOUR CODE HERE

        //-$$$<end-prepareRequest> End of custom code section. Do not change this comment.

        // Example of response body. Delete this example and provide value for variable 'response' in the custom code section above.
        const response: TypeTemplate_Response = {
            ...this.exampleData.response,
            ...request,
        };

        const newRequest = {
            ...request,
            messageIntegrityCode: this.store.attestationResponseHash(response, MIC_SALT)!,
        } as TypeTemplate_Request;

        const res: EncodedRequestBody = {
            abiEncodedRequest: this.store.encodeRequest(newRequest),
        };
        return res;
    }
}
