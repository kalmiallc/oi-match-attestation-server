
# Olympics Prediction Showcase - Contract result verifier server

<p align="center">
  <a href="https://flare.network/" target="blank"><img src="https://flare.network/wp-content/uploads/Artboard-1-1.svg" width="400" height="300" alt="Flare Logo" /></a>
</p>

This repository contains verifier server for the Olympics match results data.
The results are gained from the Official Olympics page <https://olympics.com/en/paris-2024/schedule>

The complete showcase consists of four repositories:

- [Prediction smart contract](https://github.com/kalmiallc/oi-prediction-smartcontract)
- [Front-end application](https://github.com/kalmiallc/oi-prediction-webapp)
- [Backend application](https://github.com/kalmiallc/oi-prediction-backend) which calls the verification provider API for verification
- [Verification server](https://github.com/kalmiallc/oi-match-attestation-server)

The complete guide can be found [here](https://github.com/kalmiallc/oi-flare-prediction-instructions)

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

## License

This project is [MIT licensed](LICENSE.md).
