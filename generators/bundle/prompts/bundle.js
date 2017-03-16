"use strict";

var _ = require('underscore');
var s = require('underscore.string');
var _prompts = require('../../../lib/prompts');

module.exports = async (env) => {
    //try for first call determine names
    let bundleConfig = await env.prompt(
        _prompts.context([{
            type: 'input',
            name: 'bundleName',
            message: 'Name of bundle (Without Bundle)',
            store: true,
            filter: function (val) {
                return s.classify(val);
            }
        }])
    );

    let compile = await env.prompt([{
        type: 'confirm',
        name: 'hasCompiler',
        message: 'Has a container compiler pass (for tagged services)',
        default: false,
        store: true
    }, {
        when: (props) => { return props.hasCompiler },
        type: 'input',
        name: 'compilerPassName',
        message: 'Name of Compiler Pass',
        default: 'TaggedServices',
        store: true,
        filter: function (val) {
            return s.classify(val);
        }
    }]);

    return _.extend(bundleConfig, compile);
};