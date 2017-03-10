"use strict";

var _prompts = require('../../../lib/prompts');
var s = require('underscore.string');

module.exports = async (env) => {
    //try for first call determine names
    let config = await env.prompt(
        _prompts.context([{
            type: 'input',
            name: 'exceptionName',
            message: 'Exception name',
            filter: function (val) {
                return s.classify(val);
            }
        }, {
            type: 'list',
            choices: [
                "BadRequestHttpException : 400",
                "ResourceNotFoundException : 404",
                "Exception : 500"
            ],
            filter: function (val) {
                let regex = /[0-9]+/g;
                return regex.exec(val)[0];
            },
            name: 'exceptionType',
            message: 'Exception Type'
        }])
    );
    return config;
};