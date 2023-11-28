import { ticketDao } from "../dao/index.js";


export class TicketService {

    static createTicket(ticketBody){
        return ticketDao.createTicket(ticketBody)
    }
    
    static getTickets(){
        return ticketDao.getTickets()
    }

    static getTicketById(ticketId){
        return ticketDao.getTicketById(ticketId)
    }
}