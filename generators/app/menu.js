"use strict";

module.exports = async (env) => {
  //answer base informations
  let running = true;
  let currentDir = process.cwd();
  let yorc = env._config.ctxDir + '/.yo-rc.json';
  //if yorc dont exists
  if (!env.fs.exists(yorc)) {
    env.fs.write(yorc, '{}');
    await env.fs.commit(() => { });
  }

  //run sub generator to the choosen directory
  process.chdir(env._config.ctxDir);

  do {
    var result = await env.prompt([{
      type: 'list',
      name: 'generator',
      message: 'What you want to generate ?',
      choices: ['None', 'Bundle', 'Service', 'Entity'],
      filter: function (val) {
        return val.toLowerCase();
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