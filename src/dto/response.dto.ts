/////////////////
// DO NOT EDIT //
/////////////////

import { RequestBody } from './request-body.dto';
import { ResponseBody } from './response-body.dto';

/**
 * Attestation response general definition
 */
export class AttResponse {
    attestationType: string;
    sourceId: number;
    votingRound: number;
    messageIntegrityCode: string;
    requestBody: RequestBody;
    responseBody: ResponseBody;
}
