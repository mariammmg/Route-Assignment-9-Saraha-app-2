
import z from "zod"
// function return another function(middleware)
export function validationMiddleware(dto)
{
    return  function(req,res,next)
    {
        // it gives the body to dto and if validation is correct it returns
        // the data (includes body) if not it returns success:false and the error comming from zod
         const {success,data,error}=z.safeParse(dto,req.body)
         if(!success){
            let messagearr=error.issues.map(err =>`${err.path[0]}:${err.message}`)
            throw new Error(messagearr)

         }
         req.body=data;
         //if success go to the next function
         next();
    }
}