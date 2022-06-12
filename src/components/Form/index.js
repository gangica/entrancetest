import React, { forwardRef, useRef, useState } from 'react';

const Input = forwardRef(({
  item,
  error
}, ref) => {
  return (
    <div style={{ textAlign: 'left' }}>
      <div>{item.title}</div>
      <input
        ref={ref}
        id={item.id}
        placeholder={item.placeholder}
        type={item.type}
      />
      {error && <div>{error}</div>}
    </div>
  )
})

const Form = ({
  fields,
  submitText = "Submit",
  submit = () => {}
}) => {
  const inputRefs = useRef([]);
  const [formFields, setFormFields] = useState(fields);

  const validateFields = (fields) => {
    const passwordRule = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{6,18}$/;
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
    submit()
  }

  return (
    <form 
      style={{ width: 200, display: 'flex', flexDirection: 'column', margin: '0 auto' }}
      onSubmit={handleSubmit}
    >
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
      <input type="submit" value={submitText} />
    </form>
  )
}

export default Form;