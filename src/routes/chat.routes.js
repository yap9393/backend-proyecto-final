// import express from "express";
// import { chatService } from "../dao/index.js";

// const chatRouter = express.Router();

// // Ruta para agregar mensajes
// chatRouter.post('/addMessage', async (req, res) => {
//     try {
//         const messageInfo = req.body;
//         const result = await chatService.addMessage(messageInfo);
//         res.status(201).json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al agregar el mensaje.' });
//     }
// });


// export default chatRouter;
