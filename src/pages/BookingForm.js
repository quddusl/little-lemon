import { Formik, Form, Field } from "formik";
import { object, string, date, number, boolean, bool } from "yup";
import { useState } from "react";
import {
  Input,
  Checkbox,
  Select,
  Button,
  defaultStyles,
  DebugFormik,
} from "./InputControls";

const minGuests = 1;
const maxGuests = 20;
const defaultGuests = 1;
const nameRegExp = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/im;
const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

const seatingLocaton = (
  <>
    <option value="indoor">Indoor</option>
    <option value="outdoor">Outdoor</option>
  </>
);

const occasions = [
  { value: "Birthday", remark: "Birthday" },
  { value: "Engagement", remark: "Engagement" },
  { value: "Anniversary", remark: "Anniversary" },
  { value: "N/A", remark: "Not applicable" },
];

const occasionOptions = (
  <>
    {occasions.map((occasion) => (
      <option value={occasion.value} key={occasion.value}>
        {occasion.remark}
      </option>
    ))}
  </>
);

const initialValues = {
  name: "",
  date: "",
  time: "",
  numberOfGuests: defaultGuests,
  occassion: "",
  seatingLocation: "",
  confirmationRequired: false,
  emailConfirmation: false,
  smsConfirmation: false,
  email: "",
  mobile: "",
  comments: "",
};

const bookingSchema = object().shape(
  {
    name: string()
      .required("Required")
      .matches(
        nameRegExp,
        "Name must have at least two words separated by space."
      ),
    date: date()
      .required("Required")
      .min(
        Date(new Date().setHours(0, 0, 0, 0)),
        "Date cannot be in the past."
      ),
    time: string().required("Required"),
    numberOfGuests: number()
      .required("Required")
      .min(minGuests, `Must not exceed ${minGuests}`)
      .max(maxGuests, `Must not exceed ${maxGuests}`),
    occassion: string(),
    seatingLocation: string(),
    confirmationRequired: boolean(),
    emailConfirmation: boolean().when(
      ["confirmationRequired", "smsConfirmation"],
      {
        is: (confirmationRequired, smsConfirmation) =>
          confirmationRequired && !smsConfirmation,
        then: (schema) =>
          bool().oneOf([true], "At least one confirmation method is required."),
      }
    ),
    smsConfirmation: boolean().when(
      ["confirmationRequired", "emailConfirmation"],
      {
        is: (confirmationRequired, emailConfirmation) =>
          confirmationRequired && !emailConfirmation,
        then: (schema) =>
          bool().oneOf([true], "At least one confirmation method is required."),
      }
    ),
    email: string().when("emailConfirmation", {
      is: true,
      then: (schema) =>
        schema.required("Required").email("Not a valid email address"),
    }),
    mobile: string().when("smsConfirmation", {
      is: true,
      then: (schema) =>
        schema
          .required("Required")
          .matches(phoneRegExp, "Not a valid telephone number"),
    }),
    comments: string(),
  },
  [
    ["emailConfirmation", "smsConfirmation"],
    ["confirmationRequired", "smsConfirmation"],
    ["confirmationRequired", "emailConfirmation"],
  ]
);

const BookingForm = () => {
  // const availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  const [availableTimes, setAvailableTimes] = useState([
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ]);

  const timeOptions = (
    <>
      {availableTimes.map((time) => (
        <option value={time} key={time}>
          {time}
        </option>
      ))}
    </>
  );

  const [smsEmailTouched, setSmsEmailTouched] = useState(false);

  const confirmationUpdated = () => {
    setSmsEmailTouched(true);
  };

  const resetConfirmation = ({ values, touched, setValues, setTouched }) => {
    setValues(
      { ...values, emailConfirmation: false, smsConfirmation: false },
      false
    );
    const {
      emailConfirmation,
      smsConfirmation,
      email,
      mobile,
      ...touched_without_confirmation
    } = Object.assign({}, touched);
    setTouched({ ...touched_without_confirmation });
    setSmsEmailTouched(false);
  };

  const confirmationBlur = ({ touched }) => {
    touched.emailConfirmation = true;
    touched.smsConfirmation = true;
    setSmsEmailTouched(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bookingSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values }) => (
        <Form className={defaultStyles.formContainerClass}>
          <Field
            name="name"
            label="Full name:"
            placeholder="John Doe"
            component={Input}
          />
          <Field
            name="date"
            label="Booking date:"
            type="date"
            component={Input}
          />
          <Field
            name="time"
            label="Time:"
            placeholder="Select time"
            component={Select}
            options={timeOptions}
          />

          <Field
            name="numberOfGuests"
            label="Number of guests:"
            type="number"
            component={Input}
          />
          <Field
            name="occasion"
            label="Occasion:"
            placeholder="Select occasion"
            component={Select}
            options={occasionOptions}
          />
          <Field
            name="seatingLocation"
            label="Preferred seating location:"
            placeholder="Select location"
            component={Select}
            options={seatingLocaton}
          />
          <Field
            name="confirmationRequired"
            callOnChanged={resetConfirmation}
            component={Checkbox}
          >
            Confirmation required
          </Field>
          {values.confirmationRequired && (
            <>
              <fieldset class={defaultStyles.inputFieldsetClass}>
                <legend>Confirmation method</legend>
                <Field
                  name="emailConfirmation"
                  showErrors={false}
                  callOnChanged={confirmationUpdated}
                  callOnBlur={confirmationBlur}
                  component={Checkbox}
                >
                  Email
                </Field>
                <Field
                  name="smsConfirmation"
                  showErrors={smsEmailTouched}
                  callOnChanged={confirmationUpdated}
                  component={Checkbox}
                  showErrorOnlyOnTouch={false}
                >
                  SMS
                </Field>
              </fieldset>
              {values.emailConfirmation && (
                <Field
                  name="email"
                  label="Email:"
                  placeholder="joe@example.com"
                  component={Input}
                />
              )}
              {values.smsConfirmation && (
                <Field
                  name="mobile"
                  label="Mobile number:"
                  placeholder="(555) 555-1234"
                  component={Input}
                />
              )}
            </>
          )}
          <Field
            name="comments"
            label="Any comments or messages: "
            type="textarea"
            rows="3"
            cols="500"
            component={Input}
          />
          <Field name="submit" component={Button}>
            Make Your Reservation
          </Field>
          <DebugFormik debug={false} />
        </Form>
      )}
    </Formik>
  );
};
export default BookingForm;
