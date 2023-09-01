/////////////////
// DO NOT EDIT //
/////////////////

import { Body, Controller, Post } from '@nestjs/common';
import { EncodedRequestBody } from './dto/encoded-request.dto';
import { AttRequestNoMic } from './dto/request-no-mic';
import { VerifierService } from './verifier.service';
import { AttResponse } from './dto/response.dto';

@Controller('verifier/eth')
export class VerifierController {
    constructor(private readonly verifierService: VerifierService) {}

    /**
     *
     * Tries to verify encoded attestation request without checking message integrity code, and if successful it returns response.
     * @param verifierBody
     * @returns
     */
    @Post()
    verify(@Body() body: EncodedRequestBody): AttResponse {
        return this.verifierService.verifyEncodedRequest(body);
    }

    /**
     * Tries to verify attestation request (given in JSON) without checking message integrity code, and if successful it returns response.
     * @param prepareResponseBody
     * @returns
     */
    @Post('prepareResponse')
    prepareResponse(@Body() body: AttRequestNoMic): AttResponse {
        return this.verifierService.prepareResponse(body);
    }

    /**
     * Tries to verify attestation request (given in JSON) without checking message integrity code, and if successful, it returns the correct message integrity code.
     * @param body
     */
    @Post('mic')
    mic(@Body() body: AttRequestNoMic): string {
        return this.verifierService.mic(body);
    }

    /**
     * Tries to verify attestation request (given in JSON) without checking message integrity code.
     * If successful, it returns the encoding of the attestation request with the correct message integrity code, which can be directly submitted to the State Connector contract.
     * @param body
     */
    @Post('prepareRequest')
    prepareRequest(@Body() body: AttRequestNoMic): EncodedRequestBody {
        return this.verifierService.prepareRequest(body);
    }
}
