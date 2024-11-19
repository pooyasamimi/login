import React from "react";

const File = ({ formik, name, icon, label }) => {
  return (
    <div
      className={`wrap-input100 validate-input ${
        formik.errors[name] && formik.touched[name] && "alert-validate"
      }`}
      data-validate={formik.errors[name]}
    >
      <input
        className="input100"
        type="text"
        name={name}
        placeholder={label}
        value={formik.values[name] ? formik.values[name].name : ""}
        onChange={()=>{}}
      />
      <input
        className="input_file"
        type="file"
        name={name}
        onChange={(event) => formik.setFieldValue(name, event.target.files[0])}
        onBlur={() => formik.setTouched({ [name]: true })}
      />
      <span className="focus-input100"></span>
      <span className="symbol-input100">
        <i
          className={`${icon} ${
            !formik.errors[name]
              ? "text-success"
              : !formik.values[name]
              ? "text-primary"
              : "text-danger"
          }`}
        ></i>
      </span>
    </div>
  );
};

export default File;
