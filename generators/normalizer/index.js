"use strict";

var BaseGenerator = require('../../lib/generator');
var mergeServices = require('../../lib/mergeServices');
var containerTags = require('../../lib/containerTags');

var Prompts = require('./prompts');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this._prompt = new Prompts(this);
  }


  prompting() {
    this._config = {};

    return this._prompt.doPrompt(true, true).then((conf) => {
      this._config.normalizer = conf;
      this._config.root = conf.root;
      //another params ...
    });
  }

  writing() {
    //make files
    this.fs.copyTpl(
      this.templatePath('normalizer.php'),
      this.destinationPath('UI/RestDTO/Normalizer/' + this._config.normalizer.normalizerName + 'Normalizer.php'),
      {
        normalizer: this._config.normalizer,
        root: this._config.root,
        buildOpts: this._config.normalizer.generatorOptions
      }
    );

    let tags = new containerTags(this._config.normalizer.contextNamespace);
    //service configuration
    let serviceConfig = this.destinationPath('App/Bundle/Resources/config/services/dto_normalizer.xml');

    mergeServices(this, serviceConfig, [
      {
        id: tags.normalizerTag(this._config.normalizer.normalizerName),
        class: this._config.normalizer.contextNamespace + "\\UI\\RestDTO\\Normalizer\\" + this._config.normalizer.normalizerName + "Normalizer",
        tags: [
          {
            name: "xeonys.rest_extra.rest_dto.normalizer"
          }
        ]
      }
    ]);
  }
};