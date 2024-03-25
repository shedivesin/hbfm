#!/usr/bin/env node
import {brainfuck} from "./lib/brainfuck.mjs";
import {header, leaderboard} from "./lib/leaderboard.mjs";
import {uint32, range, range_ne, range_array, shuffle} from "./lib/random.mjs";

header("Human Brainfuck Machine Leaderboards");

leaderboard(
  1,
  "Mail Room",
  "Copy the three inputs to the output.",
  10,
  () => {
    const x = range_array(3, 1, 99);
    return [x, x];
  },
  [
    // Naive solution.
    [",.,.,.", "@sdi"],

    // https://esolangs.org/wiki/brainfuck#Cat
    [",[.,]", "folklore"],
  ],
);

leaderboard(
  2,
  "Busy Mail Room",
  "Copy the input to the output.",
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    return [x, x];
  },
  [
    // https://esolangs.org/wiki/brainfuck#Cat
    [",[.,]", "folklore"],
  ],
);

leaderboard(
  3,
  "Copy Floor",
  "Output the sequence 66-85-71 (ASCII \"BUG\").",
  1,
  () => [[], [66, 85, 71]],
  [
    // Naive solution.
    ["++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++.--------------.", "@sdi"],

    // 3*7*3=63, 3*7*4=84.
    ["+++[->+++++++[->+++>++++<<]<]>>+++.>+.<+++++.", "@sdi"],

    // ([1,4,2]+8)*7+1=[65-2,85,71]
    [">+>++++>++[++++++++[->+++++++<]<]>>++[+.>]", "@sdi"],
  ],
);

leaderboard(
  4,
  "Scrambler Handler",
  "For each pair of inputs, swap and output them.",
  10,
  () => {
    const n = range(3, 10) * 2;
    const x = range_array(n, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = x[i ^ 1]; }

    return [x, y];
  },
  [
    // Naive solution.
    [",[>,.<.,]", "@sdi"],
  ],
);

leaderboard(
  6,
  "Rainy Summer",
  "For each pair of inputs, output their sum.",
  10,
  () => {
    const n = range(3, 10);
    const x = range_array(n * 2, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = x[i * 2 + 0] + x[i * 2 + 1]; }

    return [x, y];
  },
  [
    // Naive solution.
    [",[>,[-<+>]<.,]", "@sdi"],
  ],
);

leaderboard(
  7,
  "Zero Exterminator",
  "Copy the input, except ones, to the output.",
  // NB: HRM exterminates zeroes rather than ones, but we can't do that in
  // Brainfuck since zero is the end-of-input marker.
  10,
  () => {
    const n = range(3, 20);
    const r = uint32();
    const x = new Array(n);
    for(let i = 0; i < n; i++) { x[i] = ((r >> i) & 1)? range(2, 99): 1; }

    return [x, x.filter(x => x !== 1)];
  },
  [
    // Naive solution.
    [",[-[+.[-]],]", "@sdi"],

    // Evil optimization of the above which wastes tape to avoid a clear loop.
    [",[-[+.>],]", "@sdi"],
  ],
);

leaderboard(
  8,
  "Tripler Room",
  "For each input, triple and output it.",
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    return [x, x.map(x => x * 3)];
  },
  [
    // Naive solution.
    [",[[->+++<]>.[-]<,]", "@sdi"],

    // Evil optimization of the above which wastes tape to avoid a clear loop.
    [",[[->+++<]>.,]", "@sdi"],
  ],
);

leaderboard(
  9,
  "Zero Preservation Initiative",
  "Copy only the ones in the input to the output.",
  // NB: HRM exterminates zeroes rather than ones, but we can't do that in
  // Brainfuck since zero is the end-of-input marker.
  10,
  () => {
    const n = range(3, 20);
    const r = uint32();
    const x = new Array(n);
    for(let i = 0; i < n; i++) { x[i] = ((r >> i) & 1)? range(2, 99): 1; }

    return [x, x.filter(x => x === 1)];
  },
  [
    // Naive solution.
    [",[->+<[>-<[-]]>[.-]<,]", "@sdi"],

    // Avoid clear loop by overwriting input.
    [",[->+<[>-]>[>]<[.-]<,]", "@sdi"],
  ],
);

