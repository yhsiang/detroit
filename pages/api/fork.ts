import { v4 as uuid } from "uuid"
import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "lib/session"
import simulator from "lib/ganache"



export default withIronSessionApiRoute(async (req, res) => {
  const forkId = uuid()
  req.session.forkId = forkId
  await req.session.save()

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
    address: accounts[0],
    blockNumber,
  })

}, sessionOptions)