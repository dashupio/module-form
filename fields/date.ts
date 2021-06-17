
// import field interface
import { Struct, Query } from '@dashup/module';

/**
 * build address helper
 */
export default class DateField extends Struct {

  /**
   * construct model field
   *
   * @param args 
   */
  constructor(...args) {
    // run super
    super(...args);

    // bind submit
    this.submitAction = this.submitAction.bind(this);
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      view   : 'field/date/view',
      input  : 'field/date',
      config : 'field/date/config',
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
    return 'date';
  }

  /**
   * returns field type
   */
  get data() {
    // return field type label
    return {
      tabs : ['Config', 'Display'],
    };
  }

  /**
   * returns field type
   */
  get title() {
    // return field type label
    return 'Date';
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
    return 'Date Field';
  }

  /**
   * submit field value
   *
   * @param {*} param0 
   * @param {*} field 
   * @param {*} value 
   */
  async submitAction(opts, field, value) {
    console.log(field, value);
    // check value
    if (typeof value === 'string') value = {
      start : new Date(value),
    };

    // check value
    if (typeof value !== 'object') value = {};

    // check duration
    if (field.duration && value.end) {
      value.end = new Date(value.end);
    } else {
      value.end = null;
    }

    if (field.repeat && value.repeat) {
      // check until
      if (value.repeat.until) value.repeat.until = new Date(value.repeat.until);
    }

    // check start/end
    if (value.start) value.start = new Date(value.start);

    // duration
    if (value.start && value.end) value.duration = value.end.getTime() - value.start.getTime();

    // return value map
    return {
      value,
    };
  }
}