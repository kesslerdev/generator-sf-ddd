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
      this._config.forms = this.options.prompts
      return
    }
    return this._prompt.doPrompt(true).then((conf) => {
      this._config.forms = conf;
      //another params ...
    });
  }

  writing() {

    const stringMan = new strMan(this._config.forms.formName, this._config.forms)

    let destinationBasePath = this._config.forms.customOutput;
    console.log(path.sep,this.destinationPath(), destinationBasePath, path.relative(this.destinationPath(), destinationBasePath),path.relative(this.destinationPath(), destinationBasePath).replace(path.sep, '\\'))
    this._config.destinationBasedNamespace = path.relative(this.destinationPath(), destinationBasePath).replace(new RegExp(path.sep, "g"), '\\').replace('/','\\');
    //make files
    const tplVars = {
      form: this._config.forms,
      root: this._config.forms.root,
      baseNamespace: this._config.destinationBasedNamespace,
      str: stringMan
    }

    if(this._config.forms.formTypes.includes('CREATE')) {
      this.fs.copyTpl(
        this.templatePath('CreateType.php'),
        this.destinationPath(destinationBasePath + '/' + this._config.forms.formName + 'CreateType.php'),
        tplVars
      );
    }

    if(this._config.forms.formTypes.includes('UPDATE')) {
      this.fs.copyTpl(
        this.templatePath('UpdateType.php'),
        this.destinationPath(destinationBasePath + '/' + this._config.forms.formName + 'UpdateType.php'),
        tplVars
      );
    }
  }
};