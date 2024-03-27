#!/usr/bin/env node
import fs from "node:fs/promises";
import {brainfuck} from "./lib/brainfuck.mjs";

const input = process.argv[2]?.match(/[1-9][0-9]*/g) ?? [];
for(let i = 0; i < input.length; i++) { input[i] = +input[i]; }

const pathname = process.argv[3] ?? "/dev/stdin";
let source = await fs.readFile(pathname, "ascii");
if(source.startsWith("#!")) {
  source = source.slice(source.indexOf("\n") + 1);
}

const {output} = brainfuck(source, input, true);
console.log("Output: %s", output.join(" "));
