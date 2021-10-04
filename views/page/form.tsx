
// import dependencies
import { Box, Icon, ToolTip, Paper, Button, IconButton, Page, Form, Container, LoadingButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@dashup/ui';
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
    <Page { ...props } loading={ loading } require={ required }>

      <Page.Share show={ share } onHide={ (e) => setShare(false) } />
      <Page.Config show={ config } onHide={ (e) => setConfig(false) } />

      <Page.Menu onConfig={ () => setConfig(true) } presence={ props.presence } onShare={ () => setShare(true) }>
        { props.dashup.can(props.page, 'manage') && (
          <Button variant="contained" color={ updating ? 'success' : 'primary' } onClick={ () => setUpdating(!updating) }>
            { updating ? 'Finish' : 'Update Form' }
          </Button>
        ) }
      </Page.Menu>
      <Page.Body>
        <Container maxWidth="lg">
          <Paper
            sx={ {
              p : 2,
              position : 'relative',
            } }
          >
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
            <Box
              sx={ {
                pt : 2,
                display : 'flex',
              } }
            >
              <Box sx={ {
                ml : 'auto',
              } }>
                { !!props.item?.get('_id') && (
                  <>
                    <ToolTip title="Remove">
                      <IconButton variant="text" onClick={ (e) => setRoute('remove') } sx={ { mr : 1 } }>
                        <Icon>
                          <i className="fa fa-fw fa-trash" />
                        </Icon>
                      </IconButton>
                    </ToolTip>
                    <ToolTip title="Create New">
                      <IconButton variant="text" onClick={ (e) => onCreate(e) } sx={ { mr : 1 } }>
                        <Icon>
                          <i className="fa fa-fw fa-plus text-base" />
                        </Icon>
                      </IconButton>
                    </ToolTip>
                  </>
                ) }
                <LoadingButton disabled={ prevent || submitting } variant="contained" color="success" onClick={ (e) => onSubmit(e) }>
                  { submitting ? 'Submitting...' : 'Submit' }
                </LoadingButton>
              </Box>
            </Box>
          </Paper>
        </Container>

        <Dialog
          open={ success }
          onClose={ () => setSuccess(false) }
        >
          <DialogTitle>
            Successfully Submitted
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Great work, that was saved successfully
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => setSuccess(false) } variant="contained">
              Continue
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={ route === 'remove' }
          onClose={ () => setSuccess(false) }
        >
          <DialogTitle>
            Confirm Remove
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => setRoute(null) } disabled={ removing }>
              Cancel
            </Button>
            <LoadingButton onClick={ (e) => onRemove(e) } loading={ removing } color="error" variant="contained">
              { removing ? 'Removing...' : 'Confirm' }
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Page.Body>
    </Page>
  );
};

// export default form page
export default FormPage;