// Year 10: Octoplier Suite
// For each input, multiply it by eight and output it.
// FIXME: Omitted for being too similar to years 8 and 12. Is there an
// interesting variation we could do, instead?

leaderboard(
  11,
  "Sub Hallway",
  "For each pair of inputs, output their absolute difference.\n(These inputs will never be identical.)",
  // NB: HRM outputs a-b then b-a, but we don't have negative numbers.
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
    // Make the tape hold 1 0 A B. We subtract 1 from both A and B in a loop
    // such that when either becomes zero, we end the loop one cell to the
    // right of the value that didn't; we then output it and use the sentinel
    // cells to reposition the pointer.
    ["+>>,[>,[-<-[<]>>]<.<<[>]>,]", "@sdi"],

    // Evil optimization of the above which wastes tape to avoid resetting.
    [">,[>,[-<-[<]>>]<.,]", "@sdi"],
  ],
);

leaderboard(
  12,
  "Tetracontiplier",
  "For each input, multiply it by forty and output it.",
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    return [x, x.map(x => x * 40)];
  },
  [
    // Multiply by 5, then multiply by 8, ending in the original cell to avoid
    // clearing.
    [",[[->+++++<]>[-<++++++++>]<.,]", "@sdi"],

    // Multiply by 40, then evilly waste tape to avoid clearing.
    [",[[->++++++++++++++++++++++++++++++++++++++++<]>.,]", "@sdi"],
  ],
);

leaderboard(
  13,
  "Equalization Room",
  "For each pair of inputs, if they are equal, output one of them.",
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

leaderboard(
  14,
  "Maximation Room",
  "For each pair of inputs, output the larger of the two.\n(If they're equal, just output one of them.)",
  10,
  () => {
    const n = range(3, 10);
    const x = range_array(n * 2, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = Math.max(x[i * 2 + 0], x[i * 2 + 1]); }

    return [x, y];
  },
  [
  ],
);

// Year 16: Absolute Positivity
// FIXME: Omitted since we aren't working with negative numbers. Is there an
// interesting variation we could do, instead?

leaderboard(
  17,
  "Exclusive Lounge",
  "For each input, output a 1 if it is odd or a 2 if it is even.",
  // NB: HRM uses two number's sign bits, but we don't have negative numbers,
  // so we use the parity bit, instead. But then the parity of the two is just
  // their sum, and the sum is trivial, so we remove that part since it doesn't
  // add anything to the puzzle.
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    return [x, x.map(x => (x - 1) % 2 + 1)];
  },
  [
  ],
);

leaderboard(
  19,
  "Countdown",
  "For each input, output it followed by each number down to one.",
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 20);
    const y = [];
    for(let i = 0; i < n; i++) { for(let j = x[i]; j > 0; j--) { y.push(j); } }

    return [x, y];
  },
  [
    // Naive solution.
    [",[[.-],]", "@sdi"],
  ],
);

leaderboard(
  20,
  "Multiplication Workshop",
  "For each pair of inputs, output their product.",
  10,
  () => {
    const n = range(3, 10);
    const x = range_array(n * 2, 1, 20);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = x[i * 2 + 0] * x[i * 2 + 1]; }

    return [x, y];
  },
  [
    // Naive solution. Tape holds A B t A*B, t holding a temporary copy of B.
    [",[>,<[->[->+>+<<]>[-<+>]<<]>>>.[-]<<<,]", "@sdi"],
  ],
);

