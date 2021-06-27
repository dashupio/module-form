
// import react
import React from 'react';

// block list
const FieldFileConfig = (props = {}) => {

  // on background
  const onInput = (e) => {
    // on background
    props.setField(props.field, 'input', e.target.checked ? 'input' : 'boxed');
  };

  // return jsx
  return (
    <>
    
      <div className="mb-3">
        <div className="form-check form-switch">
          <input className="form-check-input" id="enable-repeat" type="checkbox" onChange={ onInput } defaultChecked={ props.field.input === 'input' } />
          <label className="form-check-label" htmlFor="enable-repeat">
            Use Small Input
          </label>
        </div>
      </div>
    </>
  );
}

// export default
export default FieldFileConfig;