interface dataType{
    val: string,
    minLength: number
}

export const inputValidator = (data: dataType) => {

    let val = data.val;
    let minLength = data.minLength;

    if(val.trim().length < minLength){
        return false;
    }

    return true;
}