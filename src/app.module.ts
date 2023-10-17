import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApiKeyStrategy } from "./auth/apikey.strategy";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import configuration from "./config/configuration";
import { BTCTypeTemplateVerifierController } from "./controller/btc/btc-type-template-verifier.controller";
import { BTCTypeTemplateVerifierService } from "./service/btc/btc-type-template-verifier.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        AuthModule,
    ],
    controllers: [BTCTypeTemplateVerifierController],
    providers: [ApiKeyStrategy, AuthService, BTCTypeTemplateVerifierService],
})
export class AppModule {}
