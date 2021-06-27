
// import dependencies
import { Button } from 'react-bootstrap';
import { Page, Form } from '@dashup/ui';
import React, { useState, useEffect } from 'react';

// create model page
const FormPage = (props = {}) => {
  // groups
  const [share, setShare] = useState(false);
  const [route, setRoute] = useState(props.route);
  const [config, setConfig] = useState(false);
  const [updated, setUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [prevent, setPrevent] = useState(false);
  const [creating, setCreating] = useState(false);
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
  }, [props.page.get('_id'), props.page.get('data.model'), props.item && props.item.toJSON()]);

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
    setActualData({ ...data });
  };

  // on submit
  const onCreate = async (e) => {
    // prevent
    setActualData({});
    props.setItem(null);

    // set no form
    setCreating(true);

    // unset
    setTimeout(() => setCreating(false), 200);
  }

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

    // set item
    props.setItem(new props.dashup.Model(result, props.dashup));

    // set success
    setSuccess(true);
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
    let redirect = null;

    // check redirect
    if (`${window.location.search}`.includes('?redirect=')) {
      // set redirect
      redirect = window.location.search.split('redirect=')[1].split('?')[0];
    }

    // go
    if (redirect) return eden.router.go(redirect);

    // recreate
    onCreate(e);
    setRoute(null);
  };

  // return jsx
  return (
    <Page { ...props } loading={ loading } require={ required } bodyClass="flex-column">

      <Page.Share show={ share } onHide={ (e) => setShare(false) } />
      <Page.Config show={ config } onHide={ (e) => setConfig(false) } />

      <Page.Menu onConfig={ () => setConfig(true) } presence={ props.presence } onShare={ () => setShare(true) }>
        { props.dashup.can(props.page, 'manage') && (
          <button className={ `me-2 btn btn-${!updating ? 'link text-dark' : 'primary'}` } onClick={ (e) => setUpdating(!updating) }>
            <i className={ `fat fa-${!updating ? 'pencil' : 'check'} me-2` } />
            { !updating ? 'Alter Form' : 'Finish Altering' }
          </button>
        ) }
      </Page.Menu>
      { route === 'remove' ? (
        <Page.Body>
          <div className="px-0 px-lg-3 container-lg">
            <div className="card">
              <div className="card-body text-center">
                <h1 className="my-5">
                  Are you sure you want to remove this item?
                </h1>
              </div>

              <div className="card-footer d-flex pt-0 pb-3">
                <Button variant="info" className="me-auto" onClick={ (e) => setRoute(null) }>
                  Back
                </Button>
                <Button variant="danger" className="ms-auto" onClick={ (e) => onRemove(e) }>
                  { removing ? 'Removing...' : 'Remove' }
                </Button>
              </div>
            </div>
          </div>
        </Page.Body>
      ) : (
        <Page.Body>
          <div className="px-0 px-lg-3 container-lg">
            <div className="card">
              { success ? (
                <>
                  <div className="card-body text-center">
                    <h1 className="my-5">
                      Successfully submitted { props.page.get('name') }.
                    </h1>
                  </div>
                  <div className="card-footer d-flex pt-0 pb-3">
                    <Button variant="info" className="me-auto" onClick={ (e) => setSuccess(false) }>
                      Back
                    </Button>
                    <Button variant="success" className="ms-auto" onClick={ (e) => !props.setItem(null) && !setActualData({}) && !setSuccess(false) }>
                      Create New
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="card-body p-relative">
                    { !creating && (
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
                    ) }
                  </div>
                  <div className="card-footer d-flex pt-0 pb-3">
                    { submitting ? (
                      <Button disabled variant="success" className="ms-auto">
                        { props.item && props.item.get('_id') ? 'Updating...' : 'Submitting...' }
                      </Button>
                    ) : (
                      <>
                        { !!props.item && !!props.item.get('_id') && (
                          <>
                            { !!props.dashup.can(props.page, 'submit') && (
                              <Button variant="danger" className="me-2" onClick={ (e) => setRoute('remove') }>
                                Remove
                              </Button>
                            ) }
                            <Button variant="info" className="me-auto" onClick={ (e) => onCreate(e) }>
                              Create New
                            </Button>
                          </>
                        ) }
                        <Button variant="success" className="ms-auto" disabled={ !updated || prevent } onClick={ (e) => onSubmit(e) }>
                          { prevent ? 'Uploading...' : (props.item && props.item.get('_id') ? 'Update' : 'Submit') }
                        </Button>
                      </>
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