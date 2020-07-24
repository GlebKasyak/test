import React from 'react';
import { ReactSVG } from "react-svg";

import "./style.scss";

const Icon = ({ icon, text, name, activeName, onClick }) => (
    <div
        onClick={ onClick.bind(null, name) }
        className={"icon-wrapper " + ((name === activeName) ? "icon-wrapper--active" : "")}
    >
        <ReactSVG
            className="icon"
            src={ icon }
            alt="Icon"
        />
        <span className="icon-wrapper__text" >{ text }</span>
    </div>
);

export default Icon;
