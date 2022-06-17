import { Simulator } from "../libs/ganache"
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

declare global {
  var _simulator: Simulator
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export type Provider = {
  provider: EthereumProvider,
  wss: WebSocketServer
}

export type JsonRpcRequest = {
  id: number
  jsonrpc: string
  method: string
  params: any[]
}
