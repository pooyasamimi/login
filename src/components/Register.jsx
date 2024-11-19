import React from "react";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Formikcontrol from "./formikComponents/FormikControl";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PersonalErrToast from "./formikComponents/PersonalErrToast";
import Title from "./Title";

const initialValues = {
  user_name: "",
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
  password: "",
  confirm_password: "",
  auth_mode: "mobile",
  date: "",
  image: null,
  rules: false,
};
const onSubmit = (values, subProps) => {
  // let formData = new FormData();
  // formData.append("user_name", values.user_name);
  // formData.append("first_name", values.first_name);
  // formData.append("last_name", values.last_name);
  // formData.append("email", values.email);
  // formData.append("mobile", values.mobile);
  // formData.append("password", values.password);
  // formData.append("auth_mode", values.auth_mode);
  // formData.append("date", values.date);
  // formData.append("image", values.image);
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
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "با رمز عبور مطابقت ندارد")
    .required("لطفا این قسمت را پر کنید"),
  user_name: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[0-9a-zA-Z]+$/, "فقط از حروف لاتین و اعداد استفاده کنید"),
  first_name: Yup.string().matches(
    /^[ابپتثجچهخدذرزسشصظطضعغفقک@-_.:گلمنوهیژئي\s0-9a-zA-Z]+$/,
    "فقط از حروف فارسی و لاتین و اعداد و @ : - _ . استفاده کنید"
  ),
  last_name: Yup.string().matches(
    /^[ابپتثجچهخدذرزسشصظطضعغفقک@-_.:گلمنوهیژئي\s0-9a-zA-Z]+$/,
    "فقط از حروف فارسی و لاتین و اعداد و @ : - _ . استفاده کنید"
  ),
  date: Yup.string().required("لطفا این قسمت را پر کنید"),
  rules: Yup.boolean().oneOf([true], "مگ دست خودته باید قوانین تایید کنی"),
  image: Yup.mixed()
    .required("لطفا این قسمت را پر کنید")
    .test(
      "filesize",
      "حجم فایل باید کمتر از 500 کیلوبایت باشد",
      (value) => value && value.size <= 500 * 1024
    )
    .test(
      "type",
      "باید فرمت فایل jpg باشد",
      (value) => value && value.type && value.type === "image/jpeg"
    ),
});

const authModeValues = [
  { id: "mobile", value: "موبایل" },
  { id: "email", value: "ایمیل" },
];

const Register = () => {
  function handleDisablePlaceHolder(fieldError) {
    return fieldError ? " اول فیلد قبلی را وارد کنید" : "تایید رمز عبور";
  }

  return (
    <div className="limiter">
      <Title>Register</Title>
      <Toaster position="top-center" reverseOrder={false} />
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
                  <span className="login100-form-title">ثبت نام اعضا</span>

                  <Formikcontrol
                    formik={formik}
                    control="input"
                    type="text"
                    name="user_name"
                    icon="fa fa-user"
                    label="نام کاربری"
                  />
                  <Formikcontrol
                    formik={formik}
                    control="input"
                    type="text"
                    name="first_name"
                    icon="fa fa-user"
                    label="نام "
                  />
                  <Formikcontrol
                    formik={formik}
                    control="input"
                    type="text"
                    name="last_name"
                    icon="fa fa-user"
                    label="نام خانوادگی"
                  />
                  <Formikcontrol
                    formik={formik}
                    control="radio"
                    name="auth_mode"
                    label="نوع اعتبار سنجی"
                    options={authModeValues}
                  />

                  {formik.values.auth_mode == "mobile" ? (
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

                  <div
                    className={`wrap-input100 validate-input ${
                      formik.errors.confirm_password &&
                      formik.touched.confirm_password &&
                      "alert-validate"
                    }`}
                    data-validate={formik.errors.confirm_password}
                  >
                    <Field
                      name="confirm_password"
                      className="input100 "
                      type="password"
                      placeholder={handleDisablePlaceHolder(
                        formik.errors.password
                      )}
                      disabled={formik.errors.password}
                    />

                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i
                        className={`fa fa-lock ${
                          !formik.errors.confirm_password
                            ? "text-success"
                            : !formik.values.confirm_password
                            ? "text-primary"
                            : "text-danger"
                        }`}
                      ></i>
                    </span>
                  </div>

                  <Formikcontrol
                    formik={formik}
                    control="date"
                    name="date"
                    icon="fa fa-calendar"
                    label="تاریخ تولد"
                  />

                  <Formikcontrol
                    formik={formik}
                    control="file"
                    name="image"
                    icon="fa fa-file"
                    label="تصویر کاربر"
                  />

                  <div>
                    <label
                      style={{
                        accentColor: "blueviolet",
                        padding: "6px",
                        outline:
                          formik.errors.rules && formik.touched.rules
                            ? "2px dashed blueviolet"
                            : "",
                      }}
                      className="wrap-input100 d-flex align-items-center justify-content-center"
                    >
                      <FastField
                        type="checkbox"
                        name="rules"
                        className="m-l-4 d-block"
                      />
                      <button
                        className="ml-1 text-primary"
                        type="button"
                        onClick={() =>
                          toast("قوانین نداریم ولی قبولش کن 🙂", {
                            icon: "",
                          })
                        }
                      >
                        {" "}
                        قوانین{" "}
                      </button>{" "}
                      را میپذیرم
                    </label>
                    <ErrorMessage name="rules" component={PersonalErrToast} />
                  </div>

                  <div className="container-login100-form-btn">
                    <button
                      type="submit"
                      className="login100-form-btn"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? "لطفا صبر کنید ..." : "ثبت نام"}
                    </button>
                  </div>
                  <div className="text-center p-t-12 p-b-45">
                    <Link to={"/login"} className="txt2">
                      قبلا ثبت نام کرده ام
                    </Link>
                  </div>
                </Form>
                <div className="login100-pic js-tilt" data-tilt>
                  <img src="src/auth/images/img-01.png" alt="IMG" />
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Register;