[ ![Codeship Status for agonbina/modella-collection](https://www.codeship.io/projects/0688df10-180b-0132-fe58-066ba6aa23b2/status)](https://www.codeship.io/projects/34189)

# modella-collection
A Collection plugin for [modella](https://github.com/modella/modella).

## Installation

With node.js:

    npm install modella-collection

In the browser (using [component](https://github.com/component/component)):

    component install agonbina/modella-collection


## Example
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

var pets = me.get('pets');
```
For more examples see [examples](/example).

## API

Every Collection instance will inherit all [Enumerable](https://github.com/component/enumerable) methods, so go check them out!
Below are some of the methods that you would expect to have in a collection.

### Collection#.add(instance:Model|obj:Mixed)
Add a new instance to the collection. Emits ```'add'``` event.
```
pets.on('add', function(newPet) { });

pets.add({ id: 'doggy', type: 'dog'});
pets.last() instanceof Animal ==> true

or
var newCat = new Animal({ id: 'catze', type: 'cat' });
pets.add(newCat);
```

### Collection#.remove(instance:Model)
Remove an instance from the collection. Emits ```'remove'``` event.
```
pets.on('remove', function(removedPet) { });

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
