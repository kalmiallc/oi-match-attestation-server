import { Injectable } from '@nestjs/common';
import { EncodedRequestBody } from './dto/encoded-request.dto';
import { ZERO_MIC } from './utils';
import { TypeTemplate } from './dto/TypeTemplate.dto';
import { AttestationDefinitionStore } from './external-libs/ts/AttestationDefinitionStore';

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
        const res: TypeTemplate.Response = {
            attestationType: '0',
            sourceId: "0",
            votingRound: "0",
            lowestUsedTimestamp: "0",
            requestBody: { templateRequestField: 'decoded request body template' },
            responseBody: { templateResponseField: 'decode response body template' },
        };
        return res;
    }

    public async prepareResponse(request: TypeTemplate.RequestNoMic): Promise<TypeTemplate.Response> {
        // TODO: insert
        // Your code goes here!!!
        console.log(request);
        const res: TypeTemplate.Response = {
            ...request,
            votingRound: "0",
            lowestUsedTimestamp: "0",
            responseBody: { templateResponseField: 'Prepare response template' },
        };

        return res;
    }

    public async mic(request: TypeTemplate.RequestNoMic): Promise<string> {
        // TODO: insert
        // Your code goes here!!!
        console.log(request);
        return ZERO_MIC;
    }

    public async prepareRequest(request: TypeTemplate.RequestNoMic): Promise<EncodedRequestBody> {
        // TODO: insert
        // Your code goes here!!!
        console.log(request);
        const res: EncodedRequestBody = {
            abiEncodedRequest: '0xab1e4c0ded',
        };
        return res;
    }
}






// {
//   attestationType: '0x5479706554656d706c6174650000000000000000000000000000000000000000',
//   sourceId: '0x0000000000000000000000000000000000000000000000000000000000000000',
//   messageIntegrityCode: '0x0000000000000000000000000000000000000000000000000000000000111111',
//   requestBody: {
//     templateRequestField: '0xb4ec0c374d35cd66eef1522d55d0d870a398636a4c088a062dabf8041f69a02e'
//   }
// }
// '0x5479706554656d706c617465000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111b4ec0c374d35cd66eef1522d55d0d870a398636a4c088a062dabf8041f69a02e'