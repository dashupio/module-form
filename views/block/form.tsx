
// import react
import { Form } from '@dashup/ui';
import { Button } from 'react-bootstrap';
import ReactPerfectScrollbar from 'react-perfect-scrollbar';
import React, { useState, useEffect } from 'react';

// block list
const BlockForm = (props = {}) => {
  // use state
  const [item, setItem] = useState(props.item);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [prevent, setPrevent] = useState(false);
  const [actualData, setActualData] = useState((props.item && props.item.get()) || {});
  const [submitting, setSubmitting] = useState(false);

  // use effect
  useEffect(() => {
    // updating
    let timeout = null;
    let updating = false;

    // set loading
    if (props.item && !item) {
      // updating
      updating = true;
    } else if (!props.item && item) {
      // updating true
      updating = true;
    } else if (props.item && item && props.item.get('_id') !== item.get('_id')) {
      // updating
      updating = true;
    }

    // check updating
    if (updating) {
      setItem(props.item);
      setLoading(true);
      setActualData((props.item && props.item.get()) || {});

      // timeout
      timeout = setTimeout(() => {
        setLoading(false);
      }, 200);
    }

    // return done
    return () => {
      clearTimeout(timeout);
    };
  }, [props.item && props.item.get()]);

  // get forms
  const getForms = () => {
    // get model
    const model = props.block.model || props.model;

    // get forms
    const forms = props.getForms([model]);

    // return forms
    return forms;
  };

  // get forms
  const getFields = () => {
    // get forms
    const fields = props.getFields(getForms());

    // return forms
    return fields;
  };

  // set data
  const setData = (data) => {
    // set updated
    setUpdated(true);
    setActualData(data);
  };

  // on submit
  const onSubmit = async (e) => {
    // prevent
    e.preventDefault();
    e.stopPropagation();

    // check submitting
    if (submitting) return;

    // submitting
    setSubmitting(true);

    // submit form
    const result = await props.dashup.action({
      type   : 'page',
      page   : props.page.get('_id'),
      form   : props.page.get('_id'),
      model  : props.page.get('data.model'),
      struct : 'form',
    }, 'form.submit', {
      _id : props.item ? props.item.get('_id') : null,

      ...actualData,
    });

    console.log(result);

    // submitting
    setSubmitting(false);
  };

  // return jsx
  return (
    <div className={ `flex-1 d-flex flex-column h-100 w-100${props.block.background ? ' card' : ''}` }>
      { !!props.block.label && (
        <div className={ props.block.background ? 'card-header' : 'mb-2' }>
          <b>{ props.block.name }</b>
        </div>
      ) }
      <ReactPerfectScrollbar className={ `${props.block.background ? 'card-body' : 'flex-1'} p-relative` }>
        { loading ? (
          <div className="w-100 h-100 d-flex align-items-center">
            <i className="fa fa-spinner fa-spin h1 m-auto" />
          </div>
        ) : (
          <div className="w-100 h-100">
            <Form
              id={ props.page.get('_id') }
              data={ actualData }
              page={ props.page }
              fields={ getFields() }
              dashup={ props.dashup }
              setData={ setData }
              updating={ false }
              onSubmit={ (e) => onSubmit(e) }
              available={ props.available.fields }
              setPrevent={ setPrevent }
              getFieldStruct={ props.getFieldStruct }
              />
          </div>
        ) }
      </ReactPerfectScrollbar>
      { !!getForms() && !!getForms().length && (
        <div className={ `d-flex justify-content-end ${props.block.background ? 'card-footer' : 'mt-2'}` }>
          { loading === 'submit' ? (
            <Button variant="success" disabled>
              { props.item ? 'Updating...' : 'Submitting...' }
            </Button>
          ) : (
            <Button variant="success" disabled={ prevent || !updated } onClick={ (e) => onSubmit(e) }>
              { props.item ? 'Update' : 'Submit' }
            </Button>
          ) }
        </div>
      ) }
    </div>
  );
};

// export block form
export default BlockForm;