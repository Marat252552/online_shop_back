import jwt from 'jsonwebtoken'
import { TokenData_T } from '../../shared/types'
import { verificationReq_T } from '../../shared/types' 
import { Forbidden, Unauthorized } from '../Response/response'

class AdminMiddleWare {
    async verification(req: verificationReq_T, res: any, next: any) {
        try {
            let AccessToken = req.headers.authorization.split(' ')[1]
            let isTokenValid = jwt.verify(AccessToken, process.env.JWT_ACCESS_KEY!)
            if(!isTokenValid) {
                return Unauthorized(res)
            }
            let decodedToken: TokenData_T = jwt.decode(AccessToken) as any
            if(decodedToken.role !== 'ADMIN') {
                return Forbidden(res)
            }
            next()
        } catch(e) {
            console.log(e)
            res.sendStatus(401).end()
        }
    }
}

export default new AdminMiddleWare()
