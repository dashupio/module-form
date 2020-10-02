
// import page interface
import { Struct } from '@dashup/module';

/**
 * build address helper
 */
export default class FormPage extends Struct {

  /**
   * construct form page
   *
   * @param args 
   */
  constructor(...args) {
    // run super
    super(...args);

    // save field
    this.fieldSaveAction = this.fieldSaveAction.bind(this);
    this.formSubmitAction = this.formSubmitAction.bind(this);
  }

  /**
   * returns page type
   */
  get type() {
    // return page type label
    return 'form';
  }

  /**
   * returns page type
   */
  get icon() {
    // return page type label
    return 'fa fa-comments';
  }

  /**
   * returns page type
   */
  get title() {
    // return page type label
    return 'Form Page';
  }

  /**
   * returns page data
   */
  get data() {
    // return page data
    return {};
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      form : 'form',
  
      view   : 'page/form/view',
      menu   : 'page/form/menu',
      config : 'page/form/config',
    };
  }

  /**
   * returns object of actions
   */
  get actions() {
    // return actions
    return {
      'field.save'  : this.fieldSaveAction,
      'form.submit' : this.formSubmitAction,
    };
  }

  /**
   * returns category list for page
   */
  get categories() {
    // return array of categories
    return ['frontend'];
  }

  /**
   * returns page descripton for list
   */
  get description() {
    // return description string
    return 'Embeddable Form page';
  }

  /**
   * field save action
   *
   * @param param0 
   * @param field 
   */
  async fieldSaveAction({ socket, dashup }, field) {

    // return field
    return field;
  }

  /**
   * field save action
   *
   * @param param0 
   * @param field 
   */
  async formSubmitAction({ socket, dashup }, body) {
    console.log(body);
    // return field
    return body;
  }
}