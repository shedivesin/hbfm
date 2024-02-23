import {brainfuck} from "./brainfuck.mjs";
import {leaderboard} from "./leaderboard.mjs";
import {uint32, range, range_array} from "./random.mjs";

function merge(a, b) {
  const c = [];
  let i = 0;
  let j = 0;
  while(i < a.length && j < b.length) {
    if(uint32() & 1) { c.push(a[i++]); }
    else { c.push(b[j++]); }
  }
  while(i < a.length) { c.push(a[i++]); }
  while(j < b.length) { c.push(b[j++]); }
  return c;
}

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
  // TODO: A challenge version of this would be to exclude a higher number,
  // like seven, since one must watch out for underflows.
  10,
  () => {
    const n = range(3, 20);
    const m = range(0, n);
    const x = range_array(m, 1, 99);
    const y = new Array(n - m).fill(1);
    return [merge(x, y), x];
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
  // TODO: A challenge version of this would be to preserve a higher number,
  // like seven, since one must watch out for underflows.
  10,
  () => {
    const n = range(3, 20);
    const m = range(0, n);
    const x = range_array(m, 1, 99);
    const y = new Array(n - m).fill(1);
    return [merge(x, y), y];
  },
  [
    [",[->+<[>-<[-]],]+>[-<.>]", "@sdi"],
  ],
);

// Year 10: Octoplier Suite
// For each input, multiply it by eight and output it.
// FIXME: Omitted for being too similar to years 8 and 12. Is there an
// interesting variation we could do, instead?

// Year 11: Sub Hallway
// For each pair of inputs, output their absolute difference.
// FIXME

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
