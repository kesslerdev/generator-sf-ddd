"use strict";

var _ = require('underscore');
var chalk = require('chalk');
var s = require('underscore.string');
var getParentConfig = require('./parentConfig');

module.exports = class Prompting {
    constructor(env) {
        this.env = env;
        this.env.option('nointeraction');

        if (env.options.nointeraction) {
            this.env.logger.warn('no interaction')
            this.buildArguments();
        }
    }

    getPrompts() { }

    getGeneratorOptions() { return [] }

    async doGeneratorOptionsPrompt(generatorOps) {
        //PArt1 build prompts
        let choices = [];

        _.each(generatorOps, (opt) => {
            choices.push({
                name: opt.name,
                checked: opt.checked != undefined && opt.checked == true
            });
        });
        //do prompt
        let results = await this.env.prompt([
            {
                type: 'checkbox',
                message: 'Select Generator Options',
                name: 'options',
                choices: choices
            }
        ]);
        //treating results 
        let options = {};

         _.each(generatorOps, (opt) => {
            options[opt.key] = results.options.indexOf(opt.name) != -1;
        });
        //done
        return options;
    }

    buildArguments() {
        let prompts = this.getPrompts();

        _.each(prompts, (prompt) => {
            this.env.argument(prompt.name, { type: String, required: true });
        });
        
    }

    buildConfigWithArgs() {
        var config = {};

        let prompts = this.getPrompts();

        _.each(prompts, (prompt) => {
            let value = this.env.options[prompt.name];
            if (prompt.filter != undefined) {
                value = prompt.filter(value)
            }
            config[prompt.name] = value;
        });

        return config;
    }

    async doPrompt(withParent, withGeneratorOps) {
        let conf;
        if (this.env.options.nointeraction) {
            conf = this.buildConfigWithArgs();
        } else {
            conf = await this.env.prompt(this.getPrompts());

            //generator options only supported with interaction
            if(this.getGeneratorOptions().length > 0 && withGeneratorOps != undefined && withGeneratorOps == true) {
                conf.generatorOptions =  await this.doGeneratorOptionsPrompt(this.getGeneratorOptions());
            }
        }

        if(withParent != undefined && withParent == true){
            conf.root = await getParentConfig();
        }

        return conf;
    }
}