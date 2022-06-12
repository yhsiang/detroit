import { Server } from "socket.io"
import simulator from "lib/ganache"
import type { NextApiRequest } from "next"
import type { NextApiResponseServerIO } from "types"
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  const { forkId } = req.query
  if (!forkId) {
    res.status(200).json({
      id: 0,
      jsonrpc: "2.0",
      error: {
        code: -32702,
        message: "please fork first",
      }
    })
  }

  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    const io = new Server(httpServer, {
      path: `/api/socket/${forkId}`
    })

    io.on("connect", (socket) => {
      console.log(`connected: ${forkId}`)
      socket.on("message", async (message) => {
        const obj = JSON.parse(message)
        const provider = await simulator.get(forkId as string)
        const { jsonrpc, id } = obj
        const result = await provider?.request(obj)

        io.emit("message", {
          jsonrpc,
          id,
          result,
        })
      })
    })

    res.socket.server.io = io
  }

  res.end()
}