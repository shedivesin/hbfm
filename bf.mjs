#!/usr/bin/env node
import fs from "node:fs/promises";
import {brainfuck} from "./lib/brainfuck.mjs";

async function readfile(pathname, encoding) {
  // NB: Frankly, I think it's *shocking* that fs.readFile can't read from a
  // ReadableStream.
  if(pathname === undefined || pathname === "" || pathname === "-") {
    let source = "";
    for await(const chunk of process.stdin) {
      source += chunk.toString(encoding);
    }
    return source;
  }

  else {
    return await fs.readFile(pathname, encoding);
  }
}

const input = process.argv[2]?.match(/[1-9][0-9]*/g) ?? [];
for(let i = 0; i < input.length; i++) { input[i] = +input[i]; }

const pathname = process.argv[3];
let source = await readfile(pathname, "ascii");
if(source.startsWith("#!")) {
  source = source.slice(source.indexOf("\n") + 1);
}

const {output} = brainfuck(source, input, true);
console.log("Output: %s", output.join(" "));
