var _ = require('underscore');
var s = require('underscore.string');
var getParentConfig = require('./parentConfig');

module.exports = class Prompting {
    constructor(env) {
        this.env = env;
        this.env.option('nointeraction');

        if (env.options.nointeraction) {
            this.env.log('no interaction');
            this.buildArguments();
        }
    }

    getPrompts() { }

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

    async doPrompt(withParent) {
        let conf;
        if (this.env.options.nointeraction) {
            conf = this.buildConfigWithArgs();
        } else {
            conf = await this.env.prompt(this.getPrompts());
        }

        if(withParent != undefined){
            conf.root = await getParentConfig();
        }

        return conf;
    }
}