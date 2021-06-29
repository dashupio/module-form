
// import dependencies
import { Form } from 'react-bootstrap';
import { Form as DUForm } from '@dashup/ui';
import React, { useState } from 'react';

// clors
import colors from '../colors';

// text field
const FieldGroup = (props = {}) => {
  // let value
  let val = props.value || [{}];

  // check value
  if (!Array.isArray(val)) val = [val].filter((v) => v);

  // set value
  const [value, setValue] = useState(val);

  // on remove
  const onRemove = (i) => {
    // remove
    value.splice(i, 1);

    // update
    setValue([...value]);

    // set to parent
    props.onChange(props.field, value);
  };

  // on create
  const onCreate = () => {
    // add value
    setValue([...value, {}]);

    // set to parent
    props.onChange(props.field, value);
  };

  // on value
  const setData = (data, i) => {
    // set data
    value[i] = data;

    // set to parent
    props.onChange(props.field, value);
  };

  // return text field
  return (
    <Form.Group className={ props.noLabel ? '' : 'mb-3' } controlId={ props.field.uuid }>
      { !props.noLabel && !!props.field.multiple && (
        <Form.Label>
          { props.field.label || (
            <a href="#!" onClick={ (e) => !props.onConfig(props.field) && e.preventDefault() }>
              <i>Set Label</i>
            </a>
          ) }  
        </Form.Label>
      ) }
      
      { value.map((val, i) => {

        // return jsx
        return (
          <div key={ `val-${i}` } className={ `card card-sm${i > 0 ? ' mt-3' : ''}${props.field.color ? ' has-color' : ''}` }>
            <div className="color-strip" style={ {
              background : colors[props.field.color] || props.field.color?.hex || null,
            } } />
            { !props.noLabel && !props.field.multiple && (
              <div className="card-header">
                { props.field.label || (
                  <a href="#!" onClick={ (e) => !props.onConfig(props.field) && e.preventDefault() }>
                    <i>Set Label</i>
                  </a>
                ) }  
              </div>
            ) }

            <div className="card-body pb-0">
              <DUForm
                { ...props }

                id={ props.page.get('_id') }
                iKey={ i }
                data={ val }
                adds={ false }
                parent={ props.field.uuid }
                setData={ (d) => setData(d, i) }
                available={ [...props.available].filter((v) => v.type !== 'group') }
                />
            </div>

            { !!props.field.multiple && (
              <div className="card-footer d-flex">
                <button type="button" className="btn btn-danger ms-auto" onClick={ (e) => !onRemove(i) && e.preventDefault() }>
                  { `Remove ${props.field.label || 'Item'}` }
                </button>
              </div>
            ) }
          </div>
        );
      }) }
    
      { !!props.field.multiple && (
        <div className="d-flex mt-3">
          <button type="button" className="btn btn-success ms-auto" onClick={ (e) => !onCreate() && e.preventDefault() }>
            { `Add ${props.field.label || 'Item'}` }
          </button>
        </div>
      ) }

      { !!props.field.help && !props.noLabel && (
        <Form.Text className="form-help">
          { props.field.help }
        </Form.Text>
      ) }
    </Form.Group>
  );
};

// export default
export default FieldGroup;