import { Injectable } from '@nestjs/common';
import { EncodedRequestBody } from './dto/encoded-request.dto';
import { ZERO_MIC } from './utils';
import { TypeTemplate } from './dto/TypeTemplate.dto';

@Injectable()
export class VerifierService {
    public async verifyEncodedRequest(request: EncodedRequestBody): Promise<TypeTemplate.Response> {
        console.log(request);
        // TODO: insert
        // Your code goes here!!!
        // ABI decode the type
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
