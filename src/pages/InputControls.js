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
  form: { touched, errors, values, setValues, setTouched, setErrors },
  type,
  label,
  callOnChanged,
  callOnBlur,
  showErrors = true,
  showErrorOnlyOnTouch = true,
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  const inputType = { type: type || "text" };
  return (
    <div className={props.inputContainerClass || inputContainerClass}>
      <label
        htmlFor={field.name || props.id}
        className={props.labelClass || labelClass}
      >
        {label}
      </label>
      <input
        {...inputType}
        {...field}
        {...props}
        onChange={(e) => {
          !!callOnChanged &&
            callOnChanged({
              values,
              touched,
              errors,
              setValues,
              setTouched,
              setErrors,
            });
          field.onChange(e);
        }}
        onBlur={(e) => {
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
        }}
        className={
          touch && error
            ? props.inputFieldInvalidClass || inputFieldInvalidClass
            : props.inputFieldClass || inputFieldClass
        }
      />
      {(!showErrorOnlyOnTouch || touch) && error && showErrors ? (
        <div className={props.errorClass || errorClass}>{error}</div>
      ) : null}
    </div>
  );
};

export const Checkbox = ({
  field,
  form: { values, touched, errors, setValues, setTouched, setErrors },
  label,
  children,
  callOnChanged,
  callOnBlur,
  showErrors = true,
  showErrorOnlyOnTouch = true,
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  return (
    <div className={props.inputContainerClass || inputContainerClass}>
      <label className={props.checkboxLabelClass || checkboxLabelClass}>
        <input
          type="checkbox"
          {...field}
          {...props}
          onChange={(e) => {
            !!callOnChanged &&
              callOnChanged({
                values,
                touched,
                errors,
                setValues,
                setTouched,
                setErrors,
              });
            field.onChange(e);
          }}
          onBlur={(e) => {
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
          }}
          className={
            touch && error
              ? props.inputFieldInvalidClass || inputFieldInvalidClass
              : props.inputFieldClass || inputFieldClass
          }
        />
        {children}
      </label>
      {(!showErrorOnlyOnTouch || touch) && error && showErrors ? (
        <div className={props.errorClass || errorClass}>{error}</div>
      ) : null}
    </div>
  );
};

export const Select = ({
  field,
  form: { values, touched, errors, setValues, setTouched, setErrors },
  label,
  options,
  callOnChanged,
  callOnBlur,
  showErrors = true,
  showErrorOnlyOnTouch = true,
  placeholder,
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  const [placeholderStyle, setPlaceholderStyle] = useState(
    props.placeHolderStyle || selectPlaceholderStyle
  );
  const hidePlaceholder = (e) => {
    !!callOnChanged &&
      callOnChanged({
        values,
        touched,
        errors,
        setValues,
        setTouched,
        setErrors,
      });
    field.onChange(e);
    if (!!placeholder) {
      setPlaceholderStyle((style) => ({ display: "none", ...style }));
    }
  };
  return (
    <div className={props.inputContainerClass || inputContainerClass}>
      <label
        htmlFor={field.name || props.id}
        className={props.labelClass || labelClass}
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        onChange={hidePlaceholder}
        onBlur={(e) => {
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
        }}
        className={
          touch && error
            ? props.inputFieldInvalidClass || inputFieldInvalidClass
            : props.inputFieldClass || inputFieldClass
        }
      >
        {placeholder ? (
          <option
            value=""
            style={placeholderStyle}
            className={props.selectPlaceholderClass || selectPlaceholderClass}
          >
            {placeholder}
          </option>
        ) : null}
        {options}
      </select>
      {(!showErrorOnlyOnTouch || touch) && error && showErrors ? (
        <div className={props.errorClass || errorClass}>{error}</div>
      ) : null}
    </div>
  );
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
    <button {...field} {...disabled} className={buttonClass}>
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
