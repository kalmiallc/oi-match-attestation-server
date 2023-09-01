/////////////////
// DO NOT EDIT //
/////////////////

import { RequestBody } from './request-body.dto';

/**
 * Attestation request general definition
 */
export class AttRequest {
    attestationType: string;
    sourceId: number;
    messageIntegrityCode: string;
    requestBody: RequestBody;
}
