
// import dependencies
import React from 'react';
import { Form } from '@dashup/ui';

// text field
const FieldRadio = (props = {}) => {

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
      { (props.field.options || []).map((option, i) => {
        // return jsx
        return (
          <Form.Check
            id={ `option-${option.uuid || i}` }
            key={ `option-${option.uuid || i}` }
            type="radio"
            name={ props.field.name || props.field.uuid }
            value={ option.value }
            label={ option.label }
            checked={ props.value === option.value || (props.value || []).includes(option.value) }
            onChange={ (e) => props.onChange(props.field, option.value) }
          />
        );
      }) }
      { !!props.field.help && !props.noLabel && (
        <Form.Text className="form-help">
          { props.field.help }
        </Form.Text>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldRadio;