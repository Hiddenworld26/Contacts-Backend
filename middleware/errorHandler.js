const { constants } = require("../constants");

const errorHandler = (err,req,res,next)=>
{
    const statusCode=res.statusCode?res.statusCode:500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({Title:"Validation Error",
            message:err.message,
            stackTrace:err.stack});
            break;
            case constants.NOT_FOUND:
                res.json({Title:"Not Found",
                message:err.message,
                stackTrace:err.stack});
                break;
                case constants.UNAUTHORIZED:
                res.json({Title:"Unauthorized Error",
                message:err.message,
                stackTrace:err.stack});
                break;
                case constants.FORBIDDEN:
                res.json({Title:"Forbidden Error",
                message:err.message,
                stackTrace:err.stack});
                break;
                case constants.SERVER_ERROR:
                res.json({Title:"Server not found error",
                message:err.message,
                stackTrace:err.stack});
                break;
    
        default:
            console.log("No error,all good!")
            break;
    }
    // res.json({Title:"Not Found",message:err.message,stackTrace:err.stack});
    //res.json({Title:"Validation Error",message:err.message,stackTrace:err.stack});
};

module.exports=errorHandler;