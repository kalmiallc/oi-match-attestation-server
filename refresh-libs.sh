
# DTO
rm -rf src/dto/TypeTemplate.dto.ts
cp ../state-connector-protocol/generated/types/nest-js-dto/TypeTemplate.dto.ts src/dto/

# Type definitions
mkdir -p type-definitions
rm -rf type-definitions/TypeTemplate.json
cp ../state-connector-protocol/generated/configs/abi/TypeTemplate.json type-definitions/

# External libs for type definitions
rm -rf src/external-libs
mkdir -p src/external-libs
cp -r ../state-connector-protocol/libs/ts src/external-libs/