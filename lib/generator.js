"use strict";

var BaseGenerator = require('yeoman-generator');

module.exports = class extends BaseGenerator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts)

        //inquirer new deps
        this.env.adapter.promptModule.registerPrompt('directory', require('inquirer-select-directory'));
    }
};