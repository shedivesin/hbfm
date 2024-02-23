function brainfuck(source, input) {
  const tape = [0];
  const output = [];
  let steps = 0;
  let p = 0;
  let q = 0;

  for(let i = 0; i < source.length; i++) {
    switch(source[i]) {
      case "+":
        tape[p]++;
        break;
      case "-":
        if(!tape[p]) { throw new Error("Data underflow"); }
        tape[p]--;
        break;
      case ",":
        tape[p] = (q < input.length)? input[q++]: 0;
        break;
      case ".":
        if(output.length === 0x3FF) { throw new Error("Output overflow"); }
        output.push(tape[p]);
        break;
      case "<":
        if(!p) { throw new Error("Pointer underflow"); }
        p--;
        break;
      case ">":
        if(p === 0x7FFF) { throw new Error("Pointer overflow"); }
        if(p === tape.length - 1) { tape.push(0); }
        p++;
        break;
      case "[":
        if(!tape[p]) {
          for(let l = 1; l; l -= (source[i] === "]") - (source[i] === "[")) {
            if(i === source.length - 1) { throw new Error("Unmatched left brace"); }
            i++;
          }
        }
        break;
      case "]":
        if(tape[p]) {
          for(let l = 1; l; l += (source[i] === "]") - (source[i] === "[")) {
            if(!i) { throw new Error("Unmatched right brace"); }
            i--;
          }
        }
        break;
      default:
        continue;
    }

    if(steps++ === 0xFFFFFF) { throw new Error("Ran for too many steps"); }
  }

  return {source, input, output, tape: tape.length, steps};
}

function array_equal(a, b) {
  if(a.length !== b.length) { return false; }
  for(let i = 0; i < a.length; i++) { if(a[i] !== b[i]) { return false; } }
  return true;
}

function play(level, cases, sources) {
  for(let i = 0; i < sources.length; i++) {
    const source = sources[i];
    const size = source.match(/[+\-,\.<>\[\]]/g).length;
    let memory = 0;
    let speed = 0;

    try {
      for(let j = 0; j < cases.length; j++) {
        const [input, expected] = cases[j];
        const {output, tape, steps} = brainfuck(source, input);
        if(!array_equal(output, expected)) { throw new Error("Incorrect output: " + output.join("-") + " vs. " + expected.join("-")); }

        memory = Math.max(memory, tape);
        speed += steps;
      }

      speed = Math.ceil(speed / cases.length);
      console.log("%s-%d OK (%s/%s/%s)", level.toString().padStart(2), i + 1, size.toString().padStart(3), memory.toString().padStart(2), speed.toString().padStart(4));
    }
    catch(err) {
      console.log("%s-%d FAIL (%s)", level.toString().padStart(2), i + 1, err.message);
    }
  }
}

// Year 1: Mail Room
// Copy the three inputs to the output.
play(
  1,
  [
    [[1, 2, 3], [1, 2, 3]],
  ],
  [
    ",.,.,.",
    ",[.,]",
  ],
);

// Year 2: Busy Mail Room
// Copy the input to the output.
play(
  2,
  [
    [[1, 2, 3], [1, 2, 3]],
    [[2, 3, 5, 7, 11, 13, 17], [2, 3, 5, 7, 11, 13, 17]],
  ],
  [
    ",[.,]",
  ],
);

// Year 3: Copy Floor
// Output the sequence 66-85-71 (ASCII "BUG").
play(
  3,
  [
    [[], [66, 85, 71]],
  ],
  [
    "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++.--------------.",
    "++++++[->+++++++++++>+<<]+>.+>[-<<+>+++>]<.<[->--<]>.",
  ],
);

// Year 4: Scrambler Handler
// For each pair of inputs, swap and output them.
play(
  4,
  [
    [[1, 2, 3, 4, 5, 6], [2, 1, 4, 3, 6, 5]],
    [[31, 13, 92, 81, 90, 79, 89, 40, 35, 17], [13, 31, 81, 92, 79, 90, 40, 89, 17, 35]],
  ],
  [
    ",[>,.<.,]",
  ],
);

// Year 6: Rainy Summer
// For each pair of inputs, output their sum.
play(
  6,
  [
    [[3, 95, 41, 72, 30, 69], [98, 113, 99]],
    [[48, 10, 22, 35, 55, 38, 94, 93], [58, 57, 93, 187]],
  ],
  [
    ",[>,[-<+>]<.,]",
  ],
);

// Year 7: Zero Exterminator
// Copy the input, except ones, to the output.
// NB: We can't exterminate zeroes, since they're the end-of-input marker.
// TODO: A challenge version of this would be to exclude a higher number, like
// seven, since one must watch out for underflows.
play(
  7,
  [
    [[1, 2, 1, 3, 4, 1], [2, 3, 4]],
    [[8, 1, 6, 5, 2, 6, 1, 1, 1, 1], [8, 6, 5, 2, 6]],
    [[1, 9, 8, 1, 6, 2, 5, 7, 1, 3, 4, 1, 4, 1, 1, 1], [9, 8, 6, 2, 5, 7, 3, 4, 4]],
  ],
  [
    ",[-[+.[-]],]",
  ],
);

// Year 8: Tripler Room
// For each input, triple and output it.
play(
  8,
  [
    [[8, 27, 95], [24, 81, 285]],
    [[97, 52, 35, 26, 48, 4], [291, 156, 105, 78, 144, 12]],
  ],
  [
    ",[[->+++<]>.[-]<,]",
    ",[[->+++<]>.,]",
  ],
);

// Year 9: Zero Preservation Initiative
// Copy only ones from the input to the output.
// NB: We can't preserve zeroes, since they're the end-of-input marker.
// TODO: A challenge version of this would be to preserve a higher number, like
// seven, since one must watch out for underflows.
play(
  9,
  [
    [[1, 2, 1, 3, 4, 1], [1, 1, 1]],
    [[8, 1, 6, 5, 2, 6, 1, 1, 1, 1], [1, 1, 1, 1, 1]],
    [[1, 9, 8, 1, 6, 2, 5, 7, 1, 3, 4, 1, 4, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1]],
  ],
  [
    ",[->+<[>-<[-]],]+>[-<.>]",
  ],
);

// Year 10: Octoplier Suite
// For each input, multiply it by eight and output it.
// FIXME: Omitted for being too similar to years 8 and 12. Is there an
// interesting variation we could do, instead?

// Year 11: Sub Hallway
// For each pair of inputs, output their absolute difference.
// FIXME

// Year 12: Tetracontiplier
// For each input, multiply it by forty and output it.
play(
  12,
  [
    [[1, 8, 7], [40, 320, 280]],
    [[2, 6, 5, 9, 3, 4], [80, 240, 200, 360, 120, 160]],
  ],
  [
    ",[[->+++++<]>[-<++++++++>]<.,]",
  ],
);
