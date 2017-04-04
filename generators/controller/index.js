"use strict";
var path = require('path');
var s = require('underscore.string');
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
      this._config.controller = conf;
      //another params ...
    });
  }

  writing() {
    let destinationBasePath = this._config.controller.customOutput;
    this._config.destinationBasedNamespace = path.relative(this.destinationPath(), destinationBasePath).replace(path.sep, '\\');
    //make files
    this.fs.copyTpl(
      this.templatePath('Controller.php'),
      this.destinationPath(destinationBasePath + '/' + this._config.controller.controllerName + 'Controller.php'),
      {
        controller: this._config.controller,
        root: this._config.controller.root,
        baseNamespace: this._config.destinationBasedNamespace
      }
    );
  }

  end() {
    this.log('you can add this new controller in routing: ');
    this.log(s.underscored(this._config.controller.controllerName) + `_api:
    prefix:   /api
    resource: ` + this._config.controller.contextNamespace + "\\" + this._config.destinationBasedNamespace + "\\" + this._config.controller.controllerName + `Controller
    type:     annotation`);
  }
};