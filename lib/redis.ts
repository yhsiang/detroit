import Redis from 'ioredis'

const port = Number(process.env.REDIS_PORT || 6379)
const host = process.env.REDIS_HOST || 'localhost'
const password = process.env.REDIS_PASSWORD
const username = process.env.REDIS_USERNAME

const redis = new Redis({
    port,
    host,
    password,
    username,
})

export default redis