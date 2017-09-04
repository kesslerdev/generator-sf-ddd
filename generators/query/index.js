"use strict";

var BaseGenerator = require('../../lib/generator');

var Prompts = require('./prompts');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this._prompt = new Prompts(this);
    this.option('noInteraction')
  }


  prompting() {
    this._config = {};

    if(this.options.noInteraction !== undefined) {
      this._config.query = this.options.prompts
      return
    }
    return this._prompt.doPrompt(true,true).then((conf) => {
      this._config.query = conf;
      //another params ...
      console.log(conf)
    });
  }

  writing() {
    //make files
    this.fs.copyTpl(
      this.templatePath('Query.php'),
      this.destinationPath('App/Query' + '/' + this._config.query.queryName + this._config.query.querySuffix + 'Query.php'),
      {
        query: this._config.query,
        root: this._config.query.root
      }
    );
  }
};