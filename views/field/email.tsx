
// import dependencies
import validator from 'email-validator';
import React, { useState } from 'react';
import { Form, InputGroup } from '@dashup/ui';

// text field
const FieldEmail = (props = {}) => {
  // state
  const [valid, setValid] = useState(null);

  // is valid
  const isValid = (val = props.value) => {
    return validator.validate(val || '');
  };

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
      <InputGroup>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          type="email"
          onBlur={ (e) => setValid(isValid(e.target.value)) }
          isValid={ valid === true }
          onChange={ (e) => props.onChange(props.field, e.target.value) }
          readOnly={ props.readOnly }
          isInvalid={ valid === false }
          placeholder={ props.field.placeholder || `Enter ${props.field.label}` }
          defaultValue={ props.value }
        />
      </InputGroup>
      { !!props.field.help && !props.noLabel && (
        <Form.Text className="form-help">
          { props.field.help }
        </Form.Text>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldEmail;