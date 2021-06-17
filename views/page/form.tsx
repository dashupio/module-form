
// import dependencies
import { Button } from 'react-bootstrap';
import { Page, Form } from '@dashup/ui';
import React, { useState, useEffect } from 'react';

// create model page
const FormPage = (props = {}) => {
  // groups
  const [config, setConfig] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [prevent, setPrevent] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [actualData, setActualData] = useState((props.item && props.item.get()) || {});
  const [submitting, setSubmitting] = useState(false);

  // required
  const required = [{
    key   : 'data.model',
    label : 'Model',
  }];

  // use effect
  useEffect(() => {
    // set loading
    if (props.item) {
      // set data
      setActualData((props.item && props.item.get()) || {});
    } else if (!props.item) {
      // set data
      setActualData({});
    }
  }, [props.page.get('_id'), props.page.get('data.model'), props.page.get('type'), props.item && props.item.toJSON()]);

  // on fields
  const setFields = (fields, prevent) => {
    // prevent
    if (!prevent) {
      // on fields
      return props.setData('fields', [...fields]);
    } else {
      // without save
      return props.page.set('data.fields', [...fields]);
    }
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

  // on remove
  const onRemove = async (e) => {
    // prevent
    e.preventDefault();
    e.stopPropagation();

    // loading
    setRemoving(true);
    
    // await
    await props.item.remove();
    
    // loading
    setRemoving(false);

    // go
    let redirect = `/app/${props.page.get('_id')}`;

    // check redirect
    if (`${window.location.search}`.includes('?redirect=')) {
      // set redirect
      redirect = window.location.search.split('redirect=')[1].split('?')[0];
    }

    // go
    eden.router.go(redirect);
  };

  // return jsx
  return (
    <Page { ...props } loading={ loading } require={ required } bodyClass="flex-column">

      <Page.Config show={ config } onHide={ (e) => setConfig(false) } />

      <Page.Menu onConfig={ () => setConfig(true) } onShare>
        { props.dashup.can(props.page, 'manage') && (
          <button className={ `me-2 btn btn-${!updating ? 'link text-dark' : 'primary'}` } onClick={ (e) => setUpdating(!updating) }>
            <i className={ `fat fa-${!updating ? 'pencil' : 'check'} me-2` } />
            { !updating ? 'Alter Form' : 'Finish Altering' }
          </button>
        ) }
      </Page.Menu>
      SUB MENU
      { props.route === 'remove' ? (
        <Page.Body>
          <div className="px-0 px-lg-3 container-lg">
            <div className="card">
              <div className="card-body lead">
                Are you sure you want to remove this item?
              </div>

              <div className="card-footer text-end pt-0 pb-3">
                <button className="btn btn-danger" onClick={ (e) => onRemove(e) }>
                  { removing ? 'Removing...' : 'Remove' }
                </button>
              </div>
            </div>
          </div>
        </Page.Body>
      ) : (
        <Page.Body>
          <div className="px-0 px-lg-3 container-lg">
            <div className="card">
              { success ? (
                <div className="card-body text-center">
                  <h1 className="my-5">
                    Successfully submitted { props.page.get('name') }.
                  </h1>
                </div>
              ) : (
                <>
                  <div className="card-body p-relative">
                    <Form
                      id={ props.page.get('_id') }
                      data={ actualData }
                      page={ props.page }
                      fields={ props.page.get('data.fields') || [] }
                      dashup={ props.dashup }
                      setData={ setData }
                      updating={ props.dashup.can(props.page, 'manage') && updating }
                      onSubmit={ (e) => onSubmit(e) }
                      getForms={ props.getForms }
                      getField={ props.getField }
                      getFields={ props.getFields }
                      setFields={ setFields }
                      available={ props.available.fields }
                      setPrevent={ setPrevent }
                      getFieldStruct={ props.getFieldStruct }
                      />
                  </div>
                  <div className="card-footer text-end pt-0 pb-3">
                    { submitting ? (
                      <Button disabled variant="success">
                        { props.current ? 'Updating...' : 'Submitting...' }
                      </Button>
                    ) : (
                      <Button variant="success" disabled={ !updated || prevent } onClick={ (e) => onSubmit(e) }>
                        { prevent ? 'Uploading...' : (props.current ? 'Update' : 'Submit') }
                      </Button>
                    ) }
                  </div>
                </>
              ) }
            </div>
          </div>
        </Page.Body>
      ) }
    </Page>
  );
};

// export default form page
export default FormPage;