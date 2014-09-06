
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
        self.emit('add', item);

        return self;
    },

    remove: function (item) {
        var self = this;

        assert(self.has(item), item + ' is not contained in this collection');

        var position = self.indexOf(item);
        console.log(position);

        self.models.splice(position, 1);
        self.emit('remove', item);

        return self;
    },

    removeWhere: function (query) {
        var self = this;

        assert(typeof query === 'object', 'Query must be an object with key(attribute):value(criteria)');

        function removeItem(key) {
            var criteria = query[key];

            self
                .select(function (item) {
                    return item[key]() === criteria;
                }).each(function (item) {
                    self.remove(item);
                });
        }

        Object.keys(query).forEach(removeItem);

        return self;
    }

};

Enumerable(Collection.prototype);
Emitter(Collection.prototype);