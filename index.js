
// import base
const { Module } = require('@dashup/module');

// import fields
const FormPage = require('./pages/form');

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
  }
}

// create new
module.exports = new FormModule();
