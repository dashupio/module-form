
// import dependencies
import React from 'react';
import { Form } from 'react-bootstrap';
import ReactPhoneInput from 'react-phone-input-2';
import parsePhoneNumber from 'libphonenumber-js';

// import tel input scss
import './phone.scss';

// text field
const FieldPhone = (props = {}) => {

  // on change
  const onChange = (val, shouldReturn) => {
    // parsed
    const parsed = typeof val === 'string' ? parsePhoneNumber(val, props.field.country || 'US') : parsePhoneNumber(val.number, val.country || props.field.country || 'US');

    // check parsed
    if (!parsed) return;

    // get return
    const rtn = {
      code    : parsed.countryCallingCode,
      local   : parsed.nationalNumber,
      number  : parsed.number,
      country : parsed.country,
    };

    // return
    if (shouldReturn) return rtn;
  
    // check value
    props.onChange(props.field, rtn);
  };

  // check value
  if (typeof props.value === 'string') props.value = onChange(props.value, true);

  // return text field
  return (
    <Form.Group className="mb-3" controlId={ props.field.uuid }>
      <Form.Label>
        { props.field.label || (
          <a href="#!" onClick={ (e) => !props.onConfig(props.field) && e.preventDefault() }>
            <i>Set Label</i>
          </a>
        ) }  
      </Form.Label>
      <ReactPhoneInput
        value={ props.value?.number }
        inputExtraProps={{
          name      : 'phone',
          required  : props.field.required,
          autoFocus : true
        }}
        onChange={ (val) => onChange(`+${val}`) }
        defaultCountry={ props.value?.country || props.field.country || 'us' }
      />
      { !!props.field.help && (
        <Form.Text className="form-help">
          { props.field.help }
        </Form.Text>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldPhone;