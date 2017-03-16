"use strict";

var BaseGenerator = require('../../lib/generator');

var Prompts = require('./prompts');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this._prompt = new Prompts(this);
  }


  prompting() {
    this._config = {};

    return this._prompt.doPrompt(true).then((conf) => {
      this._config = conf;
      //another params ...
    });
  }

  writing() {
    //make files
    this.fs.copyTpl(
      this.templatePath('templates/<%= generatorName %>.php'),
      this.destinationPath(this._config.name + '.php'),
      {
        name: this._config.name
      }
    );
  }
};