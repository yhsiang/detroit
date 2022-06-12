import React, { useState, useEffect, useCallback } from "react"
import { io } from "socket.io-client"
import { Socket } from "socket.io-client"
import styles from "../styles/Home.module.css"

const SocketDemo: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false)
  const [forkId, setForkId] = useState("")
  const [msg, setMsg] = useState({})
  const [socket, setSocket] = useState({})

  type SendFn = (message: string) => void

  const send = useCallback<SendFn>((message: string): void => {
    (socket as Socket).emit("message", message)
  }, [socket])

  useEffect((): any => {
    const localForkId = localStorage.getItem('forkId')
    if (localForkId) {
      setForkId(localForkId as string)
      const socket = io("http://localhost:3000", {
        path: `/api/socket/${localForkId}`,
      })

      socket.on("connect", () => {
        console.log("SOCKET CONNECTED!", socket.id)
        setConnected(true)
        setSocket(socket)
      })

      socket.on("message", (message: any) => {
        setMsg(message)
      })
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Websocket Status: {`${connected}`}</div>
      </div>
      {
        forkId ?
          <>
            <button
              className={styles.button}
              onClick={() => {
                const data = { method: "eth_blockNumber" }
                send(JSON.stringify(data))
              }}>Send</button>
            <div className={styles.content}>
              <pre>{JSON.stringify(msg, null, 2)}</pre>
            </div>
          </> : null
      }
    </div>
  )
}

export default SocketDemo
