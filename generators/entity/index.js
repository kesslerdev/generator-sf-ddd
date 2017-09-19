"use strict";
var path = require('path');
var s = require('underscore.string');
var pl = require('pluralize');
var BaseGenerator = require('../../lib/generator');
var mergeServices = require('../../lib/mergeServices');
var containerTags = require('../../lib/containerTags');
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
      this._config.entity = this.options.prompts
      return
    }
    return this._prompt.doPrompt(true).then((conf) => {
      this._config.entity = conf;
      //another params ...
    });
  }

  writing() {

    const stringMan = new strMan(this._config.entity.entityName, this._config.entity)

    let destinationBasePath = this._config.entity.customOutput;
    let destinationMappingBasePath = this._config.entity.customMappingOutput;
    this._config.destinationBasedNamespace = path.relative(this.destinationPath(), destinationBasePath).replace(new RegExp(path.sep, "g"), '\\');
    //make files
    
    this.fs.copyTpl(
      this.templatePath('mapping.orm.xml'),
      this.destinationPath(destinationMappingBasePath + '/' + this._config.entity.entityName + '.orm.xml'),
      {
        entity: this._config.entity,
        root: this._config.entity.root,
        baseNamespace: this._config.destinationBasedNamespace,
        str: stringMan
      }
    );

    this.fs.copyTpl(
      this.templatePath('Entity.php'),
      this.destinationPath(destinationBasePath + '/' + this._config.entity.entityName + '.php'),
      {
        entity: this._config.entity,
        root: this._config.entity.root,
        baseNamespace: this._config.destinationBasedNamespace,
        str: stringMan
      }
    );
  }
};