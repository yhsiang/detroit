import { ethers } from "ethers"

const url = `${window.location.host}/api/json_rpc`

const provider = new ethers.providers.JsonRpcProvider(url)

const signer = provider.getSigner()

export { provider, signer }