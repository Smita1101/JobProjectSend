// app.use((err,req,res,next)=>{
//     console.log(err);
//     res.status(500).json({
//         msg:'something went wrong'
//     });
// });



import { StatusCodes } from "http-status-codes";

const errorHandleMiddleware =(err,req,res,next) =>{
    console.log(err);
    const statuscode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || 'Something went wrong, try again later';
    res.status(statusCode).json({msg});
};
export default errorHandleMiddleware;