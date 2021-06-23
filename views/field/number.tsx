
// import dependencies
import React from 'react';
import { Form } from 'react-bootstrap';

// text field
const FieldNumber = (props = {}) => {

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
        type="number"
        onChange={ (e) => props.onChange(props.field, parseFloat(e.target.value)) }
        placeholder={ props.field.placeholder || `Enter ${props.field.label}` }
        defaultValue={ props.value }
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
export default FieldNumber;