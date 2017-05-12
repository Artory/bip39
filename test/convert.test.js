import { expect } from "chai";
import * as u from "../util/convert";

describe("convert", () => {
    it(`bits -> decimal`, () => {
        expect(u.bitsToDecimal([0])).to.equal(0);
        expect(u.bitsToDecimal([1])).to.equal(1);
        expect(u.bitsToDecimal([1, 0])).to.equal(2);
        expect(u.bitsToDecimal([1, 1])).to.equal(3);
        expect(u.bitsToDecimal([1, 0, 0])).to.equal(4);
    });

    it(`byte -> bits`, () => {
        expect(Array.from(u.byteToBits(8))).to.deep.equal([
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0
        ]);
        expect(Array.from(u.byteToBits(10))).to.deep.equal([
            0,
            0,
            0,
            0,
            1,
            0,
            1,
            0
        ]);
        expect(Array.from(u.byteToBits(128))).to.deep.equal([
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ]);
    });

    it(`bits -> bytes`, () => {
        expect(
            Array.from(
                u.bitsToBytes("111110110000".split("").map(i => parseInt(i, 2)))
            )
        ).to.deep.equal([15, 176]);
    });

    it(`bytes -> bits`, () => {
        // 80 00
        expect(Array.from(u.bytesToBits([128, 0]))).to.deep.equal(
            "1000000000000000".split("").map(i => parseInt(i, 2))
        );
    });

    it(`hex -> bytes`, () => {
        expect(Array.from(u.hexToBytes("0a"))).to.deep.equal([10]);
        expect(Array.from(u.hexToBytes("a0"))).to.deep.equal([160]);
        expect(u.hexToBytes(new Array(32).fill(0).join("")).length).to.equal(
            16
        );
    });
});
