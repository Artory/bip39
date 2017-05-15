require("babel-polyfill");
const { Suite } = require("benchmark");
const { mnemonicToBytes, bytesToMnemonic } = require("../dist/bip39");
const english = require("../util/english.json");
const reverse = require("../util/english.reverse.json");
const suite = new Suite();

function chunk(array, size = 1) {
    const l = array.length;
    let i = 0;
    const r = [];
    while (i < l) {
        r.push(array.slice(i, i + size));
        i += size;
    }
    return r;
}

function hexToBytes(k) {
    const bytes = chunk(k.split(""), 2)
        .map(bytes => bytes.join(""))
        .map(bytes => parseInt(bytes, 16));
    return Uint8Array.from(bytes);
}

const bytes = hexToBytes("c0ba5a8e914111210f2bd131f3d5e08d");
const mnemonic =
    "scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump";

// add tests
suite
    .add(
        "mnemonic->bytes",
        function(deferred) {
            mnemonicToBytes(mnemonic, reverse).then(_ => deferred.resolve());
        },
        { defer: true }
    )
    .add(
        "bytes->mnemonic",
        function(deferred) {
            bytesToMnemonic(bytes, english).then(_ => deferred.resolve());
        },
        { defer: true }
    )
    .on("complete", function() {
        const m2b = this[0];
        const b2m = this[1];
        console.log(`mnemonic->bytes: ${m2b.hz} ops/sec`);
        console.log(`bytes->mnemonic: ${b2m.hz} ops/sec`);
    })
    .run({ async: true });
