import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppContainer from "./AppContainer";


const Wrapper = () => {

    return (
        <div>
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>

        </div>
    );
};

export default Wrapper;