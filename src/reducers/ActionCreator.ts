import {AppDispatch} from "./store";
import {requestURL} from "../helpers/requestAPI";


export const fetchAuthUser = (dispatch: AppDispatch, typeOperation: string, data: any = {}) => {
    return new Promise((resolve, rejects) =>
        fetch(requestURL(`auth/${typeOperation}/`), {
            headers: {
                'Content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(response => {
                response.json();
            })
            .then(data => console.log(data))
            .catch(error => rejects({message: ['Попробуйте попозже']}))
    )


}

