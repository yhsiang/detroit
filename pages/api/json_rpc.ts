// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next"
import type { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from "lib/session"
import simulator from "lib/ganache"


export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { jsonrpc, id } = req.body
  if (req.session.forkId) {
    const provider = await simulator.get(req.session.forkId)
    const result = await provider?.request(req.body)

    res.status(200).json({
      jsonrpc,
      result,
      id,
    })
  } else {
    res.status(200).json({
      id: 0,
      jsonrpc,
      error: {
        code: -32701,
        message: "please fork first",
      }
    })
  }
}, sessionOptions)
