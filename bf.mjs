#!/usr/bin/env node
import fs from "node:fs/promises";
import {brainfuck} from "./lib/brainfuck.mjs";

const input = process.argv[2]?.match(/\S+/g) ?? [];
for(let i = 0; i < input.length; i++) {
  const str = input[i];
  const num = +str;
  if(!Number.isInteger(num) || num <= 0) {
    throw new Error("Invalid input " + str);
  }

  input[i] = num;
}

const pathname = process.argv[3] ?? "/dev/stdin";
let source = await fs.readFile(pathname, "ascii");
if(source.startsWith("#!")) {
  source = source.slice(source.indexOf("\n") + 1);
}

const {output} = brainfuck(source, input, true);
console.log("Output: %s", output.join(" "));
