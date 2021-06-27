
// import field interface
import { Struct, Query } from '@dashup/module';

/**
 * build address helper
 */
export default class CheckboxField extends Struct {

  /**
   * construct model field
   *
   * @param args 
   */
  constructor(...args) {
    // run super
    super(...args);
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      view   : 'field/checkbox/view',
      input  : 'field/checkbox',
      config : 'field/checkbox/config',
    };
  }
  /**
   * returns object of views
   */
  get actions() {
    // return object of views
    return {
      
    };
  }

  /**
   * returns field type
   */
  get type() {
    // return field type label
    return 'checkbox';
  }

  /**
   * returns field type
   */
  get data() {
    // return field type label
    return {
      tabs      : ['Config', 'Display'],
      operators : ['$eq', '$ne', '$in', '$nin', '$inc', '$ninc', '$exists'],
    };
  }

  /**
   * returns field type
   */
  get title() {
    // return field type label
    return 'Checkbox';
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
    return 'Checkbox Field';
  }
}