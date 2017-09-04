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
      this._config.commands = this.options.prompts
      return
    }
    return this._prompt.doPrompt(true).then((conf) => {
      this._config.commands = conf;
      //another params ...
    });
  }

  writing() {

    const stringMan = new strMan(this._config.commands.commandName, this._config.commands)

    let destinationBasePath = this._config.commands.customOutput;
    this._config.destinationBasedNamespace = path.relative(this.destinationPath(), destinationBasePath).replace(new RegExp(path.sep, "g"), '\\');
    //make files
    const tplVars = {
      command: this._config.commands,
      root: this._config.commands.root,
      baseNamespace: this._config.destinationBasedNamespace,
      str: stringMan
    }

    if(this._config.commands.commandTypes.includes('CREATE')) {
      this.fs.copyTpl(
        this.templatePath('CreateCommand.php'),
        this.destinationPath(destinationBasePath + '/' + this._config.commands.commandName + 'CreateCommand.php'),
        tplVars
      );
    }

    if(this._config.commands.commandTypes.includes('UPDATE')) {
      this.fs.copyTpl(
        this.templatePath('UpdateCommand.php'),
        this.destinationPath(destinationBasePath + '/' + this._config.commands.commandName + 'UpdateCommand.php'),
        tplVars
      );
    }

    if(this._config.commands.commandTypes.includes('DELETE')) {
      this.fs.copyTpl(
        this.templatePath('DeleteCommand.php'),
        this.destinationPath(destinationBasePath + '/' + this._config.commands.commandName + 'DeleteCommand.php'),
        tplVars
      );
    }
  }
};