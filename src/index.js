import englishWordlist from "../util/english.json";
import chunk from "lodash.chunk";
import crypto from "crypto";
import {
    bitsToDecimal,
    bytesToBits,
    bitsToBytes,
    hexToBits,
    lpad
} from "../util/convert";

async function sha256(bytes) {
    if (typeof window !== "undefined") {
        const h = await window.crypto.subtle.digest("SHA-256", bytes)
        return bytesToBits(new Uint8Array(h));
    } else {
        const hash = crypto.createHash("sha256");
        hash.update(bytes);
        return hexToBits(hash.digest("hex"));
    }
}

function getWordList(maybeWordlist) {
    if (typeof maybeWordlist === "string") {
        if (maybeWordlist.toLowerCase() === "english") {
            return englishWordlist;
        }
        throw new Error(`Word list ${maybeWordlist} not supported`);
    }
    if (Array.isArray(maybeWordlist)) {
        return maybeWordlist;
    }
    throw new Error(
        `Word list must be either string or array, is ${typeof maybeWordlist}`
    );
}

export async function mnemonicToBytes(mnemonic, wordlist) {
    wordlist = getWordList(wordlist);

    const words = Array.isArray(mnemonic) ? mnemonic : mnemonic.split(" ");
    // TODO this block stinks
    const idxs = words.map(w => wordlist.findIndex(el => w === el));
    const idx_bits = idxs
        .map(idx => idx.toString(2).split(""))
        .map(bits => bits.map(b => parseInt(b, 2)))
        .map(bits => lpad(bits, 11));
    // END stinking block
    const concat = idx_bits.reduce((a, b) => [...a, ...b], []);
    const drop = Math.round(concat.length / 32);
    const bits = concat.slice(0, concat.length - drop);
    // TODO not validating checksum
    return bitsToBytes(bits);
}

export async function bytesToMnemonic(entropy, wordlist) {
    wordlist = getWordList(wordlist);
    const bits = bytesToBits(entropy);
    const len = bits.length;
    // Entropy has to be multiple of 32 bits
    if (len % 32 !== 0) {
        throw new Error(
            `Invalid entropy size ${len}. Use multiple of 32 bits.`
        );
    }

    // Generate checksum in bits
    const sha = await sha256(entropy);
    const checksum = sha.slice(0, len / 32);

    // Generate mnemonic
    return chunk([...bits, ...checksum], 11)
        .map(idx_bits => wordlist[bitsToDecimal(idx_bits)]);
}
