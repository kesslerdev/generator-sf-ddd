"use strict";
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
      this._config.resource = conf;
      
      if(conf.things.includes('CONTROLLER')) {
        //configure
        this.composeWith(require.resolve('../controller'), {
          prompts : Object.assign({},conf,{
            controllerName: conf.resourceName,
            customOutput: 'UI/Controller'
          }),
          
          noInteraction: true
        })
      }
      
      if(conf.things.includes('QUERY') && conf.crudTypes.includes('READ_LIST')) {
        //configure
        this.composeWith(require.resolve('../query'), {
          prompts : Object.assign({},conf,{
            queryName: conf.resourceName,
            querySuffix: 'List',
            generatorOptions: {
              hasPagination: true,
              hasQuery: true
            }
          }),
          
          noInteraction: true
        })
      }

      if(conf.things.includes('REPOSITORY')) {
        //configure
        this.logger.warn('REPOSITORY not implemented')
      }
      if(conf.things.includes('CQRS_COMMANDS')) {
        //configure
        this.logger.warn('CQRS_COMMANDS not implemented')
      }
      if(conf.things.includes('CQRS_FORMS')) {
        //configure
        this.logger.warn('CQRS_FORMS not implemented')
      }
      if(conf.things.includes('ENTITY')) {
        //configure
        this.logger.warn('ENTITY not implemented')
      }
      if(conf.things.includes('SERVICE')) {
        //configure
        this.logger.warn('SERVICE not implemented')
      }

    });
  }

  writing() {
    this.logger.info('writing')
  }

  end() {
    this.logger.info('end')
  }
};