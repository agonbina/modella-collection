/**
 * Module dependencies
 */

var Collection = require('./collection');
var assert = require('assert');


var collection = module.exports = function (Model) {

    var collections = {};

    function findCollections(attrs) {

        function checkTypeForKey(key) {
            var type = attrs[key]['type'];

            if (type && Array.isArray(type)) {
                var model = type[0];
                assert(model, 'You must specify a Model type for a Collection attribute');
                collections[key] = model;
            }
        }

        Object.keys(attrs).forEach(checkTypeForKey);
    }

    function createCollections(instance, attrs) {
        Object.keys(collections).forEach(function (key) {
            var model = collections[key];

            attrs[key] = new Collection(model, attrs[key] || []);
        });
    }

    Model.on('initializing', createCollections);
    Model.on('setting', createCollections);
    
    Model.on('attr', function (name, options) {
        var attrs = {};
        attrs[name] = options;
        findCollections(attrs);
    });

    findCollections(Model.attrs);
};

collection.Collection = Collection;