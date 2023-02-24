import React from "react";
import './../App.css';

export const Load = ({message}) =>{

    return(
    <div className={`loadingScreen`}>
        <div className="load">
            <p>{message}</p>
        </div>
    </div>
    );
}