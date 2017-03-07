"use strict";

//var _ = require('underscore');

module.exports = async (env) => {
    //try for first call determine names
    let bundleConfig = await env.prompt([{
        type: 'input',
        name: 'bundleNamespace',
        message: 'Namespace of bundle',
        store: true
    }, {
        type: 'input',
        name: 'serviceName',
        message: 'Name of Service'
    }, {
        type: 'list',
        choices: ['None', 'Service', 'Manager', 'Gateway'],
        filter: function (val) {
            return val == 'None' ? '' : val;
        },
        name: 'serviceSuffix',
        message: 'Service type'
    }]);

    //second configure service options

    return bundleConfig;
};