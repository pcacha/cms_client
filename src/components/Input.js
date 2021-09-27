import React from "react";

const Input = (props) => {
    let inputClassName = "form-control";

    if(props.type === "file") {
        inputClassName += " file";
    }

    if(props.hasError !== undefined) {
        inputClassName += props.hasError ? " is-invalid" : " is-valid";
    }

    return (
        <>
            {
                props.label &&
                <label className={props.boldLabel && "font-weight-bold"}>{props.label}</label>
            }

            <input className={inputClassName} type={props.type || "text"} name={props.name}
                   placeholder={props.placeholder} value={props.value} onChange={props.onChange} />

            {
                props.hasError &&
                <span className="invalid-feedback">
                    {props.error}
                </span>
            }
        </>
    );
}

export default Input;