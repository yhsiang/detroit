import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { withIronSessionSsr } from "iron-session/next"
import { sessionOptions } from "lib/session"
import { InferGetServerSidePropsType } from "next"
import { signer } from "lib/ethersProvider"
import { ethers } from 'ethers'

const Home = ({
  forkId,
  address,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [forkIdState, setForkId] = useState(forkId)
  const [addressState, setAddress] = useState(address)
  const [blockNumber, setBlockNumber] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [tx, setTx] = useState({})

  const fork = async () => {
    setDisabled(true)
    const response = await fetch('/api/fork')
    const { forkId, address, blockNumber } = await response.json()
    setForkId(forkId)
    setAddress(addressState)
    setBlockNumber(blockNumber)
    setDisabled(false)
  }

  const unfork = async () => {
    await fetch('/api/unfork')
    setForkId(null)
    setAddress("")
    setBlockNumber(0)
  }

  const send = async () => {
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
          !forkIdState ?
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
          forkIdState ?
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



export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {

  return {
    props: {
      forkId: req.session.forkId || null,
      address: req.session.address || null,
    },
  }
},
  sessionOptions)
export default Home
