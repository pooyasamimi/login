import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import hejri_calendar from "react-date-object/calendars/persian";
import persian_calendar_language from "react-date-object/locales/persian_fa";

const Input = ({ formik, name, icon, label }) => {
  return (
    <div
      className={`wrap-input100 validate-input ${
        formik.errors[name] && formik.touched[name] && "alert-validate"
      }`}
      data-validate={formik.errors[name]}
      onBlur={() => formik.setTouched({ ...formik.touched ,  [name]: true })}
    >
      <DatePicker
        value={formik.values.date}
        animations={[opacity(), transition({ from: 35, duration: 800 })]}
        containerClassName="w-100"
        inputClass="input100"
        placeholder={label}
        fixMainPosition
        format="YY/MM/DD"
        calendar={hejri_calendar}
        calendarPosition="top-right"
        locale={persian_calendar_language}
        // highlightToday={false}
        onOpenPickNewDate={false}
        onChange={(date, { validatedValue }) => {
          formik.setFieldValue(name, validatedValue.toString());
        }}
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

export default Input;
