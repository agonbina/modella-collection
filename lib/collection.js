
/**
 * Module dependencies
 */

try {
    var Enumerable = require('enumerable');
} catch (e) {
    Enumerable = require('enumerable-component');
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
    }

};

Enumerable(Collection.prototype);