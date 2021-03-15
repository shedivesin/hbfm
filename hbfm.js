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

function random(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

function shuffle(iterable, n=undefined) {
  const array = Array.from(iterable);
  const out = [];
  if(n === undefined || n > array.length) {
    n = array.length;
  }
  while(n--) {
    const i = random(0, array.length - 1);
    out.push(array[i]);
    array[i] = array[array.length - 1];
    array.pop();
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

function numbers(min, max, n) {
  const set = new Set();
  set.add(min);
  set.add(max);
  while(set.size < n) {
    set.add(random(min + 1, max - 1));
  }
  return shuffle(set);
}
  
play(
  "Year 01: Mail Room",
  () => {
    const x = shuffle(NUMBER + LETTER, 3).join("");
    return [x, x];
  },
  ",.,.,.",
);

play(
  "Year 02: Busy Mail Room",
  () => {
    const x = shuffle(NUMBER + LETTER, random(8, 24)).join("");
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
    const x = shuffle(NUMBER + LETTER, random(4, 12) * 2).join("");
    let y = "";
    for(let i = 0; i < x.length; i++) { y += x[i ^ 1]; }
    return [x, y];
  },
  ",[>,.<.,]",
);

play(
  "Year 06: Rainy Summer",
  () => {
    const n = random(4, 10);
    const ns = numbers(0, 9, n);
    let x = "";
    let y = "";
    for(let i = 0; i < n; i++) {
      const a = ns[i];
      const b = random(0, 25 - a);
      x += LETTER[b] + a.toString();
      y += LETTER[b + a];
    }
    return [x, y];
  },
  // FIXME: can we do better?
  ",[>,[<+>-]++++++[<-------->-]<.,]",
);

play(
  "Year 07: Zero Exterminator",
  () => {
    const n = random(4, 12);
    const a = shuffle(NUMBER.slice(1) + LETTER, n).join("");
    const b = "".padStart(n, "0");
    return [merge(a, b), a];
  },
  // FIXME: can we do better?
  ",[[>+>+<<-]++++++[>--------<-]>[>.<[-]]>[-]<<,]",
);

play(
  "Year 08: Tripler Room",
  () => {
    const n = random(4, 10);
    const ns = numbers(0, 9, n);
    let x = "";
    let y = "";
    for(let i = 0; i < n; i++) {
      x += ns[i].toString();
      y += (ns[i] * 3).toString().padStart(2, "0");
    }
    return [x, y];
  },
);

play(
  "Year 09: Zero Preservation Initiative",
  () => {
    const n = random(4, 12);
    const a = shuffle(NUMBER.slice(1) + LETTER, n).join("");
    const b = "".padStart(n, "0");
    return [merge(a, b), b];
  },
  // FIXME: can we do better?
  ",[[>+>+<<-]++++++[>--------<-]>[>[-]<[-]]>[.[-]]<<,]",
);

play(
  "Year 10: Octoplier Suite",
  () => { 
    const n = random(4, 8);
    const ns = numbers(0, 99, n);
    let x = ""; 
    let y = ""; 
    for(let i = 0; i < n; i++) {
      x += ns[i].toString().padStart(2, "0");
      y += (ns[i] * 8).toString().padStart(3, "0");
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
    const n = random(4, 6);
    const ns = numbers(0, 255, n);
    let x = "";
    let y = "";
    for(let i = 0; i < n; i++) {
      x += ns[i].toString().padStart(3, "0");
      y += (ns[i] * 40).toString().padStart(5, "0");
    }
    return [x, y];
  },
);

play(
  "Year 13: Equalization Room",
  () => {
    const n = random(4, 6);
    const y = shuffle(NUMBER + LETTER, n).join("");

    const eq = new Array(n);
    const ne = new Array(n);
    for(let i = 0; i < n; i++) {
      eq[i] = y[i] + y[i];
      ne[i] = shuffle(NUMBER + LETTER, 2).join("");
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
    const chars = shuffle(NUMBER + LETTER, random(8, 24));
    const x = chars.join("");
    const y = chars.reverse().join("");
    return [x, y];
  },
  ">,[>,]<[.<]",
);

play(
  "Year 32: Inventory Report",
);

play(
  "Year 34: Vowel Incinerator",
  () => {
    const y = shuffle(NUMBER + CONSONANT, random(5, 10)).join("");
    return [merge(shuffle(VOWEL), y), y];
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
