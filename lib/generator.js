"use strict";

var chalk = require('chalk');
var BaseGenerator = require('yeoman-generator');

class Logger{
    constructor(env) {
        this.env = env;
    }

    info(message){
        this.env.log(chalk.underline.blue(message))
    }

    warn(message){
        this.env.log(chalk.black.bgYellow(' ' + message + ' '))
    }

    error(message){
        this.env.log(chalk.black.bgRed(' ' + message + ' '))
    }

    snippet(text, snippet){
        this.env.log(chalk.underline.green(text))
        this.env.log('\n' + chalk.black.bgGreen(snippet) + '\n')
    }
}

module.exports = class extends BaseGenerator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts)

        //inquirer new deps
        this.env.adapter.promptModule.registerPrompt('directory', require('inquirer-select-directory'));
        this.logger = new Logger(this);
    }
};