
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


module.exports = {
    validateUpdate:validateUpdate,
    errorObj:errorObj,
    createValidation:createValidation,
    genericErrObj :genericErrObj
}