
var modella = require('modella');
var collection = require('..');

var Animal = modella('Animal').attr('id').attr('type', { type: 'string' });
var User = modella('User')
    .attr('id')
    .attr('pets', { type: [ Animal ] })
    .use(collection);

User.attr('cows', { type: [Animal] });

var cat = new Animal({ id: 'kitty', type: 'cat' });
var dog = new Animal({ id: 'doggy', type: 'dog' });
var me = new User({ id: 'agonbina', pets: [ cat ] });

var pets = me.pets();

pets.on('add', function (pet) {
    console.log('New pet %s added!', pet.id());
});
pets.on('remove', function (pet) {
    console.log('Removed pet %s', pet.id());
});

pets.add(dog).add(cat);
pets.add({ id: 'mydog', type: 'dog' }); // pets.at(3) instanceof Animal ==> true

pets
    .select(function (pet) {
        return pet.type() === 'dog';
    })
    .each(function (dog) {
        console.log(dog.id());
    });

setTimeout(function () {
    pets.removeWhere({ type: 'dog' });

    setTimeout(function () {
        pets.removeWhere({ type: 'cat' });
    }, 1500);

}, 1500);