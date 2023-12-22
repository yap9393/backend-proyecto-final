import { usersDao } from "../dao/index.js";

export class UserSessionService{
    static createUser = (userInfo)=> {
     return usersDao.createUser();
    };
    static getUserById = (userId) =>{
       return usersDao.getUserById(userId)
    };

    static getUserByEmail = (userEmail)=> {
      return usersDao.getUserByEmail(userEmail)
    };

}