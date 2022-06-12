import { ethers } from "ethers"
import simulator from "lib/ganache"
import type { NextApiRequest, NextApiResponse } from "next"

type JsonRpcRequest = {
  id: number
  jsonrpc: string
  method: string
  params: Array<string>
}

const debug = (body: JsonRpcRequest) => {
  const { method } = body
  switch (method) {
    case "eth_sendRawTransaction":
      console.log(ethers.utils.parseTransaction(body.params[0]))
      break
    default:
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { forkId } = req.query
  const { jsonrpc, id } = req.body
  if (!forkId) {
    res.status(200).json({
      id: 0,
      jsonrpc,
      error: {
        code: -32702,
        message: "please fork first",
      }
    })
  }

  const provider = await simulator.get(forkId as string)

  if (req.body) {
    // debug(req.body)
    const result = await provider?.request(req.body)
    return res.status(200).json({
      jsonrpc,
      result,
      id,
    })
  }

  return res.status(200).json({
    id: 0,
    jsonrpc,
    error: {
      code: -32701,
      message: "not supported",
    }
  })

}