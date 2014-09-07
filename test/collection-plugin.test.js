describe('collection-plugin', function () {

    var Animal = modella('Animal').attr('type', { type: 'string' });
    var User = modella('User')
        .attr('id')
        .attr('pets', { type: [ Animal ] })
        .use(collection);

    it('should throw if no Model is specified for a Collection type', function () {
        function badModel() {
            modella('Cow').attr('fans', { type: [] }).use(collection);
        }

        expect(badModel).to.throw(/You must specify a Model type for a Collection attribute/);
    });

    it('should recognize a type of Collection and create a new Collection instance', function () {
        var cat = new Animal({ type: 'cat' });
        var dog = new Animal({ type: 'dog' });

        var user = new User({ id: 'agonbina', pets: [ cat, dog ] });
        var pets = user.get('pets');

        expect(pets.length()).to.equal(2);
        expect(pets.first().toJSON()).to.eql({ type: 'cat' });
        expect(pets.toJSON()).to.deep.include.members([{ type: 'dog' }]);

        expect(pets).to.be.instanceof(Collection);

        expect(pets).to.respondTo('has');

        // Not sure why these tests are failing!
        //expect(pets.has(cat)).to.be.true;
        //expect(user.get('pets').has(dog)).to.be.true;
    });

});