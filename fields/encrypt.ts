
// import field interface
import crypto from 'crypto';
import { Struct, Query } from '@dashup/module';

/**
 * build address helper
 */
export default class FieldEncrypt extends Struct {

  /**
   * construct model field
   *
   * @param args 
   */
  constructor(...args) {
    // run super
    super(...args);

    // sanitise
    this.submitAction   = this.submitAction.bind(this);
    this.sanitiseAction = this.sanitiseAction.bind(this);
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      view  : 'field/encrypt/view',
      input : 'field/encrypt',
    };
  }

  /**
   * returns object of views
   */
  get actions() {
    // return object of views
    return {
      submit   : this.submitAction,
      sanitise : this.sanitiseAction,
    };
  }

  /**
   * returns field type
   */
  get type() {
    // return field type label
    return 'encrypt';
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
      operators : ['$exists'],
    };
  }

  /**
   * returns field type
   */
  get title() {
    // return field type label
    return 'Encrypt';
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
    return 'Encrypt Field';
  }

  /**
   * submit field value
   *
   * @param {*} param0 
   * @param {*} field 
   * @param {*} value 
   */
  async submitAction(opts, field, value) {
    // set value as one way

    // encrypt value
    const encrypted = crypto.createHmac('sha256', this.dashup.config.encryptSecret)
      .update(value)
      .digest('hex');

    // return value map
    return {
      value : encrypted,
    };
  }

  /**
   * returns sanitised result of field submission
   *
   * @param {*} param0 
   * @param {*} field 
   * @param {*} value 
   */
  async sanitiseAction(opts, field, value) {
    // map values
    return {
      sanitised : null,
    };
  }
}