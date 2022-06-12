import simulator from "lib/ganache"
import { NextApiRequest, NextApiResponse } from "next"

type Response = {
  message: string
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { forkId } = req.body
  if (forkId) {
    await simulator.remove(forkId as string)
    res.json({ message: "success" })
  } else {
    res.json({ message: "forkId is empty" })
  }
}