
var modella = require('modella/modella');
var collection = require('agonbina/modella-collection');

var User = modella('User')
    .attr('id');

var me = new User({ id: 'agonbina' });

var users = new collection.Collection([ me ]);

users.on('added', function (user) {
    console.log('Added a new user: ' + user.id());
});

setTimeout(function () {
    users.add(new User({ id: 'gonigkum' }));
}, 1500);

users.each(function (user) {
    console.log(user.id());
});

users.map('id').each(function (id) {
    console.log(id);
});