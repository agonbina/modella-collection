
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

    it('should emit an "added" event when adding a new item', function () {
        var itemAdded = sinon.spy();
        var user = new User({ id: 'someUser' });

        users.on('added', itemAdded);
        users.add(user);

        expect(itemAdded).to.have.been.calledOnce;
        expect(itemAdded).to.have.been.calledWith(user);
    });

});