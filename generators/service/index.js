"use strict";

var BaseGenerator = require('../../lib/generator');
var mergeServices = require('../../lib/mergeServices');
var containerTags = require('../../lib/containerTags');

var _srvPrompts = require('./prompts');
var path = require('path');
var s = require('underscore.string');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this.promptService = new _srvPrompts(this);
    this.option('noInteraction')
  }


  prompting() {
    this._config = {};

    if(this.options.noInteraction !== undefined) {
      this._config.service = this.options.prompts
      return
    }
    return this.promptService.doPrompt(true).then((conf) => {
      this._config.service = conf;
      this._config.service.serviceFullName = this._config.service.serviceName + this._config.service.serviceSuffix;
    });
  }

  writing() {
    let destinationBasePath = this._config.service.customOutput;
    let destinationBasedNamespace = path.relative(this.destinationPath(), destinationBasePath).replace(new RegExp(path.sep, "g"), '\\');
    //service file
    this.fs.copyTpl(
      this.templatePath('App/Service/Service.php'),
      this.destinationPath(destinationBasePath + '/' + this._config.service.serviceFullName + '.php'),
      {
        service: this._config.service,
        root: this._config.service.root,
        baseNamespace: destinationBasedNamespace
      }
    );

    let tags = new containerTags(this._config.service.contextNamespace);
    //service configuration
    let serviceConfig = this.destinationPath('App/Bundle/Resources/config/services/'+ this._config.service.serviceXMLFile);

    mergeServices(this, serviceConfig, [
      {
        id: tags.serviceTag(this._config.service.serviceName, this._config.service.serviceSuffix),
        class: this._config.service.contextNamespace + "\\" + destinationBasedNamespace + "\\" + this._config.service.serviceFullName,
        args: [
          {
            type: "service",
            id: "..."
          },
          {
            __raw: "%xeonys.crm.import_root_dir%"
          }
        ],
        tags: [
          {
            name: "rezzza_command_bus.command_handler",
            command: this._config.service.contextNamespace + '\\App\\Command\\',
            method: "handleXXX"
          }
        ]
      }
    ]);
  }
};