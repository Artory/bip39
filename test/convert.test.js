import { expect } from "chai";
import * as u from "../src/convert";

describe("convert", () => {
    it(`chunk`, () => {
        expect(u.chunk([1, 2, 3, 4], 2)).to.deep.equal([[1, 2], [3, 4]]);
        expect(u.chunk([1, 2, 3, 4], 3)).to.deep.equal([[1, 2, 3], [4]]);
        expect(u.chunk([1, 2, 3, 4], 4)).to.deep.equal([[1, 2, 3, 4]]);

        expect(u.chunk([1, 2, 3], 1)).to.deep.equal([[1], [2], [3]]);
        expect(u.chunk([1, 2, 3], 2)).to.deep.equal([[1, 2], [3]]);
        expect(u.chunk([1, 2, 3], 3)).to.deep.equal([[1, 2, 3]]);
        expect(u.chunk([1, 2, 3], 4)).to.deep.equal([[1, 2, 3]]);
    });
    it(`bits -> decimal`, () => {
        expect(u.fromBitArray([0])).to.equal(0);
        expect(u.fromBitArray([1])).to.equal(1);
        expect(u.fromBitArray([1, 0])).to.equal(2);
        expect(u.fromBitArray([1, 1])).to.equal(3);
        expect(u.fromBitArray([1, 0, 0])).to.equal(4);
    });

    it(`bytes -> bits`, () => {
        expect(Array.from(u.toBitArray(8))).to.deep.equal([
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0
        ]);
        expect(Array.from(u.toBitArray(10))).to.deep.equal([
            0,
            0,
            0,
            0,
            1,
            0,
            1,
            0
        ]);
        expect(Array.from(u.toBitArray(128))).to.deep.equal([
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ]);
        expect(Array.from(u.bytesToBits([128, 0]))).to.deep.equal(
            "1000000000000000".split("").map(i => parseInt(i, 2))
        );
    });

    it(`bits -> bytes`, () => {
        expect(
            Array.from(
                u.bitsToBytes("111110110000".split("").map(i => parseInt(i, 2)))
            )
        ).to.deep.equal([15, 176]);
    });
});
