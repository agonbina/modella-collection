
describe('Collection', function () {

    var User = modella('User').attr('id');
    var me = new User({ id: 'agonbina' });
    var users = new Collection();

    it('should allow instantiating a collection with an array', function () {
        var friends = new Collection([ me ]);

        expect(friends.length()).to.equal(1);
        expect(friends.has(me)).to.be.true;
    });

    it('should add a new item using .add', function () {
        users.add(new User({ id: 'gonigkum' }));

        expect(users.length()).to.equal(1);
        expect(users.at(0).id()).to.equal('gonigkum');
    });

    it('should emit an "add" event on the collection instance when a new item is added', function () {
        var itemAdded = sinon.spy();
        var user = new User({ id: 'someUser' });

        users.on('add', itemAdded);
        users.add(user);

        expect(itemAdded).to.have.been.calledOnce;
        expect(itemAdded).to.have.been.calledWith(user);
    });

    describe('.remove and removeWhere', function () {

        var agon = new User({ id: 'agon' }),
            tobi = new User({ id: 'tobi' });

        before(function () {
            users = new Collection([agon, tobi]);
        });

        it('should remove an item from the collection', function () {
            var itemRemoved = sinon.spy();

            users.on('remove', itemRemoved);
            users.remove(agon).remove(tobi);

            expect(itemRemoved).to.have.been.calledTwice;
            expect(itemRemoved).to.have.been.calledWith(agon)
                .and.to.have.been.calledWith(tobi);
            expect(users.length()).to.equal(0);
        });

        it('should remove all items matching a query', function () {
            var query = { id: 'agon' }; // Match all users with id: 'agon'
            var userRemoved = sinon.spy();
            var duplicate = new User({ id: 'agon' });

            users.add(agon).add(tobi).add(duplicate);

            users.on('remove', userRemoved);
            users.removeWhere(query);

            expect(userRemoved).to.have.been.calledTwice;
            expect(userRemoved).to.have.been.calledWith(agon)
                .and.have.been.calledWith(duplicate);
            expect(users.has(tobi)).to.be.true;
            expect(users.has(agon)).to.be.false;
        });

    });

});