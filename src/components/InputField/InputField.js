import React from "react";
import "./style.scss";

const InputField = ({ placeholder, width, height, value, onChange, style }) => (
    <input
        value={ value }
        onChange={ onChange }
        placeholder={ placeholder }
        style={{ width, height, ...style }}
        className="input-field fs-12 "
    />
);

export default InputField;
