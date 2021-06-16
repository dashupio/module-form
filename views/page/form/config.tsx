
// import react
import React from 'react';
import Select from 'react-select';

// create page model config
const PageFormConfig = (props = {}) => {

  // get dashboards
  const getModels = () => {
    // get forms
    const models = Array.from(props.dashup.get('pages').values()).filter((page) => {
      // return model pages
      return page.get('type') === 'model';
    });

    // return mapped
    return models.map((model) => {
      // return values
      return {
        value : model.get('_id'),
        label : model.get('name'),

        selected : (props.page.get('data.model') || []).includes(model.get('_id')),
      };
    });
  };

  // on forms
  const onModel = (value) => {
    // set data
    props.setData('model', value?.value);
  };

  // return jsx
  return (
    <div className="mb-3">
      <label className="form-label">
        Choose Model
      </label>
      <Select options={ getModels() } defaultValue={ getModels().filter((f) => f.selected) } onChange={ onModel } isClearable />
      <small>
        View Dashboards with this grids items.
      </small>
    </div>
  )
};

// export default
export default PageFormConfig;