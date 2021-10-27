
// import dependencies
import React from 'react';
import { Form, InputGroup } from '@dashup/ui';

// text field
const FieldMoney = (props = {}) => {

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
          type="number"
          step="0.01"
          onChange={ (e) => props.onChange(props.field, parseFloat(e.target.value)) }
          readOnly={ props.readOnly }
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
export default FieldMoney;