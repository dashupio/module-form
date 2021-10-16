
// import dependencies
import React from 'react';
import { TextField } from '@dashup/ui';

// text field
const FieldText = (props = {}) => {

  // return text field
  return (
    <TextField
      label={ props.field.label }
      readOnly={ props.readOnly }
      onChange={ (e) => props.onChange(props.field, e.target.value) }
      fullWidth
      helperText={ props.field.help }
      placeholder={ props.field.placeholder || `Enter ${props.field.label}` }
      defaultValue={ props.value }
    />
  );
};

// export default
export default FieldText;