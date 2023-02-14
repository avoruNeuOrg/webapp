
const errorObj = (msg)=>{
    return {
        message: msg
    }
}

const genericErrObj = (err) =>{
    var errors = []
    console.log(err);
    if(err && err.errors){
        err.errors.forEach(e=>{
            console.log(e);
            errors.push(e.message);
        })
    }
    return {isSuccess:false,errors:errors};
}


const validateGet = (data)=>{
    var errorMessages = []

    var inputParams = ['first_name','last_name','password','username'];
    var paramSet = new Set(inputParams);
    if(Object.keys(data).length>0){
        errorMessages.push('Payload seems to different please send correct payload');
    }
    else{
        Object.keys(data).forEach(e=>{
            if(!paramSet.has(e))
            {
                errorMessages.push('Payload seems to different please send correct payload');
            }
        })
    }
    return errorMessages;
}




const validateUpdate = (data)=>{
    var errorMessages = []

    var inputParams = ['first_name','last_name','password','username'];
    var paramSet = new Set(inputParams);
    if(Object.keys(data).length!=inputParams.length){
        errorMessages.push('Payload seems to different please send correct payload');
    }
    else{
        Object.keys(data).forEach(e=>{
            if(!paramSet.has(e))
            {
                errorMessages.push('Payload seems to different please send correct payload');
            }
        })
    }
    return errorMessages;
}

const createValidation = (data)=>{
    var errorMessages = []
    var inputParams = ['username','password','last_name','first_name'];
    var paramSet = new Set(inputParams);
    if(Object.keys(data).length!=inputParams.length){
        errorMessages.push('Create Payload seems to different please send correct payload');
    }
    else{
        Object.keys(data).forEach(e=>{
            if(!paramSet.has(e))
            {
                errorMessages.push('Create Payload seems to different please send correct payload');
            }
        })
    }
    if(data && data.password){
        // var regExPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        // if(!regExPassword.test(data.password)){
        //     errorMessages.push(MESSAGE.INVALID_PASSWORD);
        // }   
    }
    else{
        errorMessages.push('Password is required');
    }
    return errorMessages;
}



const createProductValidation = (data)=>{
    var errorMessages = []
    var inputParams = ['name', 'description', 'sku', 'manufacturer','quantity'];
    var paramSet = new Set(inputParams);
    if(Object.keys(data).length!=inputParams.length){
        errorMessages.push('Create Payload seems to different please send correct payload');
    }
    else{
        Object.keys(data).forEach(e=>{
            if(!paramSet.has(e))
            {
                errorMessages.push('Create Payload seems to different please send correct payload');
            }
        })
    }
    Object.keys(data).forEach(e=>{
        if(e=='quantity' && data[e]<0){
            errorMessages.push('Quantity cannot be less than 0');
        }
    })    
    return errorMessages;
}

const paramValidation = (data)=>{
    var errorMessages = []
    const reg = new RegExp('^[0-9]+$');
    if(!reg.test(data)){
        errorMessages.push('Id is not valid');
    };
    return errorMessages;
}


module.exports = {
    validateGet:validateGet,
    validateUpdate:validateUpdate,
    errorObj:errorObj,
    createValidation:createValidation,
    genericErrObj :genericErrObj, 
    createProductValidation:createProductValidation,
    paramValidation:paramValidation 
}