
// import dependencies
import { Form } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import React, { useState, useEffect } from 'react';

// text field
const FieldUser = (props = {}) => {
  // search
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);

  // get value
  const getValue = () => {
    // get array of values
    const values = Array.isArray(props.value) ? props.value : (props.value && [props.value]) || [];

    // return options
    const options = values.map((item) => {
      // return value
      return {
        data  : item,
        value : item._id,
        label : item.name,
      };
    });

    // return single
    if (!props.field.multiple) return options[0];
    
    // return all
    return options;
  };

  // load options
  const loadOptions = async (inputValue) => {
    // load data
    const data = await (await fetch(`/app/${props.dashup && props.dashup.get('_id')}/member/query`)).json();

    // return map
    return data.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())).map((item) => {
      // return value
      return item;
    });
  };

  // use effect
  useEffect(() => {
    // load options
    loadOptions(search).then(setOptions);
  }, [props.field.uuid]);

  // custom option
  const Option = ({ data, isDisabled, isSelected, innerProps, innerRef }) => {
    // return jsx
    return !isDisabled ? (
      <div
        ref={ innerRef }
        className={ `dropdown-item d-flex align-items-center flex-row px-3 py-2${isSelected ? ' active' : ''}` }
        { ...innerProps }
      >
        { data.image && (
          <span className="btn btn-sm btn-circle me-1" style={ {
            backgroundImage : `url(${data.image})`
          } }>&nbsp;</span>
        ) }
        <span className="text-overflow">
          { data.label }
        </span>
      </div>
    ) : null;
  };

  // return text field
  return (
    <Form.Group className={ props.noLabel ? '' : 'mb-3' } controlId={ props.field.uuid }>
      { !props.noLabel && (
        <Form.Label>
          { props.field.label || (
            <a href="#!" onClick={ (e) => !props.onConfig(props.field) && e.preventDefault() }>
              <i>Set Label</i>
            </a>
          ) }  
        </Form.Label>
      ) }
      <AsyncSelect
        isClearable
        cacheOptions

        isMulti={ props.field.multiple }
        onChange={ (e) => props.onChange(props.field, Array.isArray(e) ? e.map((i) => i?.value) : e?.value) }
        components={ { Option } }
        placeholder={ props.field.placeholder || `Enter ${props.field.label}` }
        loadOptions={ loadOptions }
        defaultValue={ getValue() }
        onInputChange={ (v) => setSearch(v) }
        defaultOptions={ options }
        />
      { !!props.field.help && !props.noLabel && (
        <Form.Text className="form-help">
          { props.field.help }
        </Form.Text>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldUser;