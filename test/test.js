import { expect } from "chai";
import vectors from "./vectors.json";
import { chunk, arrayEquals } from "../src/convert";
import { mnemonicToBytes, bytesToMnemonic } from "../src/index";
import english from "../util/english.json";
import reverse from "../util/english.reverse.json";

function hexToBytes(k) {
    const bytes = chunk(k.split(""), 2)
        .map(bytes => bytes.join(""))
        .map(bytes => parseInt(bytes, 16));
    return Uint8Array.from(bytes);
}

describe("mnemonicToBytes", () => {
    it("validates checksum", done => {
        const mnemonic = "abandon abandon abandon about";
        mnemonicToBytes(mnemonic, reverse)
            .then(() =>
                done("Expected mnemonicToBytes to throw on invalid mnemonic")
            )
            .catch(() => done());
    });
});

describe("test vectors", () => {
    describe("english", () => {
        it(`mnemonicToBytes`, async () => {
            for (const fixture of vectors["english"]) {
                const [entropy, mnemonic] = fixture;
                const e = await mnemonicToBytes(mnemonic, reverse);
                expect(arrayEquals(hexToBytes(entropy), e), entropy).to.be.true;
            }
        });

        it(`bytesToMnemonic`, async () => {
            for (const fixture of vectors["english"]) {
                const [entropy, mnemonic] = fixture;
                const actual = await bytesToMnemonic(
                    hexToBytes(entropy),
                    english
                );
                expect(actual.length).to.equal(mnemonic.split(" ").length);
                expect(actual.join(" "), entropy).to.equal(mnemonic);
            }
        });
    });
});
