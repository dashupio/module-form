
// import dependencies
import { Dropdown } from 'react-bootstrap';
import { ReactSortable } from 'react-sortablejs';
import React, { useState } from 'react';

// text field
const FieldSelectConfig = (props = {}) => {
  // set state
  const [options, setStateOptions] = useState(props.field.options || []);

  // const
  const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  // set options
  const setOptions = (opts) => {
    // state
    setStateOptions(opts);
    props.setField(props.field, 'options', opts);
  };
  
  // on name
  const onName = (option, value) => {
    // on name
    option.label = value;
    option.value = value;

    // set options
    setOptions([...options]);
  };
  
  // on name
  const onColor = (option, color) => {
    // on name
    option.color = color;

    // set options
    setOptions([...options]);
  };

  // on remove
  const onRemove = (i) => {
    // splice
    const newOptions = options;

    // splice
    newOptions.splice(i, 1);

    // set options
    setOptions([...newOptions]);
  };

  // on create
  const onCreate = (e) => {
    // set options
    setOptions([...options, {}]);
  };

  // return text field
  return (
    <>
      <ReactSortable
        list={ options }
        handle=".move"
        setList={ (list) => setOptions(list) }
      >
        { (options || []).map((option, i) => {
          // return jsx
          return (
            <div key={ `option-${i}` } className="mb-3">
              <label className="form-label">
                Option #{ i + 1 }
              </label>
              <div className="d-flex flex-row">
                <Dropdown>
                  <Dropdown.Toggle variant={ option.color || 'secondary' } className="btn-picker flex-0 me-2 m-0">
                    &nbsp;
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="p-3">
                    { colors.map((color, i) => {
                      // return jsx
                      return (
                        <button key={ `color-${color}` } className={ `btn-picker bg-${color} me-2` } onClick={ (e) => onColor(option, color) } />
                      );
                    }) }
                  </Dropdown.Menu>
                </Dropdown>

                <input type="text" value={ option.value } className="form-control flex-1" onChange={ (e) => onName(option, e.target.value) } />

                <button className="btn btn-secondary move ms-2">
                  <i className="fa fa-arrows" />
                </button>

                <button className="btn btn-danger ms-2" onClick={ (e) => onRemove(i) }>
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
          );
        }) }
      </ReactSortable>
      <button className="btn btn-success me-3" onClick={ (e) => onCreate(e) }>
        Add Option
      </button>
    </>
  );
};

// export default
export default FieldSelectConfig;