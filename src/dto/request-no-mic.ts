/////////////////
// DO NOT EDIT //
/////////////////

import { OmitType } from '@nestjs/mapped-types';
import { AttRequest } from './request.dto';

/**
 * Same as request body but without the mic, makes working with apis more user friendly
 */
export class AttRequestNoMic extends OmitType(AttRequest, ['messageIntegrityCode'] as const) {}
