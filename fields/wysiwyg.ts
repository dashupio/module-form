
// import field interface
import { Struct, Query } from '@dashup/module';

/**
 * build address helper
 */
export default class WysiwygField extends Struct {

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
      view    : 'field/wysiwyg/view',
      input   : 'field/wysiwyg',
      wysiwyg : 'wysiwyg',
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
    return 'wysiwyg';
  }

  /**
   * returns field type
   */
  get data() {
    // return field type label
    return {
      tabs      : ['Config', 'Display'],
      multiple  : false,
      operators : ['$eq', '$ne', '$inc', '$ninc', '$exists'],
    };
  }

  /**
   * returns field type
   */
  get title() {
    // return field type label
    return 'Wysiwyg';
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
    return 'Wysiwyg Field';
  }
}