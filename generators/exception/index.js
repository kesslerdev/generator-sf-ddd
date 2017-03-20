"use strict";

var BaseGenerator = require('../../lib/generator');

var _prompts = require('./prompts');
var _ = require('underscore');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this.promptService = new _prompts(this);
  }
  prompting() {

    this._config = {};
    let that = this;

    return this.promptService.doPrompt(true).then((answers) => {
      this._config.exception = answers;
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
        buildOpts: this._config.exception.generatorOptions,
        root: this._config.exception.root,
        baseException: baseException,
        baseNameException: baseNameException
      }
    );
  }
};