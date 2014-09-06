
/**
 * Module dependencies
 */
var assert = require('assert');
try {
    var Enumerable = require('enumerable');
} catch (e) {
    Enumerable = require('enumerable-component');
}

try {
    var Emitter = require('emitter');
} catch (e) {
    Emitter = require('emitter-component');
}

var Collection = module.exports = function (models) {
    this.models = models || [];
};

Collection.prototype = {

    length: function () {
        return this.models.length;
    },

    __iterate__: function () {
        var self = this;
        return {
            length: function () {
                return self.length()
            },
            get: function (i) {
                return self.models[i]
            }
        };
    },

    add: function (item) {
        var self = this;

        assert(!self.has(item), 'This item is already in the collection.');

        self.models.push(item);
        self.emit('added', item);

        return self;
    }

};

Enumerable(Collection.prototype);
Emitter(Collection.prototype);