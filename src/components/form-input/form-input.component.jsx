import React from "react";

import "./form-input.styles.scss";

const FormIput = ({ handleChange, label, ...otherProps }) => (
    console.log(`${otherProps.value.length ? "shrink" : ""}form-input-label`),
    console.log(otherProps),
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />

    {label ? (
      <label className={`${otherProps.value.length ? "shrink" : ""}form-input-label`}>
          
      </label>
    ) : null}
  </div>
);

export default FormIput;
