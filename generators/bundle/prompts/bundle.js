"use strict";

var _ = require('underscore');

module.exports = async (env) => {
    //try for first call determine names
    let bundleConfig = await env.prompt([{
        type: 'input',
        name: 'bundleName',
        message: 'Name of bundle',
        store: true
    }, {
        type: 'input',
        name: 'bundleNamespace',
        message: 'Namespace of bundle',
        store: true
    }]);

    let compile = await env.prompt([{
        type: 'confirm',
        name: 'hasCompiler',
        message: 'Has a container compiler pass (for tagged services)',
        default: false,
        store: true
    }, {
        when: (props) =>{ return props.hasCompiler},
        type: 'input',
        name: 'compilerPassName',
        message: 'Name of Compiler Pass',
        default: 'TaggedServices',
        store: true
    }]);

    return _.extend(bundleConfig, compile);
};