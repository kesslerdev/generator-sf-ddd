"use strict";

var _prompts = require('../../../lib/prompts');

module.exports = async (env) => {
    //try for first call determine names
    let bundleConfig = await env.prompt(
        _prompts.context([{
            type: 'input',
            name: 'serviceName',
            message: 'Name of Service',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: ['None', 'Service', 'Manager', 'Gateway'],
            filter: function (val) {
                return val == 'None' ? '' : val;
            },
            name: 'serviceSuffix',
            message: 'Service type'
        }])
    );

    //second configure service options

    return bundleConfig;
};