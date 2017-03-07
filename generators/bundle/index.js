"use strict";

var BaseGenerator = require('../../lib/generator');
var getParentConfig = require('../../lib/parentConfig');

var BundlePrompt = require('./prompts/bundle');

module.exports = class extends BaseGenerator {
  prompting() {

    this._config = {};
    let that = this;
    //determine from parent dirs default values for bundleName & namespace & pass to prompt

    return BundlePrompt(that).then((answers) => {
      this._config.bundle = answers;
      return getParentConfig().then((conf) => {
        this._config.root = conf;
      });
    });

  }

  writing() {
    //bundle
    this.fs.copyTpl(
      this.templatePath('App/Bundle/Bundle.php'),
      this.destinationPath('App/Bundle/' + this._config.bundle.bundleName + 'Bundle.php'),
      {
        bundle: this._config.bundle,
        root: this._config.root
      }
    );
    //extension
    this.fs.copyTpl(
      this.templatePath('App/Bundle/DependencyInjection/Extension.php'),
      this.destinationPath('App/Bundle/DependencyInjection/' + this._config.bundle.bundleName + 'Extension.php'),
      {
        bundle: this._config.bundle,
        root: this._config.root
      }
    );

    //compiler pass
    if (this._config.bundle.hasCompiler) {
      this.fs.copyTpl(
        this.templatePath('App/Bundle/DependencyInjection/Compiler/Pass.php'),
        this.destinationPath('App/Bundle/DependencyInjection/Compiler/' + this._config.bundle.compilerPassName + 'Pass.php'),
        {
          bundle: this._config.bundle,
          root: this._config.root
        }
      );
    }

  }
};