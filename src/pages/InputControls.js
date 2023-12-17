import { getIn, FormikConsumer } from "formik";
import { useState } from "react";

const formContainerClass = "form-container";
const inputContainerClass = "input-container";
const labelClass = "input-label";
const checkboxLabelClass = "checkbox-label";
const inputFieldClass = "input-field";
const inputFieldsetClass = "input-field-set";
const inputFieldInvalidClass = "input-field-invalid";
const errorClass = "input-error";
const selectPlaceholderClass = "select-option-placeholder";
const selectPlaceholderStyle = {};
const submitClass = "submit-button";
const submitInvalidClass = "submit-button-invalid";

export const defaultStyles = {
  formContainerClass,
  inputContainerClass,
  labelClass,
  checkboxLabelClass,
  inputFieldClass,
  inputFieldsetClass,
  inputFieldInvalidClass,
  errorClass,
  selectPlaceholderClass,
  selectPlaceholderStyle,
  submitClass,
  submitInvalidClass,
};

export const Label = ({ children, ...props }) => {
  return (
    <div className={props.inputContainerClass || inputContainerClass}>
      <label className={props.labelClass || labelClass}>{children}</label>
    </div>
  );
};

export const Input = ({
  field,
  form: { values, touched, errors, setValues, setTouched, setErrors },
  type,
  label,
  options,
  children,
  callOnChanged,
  callOnBlur,
  showErrors = true,
  showErrorOnlyOnTouch = true,
  placeholder,
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  const inputType =
    type === "checkbox"
      ? { type: "checkbox" }
      : type === "select" || type === "textarea"
      ? null
      : { type: type || "text" };
  const ariaInvalid = touch && error ? { "aria-invalid": true } : null;
  const errorId = field.name + "-error";
  const ariaDescribedby =
    touch && error ? { "aria-describedby": errorId } : null;
  const [placeholderStyle, setPlaceholderStyle] = useState(
    props.placeHolderStyle || selectPlaceholderStyle
  );
  const inputProps = {
    ...props,
    id: field.name,
    ...inputType,
    ...field,
    onChange: (e) => {
      !!callOnChanged &&
        callOnChanged({
          e,
          values,
          touched,
          errors,
          setValues,
          setTouched,
          setErrors,
        });
      if (!!placeholder) {
        setPlaceholderStyle((style) => ({ ...style, display: "none" }));
      }
      field.onChange(e);
    },
    onBlur: (e) => {
      !!callOnBlur &&
        callOnBlur({
          values,
          touched,
          errors,
          setValues,
          setTouched,
          setErrors,
        });
      field.onBlur(e);
    },
    ...ariaInvalid,
    ...ariaDescribedby,
    className:
      touch && error
        ? props.inputFieldInvalidClass || inputFieldInvalidClass
        : props.inputFieldClass || inputFieldClass,
  };
  const errorMessage =
    (!showErrorOnlyOnTouch || touch) && error && showErrors ? (
      <div id={errorId} role="alert" className={props.errorClass || errorClass}>
        {error}
      </div>
    ) : null;
  let inputControl;
  if (type === "checkbox") {
    inputControl = (
      <div className={props.inputContainerClass || inputContainerClass}>
        <label className={props.checkboxLabelClass || checkboxLabelClass}>
          <input {...inputProps} />
          {children}
        </label>
        {errorMessage}
      </div>
    );
  } else {
    inputControl = (
      <div className={props.inputContainerClass || inputContainerClass}>
        <label
          htmlFor={field.name || props.id}
          className={props.labelClass || labelClass}
        >
          {label}
        </label>
        {type === "select" ? (
          <select {...inputProps}>
            {placeholder ? (
              <option
                value=""
                style={placeholderStyle}
                className={
                  props.selectPlaceholderClass || selectPlaceholderClass
                }
              >
                {placeholder}
              </option>
            ) : null}
            {options}
          </select>
        ) : type === "textarea" ? (
          <textarea {...inputProps} />
        ) : (
          <input {...inputProps} />
        )}
        {errorMessage}
      </div>
    );
  }
  return inputControl;
};

export const Button = ({
  children,
  form: { dirty, isValid, isValidating, isSubmitting },
  field,
  disableIfInvalid = true,
  enableNotDirty = false,
  ...props
}) => {
  const modifiedAndValid = dirty && isValid && !isValidating && !isSubmitting;
  const disabled =
    disableIfInvalid && !enableNotDirty && !modifiedAndValid
      ? { disabled: true }
      : null;
  const buttonClass = modifiedAndValid
    ? props.submitClass || submitClass
    : props.submitInvalidClass || submitInvalidClass;
  return (
    <button
      id={field.name}
      {...field}
      {...disabled}
      {...props}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

export const DebugFormik = ({ debug = false }) =>
  !debug ? (
    <></>
  ) : (
    <div
      style={{
        margin: "3rem 0",
        borderRadius: 4,
        background: "#f6f8fa",

        boxShadow: "0 0 1px  #eee inset",
      }}
    >
      <div
        style={{
          textTransform: "uppercase",
          fontSize: 11,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          fontWeight: 500,
          padding: ".5rem",
          background: "#555",
          color: "#fff",
          letterSpacing: "1px",
        }}
      >
        Formik State
      </div>
      <FormikConsumer>
        {({ validationSchema, validate, onSubmit, ...rest }) => (
          <pre
            style={{
              fontSize: ".65rem",
              padding: ".25rem .5rem",
              overflowX: "scroll",
            }}
          >
            {JSON.stringify(rest, null, 2)}
          </pre>
        )}
      </FormikConsumer>
    </div>
  );
