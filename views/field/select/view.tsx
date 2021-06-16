
// import dependencies
import React from 'react';

// text field
const FieldSelectView = (props = {}) => {

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
          <span key={ `${props.id}-option-${option.value}` } className={ `btn btn-sm btn-${option.color || 'info'} me-1` }>
            { option.label }
          </span>
        );
      }) }
    </div>
  );
};

// export default
export default FieldSelectView;