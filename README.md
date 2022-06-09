# Detroit

Detroit is an Ethereum simulation provider. It's based on [Ganache](https://trufflesuite.com/ganache/).

Project name is inspired by [Detroit: Become Human](https://en.wikipedia.org/wiki/Detroit:_Become_Human).

## Installation

* install redis

* prepare an archive node of Ethereum

* install dependencies

```bash
pnpm install
```

## Environment Variables

```shell
# Provide one url of archive node.
# Recommend to apply alchemyapi (https://www.alchemy.com/).
# ex: https://eth-mainnet.alchemyapi.io/v2/<YOUR_API_KEY>
CHAIN_URL=""
# Recommend to apply Redis Enterprise Cloud (https://redis.com/redis-enterprise-cloud/overview/).
REDIS_HOST=""
REDIS_PORT=""
REDIS_PASSWORD=""
REDIS_USERNAME=""
# 32-length password for session
SECRET_COOKIE_PASSWORD=""
```

## Development

First, run the development server:

```bash
pnpm dev
```