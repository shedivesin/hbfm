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

    ++t;
  }

  return [output, t];
}


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

function year_01_mail_room() {
  const x = pick(CHARACTER, 3);
  return [x, x];
}

function year_02_busy_mail_room() {
  const x = pick(CHARACTER, random(8, 25));
  return [x, x];
}

function year_03_copy_floor() {
  return ["", ALPHABET];
}

function year_04_scrambler_handler() {
  const x = pick(CHARACTER, random(4, 13) * 2);
  let y = "";
  for(let i = 0; i < x.length; i++) { y += x[i ^ 1]; }
  return [x, y];
}

function year_06_rainy_summer() {
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
}

function year_07_zero_exterminator() {
  const n = random(4, 13);
  const x = shuffle(pick(CHARACTER.slice(1), n).padStart(n * 2, "0"));
  return [x, x.replace(/0/g, "")];
}

function year_08_tripler_room() {
  // FIXME: take in a digit, output two?
}

function year_09_zero_preservation_initiative() {
  const n = random(4, 13);
  const x = shuffle(pick(CHARACTER.slice(1), n).padStart(n * 2, "0"));
  return [x, "".padStart(n, "0")];
}

function year_10_octoplier_suite() {
  // FIXME: take in a digit, output two?
}

function year_11_sub_hallway() {
  // FIXME
}

function year_12_tetracontiplier() {
  // FIXME: take in a digit, output three?
}

function year_13_equalization_room() {
  // FIXME: print one of equal pairs, discard unequal pairs
}

function year_14_maximation_room() {
  // FIXME
}

function year_31_string_reverser() {
  const x = pick(CHARACTER, random(8, 25));
  return [x, x.split("").reverse().join("")];
}


years: for(const [year, solution] of [
  [year_01_mail_room, ",.,.,."],
  [year_02_busy_mail_room, ",[.,]"],
  [year_03_copy_floor, "+++++++++++++[>++>+++++<<-]>[>.+<-]"],
  [year_04_scrambler_handler, ",[>,.<.,]"],
  // FIXME: can we do better?
  [year_06_rainy_summer, ",[>,[<+>-]++++++[<-------->-]<.,]"],
  // FIXME: can we do better?
  [year_07_zero_exterminator, ",[[>+>+<<-]++++++[>--------<-]>[>.<[-]]>[-]<<,]"],
  // FIXME: can we do better?
  [year_09_zero_preservation_initiative, ",[[>+>+<<-]++++++[>--------<-]>[>[-]<[-]]>[.[-]]<<,]"],
  [year_31_string_reverser, ">,[>,]<[.<]"],
]) {
  for(let i = 0; i < 256; i++) {
    const [input, expected] = year();
    try {
      const [actual] = brainfuck(solution, input);
      if(actual !== expected) {
        throw new Error("Incorrect output");
      }
    }
    catch(err) {
      console.log(
        "%s FAILED: %s!\n  input: %j\n  expected: %j",
        year.name,
        err.message,
        input,
        expected,
      );
      continue years;
    }
  }

  console.log(
    "%s OK! (%d)",
    year.name.
      replace(/[a-z]/, x => x.toUpperCase()).
      replace(/_./g, x => " " + x[1].toUpperCase()).
      replace(/[0-9]+/, x => x + ":"),
    solution.replace(/[^+,\-\.<>\[\]]/g, "").length,
  );
}
