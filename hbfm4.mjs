import {brainfuck} from "./brainfuck.mjs";
import {leaderboard} from "./leaderboard.mjs";
import {uint32, range, range_ne, range_array} from "./random.mjs";

console.log("# Human Brainfuck Machine Leaderboards");

leaderboard(
  "Year 1: Mail Room",
  // Copy the three inputs to the output.
  10,
  () => {
    const x = range_array(3, 1, 99);
    return [x, x];
  },
  [
    [",.,.,.", "@sdi"],
    [",[.,]", "@sdi"],
  ],
);

leaderboard(
  "Year 2: Busy Mail Room",
  // Copy the input to the output.
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    return [x, x];
  },
  [
    [",[.,]", "@sdi"],
  ],
);

leaderboard(
  "Year 3: Copy Floor",
  // Output the sequence 66-85-71 (ASCII "BUG").
  1,
  () => [[], [66, 85, 71]],
  [
    ["++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++.--------------.", "@sdi"],
    ["++++++[->+++++++++++>+<<]+>.+>[-<<+>+++>]<.<[->--<]>.", "@sdi"],
  ],
);

leaderboard(
  "Year 4: Scrambler Handler",
  // For each pair of inputs, swap and output them.
  10,
  () => {
    const n = range(3, 10) * 2;
    const x = range_array(n, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = x[i ^ 1]; }
    return [x, y];
  },
  [
    [",[>,.<.,]", "@sdi"],
  ],
);

leaderboard(
  "Year 6: Rainy Summer",
  // For each pair of inputs, output their sum.
  10,
  () => {
    const n = range(3, 10);
    const x = range_array(n * 2, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = x[i * 2 + 0] + x[i * 2 + 1]; }
    return [x, y];
  },
  [
    [",[>,[-<+>]<.,]", "@sdi"],
  ],
);

leaderboard(
  "Year 7: Zero Exterminator",
  // Copy the input, except ones, to the output.
  // NB: HRM exterminates zeroes rather than ones, but we can't do that in
  // Brainfuck since zero is the end-of-input marker.
  10,
  () => {
    const n = range(3, 20);
    const r = uint32();
    const x = new Array(n);
    for(let i = 0; i < n; i++) { x[i] = ((r >> i) & 1)? range(2, 99): 1; }

    const y = x.filter(x => x !== 1);
    return [x, y];
  },
  [
    [",[-[+.[-]],]", "@sdi"],
    [",[-[+.>],]", "@sdi"],
  ],
);

leaderboard(
  "Year 8: Tripler Room",
  // For each input, triple and output it.
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = x[i] * 3; }
    return [x, y];
  },
  [
    [",[[->+++<]>.[-]<,]", "@sdi"],
    [",[[->+++<]>.,]", "@sdi"],
  ],
);

leaderboard(
  "Year 9: Zero Preservation Initiative",
  // NB: HRM exterminates zeroes rather than ones, but we can't do that in
  // Brainfuck since zero is the end-of-input marker.
  10,
  () => {
    const n = range(3, 20);
    const r = uint32();
    const x = new Array(n);
    for(let i = 0; i < n; i++) { x[i] = ((r >> i) & 1)? range(2, 99): 1; }

    const y = x.filter(x => x === 1);
    return [x, y];
  },
  [
    [",[->+<[>-<[-]],]+>[-<.>]", "@sdi"],
  ],
);

// Year 10: Octoplier Suite
// For each input, multiply it by eight and output it.
// FIXME: Omitted for being too similar to years 8 and 12. Is there an
// interesting variation we could do, instead?

leaderboard(
  "Year 11: Sub Hallway",
  // For each pair of inputs, output their absolute difference. (These inputs
  // will never be identical.)
  10,
  () => {
    const n = range(3, 10);
    const x = new Array(n * 2);
    const y = new Array(n);
    for(let i = 0; i < n; i++) {
      const a = range(1, 99);
      const b = range_ne(1, 99, a);
      x[i * 2 + 0] = a;
      x[i * 2 + 1] = b;
      y[i] = Math.abs(a - b);
    }
    return [x, y];
  },
  [
  ],
);

leaderboard(
  "Year 12: Tetracontiplier",
  // For each input, multiply it by forty and output it.
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = x[i] * 40; }
    return [x, y];
  },
  [
    [",[[->+++++<]>[-<++++++++>]<.,]", "@sdi"],
    [",[[->++++++++++++++++++++++++++++++++++++++++<]>.,]", "@sdi"],
  ],
);

leaderboard(
  "Year 13: Equalization Room",
  // For each pair of inputs, if they are equal, output one of them.
  10,
  () => {
    const n = range(3, 10);
    const r = uint32();
    const x = new Array(n * 2);
    const y = [];
    for(let i = 0; i < n; i++) {
      const a = range(1, 99);
      x[i * 2 + 0] = a;

      if((r >> i) & 1) {
        x[i * 2 + 1] = a;
        y.push(a);
      }
      else {
        x[i * 2 + 1] = range_ne(1, 99, a);
      }
    }

    return [x, y];
  },
  [
  ],
);

// Year 14: Maximation Room
// For each pair of inputs, output the larger of the two. (If they're equal,
// just output one of them.)
// FIXME

// Year 16: Absolute Positivity
// FIXME: Omitted since we aren't working with negative numbers. Is there an
// interesting variation we could do, instead?

// Year 17: Exclusive Lounge
// For each pair of inputs, output a 1 if they have the same parity (e.g. are
// both even or odd), or a 2 if they have the opposite parity.
// NB: HRM uses sign bit, but we don't have negative numbers, so we use the
// parity bit, instead.
// NB: It would be nicer to output 0 or 1 (e.g. the XOR of the parity bit), but
// we can't do that in Brainfuck since zero is the end-of-output marker.
// FIXME

leaderboard(
  "Year 19: Countdown",
  // For each input, output it followed by each number down to one.
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 20);
    const y = [];
    for(let i = 0; i < n; i++) { for(let j = x[i]; j > 0; j--) { y.push(j); } }

    return [x, y];
  },
  [
    [",[[.-],]", "@sdi"],
  ],
);

// Year 20: Multiplication Workshop
// For each pair of inputs, output their product.
leaderboard(
  "Year 20: Multiplication Workshop",
  // For each pair of inputs, output their product.
  10,
  () => {
    const n = range(3, 10);
    const x = range_array(n * 2, 1, 20);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = x[i * 2 + 0] * x[i * 2 + 1]; }

    return [x, y];
  },
  [
    [",[>,<[->[->+>+<<]>[-<+>]<<]>>>.[-]<<<,]", "@sdi"],
  ],
);
