"use strict";

var BaseGenerator = require('../../lib/generator');

var _prompts = require('./prompts');
var _ = require('underscore');

module.exports = class extends BaseGenerator {
  prompting() {

    this._config = {};

    return _prompts(this).then((answers) => {
      this._config = answers;
    });

  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('generators/'+this._config.generator +'/index.js'),
      {
        generatorName: this._config.generator
      }
    );
    this.fs.copyTpl(
      this.templatePath('prompts/index.js'),
      this.destinationPath('generators/'+this._config.generator +'/prompts/index.js'),
      {
        generatorName: this._config.generator
      }
    );
    this.fs.copyTpl(
      this.templatePath('templates/tpl.php'),
      this.destinationPath('generators/'+this._config.generator +'/templates/'+this._config.generator+'.php'),
      {
        generatorName: this._config.generator
      }
    );
  }
};