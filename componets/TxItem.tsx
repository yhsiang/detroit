import { Box, Flex, Text, Link } from "@chakra-ui/react"

const TxItem = () => {
  return (
    <Flex
      padding={2}
      marginX={2}
      borderTop={0}
      borderLeft={0}
      borderRight={0}
      borderWidth={2}
      borderColor="black"
      height={16}
      flexDirection="row"
    >
      <Text
        padding={2}
        marginRight={2}
        borderWidth={1}
        borderColor="black"
        alignSelf="center"
      > TX </Text>
      <Box alignSelf="center" width={32} >
        <Text>0x54c5de...</Text>
        < Text > 1 min ago </Text>
      </Box>
      <Box alignSelf="center" width={64} >
        <Flex flexDirection="row" >
          <Text width={20}> From </Text>
          <Text > 0xdc33052...</Text>
        </Flex>
        <Flex flexDirection="row" >
          <Text width={20}> To </Text>
          <Text > 0xdc33052...</Text>
        </Flex>
      </Box>
      <Text
        marginLeft="auto"
        alignSelf="center"
        borderWidth={1}
        borderColor="black"
        paddingX={2}
        paddingY={1}
      > 0.5 Eth </Text>
    </Flex>
  )
}

export default TxItem