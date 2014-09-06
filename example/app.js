
var modella = require('modella');
var collection = require('modella-collection');

var User = modella('User')
    .attr('id');

var me = new User({ id: 'agonbina' });

var users = new collection.Collection([ me ]);

users.on('add', function (user) {
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