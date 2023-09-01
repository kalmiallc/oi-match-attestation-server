import { Module } from '@nestjs/common';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';

@Module({
    controllers: [VerifierController],
    providers: [VerifierService],
})
export class AppModule {}
