import { usersDao } from "../dao/index.js"

export class UsersService{
    static getUserByEmail=(email)=>{
        return usersDao.getUserByEmail(email)
    }
} 