leaderboard(
  21,
  "Zero Terminated Sum",
  "Input consists of a series of strings. Each string consists of a length L,\nfollowed by L numbers N1, N2, ..., NL. For each string, output the sum\nN1 + N2 + ... + NL.",
  // NB: HRM uses zero-delimited (C-style) strings. We use length-prefixed
  // (Pascal-style) strings since we do not allow zeroes in input/output.
  10,
  () => {
    const n = range(2, 5);
    const x = [];
    const y = [];
    for(let i = 0; i < n; i++) {
      const len = range(1, 8);
      const str = range_array(len, 1, 99);

      let sum = 0;
      for(let j = 0; j < len; j++) { sum += str[j]; }

      x.push(len, ...str);
      y.push(sum);
    }

    return [x, y];
  },
  [
    // Quick and dirty first attempt.
    [",[[->>,[<+>-]<<]>.[-]<,]", "@sdi"],
  ],
);

leaderboard(
  22,
  "Fibonacci Visitor",
  "For each input N, output the Nth Fibonacci number.",
  // NB: F(1)=1, F(2)=1, F(N)=F(N-2)+F(N-1).
  // NB: HRM has us output all Fibonacci numbers less than N, but I figure this
  // variant is a bit more reasonable.
  10,
  () => {
    const f = [1, 1];
    while(f.length < 20) { f.push(f[f.length - 2] + f[f.length - 1]); }

    const n = range(3, 10);
    const x = range_array(n, 1, f.length);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = f[x[i] - 1]; }

    return [x, y];
  },
  [
    // Tape holds N B A t 0. Initially, B=1, A=0, t=0. Each step, A+=B, t+=B,
    // B=0. Then, copy A and t one cell to the left. Finally, print B, make
    // sure A is nonzero, and clear cells until we hit N.
    [",[->+<[->[->+>+<<]>[[<+>-]>]<<<<]>.>+[[-]<],]", "@sdi"],
  ],
);

leaderboard(
  23,
  "The Littlest Number",
  "Output the smallest number in the input.",
  // FIXME: HRM uses zero-delimited strings, and expects an output for each.
  // I'm not sure that adds much to this puzzle, but it's worth considering.
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    const y = [Math.min(...x)];
    return [x, y];
  },
  [
    [">>,[>>,]<<[[-<+<]>[>]>[<<.[>>]>>]<<]", "@sdi"],
  ],
);

leaderboard(
  24,
  "Mod Module",
  "For each pair of inputs, output the remainder of the first divided by the second.",
  10,
  () => {
    const n = range(3, 10);
    const x = range_array(n, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = x[i * 2 + 0] % x[i * 2 + 1]; }

    return [x, y];
  },
  [
  ],
);

leaderboard(
  25,
  "Cumulative Countdown",
  "For each input, output the sum of itself and all numbers down to one;\ne.g. if the input is 3, output 3+2+1=6.",
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = x[i] * (x[i] + 1) / 2; }

    return [x, y];
  },
  [
  ],
);

leaderboard(
  26,
  "Small Divide",
  "For each pair of inputs, output the first divided by the second.",
  10,
  () => {
    const n = range(3, 10);
    const x = range_array(n, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = Math.floor(x[i * 2 + 0] / x[i * 2 + 1]); }

    return [x, y];
  },
  [
  ],
);

leaderboard(
  28,
  "Three Sort",
  "For each triplet of inputs, output them in sorted order.",
  10,
  () => {
    const n = range(3, 6) * 3;
    const x = range_array(n, 1, 99);
    const y = [];
    for(let i = 0; i < n; i += 3) { y.push(...x.slice(i, i + 3).sort((a, b) => a - b)); }

    return [x, y];
  },
  [
  ],
);

leaderboard(
  29,
  "Storage Floor",
  "The first 10 inputs are reference data. For each subsequent input N, output\nthe Nth referenced input.",
  10,
  () => {
    const data = range_array(10, 1, 99);

    const n = range(3, 10);
    const x = range_array(n, 1, data.length);
    const y = new Array(n);
    for(let i = 0; i < n; i++) { y[i] = data[x[i] - 1]; }

    return [data.concat(x), y];
  },
  [
    // First 10 cells are data. Read input into eleventh cell, decrement it,
    // and move it to the right. When it reaches zero, we'll be in cell 10+N.
    // Then we can just move left 10 times, output it, and move back to the
    // eleventh cell.
    [",>,>,>,>,>,>,>,>,>,>,[-[-[->+<]>]<<<<<<<<<<.[>],]", "@sdi"],
  ],
);

