
// import dependencies
import React from 'react';
import { Form } from '@dashup/ui';

// text field
const FieldEncrypt = (props = {}) => {

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
      <Form.Control
        type="password"
        onChange={ (e) => props.onChange(props.field, e.target.value) }
        readOnly={ props.readOnly }
        placeholder={ props.field.placeholder || `Enter ${props.field.label}` }
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
export default FieldEncrypt;