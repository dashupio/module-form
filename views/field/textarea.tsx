
// import dependencies
import React from 'react';
import { Form } from 'react-bootstrap';

// text field
const FieldTextarea = (props = {}) => {

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
      <Form.Control
        as="textarea"
        rows={ 3 }
        placeholder={ props.field.placeholder || `Enter ${props.field.label}` }
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
export default FieldTextarea;