import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApiKeyStrategy } from "./auth/apikey.strategy";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import configuration from "./config/configuration";
import { BTCTypeTemplateVerifierController } from "./controller/btc/btc-type-template-verifier.controller";
import { WEBMatchResultVerifierController } from "./controller/web/web-match-result-verifier.controller";
import { WEBPaymentVerifierController } from "./controller/web/web-payment-verifier.controller";
import { BTCTypeTemplateVerifierService } from "./service/btc/btc-type-template-verifier.service";
import { WEBMatchResultVerifierService } from "./service/web/web-match-result-verifier.service";
import { WEBPaymentVerifierService } from "./service/web/web-payment-verifier.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        AuthModule,
    ],
    controllers: [BTCTypeTemplateVerifierController, WEBPaymentVerifierController, WEBMatchResultVerifierController],
    providers: [ApiKeyStrategy, AuthService, BTCTypeTemplateVerifierService, WEBPaymentVerifierService, WEBMatchResultVerifierService],
})
export class AppModule {}
