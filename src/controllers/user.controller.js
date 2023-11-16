export class usersController{
    static login = (req,res)=>{
        console.log(req.session);
        const loginForm=req.body;
        req.session.email=loginForm.email;
        console.log(req.session);
        res.send('peticion login');
    }
    static profile= (req,res)=>{
        console.log(req.session)
        if(req.session.email){
           res.send(`Bienvenido ${req.session.email}`)  
        } else{
            res.send('necesitas iniciar sesion')
        }
    }
    static logout=(req,res)=>{
        req.session.destroy((err)=>{
            if(err) return res.send('no se pudo cerrar la sesion');
            res.send('sesion finalizada');
        })
    }
        
}