# bip39

Implementation of a BIP39 subset that works in Node.js and modern browsers. WORK IN PROGRESS (see caveats below).

## Features

* Implemented on top of JS' typed arrays, so works in Node and browser without shims
* Super-small bundle size (<5KB minified), because word lists must be loaded and supplied by library users

## Caveats

* Unpublished
* Most probably inefficient
* `mnemonicToBytes` doesn't validate the checksum
* Missing seed support
* Does not work in browsers without web crypto API

## TODO

* Complete code (at least checksum validation)
* Add benchmark, make more efficient
* Publish package and benchmark numbers
