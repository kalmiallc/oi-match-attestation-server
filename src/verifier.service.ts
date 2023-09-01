import { Injectable } from '@nestjs/common';
import { EncodedRequestBody } from './dto/encoded-request.dto';
import { AttRequestNoMic } from './dto/request-no-mic';
import { AttResponse } from './dto/response.dto';
import { ZERO_MIC } from './utils';

@Injectable()
export class VerifierService {
    verifyEncodedRequest(request: EncodedRequestBody): AttResponse {
        console.log(request);
        // TODO: insert
        // Your code goes here!!!
        // ABI decode the type
        const res: AttResponse = {
            attestationType: '0',
            sourceId: 0,
            votingRound: 0,
            messageIntegrityCode: ZERO_MIC,
            requestBody: { templateRequestField: 'decoded request body template' },
            responseBody: { templateResponseField: 'decode response body template' },
        };
        return res;
    }

    prepareResponse(request: AttRequestNoMic): AttResponse {
        // TODO: insert
        // Your code goes here!!!
        console.log(request);
        const res: AttResponse = {
            ...request,
            messageIntegrityCode: ZERO_MIC,
            votingRound: 0,
            responseBody: { templateResponseField: 'Prepare response template' },
        };

        return res;
    }

    mic(request: AttRequestNoMic): string {
        // TODO: insert
        // Your code goes here!!!
        console.log(request);
        return ZERO_MIC;
    }

    prepareRequest(request: AttRequestNoMic): EncodedRequestBody {
        // TODO: insert
        // Your code goes here!!!
        console.log(request);
        const res: EncodedRequestBody = {
            abiEncodedRequest: '0xab1e4c0ded',
        };
        return res;
    }
}
