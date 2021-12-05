FROM node:14

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn

# Generate Layer

COPY ./package.json ./layers/modules/package.json
COPY ./yarn.lock ./layers/modules/yarn.lock

RUN cd ./layers/modules && yarn install --production && cd ..

# Copy files

ADD ./src ./src
ADD ./resources.ts ./resources.ts
ADD ./serverless.ts ./serverless.ts
ADD ./tsconfig.json ./tsconfig.json
ADD ./tsconfig.paths.json ./tsconfig.paths.json

CMD yarn dev
