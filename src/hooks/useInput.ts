import React, { useReducer } from "react";

interface inputStateInterface{
    value: string,
    isTouched: boolean
}

interface actionInterface{
    type: string,
    payload?: string
}

const initialInputState = {
    value: '',
    isTouched:false
}

interface dataType{
    val: string,
    minLength: number
}

const reducerFn = (state : inputStateInterface, action : actionInterface) => {

    const updatedState = {...state};

    if(action.type === 'NEW_VAL'){
        updatedState.value = action.payload!;
    }
    else if(action.type === 'BLUR'){
        updatedState.isTouched = true;
    }
    else if(action.type === 'RESET'){
        updatedState.value = "";
        updatedState.isTouched = false;
    }

    return updatedState;
}

const useInput = (validator: (data: dataType) => boolean, minLength: number, presentState?: inputStateInterface) => {

    let initialState: inputStateInterface  = {...initialInputState};

    if(presentState){
        initialState = {...presentState};
    }

    const [inputState, dispatch] = useReducer(reducerFn, initialState);

    const inputIsValid = validator({val: inputState.value, minLength: minLength});

    const inputIsInvalid = inputState.isTouched && !inputIsValid;

    const inputChangeHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'NEW_VAL', payload: event.target.value});
    }

    const inputBlurHandler = () => {
        dispatch({type: 'BLUR'});
    }

    const inputResetHandler = () => {
        dispatch({type:'RESET'});
    }

    return {
        value: inputState.value,
        isValid: inputIsValid,
        isInvalid: inputIsInvalid,
        inputChangeHandler,
        inputBlurHandler,
        inputResetHandler
    };
}

export default useInput;