// Export modules to global scope as necessary (only for testing)
if (typeof process !== 'undefined' && process.title === 'node') {
    // We are in node. Require modules.
    chai = require('chai');
    expect = chai.expect;
    sinon = require('sinon');
    sinonChai = require('sinon-chai');
    chai.use(sinonChai);

    modella = require('modella');
    collection = require('..');
    Collection = collection.Collection;

    isBrowser = false;
} else {
    // We are in the browser. Set up variables like above using served js files.
    expect = chai.expect;

    modella = require('modella');
    collection = require('modella-collection');

    isBrowser = true;
}
