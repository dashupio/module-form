
// import dependencies
import { Select } from '@dashup/ui';
import { Form, Dropdown } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

// text field
const FieldUser = (props = {}) => {
  // search
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);

  // get short name
  const getName = (user) => {
    // get name
    const name = `${user.name || ''}`.trim() || 'N A';

    // return name
    return `${(name.split(' ')[0] || '')[0] || ''}${(name.split(' ')[1] || '')[0] || ''}`;
  };

  // get value
  const getValue = () => {
    // value
    const value = props.value;

    // get array of values
    const values = Array.isArray(value) ? value : (value && [value]) || [];

    // return options
    const options = values.map((item) => {
      // return value
      return {
        data  : item,
        value : item.id || item._id,
        label : item.name,
      };
    });

    // return single
    if (!props.field.multiple) return options[0];
    
    // return all
    return options;
  };

  // load options
  const loadOptions = async (inputValue = '') => {
    // load data
    const data = await (await fetch(`/app/${props.dashup && props.dashup.get('_id')}/member/query`)).json();

    // return map
    return data.filter((item) => `${item.label}`.toLowerCase().includes(`${inputValue}`.toLowerCase())).map((item) => {
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
      <Dropdown.Item className="d-flex align-items-center" ref={ innerRef } active={ isSelected } { ...innerProps }>
        <span className="tags">
          <span className="btn btn-sm btn-circle me-2" style={ {
            backgroundImage : data.image && `url(${data.image})`
          } }>
            { data.image ? '' : getName(data.data) }
          </span>
        </span>
        <span className="text-overflow">
          { data.label }
        </span>
      </Dropdown.Item>
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
      <Select
        async
        isClearable
        cacheOptions
        menuIsOpen={ props.menuIsOpen }
        menuPortalTarget={ props.menuPortalTarget }

        value={ getValue() }
        isMulti={ props.field.multiple }
        onClick={ (e) => e.stopPropagation() }
        readOnly={ props.readOnly }
        onChange={ (e) => props.onChange(props.field, Array.isArray(e) ? e.map((i) => i?.data) : e?.data) }
        components={ { Option } }
        placeholder={ props.field.placeholder || `Select ${props.field.label}` }
        loadOptions={ loadOptions }
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