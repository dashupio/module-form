
// import dependencies
import React from 'react';
import { Icon, TextField, InputAdornment } from '@dashup/ui';

// text field
const FieldEncrypt = (props = {}) => {

  // return text field
  return (
    <TextField
      type="password"
      label={ props.field.label }
     
     
      readOnly={ props.readOnly }
      onChange={ (e) => props.onChange(props.field, e.target.value) }
      fullWidth
      helperText={ props.field.help }
      InputProps={ {
        startAdornment: (
          <InputAdornment position="start">
            <Icon>
              <i className="fa fa-lock" />
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
export default FieldEncrypt;