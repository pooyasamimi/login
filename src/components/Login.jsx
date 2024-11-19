import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Formikcontrol from "./formikComponents/FormikControl";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Title from "./Title";

const initialValues = {
  email: "",
  mobile: "",
  password: "",
  auth_mode: "mobile",
};

const authModeValues = [
  { id: "mobile", value: "موبایل" },
  { id: "email", value: "ایمیل" },
];
const onSubmit = (values, subProps) => {
  toast.success("ثبت نام با موقیت انجام شد");
  setTimeout(() => {
    subProps.setSubmitting(false);
    subProps.resetForm();
  }, 3000);
};
const validationSchema = Yup.object({
  email: Yup.string().when("auth_mode", {
    is: "email",
    then: () =>
      Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .email("لطفا قالب ایمیل را رعایت کنید"),
  }),
  mobile: Yup.string().when("auth_mode", {
    is: "mobile",
    then: () =>
      Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(
          /((0?9)|(\+?989))\d{9}/g,
          "لطفا شماره موبایل را معتبر وارد کنید"
        ),
  }),
  password: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "حد اقل یک حرف بزرگ و یک حرف کوچک لاتین و اعداد و کارکترهای خاص استفاده کنید"
    ),
});

const Login = () => {
  return (
    <div className="limiter">
      <Title>Login</Title>

      <div className="container-login100">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          {(formik) => {
            return (
              <div className="wrap-login100">
                <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
                  <span className="login100-form-title">ورود اعضا</span>

                  <Formikcontrol
                    formik={formik}
                    control="radio"
                    name="auth_mode"
                    label="نوع اعتبار سنجی"
                    options={authModeValues}
                  />

                  {formik.values.auth_mode === "mobile" ? (
                    <Formikcontrol
                      formik={formik}
                      control="input"
                      type="text"
                      name="mobile"
                      icon="fa fa-phone"
                      label="شماره موبایل"
                    />
                  ) : (
                    <Formikcontrol
                      formik={formik}
                      control="input"
                      type="text"
                      name="email"
                      icon="fa fa-envelope"
                      label="ایمیل"
                    />
                  )}

                  <Formikcontrol
                    formik={formik}
                    control="input"
                    type="password"
                    name="password"
                    icon="fa fa-lock"
                    label="رمز عبور"
                  />

                  <div className="container-login100-form-btn">
                    <button
                      type="submit"
                      className="login100-form-btn"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? "لطفا صبر کنید ..." : "ورود"}
                    </button>
                  </div>
                  <div className="text-center p-t-12 p-b-45">
                    <a
                      className="txt2"
                      href="#"
                      onClick={() => toast.error("به من چه")}
                    >
                      فراموش کردید؟
                    </a>
                    <Link
                      to={"/register"}
                      className="txt2 d-flex justify-content-center align-items-center mt-3"
                      href="#"
                    >
                      <i
                        className="fa fa-long-arrow-right m-l-5"
                        aria-hidden="true"
                      ></i>
                      ثبت نام
                    </Link>
                  </div>
                </Form>
                <div className="login100-pic js-tilt" data-tilt>
                  <img src="./src/assets/images/img-01.png" alt="IMG" />
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
