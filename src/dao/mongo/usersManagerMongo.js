import { usersModel } from "./models/users.model.js";
import { CreateUserDto } from "../dto/createUser.dto.js";
import { logger } from "../../helpers/loggers.js";

export class usersManagerMongo {
    constructor() {
        this.model = usersModel;
    }

    async createUser(userInfo) {
        try {
            const result = await this.model.create(userInfo);
            return result;
        } catch (error) {
            logger.error('createUser: ', error.message);
            throw new Error('Se produjo un error creando el usuario');
        }
    }

    async getUserById(userId) {
        try {
            const result = await this.model.findById(userId).lean();
            return result;
        } catch (error) {
            logger.error('getUserById: ', error.message);
            throw new Error('Se produjo un error obteniendo el usuario');
        }
    }

    async getUserByEmail(userEmail) {
        try {
            const result = await this.model.findOne({ email: userEmail });
            return result;
        } catch (error) {
            logger.error('getUserByEmail: ', error.message);
            throw new Error('Se produjo un error obteniendo el usuario');
        }
    }
}
