import {useReducer, useCallback} from 'react';

function formReducer(state, action) {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
                // If form is invalid, then break.
                if(!formIsValid) break;
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            };
        case 'SET_DATA':
            // Overriding the previous state here:
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            };
        default:
            return state;
    }
};


function useForm(initialInputs, initialFormValidity){

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type:'SET_DATA',
            inputs:inputData,
            formIsValid:formValidity
        });
    }, []);

    return [formState, inputHandler, setFormData];
}

export default useForm;

