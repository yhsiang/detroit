import { useEffect, useState } from "react"
import { ethers } from "ethers"
import styles from "../styles/Home.module.css"

const Home = () => {
  const [forkId, setForkId] = useState("")
  const [address, setAddress] = useState("")
  const [blockNumber, setBlockNumber] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [tx, setTx] = useState({})

  useEffect(() => {
    const forkId = localStorage.getItem('forkId')
    if (forkId) {
      setForkId(forkId as string)
    }
  }, [forkId])

  const fork = async () => {
    setDisabled(true)
    const response = await fetch("/api/fork")
    const { forkId, address, blockNumber } = await response.json()
    localStorage.setItem('forkId', forkId)
    setForkId(forkId)
    setAddress(address)
    setBlockNumber(blockNumber)
    setDisabled(false)
  }

  const unfork = async () => {
    const data = { forkId }
    await fetch("/api/unfork", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })

    localStorage.removeItem('forkId')

    setForkId("")
    setAddress("")
    setBlockNumber(0)
  }

  const send = async () => {
    const provider = new ethers.providers.JsonRpcProvider(`/api/${forkId}`)
    const signer = provider.getSigner()
    const tx = await signer.sendTransaction({
      to: "0xf19654B1B9b8f4cfdf28ccB8e9049CA859baA7D9",
      value: ethers.utils.parseEther("1.0")
    })
    setTx(tx)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Simple demo for Detroit Simulation Provider</div>
        {
          !forkId ?
            <button
              className={styles.button}
              onClick={fork}
              disabled={disabled}
            >Fork</button>
            : <button
              className={styles.button}
              onClick={unfork}>Unfork</button>
        }
      </div>
      <div className={styles.content}>
        {
          forkId ?
            <div className={styles.demo}>
              <div style={{ marginBottom: "20px" }}>Example: send a transaction</div>
              <button
                className={styles.button}
                onClick={send}
              >Send a transaction</button>
              <div style={{ marginTop: "20px" }}>TX Result</div>
              <div style={{ marginTop: "20px" }}>
                {tx ? <pre>{JSON.stringify(tx, null, 2)}</pre> : null}
              </div>
            </div>
            : <div>Please fork first</div>
        }
      </div>

    </div>
  )
}

export default Home