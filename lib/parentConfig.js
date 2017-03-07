"use strict";

var findUp = require('find-up');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');

var store = memFs.create();
var fs = editor.create(store);

module.exports = async () => {
    let filePath = await findUp('.yo-rc.json', { cwd: process.cwd() + '/..' });
    
    return fs.readJSON(filePath)['generator-sf-ddd'].promptValues;
}