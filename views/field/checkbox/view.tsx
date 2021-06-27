
// import dependencies
import React from 'react';
import colors from '../colors';

// text field
const FieldCheckboxView = (props = {}) => {

  // get value
  const value = Array.isArray(props.value) ? props.value : (props.value ? [props.value] : []);

  // actual options
  const options = (props.field.options || []).filter((option) => {
    // option
    return value.includes(option.value);
  });

  // return text field
  return (
    <div>
      { options.map((option, i) => {
        // return jsx
        return (
          <span key={ `${props.id}-option-${option.value}` } className="btn btn-sm me-1" style={ {
            color      : option.color?.hex && option.color?.drk ? '#fff' : '#000',
            background : colors[option.color] || option.color?.hex || option.color,
          } }>
            { option.label }
          </span>
        );
      }) }
    </div>
  );
};

// export default
export default FieldCheckboxView;