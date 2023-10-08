
# DTO
rm -rf src/dto/TypeTemplate.dto.ts
cp ../state-connector-protocol/generated/types/nest-js-dto/TypeTemplate.dto.ts src/dto/

# Type definitions
mkdir -p type-definitions
rm -rf type-definitions/TypeTemplate.json
cp ../state-connector-protocol/generated/configs/abi/TypeTemplate.json type-definitions/

# Examples
mkdir -p src/example-data
rm -rf src/example-data/TypeTemplate.json
cp ../state-connector-protocol/generated/examples/json/TypeTemplate.json src/example-data/

# External libs for type definitions
rm -rf src/external-libs
mkdir -p src/external-libs
cp -r ../state-connector-protocol/libs/ts src/external-libs/