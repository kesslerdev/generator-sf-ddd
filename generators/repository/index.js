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
      this._config.repository = this.options.prompts
      return
    }
    return this._prompt.doPrompt(true).then((conf) => {
      this._config.repository = conf;
      //another params ...
    });
  }

  writing() {

    const stringMan = new strMan(this._config.repository.repositoryName, this._config.repository)

    let destinationBasePath = this._config.repository.customOutput;
    let destinationInterfaceBasePath = this._config.repository.customInterfaceOutput;
    this._config.destinationBasedNamespace = path.relative(this.destinationPath(), destinationBasePath).replace(new RegExp(path.sep, "g"), '\\');
    this._config.destinatioInterfaceBasedNamespace = path.relative(this.destinationPath(), destinationInterfaceBasePath).replace(new RegExp(path.sep, "g"), '\\');
    //make files
    this.fs.copyTpl(
      this.templatePath('RepositoryInterface.php'),
      this.destinationPath(destinationInterfaceBasePath + '/' + this._config.repository.repositoryName + 'RepositoryInterface.php'),
      {
        repository: this._config.repository,
        root: this._config.repository.root,
        baseNamespace: this._config.destinatioInterfaceBasedNamespace,
        str: stringMan
      }
    );
    this.fs.copyTpl(
      this.templatePath('Repository.php'),
      this.destinationPath(destinationBasePath + '/' + this._config.repository.repositoryName + 'Repository.php'),
      {
        repository: this._config.repository,
        root: this._config.repository.root,
        baseNamespace: this._config.destinationBasedNamespace,
        str: stringMan
      }
    );

    let tags = new containerTags(this._config.repository.contextNamespace);
    //service configuration
    let repoConfig = this.destinationPath('App/Bundle/Resources/config/services/repository.xml');

    mergeServices(this, repoConfig, [
      {
        id: tags.serviceTag(this._config.repository.repositoryName, 'repository'),
        alias: tags.serviceTag(this._config.repository.repositoryName, 'repository.doctrine_orm'),
      },
      {
        id: tags.serviceTag(this._config.repository.repositoryName, 'repository.doctrine_orm'),
        class: this._config.repository.contextNamespace + "\\" + this._config.destinationBasedNamespace + "\\" + this._config.repository.repositoryName+"Repository",
        args: [
          {
            type: "service",
            id: "doctrine.orm.default_entity_manager"
          }
        ]
      }
    ]);
  }
};