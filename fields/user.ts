
// import field interface
import { Struct, Query } from '@dashup/module';

// loading cache
const loading = {};

/**
 * build address helper
 */
export default class UserField extends Struct {

  /**
   * construct model field
   *
   * @param args 
   */
  constructor(...args) {
    // run super
    super(...args);

    // sanitise
    this.submitAction   = this.submitAction.bind(this);
    this.sanitiseAction = this.sanitiseAction.bind(this);
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      view  : 'field/user/view',
      input : 'field/user',
    };
  }

  /**
   * returns object of views
   */
  get actions() {
    // return object of views
    return {
      submit   : this.submitAction,
      sanitise : this.sanitiseAction,
    };
  }

  /**
   * returns field type
   */
  get type() {
    // return field type label
    return 'user';
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
      operators : ['$eq', '$ne', '$in', '$nin', '$exists'],
    };
  }

  /**
   * returns field type
   */
  get icon() {
    // return field type label
    return 'fad fa-user';
  }

  /**
   * returns field type
   */
  get title() {
    // return field type label
    return 'User';
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
    return 'Dashup User Select';
  }

  /**
   * load member
   *
   * @param id 
   * @param opts 
   */
  loadMember(id, opts) {
    // fix id
    id = id?._id || id?.id || id;

    // check id
    if (!id) return;

    // check loading
    if (loading[id]) return loading[id];

    // return promise
    loading[id] = new Promise((resolve) => {
      // query model
      new Query({
        ...opts,
      }, 'member').findById(id).then(resolve);
    });

    // cache for 2 seconds
    setTimeout(() => {
      delete loading[id];
    }, 60 * 1000);

    // return loading
    return loading[id];
  }

  /**
   * submit field value
   *
   * @param {*} param0 
   * @param {*} field 
   * @param {*} value 
   */
  async submitAction(opts, field, value) {
    // check value
    if (!value) value = [];
    if (!Array.isArray(value)) value = [value];

    // parsed values
    const parsed = value.filter(val => val).map((val, i) => {
      // run try catch
      try {
        // check mod
        return val._id || val.id || val;
      } catch (e) {
        // return old
        return opts.old[i];
      }
    });

    // search by matching field
    const data = await Promise.all(parsed.map(async (id) => {
      // check id
      if (!id) return;
      if (`${id}`.match(/^[0-9a-fA-F]{24}$/)) return id;

      // query model
      const item = await this.loadMember(id, opts);

      // check item
      if (item) {
        // return value
        return item._id || item.get('_id');
      }
    }));

    // return value map
    return {
      value : data.filter((i) => i),
    };
  }

  /**
   * returns sanitised result of field submission
   *
   * @param {*} param0 
   * @param {*} field 
   * @param {*} value 
   */
  async sanitiseAction(opts, field, value) {
    // get value
    if (!value) value = [];
    if (!Array.isArray(value)) value = [value];

    // filter out not matching
    value = value.map((v) => v?.id || v?._id || v).filter((v) => `${v}`.match(/^[0-9a-fA-F]{24}$/));

    // load users
    const users = await Promise.all(value.map((id) => this.loadMember(id, opts)));

    // map values
    return {
      sanitised : (users || []).map((val) => val && val.sanitise()).filter((v) => v)
    };
  }
}