"use strict";
<% if (buildOpts.canChangeDir) { %>var path = require('path');<% } %>
<% if (buildOpts.hasConfigFile) { %>var mergeServices = require('../../lib/mergeServices');
var containerTags = require('../../lib/containerTags');<% } %>
var BaseGenerator = require('../../lib/generator');

var Prompts = require('./prompts');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this._prompt = new Prompts(this);
  }


  prompting() {
    this._config = {};

    return this._prompt.doPrompt(true).then((conf) => {
      this._config.<%= generatorName %> = conf;
      //another params ...
    });
  }

  writing() {
    <% if (buildOpts.canChangeDir) { %>let destinationBasePath = this._config.<%= generatorName %>.customOutput;
    let destinationBasedNamespace = path.relative(this.destinationPath(), destinationBasePath).replace(path.sep, '\\');
    <% } %>//make files
    this.fs.copyTpl(
      this.templatePath('<%= ucGeneratorName %>.php'),
      this.destinationPath(<% if (buildOpts.canChangeDir) { %>destinationBasePath<% } else { %>'<%= generatorDir %>'<% } %> + '/' + this._config.<%= generatorName %>.<%= generatorName %>Name + <% if (buildOpts.hasSuffix) { %>this._config.<%= generatorName %>.<%= generatorName %>Suffix + <% } %>'<%= generatorSuffix %>.php'),
      {
        <%= generatorName %>: this._config.<%= generatorName %>,
        root: this._config.<%= generatorName %>.root<% if (buildOpts.canChangeDir) { %>,
        baseNamespace: destinationBasedNamespace<% } %>
      }
    );<% if (buildOpts.hasConfigFile) { %>
    let tags = new containerTags(this._config.<%= generatorName %>.contextNamespace);
    //service configuration
    let serviceConfig = this.destinationPath('App/Bundle/Resources/config/services/<%= generatorName %>.xml');

    mergeServices(this, serviceConfig, [
      {
        id: tags.serviceTag(this._config.<%= generatorName %>.<%= generatorName %>Name<% if (buildOpts.hasSuffix) { %> + this._config.<%= generatorName %>.<%= generatorName %>Suffix + <% } %> + '<%= generatorSuffix %>', <%= ucGeneratorName %>),
        class: this._config.<%= generatorName %>.contextNamespace + "\\" + <% if (buildOpts.canChangeDir) { %>destinationBasedNamespace<% } else{ %>'<%= generatorNamespace %>'<% } %> + "\\" + this._config.<%= generatorName %>.<%= generatorName %>Name<% if (buildOpts.hasSuffix) { %> + this._config.<%= generatorName %>.<%= generatorName %>Suffix + <% } %> + '<%= generatorSuffix %>',
        tags: [
          {
            name: "xeonys.rest_extra.rest_dto.normalizer"
          }
        ]
      }
    ]);
    <% } %>
  }
};