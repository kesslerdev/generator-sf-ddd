"use strict";
var xmlmerge = require('xmlmerge-js');
var s = require('underscore.string');

var BaseGenerator = require('../../lib/generator');
var mergeServices = require('../../lib/mergeServices');
var getParentConfig = require('../../lib/parentConfig');
var containerTags = require('../../lib/containerTags');

var _srvPrompts = require('./prompts/service');

module.exports = class extends BaseGenerator {
  prompting() {

    this._config = {};
    let that = this;

    return _srvPrompts(that).then((answers) => {
      this._config.service = answers;
      this._config.service.serviceFullName = this._config.service.serviceName + this._config.service.serviceSuffix;
      return getParentConfig().then((conf) => {
        this._config.root = conf;
      });
    });

  }

  writing() {
    //service file
    this.fs.copyTpl(
      this.templatePath('App/Service/Service.php'),
      this.destinationPath('App/Service/' + this._config.service.serviceFullName + '.php'),
      {
        service: this._config.service,
        root: this._config.root
      }
    );

    let tags = new containerTags(this._config.service.contextNamespace);
    //service configuration
    let serviceConfig = this.destinationPath('App/Bundle/Resources/config/services/services.xml');

    mergeServices(this, serviceConfig, [
      {
        id: tags.serviceTag(this._config.service.serviceName, this._config.service.serviceSuffix),
        class: this._config.service.contextNamespace +"\\App\\Service\\"+this._config.service.serviceFullName,
        args:[
          {
            type: "service",
            id: "..."
          },
          {
            __raw: "%xeonys.crm.import_root_dir%"
          }
        ],
        tags:[
          {
            name: "rezzza_command_bus.command_handler",
            comand: this._config.service.contextNamespace + '\\App\\Command\\',
            method: "..."
          }
        ]
      }
    ]);
  }
};