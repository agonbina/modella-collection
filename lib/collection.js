
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

var Collection = module.exports = function (model, instances) {
    assert(model, 'A Model type must be specified when creating a Collection');

    this.model = model;
    this.models = instances || [];
};

Enumerable(Collection.prototype);
Emitter(Collection.prototype);

/**
 * Returns the count of items in the collection
 */

Collection.prototype.length = function () {
    return this.models.length;
};


/**
 * Implementation of the Enumerable iterator
 *
 * @returns {{length: length, get: get}}
 * @private
 */

Collection.prototype.__iterate__ = function () {
    var self = this;
    return {
        length: function () {
            return self.length()
        },
        get: function (i) {
            return self.models[i]
        }
    };
};


/**
 * Inserts an item in the collection and emits the 'add' event
 *
 * @param item
 * @returns {}
 */

Collection.prototype.add = function (item) {
    assert(!self.has(item), 'This item is already in the collection.');

    var self = this;

    // If item is a raw Object, instantiate it with the Collection model
    if( !(item instanceof self.model) && item instanceof Object) item = new self.model(item);

    self.models.push(item);
    self.emit('add', item);

    return self;
};


/**
 * Remove an item from the collection and emits the 'remove' event
 *
 * @param item
 * @returns {store}
 */

Collection.prototype.remove = function (item) {
    var self = this;

    assert(self.has(item), item + ' is not contained in this collection');

    var position = self.indexOf(item);
    console.log(position);

    self.models.splice(position, 1);
    self.emit('remove', item);

    return self;
};


/**
 * Removes all items matching the query hash
 *
 * @param query
 */

Collection.prototype.removeWhere = function (query) {
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
};


/**
 * Reset the models array to empty
 *
 * @returns {}
 */

Collection.prototype.reset = function () {
    var self = this;

    self.emit('reset', self.models);
    self.models = [];

    return self;
};


/**
 * Get a the raw JSON data of a collection
 *
 * @returns {Array}
 */

Collection.prototype.toJSON = function () {
    var dump = [];

    this.each(function (item) {
        var json = item.toJSON();
        dump.push(json);
    });

    return dump;
};