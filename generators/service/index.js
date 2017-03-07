"use strict";
var xmlmerge = require('xmlmerge-js');

var BaseGenerator = require('../../lib/generator');
var getParentConfig = require('../../lib/parentConfig');

var ServicePrompt = require('./prompts/service');

module.exports = class extends BaseGenerator {
  prompting() {

    this._config = {};
    let that = this;

    return ServicePrompt(that).then((answers) => {
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
    //service configuration
    let serviceConfig = this.destinationPath('App/Bundle/Resources/config/services/services.xml');

    //create file if not exists
    if (!this.fs.exists(serviceConfig)) {
      this.fs.copy(
        this.templatePath('App/Bundle/Resources/config/services/services.xml'),
        serviceConfig
      )
    }
  }
};