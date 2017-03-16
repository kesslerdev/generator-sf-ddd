"use strict";

module.exports = async (env) => {
    let config = await env.prompt(
        [{
            type: 'input',
            name: 'generator',
            message: 'Generator Name'
        }]
    );
    return config;
};