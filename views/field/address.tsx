
// import dependencies
import { Form, Dropdown } from '@dashup/ui';
import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';

// text field
const FieldAddress = (props = {}) => {
  // use state
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState(props.value?.formatted || '');

  // on select
  const onSelect = async (address, placeId = null) => {
    // log
    setAddress(address);

    // load address
    const loaded = (placeId ? await geocodeByPlaceId(placeId) : await geocodeByAddress(address))[0];

    // set actual value
    const actualValue = {
      id  : loaded.place_id,
      geo : {
        lat : loaded.geometry.location.lat(),
        lng : loaded.geometry.location.lng(),
      },
      json : {
        city     : (loaded.address_components.find((c) => c.types.includes('locality')) || {}).short_name,
        state    : (loaded.address_components.find((c) => c.types.includes('administrative_area_level_1')) || {}).short_name,
        street   : (loaded.address_components.find((c) => c.types.includes('route')) || {}).long_name,
        number   : (loaded.address_components.find((c) => c.types.includes('street_number')) || {}).long_name,
        country  : (loaded.address_components.find((c) => c.types.includes('country')) || {}).long_name,
        postcode : (loaded.address_components.find((c) => c.types.includes('postal_code')) || {}).long_name,
      },
      formatted  : address,
      components : loaded.address_components
    };
    
    // set address
    props.onChange(props.field, actualValue);
  };
  
  // on component
  const onComponent = (e, key) => { 
    // set value
    const value = props.value || {};

    // set value
    if (!value.json) value.json = {};

    // set value
    value.json[key] = e.target.value;

    // set formatted
    value.formatted = `${value.json.number || ''} ${value.json.street || ''}, ${value.json.city || ''} ${value.json.state || ''}, ${value.json.country || ''}`;
    
    // set value
    setAddress(value.formatted);
    
    // set address
    props.onChange(props.field, value);
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
      <PlacesAutocomplete
        value={ address }
        onSelect={ onSelect }
        onChange={ setAddress }
        >
        { ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {

          // return jsx
          return (
            <Dropdown align="end">
              <div className="d-flex">
                <input
                  { ...getInputProps({
                    readOnly     : props.readOnly,
                    className    : 'form-control',
                    placeholder  : props.field.placeholder || `Enter ${props.field.label}`,
                    autoComplete : 'none',
                  }) }
                />
                <Dropdown.Toggle variant={ editing ? 'primary' : 'secondary' } className="ms-2 flex-0">
                  <i className="fa fa-pencil" />
                </Dropdown.Toggle>
              </div>

              { !!(loading || suggestions.length) && (
                <div className="autocomplete-dropdown-container dropdown-menu show w-100">
                  { loading && <Dropdown.Item>Loading...</Dropdown.Item> }
                  { suggestions.map((suggestion, i) => {
                    // return jsx
                    return (
                      <Dropdown.Item
                        { ...getSuggestionItemProps(suggestion) }
                        key={ `sugg-${suggestion.placeId}` }
                        active={ suggestion.active }
                      >
                        { suggestion.description }
                      </Dropdown.Item>
                    );
                  }) }
                </div>
              ) }

              <Dropdown.Menu className="p-3" align="end">
                <div className="row">
                  <div className="col-4 mb-3">
                    <label className="form-label">
                      Street Number
                    </label>
                    <input className="form-control" placeholder="Street Number" defaultValue={ props.value?.json?.number } onChange={ (e) => onComponent(e, 'number') } />
                  </div>
                  <div className="col-8 mb-3">
                    <label className="form-label">
                      Street Name
                    </label>
                    <input className="form-control" placeholder="Street Name" defaultValue={ props.value?.json?.street } onChange={ (e) => onComponent(e, 'street') } />
                  </div>
                  <div className="col-4">
                    <label className="form-label">
                      City
                    </label>
                    <input className="form-control" placeholder="City" defaultValue={ props.value?.json?.city } onChange={ (e) => onComponent(e, 'city') } />
                  </div>
                  <div className="col-4">
                    <label className="form-label">
                      State
                    </label>
                    <input className="form-control" placeholder="State" defaultValue={ props.value?.json?.state } onChange={ (e) => onComponent(e, 'state') } />
                  </div>
                  <div className="col-4">
                    <label className="form-label">
                      Postcode
                    </label>
                    <input className="form-control" placeholder="Postcode" defaultValue={ props.value?.json?.postcode } onChange={ (e) => onComponent(e, 'postcode') } />
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          )
        } }
      </PlacesAutocomplete>
      { !!props.field.help && !props.noLabel && (
        <Form.Text className="form-help">
          { props.field.help }
        </Form.Text>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldAddress;

/*

    */