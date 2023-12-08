///////////////////////////////////////////////////////////////
// THIS IS GENERATED CODE. DO NOT CHANGE THIS FILE MANUALLY .//
///////////////////////////////////////////////////////////////

import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "../../auth/apikey.guard";

import { BTCTypeTemplateVerifierService } from "../../service/btc/btc-type-template-verifier.service";
import { AttestationResponseDTO_TypeTemplate_Response, TypeTemplate_RequestNoMic } from "../../dto/TypeTemplate.dto";
import { EncodedRequest, MicResponse, EncodedRequestResponse } from "../../dto/generic.dto";

@ApiTags("TypeTemplate")
@Controller("btc/TypeTemplate")
@UseGuards(ApiKeyAuthGuard)
@ApiSecurity("X-API-KEY")
export class BTCTypeTemplateVerifierController {
    constructor(private readonly verifierService: BTCTypeTemplateVerifierService) {}

    /**
     *
     * Tries to verify encoded attestation request without checking message integrity code, and if successful it returns response.
     * @param verifierBody
     * @returns
     */
    @HttpCode(200)
    @Post()
    async verify(@Body() body: EncodedRequest): Promise<AttestationResponseDTO_TypeTemplate_Response> {
        return this.verifierService.verifyEncodedRequest(body.abiEncodedRequest!);
    }

    /**
     * Tries to verify attestation request (given in JSON) without checking message integrity code, and if successful it returns response.
     * @param prepareResponseBody
     * @returns
     */
    @HttpCode(200)
    @Post("prepareResponse")
    async prepareResponse(@Body() body: TypeTemplate_RequestNoMic): Promise<AttestationResponseDTO_TypeTemplate_Response> {
        return this.verifierService.prepareResponse(body);
    }

    /**
     * Tries to verify attestation request (given in JSON) without checking message integrity code, and if successful, it returns the correct message integrity code.
     * @param body
     */
    @HttpCode(200)
    @Post("mic")
    async mic(@Body() body: TypeTemplate_RequestNoMic): Promise<MicResponse> {
        return this.verifierService.mic(body);
    }

    /**
     * Tries to verify attestation request (given in JSON) without checking message integrity code.
     * If successful, it returns the encoding of the attestation request with the correct message integrity code, which can be directly submitted to the State Connector contract.
     * @param body
     */
    @HttpCode(200)
    @Post("prepareRequest")
    async prepareRequest(@Body() body: TypeTemplate_RequestNoMic): Promise<EncodedRequestResponse> {
        return this.verifierService.prepareRequest(body);
    }
}
