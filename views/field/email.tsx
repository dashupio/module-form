
// import dependencies
import validator from 'email-validator';
import React, { useState } from 'react';
import { Icon, TextField, InputAdornment } from '@dashup/ui';

// text field
const FieldEmail = (props = {}) => {
  // state
  const [valid, setValid] = useState(null);

  // is valid
  const isValid = (val = props.value) => {
    return validator.validate(val || '');
  };

  // return text field
  return (
    <TextField
      type="email"
      label={ props.field.label }
     
     
      readOnly={ props.readOnly }
      onChange={ (e) => props.onChange(props.field, e.target.value) }
      fullWidth
      helperText={ props.field.help }
      InputProps={ {
        startAdornment : (
          <InputAdornment position="start">
            <Icon>
              <i className="fa fa-envelope-open" />
            </Icon>
          </InputAdornment>
        )
      } }
      placeholder={ props.field.placeholder || `Enter ${props.field.label}` }
      defaultValue={ props.value }
    />
  );
};

// export default
export default FieldEmail;