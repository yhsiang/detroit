import { useEffect, useState } from "react"
// import { ethers } from "ethers"
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Button,
} from "@chakra-ui/react"
import { TxItem } from "componets"
import Api from "lib/api"

const Home = () => {
  const [forkId, setForkId] = useState("")
  const [txs, setTxs] = useState([])

  useEffect(() => {
    if (typeof window !== undefined) {
      const params = new URLSearchParams(window.location.search)
      const forkId = params.get("forkId") as string
      if (!forkId) return

      setForkId(forkId)
      const api = new Api(forkId)
      api.getData()
    }
  }, [])

  const fork = async () => {
    const response = await fetch("/api/fork")
    const { forkId } = await response.json()
    setForkId(forkId)
    location.replace("/?forkId=" + forkId)
  }

  const content = !forkId ? (
    <Box padding={2}>
      <Text>Detroit is an Ethereum Simulation Provider.</Text>
      <Text>Please fork to have a copy state of Ethereum blockchains.</Text>
      <Button marginTop={2} onClick={fork}>Fork</Button>
    </Box>
  ) : (
    <>
      <Heading
        size="lg"
        borderColor="black"
        paddingY={3}
        borderTop={0}
        borderLeft={0}
        borderRight={0}
        borderWidth={1}
        paddingX={2}
      >Latest Transactions</Heading>
      <Box flex={1}>
        <TxItem />
      </Box>
    </>
  )

  return (
    <Flex
      display="flex"
      flexDirection="column"
      position="absolute"
      width="100%"
      height="100vh"
    >
      {/* header */}
      <Box height={16}>
        <Flex flexDirection="row" flex={1}>
          <Box marginX={4} marginY={4} >
            <Heading size="xl">Detroitscan</Heading>
          </Box>
          <Text alignSelf="center">{forkId}</Text>
          <Box marginLeft="auto" alignSelf="center" marginRight={4}>
            <Link href="https://github.com/yhsiang/detroit">Github</Link>
          </Box>
        </Flex>
      </Box>
      {/* content */}
      <Flex
        display="flex"
        flexDirection="column"
        height="100%"
        marginX={4}
        marginY={4}
        borderColor="black"
        borderWidth={1}
      >
        {content}
      </Flex >
      {/* footer */}
      < Box height={16} >
        <Box marginX={4} marginY={4} >
          <Text>Detroitscan @ 2022</Text>
        </Box>
      </Box >
    </Flex >
  )
}

export default Home