
// import react
import React from 'react';
import CountryList from 'country-list';
import { Select } from '@dashup/ui';

// block list
const FieldPhoneConfig = (props = {}) => {

  // get country
  const getCountry = () => {
    // return map
    return CountryList.getData().map(({ code, name }) => {
      // return value
      return {
        label : name,
        value : code.toLowerCase(),

        selected : props.field.country === code.toLowerCase(),
      }
    });
  };

  // on background
  const onCountry = (val) => {
    // on background
    props.setField(props.field, 'country', val?.value);
  };

  // return jsx
  return (
    <>
      <div className="mb-3">
        <label className="form-label">
          Default Country
        </label>
        <Select options={ getCountry() } defaultValue={ getCountry().filter((f) => f.selected) } onChange={ onCountry } isClearable />
      </div>
    </>
  );
}

// export default
export default FieldPhoneConfig;