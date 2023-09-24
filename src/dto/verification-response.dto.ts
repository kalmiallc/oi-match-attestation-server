import { AttestationResponse } from "src/external-libs/ts/AttestationResponse";

/**
 * DTO Object returned after attestation request verification.
 * If status is 'VALID' then parameters @param response contains attestation response.
 * Otherwise, @param response is undefined.
 */
export class AttestationResponseDTO<RES> extends AttestationResponse<RES> {};
