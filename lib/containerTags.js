"use strict";

var _ = require('underscore');
var s = require('underscore.string');

module.exports = class {

  constructor(namespace){
    this.namespace = namespace;
  }

  namespaceTag() {
    var parts = s.trim(this.namespace, '\\').split('\\');
    var p1 = _.first(parts, 2);
    var p2 = _.rest(parts, 2);
    var tag = s.underscored(s.join(' ', ...p1));
    _.each(p2, function (el) { tag += '.' + s.underscored(el) });

    return tag;
  }

  serviceTag(serviceName, serviceType){
    return this.namespaceTag() + '.' + s.underscored(serviceType) + '.' + s.underscored(serviceName);
  }

}