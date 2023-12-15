import { chatModel } from "./models/chat.model.js";
import { logger } from "../../helpers/loggers.js";

export class ChatManagerMongo {
    constructor() {
        this.model = chatModel;
    }

    async getMessages() {
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            logger.error('getMessages', error.message);
            throw new Error('No se pudo obtener los mensajes.');
        }
    }

    async addMessage(messageInfo) {
        try {
            const result = await this.model.create(messageInfo);
            return result;
        } catch (error) {
            logger.error('addMessage', error.message);
            throw new Error('No se pudo agregar el mensaje.');
        }
    }
}
