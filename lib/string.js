
const pl = require('pluralize')
const s = require('underscore.string')

var containerTags = require('./containerTags')

module.exports = class StringManipulator {

    constructor(name, data) {
        this.name = s.classify(name)
        this.tags = new containerTags(data.contextNamespace)
        this.data = data
    }

    /* class name */
    classN() {
        return this.name
    }

    /* pluralized class name */
    pluralClassN() {
        return pl(this.classN())
    }

    /* url name */
    urlN() {
        return s.underscored(this.classN())
    }

    /* pluralized url name */
    pluralUrlN() {
        return pl(this.urlN())
    }

    /* var name */
    varN() {
        return '$'+s.camelize(this.classN(), true)
    }

    /* repository name */
    repoN() {
        return this.tags.serviceTag(this.classN(),'repository')
    }
}