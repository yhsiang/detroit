import { v4 as uuid } from "uuid"
import simulator from "lib/ganache"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const forkId = uuid()
  const provider = await simulator.create("2", forkId)
  const accounts = await provider.request({
    method: "eth_accounts",
    params: [],
  })

  const blockNumber = await provider.request({
    method: "eth_blockNumber",
    params: [],
  })

  res.status(200).json({
    forkId,
    address: accounts[0],
    blockNumber,
  })
}