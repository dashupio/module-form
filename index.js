
// import base
const { Module } = require('@dashup/module');

// import fields
const FormPage = require('./pages/form');
const FormBlock = require('./blocks/form');
const FileField = require('./fields/file');
const TextField = require('./fields/text');
const DateField = require('./fields/date');
const UserField = require('./fields/user');
const TeamField = require('./fields/team');
const GroupField = require('./fields/group');
const EmailField = require('./fields/email');
const ImageField = require('./fields/image');
const PhoneField = require('./fields/phone');
const MoneyField = require('./fields/money');
const RadioField = require('./fields/radio');
const NumberField = require('./fields/number');
const SelectField = require('./fields/select');
const EncryptField = require('./fields/encrypt');
const AddressField = require('./fields/address');
const BooleanField = require('./fields/boolean');
const WysiwygField = require('./fields/wysiwyg');
const TextareaField = require('./fields/textarea');
const CheckboxField = require('./fields/checkbox');

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

    // register form block
    fn('field', DateField);
    fn('field', TextField);
    fn('field', UserField);
    fn('field', FileField);
    fn('field', TeamField);
    fn('field', GroupField);
    fn('field', EmailField);
    fn('field', ImageField);
    fn('field', PhoneField);
    fn('field', MoneyField);
    fn('field', RadioField);
    fn('field', NumberField);
    fn('field', SelectField);
    fn('field', AddressField);
    fn('field', BooleanField);
    fn('field', WysiwygField);
    fn('field', EncryptField);
    fn('field', CheckboxField);
    fn('field', TextareaField);
  }
}

// create new
module.exports = new FormModule();
