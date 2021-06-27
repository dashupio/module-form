
// import dependencies
import React from 'react';
import { Form } from 'react-bootstrap';
import Wysiwyg from '../wysiwyg';

// text field
const FieldWysiwyg = (props = {}) => {

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
      <Wysiwyg
        value={ props.value }
        onChange={ (v) => props.onChange(props.field, v) }
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
export default FieldWysiwyg;