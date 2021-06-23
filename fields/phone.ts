
// import field interface
import { Struct, Query } from '@dashup/module';
import parsePhoneNumber from 'libphonenumber-js';

/**
 * build address helper
 */
export default class PhoneField extends Struct {

  /**
   * construct model field
   *
   * @param args 
   */
  constructor(...args) {
    // run super
    super(...args);

    // bind
    this.submitAction = this.submitAction.bind(this);
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      view  : 'field/phone/view',
      input : 'field/phone',
      /*
      view     : 'field/model/view',
      input    : 'field/model/input',
      config   : 'field/model/config',
      display  : 'field/model/display',
      validate : 'field/model/validate',
      */
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
    return 'phone';
  }

  /**
   * returns field type
   */
  get data() {
    // return field type label
    return {
      tabs : ['Config', 'Display'],
      subs : [
        {
          key        : 'number',
          type       : 'phone',
          label      : 'Number',
          default    : true,
          operators  : ['$eq', '$ne', '$inc', '$ninc', '$exists'],
          numberOnly : true,
        },
        {
          key       : 'code',
          type      : 'number',
          label     : 'Code',
          operators : ['$eq', '$ne', '$inc', '$ninc', '$exists'],
        },
        {
          key       : 'valid',
          type      : 'boolean',
          label     : 'Valid',
          operators : ['$eq', '$ne', '$exists'],
        },
        {
          key       : 'carrier',
          type      : 'text',
          label     : 'Carrier',
          operators : ['$eq', '$ne', '$inc', '$ninc', '$exists'],
        },
        {
          key       : 'location',
          type      : 'text',
          label     : 'Location',
          operators : ['$eq', '$ne', '$inc', '$ninc', '$exists'],
        },
      ],
      multiple : false,
    };
  }

  /**
   * returns field type
   */
  get title() {
    // return field type label
    return 'Phone';
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
    return 'Phone Field';
  }

  /**
   * submit field value
   *
   * @param {*} param0 
   * @param {*} field 
   * @param {*} value 
   */
  async submitAction(opts, field, value) {
    // parsed
    const parsed = typeof value === 'string' ? parsePhoneNumber(value, field.country || 'US') : parsePhoneNumber(value.number, value.country || field.country || 'US');

    // check parsed
    if (!parsed) return;

    // get return
    const rtn = {
      code    : parsed.countryCallingCode,
      local   : parsed.nationalNumber,
      number  : parsed.number,
      country : parsed.country,
    };

    // return value map
    return {
      value : rtn,
    };
  }
}