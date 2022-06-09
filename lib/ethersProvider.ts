import { ethers } from "ethers"

const url = "http://localhost:3000/api/json_rpc"

const provider = new ethers.providers.JsonRpcProvider(url)

const signer = provider.getSigner()

export { provider, signer }