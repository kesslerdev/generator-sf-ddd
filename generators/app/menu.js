"use strict";

var path = require('path');
var s = require('underscore.string');
var _ = require('underscore');

module.exports = async (env) => {
  //answer base informations
  let running = true;
  let currentDir = process.cwd();
  let yorc = env._config.ctxDir + '/.yo-rc.json';
  //if yorc dont exists
  if (!env.fs.exists(yorc)) {
    let ctxPath = path.relative(env._config.project.srcDir, env._config.ctxDir);
    env.fs.write(yorc, JSON.stringify({
      "generator-sf-ddd": {
        promptValues: {
          contextNamespace: env._config.project.baseNamespace + "\\" + ctxPath.replace(path.sep, "\\"),
        }
      }
    }));
    await env.fs.commit(() => { });
  }

  //run sub generator to the choosen directory
  process.chdir(env._config.ctxDir);

  do {
    var result = await env.prompt([{
      type: 'list',
      name: 'generator',
      message: 'What you want to generate ?',
      choices: [
        'None', 'Bundle', 'Service', 'Entity','Exception','Normalizer', 'Controller', 'Query',
        'CQRS Command', 'CQRS Form Type'
      ],
      filter: function (val) {
        return s.slugify(val)
      }
    }]);

    if (result.generator == 'none') {
      running = false;
    } else {
      //pass current dir
      env.spawnCommandSync('yo', ['sf-ddd:' + result.generator]);
    }
  }
  while (running);

  process.chdir(currentDir);
}