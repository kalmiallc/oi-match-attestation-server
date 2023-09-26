/**
 *
 */
export interface ARBase {
    attestationType: string;
    sourceId: string;
    messageIntegrityCode?: string;
    requestBody: any;
}
