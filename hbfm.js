"use strict";

function brainfuck(code, input) {
  const data = new Uint8Array(30000);
  let output = "";
  let p = 0;
  let i = 0;
  let t = 0;

  for(let c = 0; c < code.length; c++) {
    switch(code[c]) {
      case "+":
        if(data[p] === 255) { throw new Error("Data overflow"); }
        ++data[p];
        break;
      case ",":
        data[p] = input.charCodeAt(i++);
        break;
      case "-":
        if(data[p] === 0) { throw new Error("Data underflow"); }
        --data[p];
        break;
      case ".":
        output += String.fromCharCode(data[p]);
        break;
      case "<":
        if(p === 0) { throw new Error("Pointer underflow"); }
        --p;
        break;
      case ">":
        if(p === data.length - 1) { throw new Error("Pointer overflow"); }
        ++p;
        break;
      case "[":
        if(!data[p]) {
          for(let l = 1; l; l -= (code[c] === "]") - (code[c] === "[")) {
            if(c === code.length - 1) { throw new Error("Unmatched left brace"); }
            ++c;
          }
        }
        break;
      case "]":
        if(data[p]) {
          for(let l = 1; l; l += (code[c] === "]") - (code[c] === "[")) {
            if(c === 0) { throw new Error("Unmatched right brace"); }
            --c;
          }
        }
        break;
      default:
        continue;
    }

    if(++t === 0x1000000) {
      throw new Error("Program ran for too many steps");
    }
  }

  return output;
}

function play(name, generator, solution) {
  if(generator === undefined) {
    console.warn("%s NOT YET DEFINED!", name);
    return;
  }

  const [input, expected] = generator();
  if(solution === undefined) {
    console.warn(
      "%s NOT YET SOLVED!\n  %j -> %j",
      name,
      input,
      expected,
    );
    return;
  }

  try {
    const actual = brainfuck(solution, input);
    if(actual !== expected) {
      console.warn(
        "%s FAILED: Output did not match expectation!\n  Input: %j\n  Output: %j\n  Expected: %j",
        name,
        input,
        actual,
        expected,
      );
      return;
    }
  }
  catch(err) {
    console.warn(
      "%s FAILED: %s!",
      name,
      err.message,
    );
    return;
  }

  console.log(
    "%s OK!",
    name,
  );
}


const NUMBER = "0123456789";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHARACTER = NUMBER + ALPHABET;

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function random_from(x) {
  return x[random(0, x.length)];
}

function random_sequence_from(x, n) {
  let out = "";
  for(let i = 0; i < n; i++) {
    out += random_from(x);
  }
  return out;
}

function merge(a, b) {
  a = Array.from(a);
  b = Array.from(b);
  let c = "";
  while(a.length && b.length) { c += ((Math.random() < 0.5)? a: b).shift(); }
  while(a.length) { c += a.shift(); }
  while(b.length) { c += b.shift(); }
  return c;
}
  
play(
  "Year 01: Mail Room",
  () => {
    const x = random_sequence_from(CHARACTER, 3);
    return [x, x];
  },
  ",.,.,.",
);

play(
  "Year 02: Busy Mail Room",
  () => {
    const x = random_sequence_from(CHARACTER, random(8, 25));
    return [x, x];
  },
  ",[.,]",
);

play(
  "Year 03: Copy Floor",
  () => ["", ALPHABET],
  "+++++++++++++[>++>+++++<<-]>[>.+<-]",
);

play(
  "Year 04: Scrambler Handler",
  () => {
    const x = random_sequence_from(CHARACTER, random(4, 13) * 2);
    let y = "";
    for(let i = 0; i < x.length; i++) { y += x[i ^ 1]; }
    return [x, y];
  },
  ",[>,.<.,]",
);

play(
  "Year 06: Rainy Summer",
  () => {
    const n = random(4, 13);
    let x = "";
    let y = "";
    for(let i = 0; i < n; i++) {
      const o = random(0, 10);
      const l = random(0, 26 - o);
      x += ALPHABET[l] + NUMBER[o];
      y += ALPHABET[l + o];
    }
    return [x, y];
  },
  // FIXME: can we do better?
  ",[>,[<+>-]++++++[<-------->-]<.,]",
);

play(
  "Year 07: Zero Exterminator",
  () => {
    const n = random(4, 13);
    const a = random_sequence_from(CHARACTER.slice(1), n);
    const b = "".padStart(n, "0");
    return [merge(a, b), a];
  },
  // FIXME: can we do better?
  ",[[>+>+<<-]++++++[>--------<-]>[>.<[-]]>[-]<<,]",
);

play(
  "Year 08: Tripler Room",
  () => {
    const n = random(4, 13);
    let x = "";
    let y = "";
    for(let i = 0; i < n; i++) {
      const a = random(0, 10);
      x += NUMBER[a];
      y += (a * 3).toString().padStart(2, "0");
    }
    return [x, y];
  },
);

play(
  "Year 09: Zero Preservation Initiative",
  () => {
    const n = random(4, 13);
    const a = random_sequence_from(CHARACTER.slice(1), n);
    const b = "".padStart(n, "0");
    return [merge(a, b), b];
  },
  // FIXME: can we do better?
  ",[[>+>+<<-]++++++[>--------<-]>[>[-]<[-]]>[.[-]]<<,]",
);

play(
  "Year 10: Octoplier Suite",
  // FIXME: Take in 0-99, output three digits?
);

play(
  "Year 11: Sub Hallway",
);

play(
  "Year 12: Tetracontiplier",
  // FIXME: Take in 0-255, output five digits?
);

play(
  "Year 13: Equalization Room",
  () => {
    const n = random(2, 7);
    const y = random_sequence_from(CHARACTER, n);

    const eq = new Array(n);
    const ne = new Array(n);
    for(let i = 0; i < n; i++) {
      eq[i] = y[i] + y[i];
      do {
        ne[i] = random_sequence_from(CHARACTER, 2);
      } while(ne[i][0] === ne[i][1]);
    }

    return [merge(eq, ne), y];
  },
);

play(
  "Year 14: Maximation Room",
);

play(
  "Year 31: String Reverser",
  () => {
    const x = random_sequence_from(CHARACTER, random(8, 25));
    return [x, x.split("").reverse().join("")];
  },
  ">,[>,]<[.<]",
);
