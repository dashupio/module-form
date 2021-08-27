
// import page interface
import { Struct } from '@dashup/module';

/**
 * build address helper
 */
export default class FormBlock extends Struct {

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
    return 'fad fa-ballot-check';
  }

  /**
   * returns page type
   */
  get title() {
    // return page type label
    return 'Form';
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
      view   : 'block/form',
      config : 'block/form/config',
    };
  }

  /**
   * returns category list for page
   */
  get categories() {
    // return array of categories
    return ['phone', 'dashboard'];
  }

  /**
   * returns page descripton for list
   */
  get description() {
    // return description string
    return 'Customizable Form Block';
  }
}