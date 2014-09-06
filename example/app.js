
var modella = require('modella/modella');
var collection = require('agonbina/modella-collection');

var User = modella('User')
    .attr('id')
    .use(collection);
