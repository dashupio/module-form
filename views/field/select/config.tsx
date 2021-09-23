
// import dependencies
import shortid from 'shortid';
import { Color, Button } from '@dashup/ui';
import { ReactSortable } from 'react-sortablejs';
import React, { useState } from 'react';

// colors
import colors from '../colors';

// global timer
let timer;

// global debounce
const debounce = (func, timeout = 1000) => {

  // return debounced
  return (...args) => {
    // clear timeout previously
    clearTimeout(timer);

    // create new timeout
    timer = setTimeout(() => func(...args), timeout);
  };
}

// text field
const FieldSelectConfig = (props = {}) => {
  // set state
  const [color, setColor] = useState(null);
  const [option, setOption] = useState(false);
  const [updated, setUpdated] = useState(new Date());
  const [options, setStateOptions] = useState((props.field.options || []).map((o) => {
    // check option
    if (!o.uuid) o.uuid = shortid();

    // set option
    return o;
  }));

  // set options
  const setOptions = (opts) => {
    // state
    setStateOptions(opts);
    debounce(props.setField, 200)(props.field, 'options', opts);
  };
  
  // on name
  const onName = (option, value) => {
    // on name
    option.label = value;
    option.value = value;

    // set options
    setUpdated(new Date());
    setOptions(options);
  };
  
  // on name
  const onColor = (option, color) => {
    // on name
    option.color = color;

    // set options
    setUpdated(new Date());
    setOptions(options);
  };

  // on remove
  const onRemove = (i) => {
    // splice
    const newOptions = options;

    // splice
    newOptions.splice(i, 1);

    // set options
    setUpdated(new Date());
    setOptions(options);
  };

  // on create
  const onCreate = (e) => {
    // set options
    setOptions([...options, {
      uuid  : shortid(),
      value : '',
      color : 'primary',
    }]);
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
            <div key={ `option-${option.uuid}` } className="mb-3">
              <label className="form-label">
                Option #{ i + 1 }
              </label>
              <div className="d-flex flex-row">
                <Button variant={ colors[option.color] ? option.color : null } className="btn-picker flex-0 me-2 m-0" onClick={ (e) => !setColor(e.target) && setOption(option) } style={ {
                  background : colors[option.color] || option.color?.hex || option.color || null,
                } }>
                  &nbsp;
                </Button>

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

      { !!color && !!option && <Color show target={ color } color={ colors[option.color || 'primary'] || option.color?.hex } colors={ Object.values(colors) } onChange={ (c) => onColor(option, c) } onHide={ () => !setColor(null) && setOption(false) } /> }
    </>
  );
};

// export default
export default FieldSelectConfig;