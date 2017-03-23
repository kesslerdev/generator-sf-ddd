"use strict";

var _ = require('underscore');
var s = require('underscore.string');

module.exports = class {

  constructor(namespace){
    this.namespace = namespace;
  }

  projectTag() {
    var parts = s.trim(this.namespace, '\\').split('\\');
    var p1 = _.first(parts, 2);
    var tag = s.underscored(s.join(' ', ...p1));

    return tag;
  }
  
  namespaceTag() {
    var parts = s.trim(this.namespace, '\\').split('\\');
    var p2 = _.rest(parts, 2);
    var tag = this.projectTag();
    _.each(p2, function (el) { tag += '.' + s.underscored(el) });

    return tag;
  }

  serviceTag(serviceName, serviceType) {
    return this.namespaceTag() + (serviceType == '' ? '':'.' + s.underscored(serviceType)) + '.' + s.underscored(serviceName);
  }

  normalizerTag(normalizerName) {
    return this.projectTag() + '.rest_dto.normalizer.' + s.underscored(normalizerName);
  }

}