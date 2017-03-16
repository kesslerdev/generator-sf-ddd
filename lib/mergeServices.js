"use strict";

var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var _ = require('underscore');

var store = memFs.create();
var fs = editor.create(store),
    parseString = require('xml2js').parseString,
    xml2js = require('xml2js');

var xmlBuilderOptions = {
    xmldec: {
        'version': '1.0'
    },
    renderOpts: {
        'pretty': true,
        'indent': '    ',
        'newline': '\n'
    },
};


var BuildXmlNodes = (services) => {
    var xmlServices = [];

    services.forEach(function (element) {
        var xmlElement = {};
        xmlElement['$'] = _.omit(element, ['args', 'tags']);

        if (_.has(element, "args") && _.size(element.args) > 0) {
            xmlElement['argument'] = [];

            element.args.forEach((element) => {
                let xmlelem = {};

                if (_.size(_.omit(element, '__raw')) > 0) {
                    xmlelem['$'] = _.omit(element, '__raw');

                    if (_.has(element, '__raw')) {
                        xmlelem['_'] = element['__raw'];
                    }

                } else if (_.has(element, '__raw')) {
                    xmlelem = element['__raw'];
                }

                xmlElement['argument'].push(xmlelem);
            })
        }

        if (_.has(element, "tags") && _.size(element.tags) > 0) {
            xmlElement['tag'] = [];

            element.tags.forEach((element) => {
                xmlElement['tag'].push({
                    '$': element
                });
            })
        }

        xmlServices.push(xmlElement)
    }, this);

    return xmlServices;
}

module.exports = (env, filePath, merged) => {
    //create file if not exists
    if (!env.fs.exists(filePath)) {
        env.fs.copy(
            __dirname + '/files/services.xml',
            filePath
        )
    }

    parseString(env.fs.read(filePath), function (err, result) {
        if (err) console.log(err);
        let newServices = BuildXmlNodes(merged);
        let element = _.find(result.container.services, function(el){ return el.service != undefined; });
        let key = element == undefined ? undefined : _.indexOf(result.container.services, element);

//TODO: in certain cases the <services> key are generated twicely => parse error in symfony
        if (key != undefined) {
            var services = result.container.services[key].service;
            result.container.services[key].service = _.union(services, newServices);
        } else {
            result.container.services.push({ service: newServices });
        }

        var builder = new xml2js.Builder(xmlBuilderOptions);
        var xml = builder.buildObject(result);

        env.fs.write(filePath, xml);

    });
}