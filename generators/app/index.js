"use strict";

var BaseGenerator = require('../../lib/generator');
var menu = require('./menu');

var ProjectPrompt = require('./prompts/project');
var BoundedPrompt = require('./prompts/bounded');

module.exports = class extends BaseGenerator {
  prompting() {

    this._config = {};
    let that = this;
    //propose to generate a sf project
    return ProjectPrompt(that).then((answers) => {
      this._config.project = answers;

      return BoundedPrompt(that, answers.srcDir).then((directory) => {
        this._config.ctxDir = directory;
      });
    });

  }

  end() {
    return menu(this)
  }
};