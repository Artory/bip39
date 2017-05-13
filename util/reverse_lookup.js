// Generates reverse lookup file from word list

const fs = require("fs");
const path = require("path");

const [, , file] = process.argv;
const wordlist = JSON.parse(String(fs.readFileSync(file)));
const reverse = wordlist.reduce(
    (rev, w, i) => Object.assign(rev, { [w]: i }),
    {}
);
fs.writeFileSync(
    path.join(__dirname, path.basename(file, ".json") + ".reverse.json"),
    JSON.stringify(reverse, null, 2)
);