// Year 30: String Storage Floor
// FIXME: HRM uses zero-delimited strings here, which isn't appropriate given
// our I/O model. Is there something else we can do?

leaderboard(
  31,
  "String Reverse",
  "Output the bytes of the input in reverse order.",
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    const y = x.slice().reverse();
    return [x, y];
  },
  [
    // Naive solution.
    [">,[>,]<[.<]", "folklore"],
  ],
);

leaderboard(
  32,
  "Inventory Report",
  "The first 10 inputs are reference data. For each subsequent input, output\nhow many of the reference cells are equal to it.",
  10,
  () => {
    const m = range(1, 10);
    const numbers = range_array(m, 1, 99);
    const data = range_array(10, 1, m).map(i => numbers[i - 1]);

    const n = range(3, 10);
    const x = range_array(n, 1, data.length).map(i => data[i - 1]);
    return [data.concat(x), x.map(x => data.filter(y => x === y).length)];
  },
  [
  ],
);

function is_prime(x) {
  if(!Number.isInteger(x)) { return false; }
  if(x < 2) { return false; }
  if(x < 4) { return true; }
  if(x % 2 === 0) { return false; }
  for(let y = 3; y * y <= x; y += 2) { if(x % y === 0) { return false; } }

  return true;
}

leaderboard(
  34,
  "Vowel Incinerator",
  "Output every input, except primes.",
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 2, 99);
    return [x, x.filter(x => !is_prime(x))];
  },
  [
  ],
);

leaderboard(
  35,
  "Duplicate Removal",
  "Copy each unique input to the output.",
  10,
  () => {
    const n = range(3, 20);
    const r = uint32();
    const x = new Array(n);
    x[0] = range(1, 99);
    for(let i = 1; i < n; i++) { x[i] = ((r >> i) & 1)? range(1, 99): x[range(0, i - 1)]; }

    return [x, Array.from(new Set(x))];
  },
  [
    // Quick and dirty first attempt.
    [">>,[[-[->>>+<<<]>+[->>>+<<<]+>>]<[>>[-]<<-]+>>[.[-]]+[-<<<]>>,]", "@sdi"],
  ],
);

// Year 36: Alphabetizer
// FIXME

leaderboard(
  37,
  "Scavenger Chain",
  "The first twelve inputs are reference data, consisting of pairs containing\na value and an index to a different piece of reference data. The remainder\nof inputs are indexes to reference data. For each of those remaining\ninputs, output the data's value at that index, and then follow the data's\nindex and repeat. An index of 7 means that the chain has ended.",
  10,
  () => {
    // FIXME: In theory, this doesn't need to be a linear chain: any acyclic
    // graph would be fine. In practice, I have a hard time visualizing any
    // plausible solution for which this would matter.
    const chain = shuffle([1, 2, 3, 4, 5, 6]);
    chain.push(7);

    const data = new Array(12);
    for(let i = 0; i < 6; i++) {
      data[i * 2 + 0] = range(1, 99);
      data[i * 2 + 1] = chain[chain.indexOf(i + 1) + 1];
    }

    const n = range(3, 10);
    const x = range_array(n, 1, 7);
    const y = [];
    for(let i = 0; i < n; i++) {
      for(let t = x[i]; t < 7; t = data[(t - 1) * 2 + 1]) {
        y.push(data[(t - 1) * 2 + 0]);
      }
    }

    return [data.concat(x), y];
  },
  [
  ],
);

leaderboard(
  38,
  "Digit Exploder",
  "For each input, output its digits.",
  10,
  () => {
    const n = range(3, 10);
    const r = uint32();
    const x = new Array(n);
    for(let i = 0; i < n; i++) {
      const a = (r >> (i * 2 + 0)) & 1;
      const b = (r >> (i * 2 + 1)) & 1;
      const d = 1 + a + b; // 25% 1 digit, 50% 2 digits, 25% 3 digits.
      x[i] = range(Math.pow(10, d - 1), Math.pow(10, d) - 1);
    }

    const y = [];
    for(let i = 0; i < n; i++) { y.push(...Array.from(x[i].toString(), x => +x)); }

    return [x, y];
  },
  [
  ],
);

