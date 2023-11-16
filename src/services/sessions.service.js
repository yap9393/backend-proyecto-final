import { usersService } from "../dao/index.js";

export class UserSessionService{
    static createUser = (userInfo)=> {
     return usersService.createUser();
    };
    static getUserById = (userId) =>{
       return usersService.getUserById(userId)
    };

    static getUserByEmail = (userEmail)=> {
      return usersService.getUserByEmail(userEmail)
    };

}