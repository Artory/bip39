import { expect } from "chai";
import vectors from "./vectors.json";
import { typedArrayEquals, hexToBytes, bitsToBytes } from "../util/convert";
import { mnemonicToBytes, bytesToMnemonic } from "../src/index";

describe("vectors", () => {
    for (const lang of Object.keys(vectors)) {
        it(`mnemonicToBytes (${lang})`, async () => {
            for (const fixture of vectors[lang]) {
                const [entropy, mnemonic] = fixture;
                const e = await mnemonicToBytes(mnemonic, lang);
                expect(typedArrayEquals(hexToBytes(entropy), e), entropy).to.be
                    .true;
            }
        });

        it(`bytesToMnemonic (${lang})`, async () => {
            for (const fixture of vectors[lang]) {
                const [entropy, mnemonic] = fixture;
                const actual = await bytesToMnemonic(hexToBytes(entropy), lang);
                expect(actual.length).to.equal(mnemonic.split(" ").length);
                expect(actual.join(" "), entropy).to.equal(mnemonic);
            }
        });
    }
});
