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
      if(conf.things.includes('CQRS_COMMANDS') && (conf.crudTypes.includes('UPDATE') || conf.crudTypes.includes('CREATE') || conf.crudTypes.includes('DELETE'))) {
        //configure
        this.composeWith(require.resolve('../cqrs-commands'), {
          prompts : Object.assign({},conf,{
            commandName: conf.resourceName,
            customOutput: 'App/Command',
            commandTypes: conf.crudTypes
          }),
          
          noInteraction: true
        })
      }
      if(conf.things.includes('CQRS_FORMS') && (conf.crudTypes.includes('UPDATE') || conf.crudTypes.includes('CREATE'))) {
        //configure
        this.composeWith(require.resolve('../cqrs-commands'), {
          prompts : Object.assign({},conf,{
            formName: conf.resourceName,
            customOutput: 'Infra/Form/Type',
            formTypes: conf.crudTypes
          }),
          
          noInteraction: true
        })
      }
      if(conf.things.includes('ENTITY')) {
        //configure
        this.logger.warn('ENTITY not implemented')
      }
      if(conf.things.includes('SERVICE') && (conf.crudTypes.includes('UPDATE') || conf.crudTypes.includes('CREATE') || conf.crudTypes.includes('DELETE'))) {
        //configure
        this.composeWith(require.resolve('../service'), {
          prompts : Object.assign({},conf,{
            serviceName: conf.resourceName,
            serviceSuffix: 'Service',
            serviceXMLFile: 'services.xml',
            customOutput: 'App/Service',
            serviceFullName: conf.resourceName + 'Service'
          }),
          
          noInteraction: true
        })
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