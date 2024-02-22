function brainfuck(source, input) {
  const n = source.length;
  const tape = [0];
  let output = "";
  let steps = 0;
  let portable = true;
  let t = 0;
  let i = 0;

  for(let s = 0; s < n; s++) {
    switch(source[s]) {
      case "+":
        if(tape[t] === 255) { portable = false; }
        tape[t] = (tape[t] + 1) & 255;
        break;
      case ",":
        tape[t] = input.charCodeAt(i++) & 255;
        break;
      case "-":
        if(tape[t] === 0) { portable = false; }
        tape[t] = (tape[t] - 1) & 255;
        break;
      case ".":
        output += String.fromCharCode(tape[t]);
        break;
      case "<":
        if(t === 0) { portable = false; tape.unshift(0); t++; }
        t--;
        break;
      case ">":
        if(t === 29999) { portable = false; }
        if(t === tape.length - 1) { tape.push(0); }
        t++;
        break;
      case "[":
        if(!tape[t]) {
          for(let l = 1; l; l -= (source[s] === "]") - (source[s] === "[")) {
            if(s === n - 1) { throw new Error("Unmatched left brace"); }
            s++;
          }
        }
        break;
      case "]":
        if(tape[t]) {
          for(let l = 1; l; l += (source[s] === "]") - (source[s] === "[")) {
            if(s === 0) { throw new Error("Unmatched right brace"); }
            s--;
          }
        }
        break;
      default:
        continue;
    }

    if(steps === 0xFFFFFF) { throw new Error("Ran for too many steps"); }
    steps++;
  }

  return {source, input, output, steps, portable};
}

function play(name, instructions, runs, ...sources) {
  console.log("\n## %s\n%s\n", name, instructions);

  for(let i = 0; i < sources.length; i++) {
    const source = sources[i];
    const size = source.match(/[\+\-\[\]\.\,<>]/g).length;
    let speed = 0;
    let all_portable = true;

    try {
      for(let j = 0; j < runs.length; j++) {
        const [input, expected] = runs[j];
        const {output, steps, portable} = brainfuck(source, input);
        if(output !== expected) {
          throw new Error("Wrong output: " + JSON.stringify(output) + " != " + JSON.stringify(expected));
        }
        speed += steps;
        all_portable &&= portable;
      }
    }
    catch(err) {
      console.log(
        "%d.  FAIL (%s)",
        i + 1,
        err.message,
      );
      continue;
    }

    speed /= runs.length;
    console.log(
      "%d.  %s %d/%s",
      i + 1,
      all_portable? "GOOD": "OK  ",
      size,
      speed.toFixed(1),
    );
  }
}

play(
  "Year 1: Mail Room",
  "Copy the three bytes of input to the output.",
  [
    ["123", "123"],
    ["CAT", "CAT"],
    ["DOG", "DOG"],
  ],
  ",.,.,.",
  ",[.,]",
);

play(
  "Year 2: Busy Mail Room",
  "Copy the input to the output.",
  [
    ["12345", "12345"],
    ["ABACUS", "ABACUS"],
    ["CALCULATOR", "CALCULATOR"],
    ["ANTIKYTHERA MECHANISM", "ANTIKYTHERA MECHANISM"],
  ],
  ",[.,]",
);

play(
  "Year 3: Copy Floor",
  "Output the alphabet.",
  [["", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"]],
  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.+.",
  "+++++++++++++[>++>+++++<<-]>[>.+<-]",
  "+[[<+>>++<-]>]<<++[<+.>-----]",
);

play(
  "Year 4: Scrambler Handler",
  "Copy the input to the output, swapping pairs of bytes.",
  [
    ["42CC17", "24CC71"],
    ["ABCDEFGHIJ", "BADCFEHGJI"],
  ],
  ",[>,.<.,]",
);

play(
  "Year 6: Rainy Summer",
  "For each pair of input ASCII digits, output their sum.",
  [
    ["333243", "657"],
    ["1630120110", "73311"],
    ["1670020023810906", "77205996"],
  ],
  ",[>,------------------------------------------------[<+>-]<.,]",
  ",[>++++++[<-------->-],[<+>-]<.,]",
  ",[>-[<->-----],[<+>-]<+++.,]",
);

play(
  "Year 7: Zero Exterminator",
  "Copy the input, except ASCII zeroes, to the output.",
  [
    ["010540", "154"],
    ["80GSD60000", "8GSD6"],
    ["0DJ0GK5W0040A000", "DJGK5W4A"],
  ],
  ",[[->+>+<<]>------------------------------------------------[>.<[-]]>[-]<<,]",
  ",[[->+>+<<]++++++[->--------<]>[>.<[-]]>[-]<<,]",
);
