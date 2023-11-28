import { ticketModel } from "./models/tickets.model.js";

export class TicketManagerMongo {
    constructor(){
        this.model = ticketModel
    }

    async createTicket(ticketBody){
        try {
            const ticket = await this.model.create(ticketBody);
            console.log('createTicket con exito', ticket);
            return ticket
        } catch (error) {
            console.log('Error en manager createTicket', error.message);
            throw new Error('No se pudo crear el ticket ', error.message);
        }
    }

    async getTickets(){
        try {
            const tickets = await this.model.find().lean();
            console.log('getTickets con exito', tickets);
            return tickets 
        } catch (error) {
            console.log('Error en manager getTickets', error.message);
            throw new Error('No se pudo obtener el listado de los tickets ', error.message);
        } 
    }

    async getTicketById(id){
        try {
            const tickets = await this.model.findById(id).lean();
            console.log('getTicketById con exito', tickets);
            return tickets 
        } catch (error) {
            console.log('Error en manager getTicketById', error.message);
            throw new Error('No se pudo obtener el ticket ', error.message);
        }
    }
}