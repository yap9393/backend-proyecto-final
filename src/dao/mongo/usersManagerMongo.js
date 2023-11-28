import { usersModel } from "./models/users.model.js";
import { CreateUserDto } from "../dto/createUser.dto.js";

export class usersManagerMongo {
    constructor() {
        this.model = usersModel;
    };
    async createUser(userInfo) {
        try {
            const result = await this.model.create(userInfo);
            return result;
        } catch (error) {
            console.log("createUser: ", error.message);
            throw new Error("Se produjo un error creando el usuario");
        }
    };
    // async createUsers(userInfo) {
    //     try {
    //         const newUserDto = new CreateUserDto(userInfo);
    //         console.log('Usuario Dto', newUserDto);
    //         const newUser = await this.model.create(newUserDto); 
    //           //mensaje interno
    //           console.log('createUsers con exito');    
    //         return newUser

    //     } catch (error) {
    //         console.log('Error en manager createUsers', error.message);
    //         throw new Error('No se pudo crear el usuario', error.message);
    //     }
        

    // }
    async getUserById(userId) {
        try {
            const result = await this.model.findById(userId).lean();
            return result;
        } catch (error) {
            console.log("getUserById: ", error.message);
            throw new Error("Se produjo un error obteniendo el usuario");
        }
    };

    async getUserByEmail(userEmail) {
        try {
            const result = await this.model.findOne({ email: userEmail });
            return result;
        } catch (error) {
            console.log("getUserByEmail: ", error.message);
            throw new Error("Se produjo un error obteniendo el usuario");
        }
    };
}