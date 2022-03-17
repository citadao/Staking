# Scripts for Staking Rewards

Builds script run by an OpenZeppelin Autotask to invoke a Relayer.

## Build

Install dependencies:

```
yarn
```

Build and bundle:

```
yarn build
```

The above defaults to using the rinkeby config. Build config is stored in the `.env.mainnet` and `.env.rinkeby` files. You can select which file to use by specifying the NETWORK env variable on build:

To build for rinkeby:

```
NETWORK=rinkeby yarn build
```

To build for mainnet:

```
NETWORK=mainnet yarn build
```

The output of the file will be in `dist/index.js`. This is what you'll use in the autotask.

## Running Locally

You can run the scripts locally, instead of in an Autotask, via a Defender Relayer. Create a Defender Relayer on the network you are targeting, write down the API key and secret, and create a `.env.secrets` file in this folder with the following content:

```
API_KEY=yourapikey
API_SECRET=yourapisecret
```

Then run `yarn start`, which will run the built js code using `node`, and connecting to your Defender Relayer via the HTTP API.

Alternatively, just include the vars in your command line:

```
API_KEY=yourapikey API_SECRET=yourapisecret yarn start
```
