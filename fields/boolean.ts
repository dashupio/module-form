
// import field interface
import { Struct } from '@dashup/module';

/**
 * build address helper
 */
export default class BooleanField extends Struct {

  /**
   * construct model field
   *
   * @param args 
   */
  constructor(...args) {
    // run super
    super(...args);

    // submit
    this.submitAction = this.submitAction.bind(this);
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      view  : 'field/boolean/view',
      input : 'field/boolean',
    };
  }
  /**
   * returns object of views
   */
  get actions() {
    // return object of views
    return {
      submit : this.submitAction,
    };
  }

  /**
   * returns field type
   */
  get type() {
    // return field type label
    return 'boolean';
  }

  /**
   * returns field type
   */
  get data() {
    // return field type label
    return {
      tabs      : ['Config', 'Display'],
      default   : true,
      multiple  : false,
      operators : ['$eq', '$ne', '$exists'],
    };
  }

  /**
   * returns field type
   */
  get icon() {
    // return field type label
    return 'fa fa-check';
  }

  /**
   * returns field type
   */
  get title() {
    // return field type label
    return 'Boolean';
  }

  /**
   * returns category list to show field in
   */
  get categories() {
    // return array of categories
    return ['frontend'];
  }

  /**
   * returns category list to show field in
   */
  get description() {
    // return description string
    return 'Boolean Field';
  }

  /**
   * submit field value
   *
   * @param {*} param0 
   * @param {*} field 
   * @param {*} value 
   */
  async submitAction(opts, field, value) {
    // check value
    value = value === 'true' || !!value;

    // value
    return {
      value,
    };
  }
}