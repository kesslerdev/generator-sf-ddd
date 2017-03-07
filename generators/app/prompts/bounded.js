"use strict";

module.exports = async (env, path) => {
    //default values
    path = path != undefined ? path : './';
    let create = await env.prompt([{
        type: 'confirm',
        name: 'genBoundedContext',
        message: 'Would you like to create new Bounded Context ?',
        default: false
    }]);

    if (create.genBoundedContext) {
        //create bounded
        console.log('UNIMPLEMENTED');
        process.exit();
        
    } else {
        let bounded = await env.prompt([{
            type: 'directory',
            name: 'contextDir',
            message: 'Where is your Context Directory?',
            basePath: path
        }]);

        return bounded.contextDir;
    }
};