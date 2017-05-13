import { expect } from "chai";
import vectors from "./vectors.json";
import { chunk } from "../src/convert";
import { mnemonicToBytes, bytesToMnemonic } from "../src/index";

function typedArrayEquals(a1, a2) {
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

function hexToBytes(k) {
    const bytes = chunk(k.split(""), 2)
        .map(bytes => bytes.join(""))
        .map(bytes => parseInt(bytes, 16));
    return Uint8Array.from(bytes);
}

describe("test vectors", () => {
    for (const lang of Object.keys(vectors)) {
        describe(lang, () => {
            it(`mnemonicToBytes`, async () => {
                for (const fixture of vectors[lang]) {
                    const [entropy, mnemonic] = fixture;
                    const e = await mnemonicToBytes(mnemonic, lang);
                    expect(typedArrayEquals(hexToBytes(entropy), e), entropy).to
                        .be.true;
                }
            });

            it(`bytesToMnemonic`, async () => {
                for (const fixture of vectors[lang]) {
                    const [entropy, mnemonic] = fixture;
                    const actual = await bytesToMnemonic(
                        hexToBytes(entropy),
                        lang
                    );
                    expect(actual.length).to.equal(mnemonic.split(" ").length);
                    expect(actual.join(" "), entropy).to.equal(mnemonic);
                }
            });
        });
    }
});
