import { v4 as uuid } from "uuid"
import { NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "lib/session"
import simulator from "lib/ganache"

type Response = {
    message: string
}


export default withIronSessionApiRoute(
    async (req, res: NextApiResponse<Response>) => {
        if (req.session.forkId) {
            await simulator.remove(req.session.forkId as string)
            req.session.destroy()
        }
        res.json({ message: "success" })
    },
    sessionOptions,
)