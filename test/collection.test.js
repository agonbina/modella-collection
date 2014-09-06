
describe('Collection', function () {

    var User = modella('User').attr('id');
    var me = new User({ id: 'agonbina' });
    var users = new Collection([ me ]);

    it('should allow instantiating a collection with an array', function () {
        users.add(new User('gonigkum'));

        expect(users.length()).to.equal(2);
        expect(users.has(me)).to.be.true;
    });

    it('')

});