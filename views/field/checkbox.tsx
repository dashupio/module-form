
// import dependencies
import { Form } from '@dashup/ui';
import React, { useState } from 'react';

// text field
const FieldCheckbox = (props = {}) => {
  // show completed
  const [showCompleted, setShowCompleted] = useState(false);

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
        // hide completed
        if (!showCompleted && props.field.completed && (props.value || []).includes(option.value)) return null;
        
        // return jsx
        return (
          <Form.Check
            id={ `option-${option.uuid || i}` }
            key={ `option-${option.uuid || i}` }
            name={ props.field.name || props.field.uuid }
            value={ option.value }
            label={ option.label }
            checked={ (props.value || []).includes(option.value) }
            onChange={ (e) => props.onChange(props.field, (props.value || []).includes(option.value) ? (props.value || []).filter((v) => v !== option.value) : [...(props.value || []), option.value]) }
          />
        );
      }) }
      { !!props.field.completed && !!(props.value || []).length && (
        <div>
          <Form.Text className="form-help">
            <a href="#!" onClick={ (e) => !setShowCompleted(!showCompleted) && e.preventDefault() }>
              { showCompleted ? 'Hide' : 'Show' } completed items
            </a>
          </Form.Text>
        </div>
      ) }
      { !!props.field.help && !props.noLabel && (
        <div>
          <Form.Text className="form-help">
            { props.field.help }
          </Form.Text>
        </div>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldCheckbox;