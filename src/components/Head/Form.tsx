import React, {FC, useEffect, useRef, useState} from 'react';
import {appStateSlice} from "../../reducers/slices/AppStateSlice";
import ErrorInput from "./ErrorInput";
import {IFormAuth, IInputError, InputErrorType} from "../../types/appTypes";
import {useAppDispatch} from "../../hooks/redux";
import $ from "jquery";
import {fetchAuthUser} from "../../reducers/ActionCreator";


interface IForm {
    form: IFormAuth
}

const Form: FC<IForm> = ({form}) => {
    const dispatch = useAppDispatch()
    const formRef = useRef<HTMLFormElement>(null);

    const [errorsForm, setErrorsForm] = useState<string[]>([]);
    const [errorsFields, setErrorsFields] = useState<{ [key in InputErrorType]?: string[] }>({});

    const validationForm = () => {
        let tmp: typeof errorsFields = {}
        let arr = []
        for (let input of form.inputs) {
            if (input.validate) {
                const i = input.validate!(formRef.current!.elements)
                if (i.length) {
                    tmp[input.property.name] = i
                    arr.push(input.property.name)
                }
            }
        }
        setErrorsFields(tmp)
        return !arr.length
    }

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        validationForm() && fetchAuthUser(dispatch, form.class)
            .then(data => data)
            .catch(error => setErrorsForm(error.message))
    }


    // Отслеживание валидации по связанным полям
    const [fieldForValidate, setFieldForValidate] = useState<InputErrorType | null>(null);


    return (
        <form ref={formRef} onSubmit={handleForm}
              className={['form', form.class].join(' ')}>
            <h2 className='form-title'>{form.title}</h2>
            <img className='form-close' src="/assets/images/close.svg"
                 onClick={e => dispatch(appStateSlice.actions.setActiveForm(null))}/>
            {form.inputs.map(input =>
                <ErrorInput key={input.property.name}
                            input={input}
                            formRef={formRef}
                            errorsField={errorsFields[input.property.name]}
                            fieldForValidate={fieldForValidate}
                            setFieldForValidate={setFieldForValidate}
                />
            )}
            <div className='form-button'>
                <button>{form.button.text}</button>
                <div className='errors'>
                    {errorsForm.map(error =>
                        <li>{error}</li>
                    )}
                </div>
            </div>
            <p className='form-foot'>{form.foot!.text}
                {/*@ts-ignore*/}
                <a onClick={e => dispatch(appStateSlice.actions.setActiveForm(form.foot.ref))}>
                    {form.foot!.refText}
                </a>
            </p>
        </form>
    );
};

export default Form;