leaderboard(
  39,
  "Re-Coordinator",
  "Consider this table:\n\n|  | 1| 2| 3| 4|\n+--+--+--+--+--+\n| 1| 1| 2| 3| 4|\n| 2| 5| 6| 7| 8|\n| 3| 9|10|11|12|\n| 4|13|14|15|16|\n\nFor each input, output it's column number followed by it's row number.\n(For example, given the input 7, output 3 then 2.)",
  10,
  () => {
    const n = range(3, 10);
    const x = range_array(n, 1, 16);
    const y = new Array(n * 2);
    for(let i = 0; i < n; i++) {
      y[i * 2 + 0] = ((x[i] - 1) % 4) + 1;
      y[i * 2 + 1] = Math.floor((x[i] - 1) / 4) + 1;
    }

    return [x, y];
  },
  [
  ],
);

leaderboard(
  40,
  "Prime Factory",
  "For each input, output its prime factors in sorted order.",
  10,
  () => {
    const n = range(3, 10);
    const x = range_array(n, 2, 99);
    const y = [];
    for(let i = 0; i < n; i++) {
      for(let t = x[i], p = 2; t > 1; p++) {
        while(t % p === 0) {
          t /= p;
          y.push(p);
        }
      }
    }

    return [x, y];
  },
  [
  ],
);

leaderboard(
  41,
  "Sorting Floor",
  "Output the input in sorted order.",
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    const y = x.slice().sort((a, b) => a - b);
    return [x, y];
  },
  [
    // bubble sort
    // http://brainfuck.org/bsort.b
    [">>,[>>,]<<[[<<]>>>>[<<[>+<<+>-]>>[>+<<<<[->]>[<]>>-]<<<[[-]>>[>+<-]>>[<<<+>>>-]]>>[[<+>-]>>]<]<<[>>+<<-]<<]>>>>[.>>]", "Daniel B. Cristofani"],

    // insertion sort
    // http://brainfuck.org/isort.b
    [">+[<[[>>+<<-]>[<<+<[->>+[<]]>>>[>]<<-]<<<]>>[<<+>>-]<[>+<-]>[>>]<,]<<<[<+<]>[>.>]", "Daniel B. Cristofani"],

    // selection sort
    // http://brainfuck.org/results2.txt
    [">>,[>>,]<<[[-<+<]>[>[>>]<[.[-]<[[>>+<<-]<]>>]>]<<]", "Daniel B. Cristofani"],

    // Run-length counting sort?
    // https://codegolf.stackexchange.com/a/4764
    [">,[[-[>>+<<-]>+>]<[<<]>,]+>[>+<-]>[>[>+<<->-]<[<<.>>-]<<[>>+<<-]>>+>>]", "AShelly"],

    // bubble sort
    // https://codegolf.stackexchange.com/a/33030
    [">>,[>>+[->>+<<],]>>[<<<<<<[>>[<+<-[>>>]>>[-[-<<+>>]+>>>]<<<-]<[-<+>>+<]<<<]>>[>>]>>-]<<<<[.<<]", "jimmy23013"],

    // Counting sort. Tape holds 0 t C 1 t C 1 ..., where t is scratch space
    // for iterating, the Nth C holds the count for the Nth item, and 1 is a
    // nonzero value marking the presence of a chain cell (so we can iterate
    // back to the beginning or to the end).
    [">,[[-[->>>+<<<]>>+>]<<+>[<<<]>,]+>>[<[<.>-]<[->>>+<<<]>>>+>>]", "@sdi"],

    // Run-length counting sort. Optimization of AShelly's, above.
    [">,[[-[->>+<<]>+>]<[<<]>,]>[->+<]+>[>[<->->+<]<[<.>-]<[->>+<<]>>+>]", "@sdi"],
  ],
);
