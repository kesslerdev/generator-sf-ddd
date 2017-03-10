"use strict";

var BaseGenerator = require('../../lib/generator');
var getParentConfig = require('../../lib/parentConfig');

var _prompts = require('./prompts');
var _ = require('underscore');

module.exports = class extends BaseGenerator {
  prompting() {

    this._config = {};
    let that = this;

    return _prompts(that).then((answers) => {
      this._config.exception = answers;
      return getParentConfig().then((conf) => {
        this._config.root = conf;
      });
    });

  }

  writing() {
    let ExceptionsFQCN = {
      '400': 'Symfony\\Component\\HttpKernel\\Exception\\BadRequestHttpException',
      '404': 'Symfony\\Component\\HttpKernel\\Exception\\NotFoundHttpException',
      '500': 'Exception',
    };

    let baseException = ExceptionsFQCN[this._config.exception.exceptionType];
    let baseNameException = _.last(baseException.split('\\'));
    this.fs.copyTpl(
      this.templatePath('Domain/Exception/Exception.php'),
      this.destinationPath('Domain/Exception/' + this._config.exception.exceptionName + 'Exception.php'),
      {
        exception: this._config.exception,
        root: this._config.root,
        baseException: baseException,
        baseNameException: baseNameException
      }
    );
  }
};