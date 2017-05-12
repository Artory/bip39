import chunk from "lodash.chunk";

export function lpad(a, maxlength = 8) {
    if (a.length < maxlength) {
        const delta = maxlength - a.length;
        const fill = new Array(delta).fill(0);
        return [...fill, ...a];
    }
    return a;
}

export function hexToBytes(k) {
    const bytes = chunk(k.split(""), 2)
        .map(bytes => bytes.join(""))
        .map(bytes => parseInt(bytes, 16));
    return Uint8Array.from(bytes);
}

export function bitsToDecimal(bits) {
    return bits.reduce((r, b, i) => r + b * 2 ** (bits.length - i - 1), 0);
}

// TODO seems inefficient
export function byteToBits(b) {
    // b is in decimal encoding, ie 0-255
    const result = [];
    for (let i = 8; i--; i >= 0) {
        const x = 2 ** i;
        if (x <= b) {
            result.push(1);
            b -= x;
        } else {
            result.push(0);
        }
    }
    return Uint8Array.from(result);
}

function nextMultipleOfEight(x) {
    return x < 8 ? 8 : x + x % 8;
}

// TODO seems inefficient
export function bitsToBytes(bits) {
    bits = lpad(bits, nextMultipleOfEight(bits.length));
    return Uint8Array.from(chunk(bits, 8).map(bits => bits.join("")).map(s => parseInt(s, 2)));
}

// TODO seems inefficient
export function bytesToBits(bs) {
    return Uint8Array.from(Array.from(bs).map(byteToBits).reduce((a, bits) => [...a, ...bits], []));
}

export function hexToBits(k) {
    return bytesToBits(hexToBytes(k));
}

export function typedArrayEquals(a1, a2) {
    if (a1.length !== a2.length) {
        return false;
    }
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
}
