
// import field interface
import { Struct, Query } from '@dashup/module';

/**
 * build address helper
 */
export default class SelectField extends Struct {

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
      view   : 'field/select/view',
      input  : 'field/select',
      config : 'field/select/config',
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
    return 'select';
  }

  /**
   * returns field type
   */
  get data() {
    // return field type label
    return {
      tabs      : ['Config', 'Display'],
      default   : true,
      multiple  : true,
      operators : ['$eq', '$ne', '$in', '$nin', '$inc', '$ninc', '$exists'],
    };
  }

  /**
   * returns field type
   */
  get icon() {
    // return field type label
    return 'fa fa-ballot-check';
  }

  /**
   * returns field type
   */
  get title() {
    // return field type label
    return 'Select';
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
    return 'Select Field';
  }
}