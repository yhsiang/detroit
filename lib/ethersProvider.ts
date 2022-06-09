import { ethers } from "ethers"

let host = "http://localhost:3000"
if (typeof window !== "undefined") {
    host = window.location.host
}
const url = `${host}/api/json_rpc`

const provider = new ethers.providers.JsonRpcProvider(url)

const signer = provider.getSigner()

export { provider, signer }