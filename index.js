
// import base
const { Module } = require('@dashup/module');

// import fields
const FormPage = require('./pages/form');
const FormBlock = require('./blocks/form');

/**
 * export module
 */
class FormModule extends Module {
  
  /**
   * registers dashup structs
   *
   * @param {*} register 
   */
  register(fn) {
    // register sms action
    fn('page', FormPage);

    // register form block
    fn('block', FormBlock);
  }
}

// create new
module.exports = new FormModule();
