import { Op } from "sequelize";
import db from "../../db/db";
import { User } from "../../db/models";
import { TokenData_T } from "../../shared/types";
import { accessUpReq_T, changeRoleReq_T, getUsersReq_T } from "./types";
import jwt from 'jsonwebtoken'

class AdminController {
    async getUsers(req: getUsersReq_T, res: any) {
        try {
            let { offset, limit, roles = ['USER', 'MANAGER'], searchValue } = req.body
            let users
            let usersAmount
            if(searchValue !== '') {
                let sql_response = await User.findAll({where: {
                    role: roles,
                    login: {[Op.substring]: [searchValue]}
                }, offset, limit})
                users = sql_response.map(user => {
                    return user.dataValues
                })
                usersAmount = await User.count({
                    where: {
                        role: roles,
                        login: {[Op.substring]: [searchValue]},
                    },
                })
            } else {
                let sql_response = await User.findAll({where: {
                    role: roles
                }, offset, limit})
                users = sql_response.map(user => {
                    return user.dataValues
                })
                console.log(users)
                usersAmount = await User.count({
                    where: {
                        role: roles
                    }
                })
            }
            
            res.json({
                users,
                usersAmount
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