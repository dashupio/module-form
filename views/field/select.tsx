
// import dependencies
import React from 'react';
import { Form } from 'react-bootstrap';
import { Select } from '@dashup/ui';

// text field
const FieldSelect = (props = {}) => {

  // get value
  const getValue = () => {
    // get array of values
    const values = Array.isArray(props.value) ? props.value : (props.value && [props.value]) || [];

    // return options
    const actualOptions = (props.field.options || []).filter((opt) => values.includes(opt.value));

    // return single
    if (!props.field.multiple) return actualOptions[0];
    
    // return all
    return actualOptions;
  };

  // custom option
  const Option = ({ data, isDisabled, isSelected, innerProps, innerRef }) => {
    // return jsx
    return !isDisabled ? (
      <div
        ref={ innerRef }
        className={ `dropdown-item d-flex align-items-center flex-row px-3 py-2${isSelected ? ' active' : ''}` }
        { ...innerProps }
      >
        { data.color && (
          <span className={ `badge bg-${data.color} me-2` }>
            &nbsp;
          </span>
        ) }
        <span className="text-overflow">
          { data.label }
        </span>
      </div>
    ) : null;
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
      <Select
        isClearable
        
        options={ props.field.options }
        isMulti={ props.field.multiple }
        onChange={ (val) => props.onChange(props.field, Array.isArray(val) ? val.map((v) => v.value) : val?.value) }
        components={ {
          Option,
        } }
        placeholder={ props.field.placeholder || `Enter ${props.field.label}` }
        defaultValue={ getValue() }
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
export default FieldSelect;