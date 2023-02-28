import React, {useEffect} from 'react';
import '../../styles/head/head.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {appStateSlice} from "../../reducers/slices/AppStateSlice";
import Authorization from "./Authorization";

const Head = () => {
    const dispatch = useAppDispatch()

    const g = useAppSelector(state => state.appStateReducer.activeAuthForm)

    useEffect(() => {

    }, [g]);

    return (
        <React.Fragment>
            <div className='head'>
                <a className='head-home' href='/'>Buy Planet<br/>Plots</a>
                <button onMouseEnter={e => dispatch(appStateSlice.actions.setActiveForm('sign'))}
                        className='head-sign'>Войти
                </button>
            </div>
            <Authorization/>
        </React.Fragment>
    );
};

export default Head;