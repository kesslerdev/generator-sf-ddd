"use strict";

var BaseGenerator = require('../../lib/generator');
var Prompts = require('./prompts');

var _prompts = require('./prompts');
var _ = require('underscore');
var s = require('underscore.string');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this._prompt = new Prompts(this);
  }

  prompting() {

    this._config = {};

    return this._prompt.doPrompt().then((conf) => {
      this._config.generator = conf;
    });

  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('generators/'+this._config.generator.generatorName +'/index.js'),
      {
        generatorName: this._config.generator.generatorName,
        ucGeneratorName: s.classify(this._config.generator.generatorName)
      }
    );
    this.fs.copyTpl(
      this.templatePath('prompts/index.js'),
      this.destinationPath('generators/'+this._config.generator.generatorName +'/prompts/index.js'),
      {
        generatorName: this._config.generator.generatorName,
        ucGeneratorName: s.classify(this._config.generator.generatorName)
      }
    );
    this.fs.copyTpl(
      this.templatePath('templates/tpl.php'),
      this.destinationPath('generators/'+this._config.generator.generatorName +'/templates/'+s.classify(this._config.generator.generatorName)+'.php'),
      {
        generatorName: this._config.generator.generatorName,
        ucGeneratorName: s.classify(this._config.generator.generatorName)
      },
      {delimiter: '$'}
    );
  }
};