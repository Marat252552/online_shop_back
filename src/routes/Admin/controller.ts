import db from "../../db/db";
import { User } from "../../db/models";
import { TokenData_T } from "../../shared/types";
import { accessUpReq_T, changeRoleReq_T, getUsersReq_T } from "./types";
import jwt from 'jsonwebtoken'


class AdminController {
    async getUsers(req: getUsersReq_T, res: any) {
        try {
            let { offset, limit, role } = req.query
            let users
            if (role = 'ANY') {
                users = await User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                    limit,
                    offset
                })
            } else {
                users = await User.findAll({
                    where: { role },
                    attributes: {
                        exclude: ['password']
                    },
                    limit,
                    offset
                })
            }
            users = users.filter(user => user.role !== 'ADMIN')
            res.json({
                users
            }).status(200).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
    async changeRole(req: accessUpReq_T, res: any) {
        try {
            let {id, newRole} = req.body
            if(!id || !newRole) {
                return res.sendStatus(400).end()
            }
            await User.update(
                { role: req.body.newRole },
                { where: { id: req.body.id } }
            )
            let user = await User.findOne({where: {id}})
            res.json({user}).status(200).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
}

export default new AdminController()