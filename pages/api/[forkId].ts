import { ethers } from "ethers"
import simulator from "lib/ganache"
import type { NextApiRequest, NextApiResponse } from 'next'

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
    res: NextApiResponse<any>
) {
    const { forkId } = req.query
    const { jsonrpc, id } = req.body

    debug(req.body)
    if (forkId && req.body) {
        const provider = await simulator.get(forkId as string)
        const result = await provider?.request(req.body)

        res.status(200).json({
            jsonrpc,
            result,
            id,
        })
    }

    if (!req.body) {
        res.status(200).json({
            id: 0,
            jsonrpc,
            error: {
                code: -32701,
                message: "not supported",
            }
        })
    }

    if (!forkId) {
        res.status(200).json({
            id: 0,
            jsonrpc,
            error: {
                code: -32701,
                message: "please fork first",
            }
        })
    }
}
