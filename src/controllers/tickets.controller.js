import { TicketService } from "../service/ticket.service.js"
import { logger } from "../helpers/loggers.js";

export class TicketController {
    
    static createTicket = async (req, res) => {
        try {
            console.log('createTicket controller');
            const ticketBody = req.body;
            const newTicket = await TicketService.createTicket(ticketBody);
            res.json({ message: "Ticket creado", data: newTicket });
            
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    }
    static getTicket = async (req, res) => {
        try {
            console.log('getTicket controller');
            const ticket = await TicketService.getTicket();
            res.json({ message: "Listado de tickets", data: ticket });
            
        } catch (error) {
            // console.log('error getTicket controller', error.message);
            logger.error('error getTicket controller', error.message);
            res.json({ status: "error", message: error.message });
        }
    }
    static getTicketById = async (req, res) => {
        try {
            console.log('getTicketById controller');
            const ticketId = req.params.id;
            const ticket = await TicketService.getTicketById(ticketId);
            res.json({ message: "Listado de tickets", data: ticket });
            
        } catch (error) {
            logger.error('error getTicketById controller', error.message);
            res.json({ status: "error", message: error.message });
        }
    }
}