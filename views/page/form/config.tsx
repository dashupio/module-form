
// import react
import React from 'react';
import { TextField, MenuItem } from '@dashup/ui';

// create page model config
const PageFormConfig = (props = {}) => {

  // get dashboards
  const getModels = () => {
    // get forms
    const models = Array.from(props.dashup.get('pages').values()).filter((page) => {
      // return model pages
      return page.get('type') === 'model' && !page.get('archived');
    });

    // return mapped
    return models.map((model) => {
      // return values
      return {
        value : model.get('_id'),
        label : model.get('name'),
      };
    });
  };

  // return jsx
  return (
    <TextField
      size="sm"
      label="Choose Model"
      value={ props.page.get('data.model') }
      select
      margin="dense"
      variant="outlined"
      onChange={ (e) => props.setData(e.target.value) }
      fullWidth
      helperText="The model this form will submit to."
    >
      { getModels().map((option) => (
        <MenuItem key={ option.value } value={ option.value }>
          { option.label }
        </MenuItem>
      ))}
    </TextField>
  )
};

// export default
export default PageFormConfig;