import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApiKeyStrategy } from "./auth/apikey.strategy";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import configuration from "./config/configuration";
import { TypeTemplateVerifierService } from "./service/type-template-verifier.service";
import { TypeTemplateVerifierController } from "./controller/type-template-verifier.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        AuthModule,
    ],
    controllers: [TypeTemplateVerifierController],
    providers: [ApiKeyStrategy, AuthService, TypeTemplateVerifierService],
})
export class AppModule {}
