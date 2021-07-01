
// import dependencies
import React from 'react';
import { Form } from 'react-bootstrap';
import { Select } from '@dashup/ui';

// colors
import colors from './colors';

// text field
const FieldSelect = (props = {}) => {

  // get value
  const getValue = () => {
    const value = props.value;

    // get array of values
    const values = Array.isArray(value) ? value : (value && [value]) || [];

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
        { !!data.color && (
          <span className="badge me-2" style={ {
            background : colors[data.color] || data.color?.hex || data.color || null,
          } }>
            &nbsp;
          </span>
        ) }
        <span className="text-overflow">
          { data.label }
        </span>
      </div>
    ) : null;
  };

  // box
  const box = (color = '#ccc') => ({
    display    : 'flex',
    alignItems : 'center',
  
    ':before': {
      width           : 14,
      height          : 14,
      display         : 'block',
      content         : '" "',
      marginRight     : 5,
      borderRadius    : 3,
      backgroundColor : color,
    },
  });

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
        
        value={ getValue() }
        styles={ {
          singleValue : (styles, { data }) => {
            // check color
            if (!data.color) return styles;

            // return color
            return { ...styles, ...box(colors[data.color] || data.color?.hex || data.color) };
          },
          multiValue: (styles, { data }) => {
            // check color
            if (!data.color) return styles;

            // return styles
            return { ...styles, backgroundColor : colors[data.color] || data.color?.hex || data.color };
          },
          multiValueLabel: (styles, { data }) => {
            // check color
            if (!data.color || !data.color?.hex) return styles;

            // return styles
            return { ...styles, color : data.color?.drk ? '#fff' : '#000' };
          },
        } }
        options={ props.field.options }
        isMulti={ props.field.multiple }
        onChange={ (val) => props.onChange(props.field, Array.isArray(val) ? val.map((v) => v.value) : val?.value) }
        readOnly={ props.readOnly }
        components={ {
          Option,
        } }
        placeholder={ props.field.placeholder || `Select ${props.field.label}` }
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