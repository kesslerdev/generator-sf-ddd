"use strict";
var path = require('path');
var s = require('underscore.string');
var pl = require('pluralize');
var BaseGenerator = require('../../lib/generator');
var strMan = require('../../lib/string');

var Prompts = require('./prompts');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this._prompt = new Prompts(this);
    //this.argument('controllerName')
    this.option('noInteraction')
    //not an option !
    //this.option('prompts')
  }

  prompting() {
    this._config = {};
    if(this.options.noInteraction !== undefined) {
      this._config.controller = this.options.prompts
      return
    }
    return this._prompt.doPrompt(true).then((conf) => {
      this._config.controller = conf;
      //another params ...
    });
  }

  writing() {

    const stringMan = new strMan(this._config.controller.controllerName, this._config.controller)

    let destinationBasePath = this._config.controller.customOutput;
    this._config.destinationBasedNamespace = path.relative(this.destinationPath(), destinationBasePath).replace(new RegExp(path.sep, "g"), '\\');
    //make files
    this.fs.copyTpl(
      this.templatePath('Controller.php'),
      this.destinationPath(destinationBasePath + '/' + this._config.controller.controllerName + 'Controller.php'),
      {
        controller: this._config.controller,
        root: this._config.controller.root,
        baseNamespace: this._config.destinationBasedNamespace,
        str: stringMan
      }
    );
  }

  end() {
    this.logger.snippet('you can add this new controller in routing:',
      s.underscored(this._config.controller.controllerName) + `_api:
    prefix:   /api
    resource: ` + this._config.controller.contextNamespace + "\\" + this._config.destinationBasedNamespace + "\\" + this._config.controller.controllerName + `Controller
    type:     annotation`
    )
  }
};