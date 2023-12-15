import { ticketModel } from "./models/tickets.model.js";
import { logger } from "../../helpers/loggers.js";

export class TicketManagerMongo {
    constructor() {
        this.model = ticketModel;
    }

    async createTicket(ticketBody) {
        try {
            const ticket = await this.model.create(ticketBody);
            logger.info('createTicket con éxito', ticket);
            return ticket;
        } catch (error) {
            logger.error('Error en manager createTicket', error.message);
            throw new Error('No se pudo crear el ticket ', error.message);
        }
    }

    async getTickets() {
        try {
            const tickets = await this.model.find().lean();
            logger.info('getTickets con éxito', tickets);
            return tickets;
        } catch (error) {
            logger.error('Error en manager getTickets', error.message);
            throw new Error('No se pudo obtener el listado de los tickets ', error.message);
        }
    }

    async getTicketById(id) {
        try {
            const tickets = await this.model.findById(id).lean();
            logger.info('getTicketById con éxito', tickets);
            return tickets;
        } catch (error) {
            logger.error('Error en manager getTicketById', error.message);
            throw new Error('No se pudo obtener el ticket ', error.message);
        }
    }
}
