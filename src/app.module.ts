import { Module } from '@nestjs/common';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ApiKeyStrategy } from './auth/apikey.strategy';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        AuthModule,
    ],
    controllers: [VerifierController],
    providers: [VerifierService, ApiKeyStrategy, AuthService],
})
export class AppModule {}
