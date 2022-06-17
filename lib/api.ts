import { JsonRpcRequest } from "types"


export default class Api {
    path: string = "/api"
    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    }
    id: number = 1

    constructor(forkId: string) {
        this.path = `${this.path}/${forkId}`
    }

    assemble(data: object): object {
        return {
            ...this.options,
            body: JSON.stringify(data)
        }
    }

    async getData() {
        let data: JsonRpcRequest = {
            id: this.id,
            jsonrpc: "2.0",
            method: "eth_blockNumber",
            params: [],
        }
        this.id += 1
        let response = await fetch(this.path, this.assemble(data))
        const { result } = await response.json()
        data = {
            id: this.id,
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: [
                result as string,
                true,
            ],
        }
        response = await fetch(this.path, this.assemble(data))
        const { result: result2 } = await response.json()
        console.log(result2)
        // return parseInt(result, 16)
    }

}
