
// import dependencies
import React from 'react';
import { TextField, InputAdornment } from '@dashup/ui';

// text field
const FieldMoney = (props = {}) => {

  // return text field
  return (
    <TextField
      type="number"
      label={ props.field.label }
     
     
      readOnly={ props.readOnly }
      onChange={ (e) => props.onChange(props.field, e.target.value) }
      fullWidth
      helperText={ props.field.help }
      InputProps={ {
        startAdornment: (
          <InputAdornment position="start">
            <i className="fa fa-fw fa-dollar-sign" />
          </InputAdornment>
        )
      } }
      placeholder={ props.field.placeholder || `Enter ${props.field.label}` }
      defaultValue={ props.value }
    />
  );
};

// export default
export default FieldMoney;