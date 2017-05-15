import crypto from "crypto";
import {
    toBitArray,
    fromBitArray,
    bytesToBits,
    bitsToBytes,
    lpad,
    chunk,
    arrayEquals
} from "./convert";

async function sha256(bytes) {
    if (typeof window !== "undefined") {
        const h = await window.crypto.subtle.digest("SHA-256", Uint8Array.from(bytes));
        return new Uint8Array(h);
    } else {
        const hash = crypto.createHash("sha256");
        hash.update(Uint8Array.from(bytes));
        return hash.digest();
    }
}

export async function mnemonicToBytes(mnemonic, reverselist) {
    const words = Array.isArray(mnemonic) ? mnemonic : mnemonic.split(" ");
    const concat = words
        .map(w => reverselist[w])
        .map(idx => toBitArray(idx, 11))
        .reduce((agg, bitarray) => {
            // flatten
            agg.push.apply(agg, bitarray);
            return agg;
        }, []);
    const drop = Math.round(concat.length / 32);
    const bits = concat.slice(0, concat.length - drop);

    // Validate checksum
    const sha = await sha256(bitsToBytes(bits));
    const expectedChecksum = bytesToBits(sha).slice(0, concat.length / 32);
    const checksum = concat.slice(concat.length - drop);
    if (!arrayEquals(expectedChecksum, checksum)) {
        throw new Error(
            `Invalid mnemonic (expected checksum ${expectedChecksum}, but was ${checksum})`
        );
    }

    return bitsToBytes(bits);
}

export async function bytesToMnemonic(entropy, wordlist) {
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
    const checksum = bytesToBits(sha).slice(0, len / 32);

    // Generate mnemonic
    return chunk([...bits, ...checksum], 11).map(
        idx_bits => wordlist[fromBitArray(idx_bits)]
    );
}
