
// import react
import React from 'react';
import { Select } from '@dashup/ui';

// block list
const FieldDateConfig = (props = {}) => {

  // get date
  const getDate = () => {
    // return date
    return ['Date', 'Date Time', 'Custom'].map((label) => {
      // return value
      return {
        label,
        value : label.split(' ').join('').toLowerCase(),

        selected : label.split(' ').join('').toLowerCase() === (props.field.date || 'datetime'),
      }
    });
  };

  // get format
  const getFormat = () => {
    // check format
    if (props.field.format) return props.field.format;

    // check type
    if (props.field.date === 'date') return 'MMM DD YYYY';

    // return with time
    return 'MMM DD YYYY hh:mm a';
  };

  // on background
  const onDate = (val) => {
    // on background
    props.setField(props.field, 'date', val?.value);
  };

  // on background
  const onFormat = (e) => {
    // on background
    props.setField(props.field, 'format', e.target.value);
  };

  // on background
  const onRepeat = (e) => {
    // on background
    props.setField(props.field, 'repeat', e.target.checked);
  };

  // on background
  const onDuration = (e) => {
    // on background
    props.setField(props.field, 'duration', e.target.checked);
  };

  // return jsx
  return (
    <>
      <div className="mb-3">
        <label className="form-label">
          Date Type
        </label>
        <Select options={ getDate() } defaultValue={ getDate().filter((f) => f.selected) } onChange={ onDate } isClearable />
      </div>

      { (props.field.date || 'datetime') === 'custom' && (
        <div className="mb-3">
          <label className="form-label">
            Date Format
          </label>
          <input className="form-control" type="text" onChange={ onFormat } defaultValue={ getFormat() } />
        </div>
      ) }
    
      <div className="mb-3">
        <div className="form-check form-switch">
          <input className="form-check-input" id="enable-repeat" type="checkbox" onChange={ onRepeat } defaultChecked={ props.field.repeat } />
          <label className="form-check-label" htmlFor="enable-repeat">
            Enable Repeat Values
          </label>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="form-check form-switch">
          <input className="form-check-input" id="enable-duration" type="checkbox" onChange={ onDuration } defaultChecked={ props.field.duration } />
          <label className="form-check-label" htmlFor="enable-duration">
            Enable Duration
          </label>
        </div>
      </div>
    </>
  );
}

// export default
export default FieldDateConfig;