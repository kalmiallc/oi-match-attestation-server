FROM node:18-bullseye
WORKDIR /app/verifier
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "yarn.lock", "./"]
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    yarn install --frozen-lockfile

COPY . .
RUN yarn build
EXPOSE 3000

RUN mkdir -p /app/verifier/logs && chown -R node /app/verifier/logs
USER node

ENV PATH="${PATH}:/app/verifier/docker/scripts"
ENV NODE_ENV=production

ENTRYPOINT [ "/app/verifier/docker/scripts/entrypoint.sh" ]
CMD [ "yarn", "start:prod" ]

