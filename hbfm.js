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
      "%s NOT YET SOLVED!\n  Input: %j\n  Expected: %j",
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
        "%s FAILED: Output did not match expectation!\n  Input: %j\n  Expected: %j\n  Actual: %j",
        name,
        input,
        expected,
        actual,
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
const VOWEL = "AEIOU";
const CONSONANT = "BCDFGHJKLMNPQRSTVWXYZ";
const LETTER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHARACTER = NUMBER + LETTER;

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function random_from(x, n) {
  const pool = Array.from(x);
  let out = "";
  while(n-- && pool.length) {
    const i = random(0, pool.length);
    out += pool[i];
    pool[i] = pool[pool.length - 1];
    pool.pop();
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
    const x = random_from(CHARACTER, 3);
    return [x, x];
  },
  ",.,.,.",
);

play(
  "Year 02: Busy Mail Room",
  () => {
    const x = random_from(CHARACTER, random(8, 25));
    return [x, x];
  },
  ",[.,]",
);

play(
  "Year 03: Copy Floor",
  () => ["", LETTER],
  "+++++++++++++[>++>+++++<<-]>[>.+<-]",
);

play(
  "Year 04: Scrambler Handler",
  () => {
    const x = random_from(CHARACTER, random(4, 13) * 2);
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
      x += LETTER[l] + NUMBER[o];
      y += LETTER[l + o];
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
    const a = random_from(CHARACTER.slice(1), n);
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
    const a = random_from(CHARACTER.slice(1), n);
    const b = "".padStart(n, "0");
    return [merge(a, b), b];
  },
  // FIXME: can we do better?
  ",[[>+>+<<-]++++++[>--------<-]>[>[-]<[-]]>[.[-]]<<,]",
);

play(
  "Year 10: Octoplier Suite",
  () => { 
    const n = random(4, 13);
    let x = ""; 
    let y = ""; 
    for(let i = 0; i < n; i++) {
      const a = random(0, 100);
      x += a.toString().padStart(2, "0");
      y += (a * 8).toString().padStart(3, "0");
    }
    return [x, y];
  },
);

play(
  "Year 11: Sub Hallway",
);

play(
  "Year 12: Tetracontiplier",
  () => {
    const n = random(4, 9);
    let x = "";
    let y = "";
    for(let i = 0; i < n; i++) {
      const a = random(0, 256);
      x += a.toString().padStart(3, "0");
      y += (a * 40).toString().padStart(5, "0");
    }
    return [x, y];
  },
);

play(
  "Year 13: Equalization Room",
  () => {
    const n = random(2, 7);
    const y = random_from(CHARACTER, n);

    const eq = new Array(n);
    const ne = new Array(n);
    for(let i = 0; i < n; i++) {
      eq[i] = y[i] + y[i];
      ne[i] = random_from(CHARACTER, 2);
    }

    return [merge(eq, ne), y];
  },
);

play(
  "Year 14: Maximation Room",
);

play(
  "Year 16: Absolute Positivity",
);

play(
  "Year 17: Exclusive Lounge",
);

play(
  "Year 19: Countdown",
);

play(
  "Year 20: Multiplication Workshop",
);

play(
  "Year 21: Zero Terminated Sum",
);

play(
  "Year 22: Fibonacci Visitor",
);

play(
  "Year 23: The Littlest Number",
);

play(
  "Year 24: Mod Module",
);

play(
  "Year 25: Cumulative Countdown",
);

play(
  "Year 26: Small Divide",
);

play(
  "Year 28: Three Sort",
);

play(
  "Year 29: Storage Floor",
);

play(
  "Year 30: String Storage Floor",
);

play(
  "Year 31: String Reverse",
  () => {
    const x = random_from(CHARACTER, random(8, 25));
    return [x, x.split("").reverse().join("")];
  },
  ">,[>,]<[.<]",
);

play(
  "Year 32: Inventory Report",
);

play(
  "Year 34: Vowel Incinerator",
  () => {
    const y = random_from(NUMBER + CONSONANT, random(5, 11));
    return [merge(random_from(VOWEL, VOWEL.length), y), y];
  },
);

play(
  "Year 35: Duplicate Removal",
);

play(
  "Year 36: Alphabetizer",
);

play(
  "Year 37: Scavenger Chain",
);

play(
  "Year 38: Digit Exploder",
);

play(
  "Year 39: Re-Coordinator",
);

play(
  "Year 40: Prime Factory",
);

play(
  "Year 41: Sorting Floor",
);
