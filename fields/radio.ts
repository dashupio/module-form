
// import field interface
import { Struct, Query } from '@dashup/module';

/**
 * build address helper
 */
export default class RadioField extends Struct {

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
      view   : 'field/radio/view',
      input  : 'field/radio',
      config : 'field/radio/config',
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
    return 'radio';
  }

  /**
   * returns field type
   */
  get data() {
    // return field type label
    return {
      tabs      : ['Config', 'Display'],
      default   : true,
      operators : ['$eq', '$ne', '$in', '$nin', '$inc', '$ninc', '$exists'],
    };
  }

  /**
   * returns field type
   */
  get icon() {
    // return field type label
    return 'fa fa-check-circle';
  }

  /**
   * returns field type
   */
  get title() {
    // return field type label
    return 'Radio';
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
    return 'Radio Field';
  }
}