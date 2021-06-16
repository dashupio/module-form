
// import react
import React from 'react';
import Select from 'react-select';

// block list
const BlockFormConfig = (props = {}) => {

  // get forms
  const getModels = () => {
    // get forms
    const forms = Array.from(props.dashup.get('pages').values()).filter((page) => {
      // return model pages
      return page.get('type') === 'model';
    });

    // return mapped
    return forms.map((form) => {
      // return values
      return {
        value : form.get('_id'),
        label : form.get('name'),

        selected : (props.model || props.block.model).includes(form.get('_id')),
      };
    });
  };

  // get forms
  const getForms = () => {
    // get forms
    const forms = Array.from(props.dashup.get('pages').values()).filter((page) => {
      // return model pages
      return page.get('type') === 'form' && page.get('data.model') === (props.model || props.block.model);
    });

    // return mapped
    return forms.map((form) => {
      // return values
      return {
        value : form.get('_id'),
        label : form.get('name'),

        selected : (props.block.forms || []).includes(form.get('_id')),
      };
    });
  };

  // on forms
  const onModel = (value) => {
    // set data
    props.setBlock(props.block, 'model', value?.value);
  };

  // on forms
  const onForm = (value) => {
    // set data
    props.setBlock(props.block, 'form', value?.value);
  };

  // on background
  const onBackground = (e) => {
    // on background
    props.setBlock(props.block, 'background', e.target.checked);
  };

  // return jsx
  return (
    <>
      <div className="mb-3">
        <label className="form-label">
          Choose Model
        </label>
        <Select options={ getModels() } defaultValue={ getModels().filter((f) => f.selected) } onChange={ onModel } />
        <small>
          The model this page should display.
        </small>
      </div>

      { !!(props.model || props.block.model) && (
        <div className="mb-3">
          <label className="form-label">
            Choose Form
          </label>
          <Select options={ getForms() } defaultValue={ getForms().filter((f) => f.selected) } onChange={ onForm } />
          <small>
            The forms that this grid will filter by.
          </small>
        </div>
      ) }

      <hr />
        
      <div className="mb-3">
        <div className="form-check form-switch">
          <input className="form-check-input" id="is-required" type="checkbox" onChange={ onBackground } checked={ props.block.background } />
          <label className="form-check-label" htmlFor="is-required">
            Enable Background
          </label>
        </div>
      </div>
    </>
  );
}

// export default
export default BlockFormConfig;