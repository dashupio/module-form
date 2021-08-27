
// import field interface
import { Struct, Query } from '@dashup/module';

// loading cache
const loading = {};

/**
 * build address helper
 */
export default class TeamField extends Struct {

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
      view  : 'field/team/view',
      input : 'field/team',
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
    return 'team';
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
    return 'fad fa-users';
  }

  /**
   * returns field type
   */
  get title() {
    // return field type label
    return 'Team';
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
    return 'Dashup Team Select';
  }

  /**
   * load team
   *
   * @param id 
   * @param opts 
   */
  loadTeam(id, opts) {
    // fix id
    id = id._id || id.id || id;

    // check loading
    if (loading[id]) return loading[id];

    // return promise
    loading[id] = new Promise((resolve) => {
      // query model
      new Query({
        ...opts,
      }, 'team').findById(id).then(resolve);
    });

    // add timeout
    loading[id].then(() => {
      // cache for 2 seconds
      setTimeout(() => {
        delete loading[id];
      }, 2000);
    });

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
      const item = await this.loadTeam(id, opts);

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
    value = value.filter((v) => v.match(/^[0-9a-fA-F]{24}$/));

    // load teams
    const teams = await Promise.all(value.map((id) => this.loadTeam(id, opts)));

    // map values
    return {
      sanitised : teams.map((val) => val && val.sanitise()).filter((v) => v)
    };
  }
}