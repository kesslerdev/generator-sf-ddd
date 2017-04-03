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
      this._config.controller = conf;
      //another params ...
    });
  }

  writing() {
    //make files
    this.fs.copyTpl(
      this.templatePath('Controller.php'),
      this.destinationPath('UI/Controller/' + this._config.controller.controllerName + 'Controller.php'),
      {
        controller: this._config.controller,
        root: this._config.controller.root
      }
    );
  }
};