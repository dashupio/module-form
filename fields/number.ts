
// import field interface
import { Struct, Query } from '@dashup/module';

/**
 * build address helper
 */
export default class NumberField extends Struct {

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
      view  : 'field/number/view',
      input : 'field/number',
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
      
    };
  }

  /**
   * returns field type
   */
  get type() {
    // return field type label
    return 'number';
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
    return 'Number';
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
    return 'Number Field';
  }
}