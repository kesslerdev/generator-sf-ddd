"use strict";

var _ = require('underscore');

module.exports = async (env) => {
    
    let config = env.config.getAll().promptValues;
    let configure = true;
    let hasConfig = config != undefined;

    if (hasConfig) {
        configure = await env.prompt([{
            type: 'confirm',
            name: 'reConfigurate',
            message: 'Would you like to change folders configuration ?',
            default: false
        },
        {
            type: 'confirm',
            name: 'reAuthor',
            message: 'Would you like to change author configuration ?',
            default: false
        }]);
    }

    if (configure.reConfigurate) {
        let projectConfig = await env.prompt([{
            type: 'directory',
            name: 'srcDir',
            message: 'What is your src directory',
            basePath: './src',
            store: true
        },{
            type: 'directory',
            name: 'featuresDir',
            message: 'What is your test features directory',
            basePath: './tests/features',
            store: true
        }]);
        
        config = _.extend(config, projectConfig);
    }

    if (configure.reAuthor) {
        let authorConfig = await env.prompt([{
            type: 'input',
            name: 'authorName',
            message: 'What is your Name',
            store: true
        },{
            type: 'input',
            name: 'authorEmail',
            message: 'What is your Email',
            store: true
        }]);
        
        config = _.extend(config, authorConfig);
    }

    return config;



};