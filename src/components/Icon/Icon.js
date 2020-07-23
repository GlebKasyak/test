import React from 'react';

import "./style.scss";

const Icon = ({ icon, text, name, activeName, onClick }) => {
    return (
       <div
           onClick={ onClick.bind(null, name) }
           className={"icon-wrapper " + ((name === activeName) ? "icon-wrapper--active" : "")}
       >
           <img
               className="icon"
               src={ icon }
               alt="Icon"
           />
           <span className="icon-wrapper__text" >{ text }</span>
       </div>
    );
};

export default Icon;
