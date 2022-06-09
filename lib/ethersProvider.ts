import { ethers } from "ethers"

const provider = new ethers.providers.JsonRpcProvider("/api/json_rpc")

const signer = provider.getSigner()

export { provider, signer }