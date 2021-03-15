const NUMBER = "0123456789";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHARACTER = NUMBER + ALPHABET;

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function pick(string, n=1) { 
  let out = "";
  while(n--) { out += string[random(0, string.length)]; }
  return out;
}

function shuffle(string) {
  string = string.split("");
  for(let i = string.length; i; ) {
    const j = random(0, i--);
    const t = string[i];
    string[i] = string[j];
    string[j] = t;
  }
  return string.join("");
}

const years = [
  [
    "Year 01: Mail Room",
    ",.,.,.",
    () => {
      const x = pick(CHARACTER, 3);
      return [x, x];
    },
  ],
  [
    "Year 02: Busy Mail Room",
    ",[.,]",
    () => {
      const x = pick(CHARACTER, random(8, 25));
      return [x, x];
    },
  ],
  [
    "Year 03: Copy Floor",
    "+++++++++++++[>++>+++++<<-]>[>.+<-]",
    () => ["", ALPHABET],
  ],
  [
    "Year 04: Scrambler Handler",
    ",[>,.<.,]",
    () => {
      const x = pick(CHARACTER, random(4, 13) * 2);
      let y = "";
      for(let i = 0; i < x.length; i++) { y += x[i ^ 1]; }
      return [x, y];
    },
  ],
  [
    "Year 06: Rainy Summer",
    ",[>,[<+>-]++++++[<-------->-]<.,]", // FIXME: can we do better?
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
  ],
  [
    "Year 07: Zero Exterminator",
    ",[[>+>+<<-]++++++[>--------<-]>[>.<[-]]>[-]<<,]", // FIXME: can we do better?
    () => {
      const n = random(4, 13);
      const x = shuffle(pick(CHARACTER.slice(1), n).padStart(n * 2, "0"));
      return [x, x.replace(/0/g, "")];
    },
  ],
/*
  [
    "Year 08: Tripler Room",
    "",
    () => {
      // FIXME: take in a digit, output two?
    },
  ],
*/
  [
    "Year 09: Zero Preservation Initiative",
    "",
    () => {
      const n = random(4, 13);
      const x = shuffle(pick(CHARACTER.slice(1), n).padStart(n * 2, "0"));
      return [x, "".padStart(n, "0")];
    },
  ],
/*
  [
    "Year 10: Octoplier Suite",
    "",
    () => {
      // FIXME: take in a digit, output two?
    },
  ],
  [
    "Year 11: Sub Hallway",
    "",
    () => {
    },
  ],
  [
    "Year 12: Tetracontiplier",
    "",
    () => {
      // FIXME: take in a digit, output three?
    },
  ],
  [
    "Year 13: Equalization Room",
    "",
    () => {
      // print one of equal pairs, discard unequal pairs
    },
  ],
  [
    "Year 14: Maximation Room",
    "",
    () => {
    },
  ],
*/
  [
    "Year 31: String Reverser",
    ">,[>,]<[.<]",
    () => {
      const x = pick(CHARACTER, random(8, 25));
      return [x, x.split("").reverse().join("")];
    },
  ],
];


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

    ++t;
  }

  return [output, t];
}


for(const [name, par, generator] of years) {
  const [input, expected] = generator();
  console.log("%s\n  %j -> %j", name, input, expected);

  let mean = 0;
  for(let i = 0; i < 256; i++) {
    const [actual, steps] = brainfuck(par, input);
    if(actual !== expected) {
      throw new Error("Par solution didn't work!");
    }
    mean += steps / 256;
  }

  console.log("  %d", mean);
}
