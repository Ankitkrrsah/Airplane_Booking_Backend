export class ApiError extends Error{
    constructor(message , statusCode , data = {} , error = {}){
        super(message) ; 
        this.statusCode = statusCode ; 
        this.data = data ; 
        this.error = error ; 
    }
};


