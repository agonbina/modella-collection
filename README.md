[ ![Codeship Status for agonbina/modella-collection](https://www.codeship.io/projects/0688df10-180b-0132-fe58-066ba6aa23b2/status)](https://www.codeship.io/projects/34189)

# modella-collection
A Collection plugin for [modella](https://github.com/modella/modella).


### Example
```
var Animal = modella('Animal').attr('id').attr('type', { type: 'string' });
var User = modella('User')
        .attr('id')
        .attr('pets', { type: [ Animal ] })
        .use(collection);

var cat = new Animal({ id: 'kitty', type: 'cat' });
var me = new User({ id: 'agonbina', pets: [ cat ] });

me.pets().each(function(pet) {
    console.log(pet.id()); // 'kitty'
});
```
### API