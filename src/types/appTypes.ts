import React from "react";

export type AuthFormType = 'sign' | 'registration'

export type InputErrorType = 'username' | 'email' | 'password' | 'repeat_password'

export interface IInputError {
    property: { name: InputErrorType; placeholder?: string, type?: React.HTMLInputTypeAttribute },
    validate: (form: HTMLFormElement['elements'], errors?: string[]) => string[]
    fieldsToTrackValidate?: InputErrorType[]
}


export interface IFormAuth {
    title?: string
    class: AuthFormType
    inputs: IInputError[]
    button: { text: string }
    foot?: {
        text?: string,
        ref: AuthFormType,
        refText?: string
    }
}