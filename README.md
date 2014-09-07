[ ![Codeship Status for agonbina/modella-collection](https://www.codeship.io/projects/0688df10-180b-0132-fe58-066ba6aa23b2/status)](https://www.codeship.io/projects/34189)

# modella-collection
A Collection plugin for [modella](https://github.com/modella/modella).


## Example
```
var Animal = modella('Animal').attr('id').attr('type', { type: 'string' });
var User = modella('User')
        .attr('id')
        **.attr('pets', { type: [ Animal ] })**
        .use(collection);

var cat = new Animal({ id: 'kitty', type: 'cat' });
var me = new User({ id: 'agonbina', **pets: [ cat ]** });

me.pets().each(function(pet) {
    console.log(pet.id()); // 'kitty'
});

var pets = me.get('pets');
```
## API

### Collection#.add(instance:Model|obj:Mixed)
Add a new instance to the collection.
```
pets.add({ id: 'doggy', type: 'dog'});
pets.last() instanceof Animal ==> true

or
var newCat = new Animal({ id: 'catze', type: 'cat' });
pets.add(newCat);
```

### Collection#.remove(instance:Model)
Remove an instance from the collection.
```
pets.remove(newCat);
pets.has(newCat); // false
```

### Collection#.removeWhere(query:Mixed)
Remove all instances matching the given query.
```
pets.removeWhere({ type: 'cat' })

var cats = pets.select(function(pet) { return pet.type() === 'cat'; })
cat.length(); // 0
```

### Collection#.reset()
Reset the collection to an empty array.

### Collection#.toJSON()
Recursively travel through all the models and call their .toJSON methods to compile an array with all of them.

## Roadmap
- Add docs about all the whole available API
- Implement event propagation from collections to their parent(model)
