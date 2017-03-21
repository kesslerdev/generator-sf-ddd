"use strict";

var _ = require('underscore');
var s = require('underscore.string');
var _prompts = require('../../../lib/prompts');

module.exports = async (env) => {
    let conf = env.config.get('promptValues');

    //try on first call determine names
    if (conf.bundleName == undefined) {
        env.config.set('promptValues',_.extend(conf, {
            bundleName: _.rest(conf.contextNamespace.split("\\"), 1).join('')
        }));
    }
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