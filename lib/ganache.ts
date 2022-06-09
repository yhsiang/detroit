import path from "path"
import fs from "fs/promises"
import Ganache, { EthereumProvider } from "ganache"
import { EthereumProviderOptions } from "@ganache/ethereum-options"
import redis from "./redis"

type Providers = { [forkId: string]: EthereumProvider }

const dbDir = process.env.NODE_ENV === "production"
  ? "/tmp/data"
  : path.join(process.cwd(), "/data")

class Simulator {
  providers: Providers = {}

  async init(seed: string, forkId: string): Promise<EthereumProvider> {
    await this.initDir()
    const options: EthereumProviderOptions = {
      wallet: {
        totalAccounts: 1,
        defaultBalance: 100,
        seed,
      },
      fork: {
        url: process.env.CHAIN_URL
      },
      database: {
        dbPath: path.join(dbDir, forkId),
      },
    }

    return Ganache.provider(options)
  }

  async initDir(): Promise<undefined> {
    try {
      await fs.access(dbDir)
    } catch (err) {
      fs.mkdir(dbDir)
    }
    return
  }

  async create(seed: string, forkId: string): Promise<EthereumProvider> {
    const provider = await this.init(seed, forkId)
    const status = await redis.set(forkId, seed)
    this.providers[forkId] = provider
    return provider
  }

  async get(forkId: string): Promise<EthereumProvider | null> {
    if (this.providers[forkId]) {
      return this.providers[forkId]
    }

    const seed = await redis.get(forkId)
    if (seed) {
      const provider = await this.init(seed, forkId)
      this.providers[forkId] = provider
      return provider
    }

    return null
  }

  async remove(forkId: string): Promise<undefined> {
    await redis.del(forkId)
    delete this.providers[forkId]
    await fs.rm(
      path.join(process.cwd(), "/data", forkId),
      { recursive: true, force: true }
    )
    return
  }
}

let simulator: Simulator

if (!global._simulator) {
  global._simulator = new Simulator()
}


simulator = global._simulator

export default simulator
export { Simulator }