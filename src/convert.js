export function chunk(array, size = 1) {
    const l = array.length;
    let i = 0;
    const r = [];
    while (i < l) {
        r.push(array.slice(i, i + size));
        i += size;
    }
    return r;
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

export function lpad(a, maxlength = 8) {
    if (a.length < maxlength) {
        const delta = maxlength - a.length;
        const fill = new Array(delta).fill(0);
        return [...fill, ...a];
    }
    return a;
}

export function toBitArray(b, length = 8) {
    const result = [];
    for (let i = length; i--; i >= 0) {
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

export function fromBitArray(bits) {
    return bits.reduce((r, b, i) => r + b * 2 ** (bits.length - i - 1), 0);
}

export function byteToBits(b) {
    return toBitArray(b, 8);
}

function nextMultiple(x, n = 8) {
    return x < n ? n : x + x % n;
}

export function bitsToBytes(bits) {
    bits = lpad(bits, nextMultiple(bits.length, 8));
    return Uint8Array.from(chunk(bits, 8).map(bits => fromBitArray(bits)));
}

export function bytesToBits(bs) {
    const r = [];
    for (const b of bs) {
        r.push.apply(r, toBitArray(b, 8));
    }
    return Uint8Array.from(r);
}
