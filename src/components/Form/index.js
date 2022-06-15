import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { checkPasswordStrength, mapValuesToObject } from '../../helpers';
import { 
  FormFeedback, 
  Input as StrapInput, 
  Form as StrapForm, 
  FormGroup, 
  Label, 
  Button 
} from 'reactstrap';

const Input = forwardRef(({
  item,
  error
}, ref) => {
  const { isRequired = true } = item;

  return (
    <FormGroup style={{ textAlign: 'left' }}>
      <Label>
        {item.title}
        {isRequired && <span style={{ color: 'red' }}>*</span>}
      </Label>
      <StrapInput
        innerRef={ref}
        id={item.id}
        placeholder={item.placeholder}
        type={item.type}
        invalid={error}
      />
      {error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  )
})

const Form = ({
  header,
  footer,
  fields,
  submitText = "Submit",
  submit = () => {},
  callbackError
}) => {
  const inputRefs = useRef([]);
  const [formFields, setFormFields] = useState(fields);

  const validateFields = (fields) => {
    const passwordRule = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-._]).{6,18}$/;
    const emailRule = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let hasError = false;

    let newFields = fields.map((item, i) => {
      if (!item.value) {
        hasError = true;
        return {
          ...item,
          error: `${item.title} is required`
        }
      }

      if (item.type === "password" && item.isValidated && !passwordRule.test(item.value)) {
        hasError = true;
        return {
          ...item,
          error: `${item.title} is not valid`
        }
      }

      if (item.type === "email" && !emailRule.test(item.value)) {
        hasError = true;
        return {
          ...item,
          error: `${item.title} is not valid`
        }
      }

      return item
    })

    setFormFields(newFields)

    return hasError
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let values = inputRefs.current.map(item => item.value);

    let currentFields = fields.map((item, i) => ({
      ...item,
      value: values[i]
    }))

    const hasError = validateFields(currentFields);

    if (hasError) {
      return
    }

    // transform values and call API
    submit(mapValuesToObject(currentFields))
  }

  return (
    <StrapForm 
      className="d-flex flex-column w-75 mx-auto"
      onSubmit={handleSubmit}
    >
      {header && header}
      {
        formFields.map((item, i) => {
          return (
            <Input
              key={item.id}
              ref={el => inputRefs.current[i] = el}
              item={item}
              error={item.error}
            />
          )
        })
      }
      {callbackError && <div className="mb-2" style={{ color: 'red' }}>{callbackError}</div>}
      <Button 
        color="primary" 
        className="mt-"
      >
        {submitText}
      </Button>
      {footer && footer}
    </StrapForm>
  )
}

export default Form;