/////////////////
// DO NOT EDIT //
/////////////////

/**
 * This is a general object definition independent of the attestation type this verifier is implementing
 */
export class EncodedRequestBody {
    /**
     * Abi encoded request object see this for more info: https://gitlab.com/flarenetwork/state-connector-protocol/-/blob/main/attestation-objects/request-encoding-decoding.md
     */
    abiEncodedRequest: string;
}
