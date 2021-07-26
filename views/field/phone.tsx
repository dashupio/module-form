
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
    props.onChange(props.field, props.field.numberOnly ? rtn.number : rtn);
  };

  // let
  let value = props.value;

  // check value
  if (typeof value === 'string') value = onChange(value, true);

  // return text field
  return (
    <Form.Group className={ props.noLabel ? '' : 'mb-3' } controlId={ props.field.uuid }>
      { !props.noLabel && (
        <Form.Label>
          { props.field.label || (
            <a href="#!" onClick={ (e) => !props.onConfig(props.field) && e.preventDefault() }>
              <i>Set Label</i>
            </a>
          ) }  
        </Form.Label>
      ) }
      <ReactPhoneInput
        value={ value?.number }
        country={ props.field.country }
        inputExtraProps={ {
          name      : 'phone',
          required  : props.field.required,
          autoFocus : true
        } }
        onChange={ (val) => onChange(`+${val}`) }
        readOnly={ props.readOnly }
      />
      { !!props.field.help && !props.noLabel && (
        <Form.Text className="form-help">
          { props.field.help }
        </Form.Text>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldPhone;