import React from 'react';

const Input = ({ label, text, type, id, name, placeholder, handleInput }) => {
    return (
        <div className="Input">
            <label htmlFor={label}>{text}</label>
            <input type={type} id={id} name={name} placeholder={placeholder} onChange={handleInput} required/>
        </div>
    );
};

export default Input;