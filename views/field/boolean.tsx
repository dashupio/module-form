
// import dependencies
import React from 'react';
import { Form } from 'react-bootstrap';
import { Select } from '@dashup/ui';

// text field
const FieldBoolean = (props = {}) => {

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
      <Select
        isClearable
        
        options={ ['True', 'False'].map((key) => {
          return {
            label : key,
            value : key.toLowerCase(),
          }
        }) }
        readOnly={ props.readOnly }
        onChange={ (val) => props.onChange(props.field, val?.value === 'true') }
        placeholder={ props.field.placeholder || `Enter ${props.field.label}` }
        defaultValue={ {
          label : props.value ? 'True' : 'False',
          value : props.value ? 'true' : 'false',
        } }
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
export default FieldBoolean;