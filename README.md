
## Olyimpics match result verifier server

<p align="center">
  <a href="https://flare.network/" target="blank"><img src="https://flare.network/wp-content/uploads/Artboard-1-1.svg" width="400" height="300" alt="Flare Logo" /></a>
</p>

This repository contains verifier server for the Olympics match results data.
The results are gained from the Official Olympics page <https://olympics.com/en/paris-2024/schedule>

### Attestation Type Details

The project provides its own attestation type, the `Match result` attestation type. This attestation type defines how data can be verified by the attestation providers. To identify the match, the following parameters must be used:

- date: match date (Unix timestamp without hour, rounded down to the day)
- sport: match sport (enum Sports)
- gender: the gender of the match participants (0 = Men, 1 = Women)
- teams: match teams

This attestation is specific to one event (Olympic games) but can be easily extended to other team sports.

#### List of Sports

- Basketball = 0
- Basketball3x3 = 1
- Badminton = 1
- BeachVolley = 2
- FieldHockey = 3
- Football = 4
- Handball = 5
- TableTennis = 6
- Tennis = 7
- Volleyball = 8
- WaterPolo = 9

### Verifier Server

A verifier server is implemented for the defined `Match result` attestation type. The logic for the verifier server is written in TypeScript and is not included in this repository. The verifier server provides the logic for obtaining data from the WEB2 world.

For this attestation type, the verifier server calls a Official Olympics WEB2 API, which returns the match results. If the data aligns with the expected results, it is considered valid. The verifier server is used by the attestation provider.

## Installation

```bash
yarn
```

## Running the app

```bash
# Use the default env 
cp .env.example .env
# Or configure your by editing the .env file

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

With the above provided `.env` config file the web server with Swagger can be tested at `http://localhost:4500/api`. Use the `Authorize` button on Swagger interface to provide one of the API keys for authentication.

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Adding support for attestation type

To add a new attestation type use the State Connector Utils CLI from [State Connector Protocol](https://gitlab.com/flarenetwork/state-connector-protocol/) repo. The procedure is as follows:

- Clone this repo. Ideally both this and [State Connector Protocol](https://gitlab.com/flarenetwork/state-connector-protocol/) repo should be placed into the same folder.
- This repo is configured for the example attestation type `TypeTemplate`. However, you can use any attestation type defined in the [State Connector Protocol](https://gitlab.com/flarenetwork/state-connector-protocol/) repo and initialize this repo with all relevant code related to a specific attestation type. For example, to provide the support for `Payment` attestation type, use the following command from the root of the [State Connector Protocol](https://gitlab.com/flarenetwork/state-connector-protocol/)

```
yarn generate verifier-template-refresh -t Payment
```

Consult the documentation for use of the [State Connector Utils](https://gitlab.com/flarenetwork/state-connector-protocol/) CLI for details.

## License

This template is under [MIT licensed](LICENSE).
