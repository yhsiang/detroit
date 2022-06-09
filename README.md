# Detroit

Detroit is an Ethereum simulation provider. It's based on [Ganache](https://trufflesuite.com/ganache/).

Project name is inspired by [Detroit: Become Human](https://en.wikipedia.org/wiki/Detroit:_Become_Human).

## Installation

* install redis

* prepare an archive node of Ethereum

* install dependencies

```bash
npm install
# or
pnpm install
```

## Environment Variables

```shell
# archive node url
CHAIN_URL=""
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
npm run dev
# or
pnpm dev
```