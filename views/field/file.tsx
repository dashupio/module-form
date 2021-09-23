
// import dependencies
import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';
import { Form, ProgressBar } from '@dashup/ui';

// scss
import './upload.scss';

// text field
const FieldFile = (props = {}) => {
  // value
  const value = props.value;

  // value
  const initialValue = Array.isArray(value) ? value : (value && [value]) || [];

  // useState
  const [values, setValues] = useState(initialValue);

  // new values
  let newValues = values;

  // do upload
  const doUpload = async (value) => {
    // create form data
    const body = new FormData();

    // set loading
    if (props.setPrevent) props.setPrevent(true);

    // append image
    body.append('file', value.file);
    body.append('temp', value.temp);

    // create xhr request
    const xhr = new XMLHttpRequest();

    // add progress
    xhr.upload.addEventListener('progress', (e) => {
      // set values
      const done  = e.position || e.loaded;
      const total = e.totalSize || e.total;

      // uploaded
      value.uploaded = (Math.floor(done / total) / 10);
      value.uploaded = value.uploaded === Infinity ? 100 : value.uploaded;

      // new values
      newValues = [...newValues.filter((v) => v.temp !== value.temp), value];

      // set values
      setValues(newValues);
    });

    // await done
    xhr.addEventListener('load', () => {
      // upload
      const { upload } = JSON.parse(xhr.responseText);

      // new values
      newValues = [...newValues.filter((v) => v.temp !== value.temp), upload];

      // set values
      setValues(newValues);

      // on change
      props.onChange(props.field, newValues);

      // set loading
      if (props.setPrevent) props.setPrevent(false);
    });

    // open and post
    xhr.open('POST', '/media/file');
    xhr.send(body);
  };

  // on upload
  const onUpload = (e) => {
    // check files
    if (e.target.files.length === 0) {
      // alert
      return eden.alert.alert('error', 'Please set files');
    }

    // loop files
    [...(e.target.files || [])].forEach((file) => {
      // create new reader
      const fr = new FileReader();

      // onload
      fr.onload = () => {
        // let value
        const value = {
          'src'      : fr.result,
          'file'     : file,
          'name'     : file.name,
          'size'     : file.size,
          'temp'     : uuid(),
          'uploaded' : 0
        };

        // values
        newValues = [...newValues, value];

        // set values
        setValues(newValues);

        // do upload
        doUpload(value);
      };

      // read file
      fr.readAsDataURL(file);
    });
  };

  // on remove
  const onRemove = (item) => {
    // new values
    newValues = newValues.filter((v) => (v.temp && v.temp !== item.temp) || (v.id && v.id !== item.id));

    // set values
    setValues(newValues);

    // on change
    props.onChange(props.field, newValues);
  };

  // return text field
  return (
    <Form.Group className={ props.noLabel ? '' : 'mb-3' } controlId={ props.field.uuid }>
      { !props.noLabel && (
        <Form.Label className="w-100">
          { props.field.label || (
            <a href="#!" onClick={ (e) => !props.onConfig(props.field) && e.preventDefault() }>
              <i>Set Label</i>
            </a>
          ) }  
        </Form.Label>
      ) }
      
      { props.field.input === 'input' ? (
        <>
          <div>
            { values.map((file, i) => {
              // return jsx
              return (
                <div key={ `file-${file.id || file.temp}` } className="d-inline">
                  { file.id && (
                    <input type="hidden" name={ `${props.name}[${i}]` } value={ file.id } className="file-input" />
                  ) }
                  <div className="btn-group me-2 mb-2">
                    <a className="btn btn-secondary text-overflow" target="_blank">
                      { file.name }
                    </a>
                    <button onClick={ (e) => onRemove(file) } className="btn btn-danger">
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>
              );
            }) }
          </div>
          { values.filter((file) => file.uploaded).map((file, i) => {
            // return jsx
            return (
              <ProgressBar key={ `progress-${file.id || file.temp}` } now={ file.uploaded } className="my-3" />
            )
          }) }
          { !!(!values.length || props.field.multiple) && (
            <input type="file" className="form-control" onChange={ (e) => onUpload(e) } accept={ props.field.accept } multiple={ props.field.multiple } />
          )}
        </>
      ) : (
        <div className="row row-eq-height upload upload-files">
          { values.map((file, i) => {
            // return jsx
            return (
              <div key={ `file-${file.id || file.temp}` } className={ props.column ? 'mb-2' : `${props.field.size || 'col-6 col-md-4 col-xl-3'} form-group-image mb-2` }>
                { file.id && (
                  <input type="hidden" name={ `${props.name}[${i}]` } value={ file.id } className="file-input" />
                ) }
                <div className="card card-outline-primary">
                  { props.field.multiple && (
                    <span className="btn-group p-0">
                      <button onClick={ (e) => onPrev(e, i) } className="btn btn-primary">
                        <i className="fa fa-chevron-left" />
                      </button>
                      <button onClick={ (e) => onNext(e, i) } className="btn btn-primary">
                        <i className="fa fa-chevron-right" />
                      </button>
                    </span>
                  ) }
                  
                  <button onClick={ (e) => !e.preventDefault() && onRemove(file, i) } className="btn btn-danger">
                    <i className="fa fa-times" />
                  </button>

                  { !!file.uploaded && (
                    <ProgressBar now={ file.uploaded } />
                  ) }
                  
                  { !!file.url && (
                    <a className="name" href={ file.url } target="_blank">{ file.name }</a>
                  ) }
                </div>
              </div>
            );
          }) }
          
          { (!values.length || props.field.multiple) && (
            <div className={ props.column ? 'mb-2' : `${props.field.size || 'col-6 col-md-4 col-xl-3'} mb-2` }>
              <label className="card card-outline-success card-upload">
                <input type="file" className="file-input" multiple={ props.field.multiple } accept={ props.field.accept } onChange={ (e) => onUpload(e) } />
                <div className="d-flex align-items-center">
                  <div>
                    <i className="fa fa-plus" />
                    <div className="upload-label mt-2">
                      { props.field.placeholder || `Upload ${props.field.label}` }
                    </div>
                  </div>
                </div>
              </label>
            </div>
          ) }
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
export default FieldFile;