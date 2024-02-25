import {brainfuck} from "./brainfuck.mjs";
import {header, leaderboard} from "./leaderboard.mjs";
import {uint32, range, range_ne, range_array} from "./random.mjs";

header("Human Brainfuck Machine Leaderboards");

leaderboard(
  "Year 1: Mail Room",
  // Copy the three inputs to the output.
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
  "Year 2: Busy Mail Room",
  // Copy the input to the output.
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
  "Year 3: Copy Floor",
  // Output the sequence 66-85-71 (ASCII "BUG").
  1,
  () => [[], [66, 85, 71]],
  [
    // Naive solution.
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
    // Naive solution.
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
    // Naive solution.
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
  "Year 8: Tripler Room",
  // For each input, triple and output it.
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
  "Year 9: Zero Preservation Initiative",
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
  ],
);

leaderboard(
  "Year 12: Tetracontiplier",
  // For each input, multiply it by forty and output it.
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    return [x, x.map(x => x * 40)];
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

leaderboard(
  "Year 14: Maximation Room",
  // For each pair of inputs, output the larger of the two. (If they're equal,
  // just output one of them.)
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
  "Year 17: Exclusive Lounge",
  // For each pair of inputs, output a 1 if they have the opposite parity (e.g.
  // one is even and the other is odd), or 2 if they have the same parity.
  // NB: HRM uses sign bit, but we don't have negative numbers, so we use the
  // parity bit, instead.
  // NB: It would be nicer to output 0 or 1 (e.g. the XOR of the parity bit),
  // but we can't do that in Brainfuck since zero is the end-of-output marker.
  10,
  () => {
    const n = range(3, 10);
    const x = range_array(n * 2, 1, 99);
    const y = new Array(n);
    for(let i = 0; i < n; i++) {
      y[i] = (x[i * 2 + 0] ^ x[i * 2 + 1]) & 1;
      if(y[i] === 0) { y[i] += 2; }
    }

    return [x, y];
  },
  [
  ],
);

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

// Year 21: Zero Terminated Sum
// FIXME

leaderboard(
  "Year 22: Fibonacci Visitor",
  // For each input N, output the Nth Fibonacci number.
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
  ],
);

leaderboard(
  "Year 23: The Littlest Number",
  // Output the smallest number in the input.
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
  ],
);

leaderboard(
  "Year 24: Mod Module",
  // For each pair of inputs, output the remainder of the first divided by the
  // second.
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
  "Year 25: Cumulative Countdown",
  // For each input, output the sum of itself and all numbers down to one;
  // e.g. if the input is 3, output 3+2+1=6.
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
  "Year 26: Small Divide",
  // For each pair of inputs, output the first divided by the second.
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
  "Year 28: Three Sort",
  // For each triplet of inputs, output them in sorted order.
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
  "Year 29: Storage Floor",
  // The first 10 inputs are reference data. For each subsequent input N,
  // output the Nth referenced input.
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
    [",>,>,>,>,>,>,>,>,>,>,[-[-[->+<]>]<<<<<<<<<<.[>],]", "@sdi"],
  ],
);

// Year 30: String Storage Floor
// FIXME

leaderboard(
  "Year 31: String Reverse",
  // Output the bytes of the input in reverse order.
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    const y = x.slice().reverse();
    return [x, y];
  },
  [
    // Naive solution.
    [">,[>,]<[.<]", "@sdi"],
  ],
);

// Year 32: Inventory Report
// FIXME

function is_prime(x) {
  if(!Number.isInteger(x)) { return false; }
  if(x < 2) { return false; }
  if(x < 4) { return true; }
  if(x % 2 === 0) { return false; }
  for(let y = 3; y * y <= x; y += 2) { if(x % y === 0) { return false; } }

  return true;
}

leaderboard(
  "Year 34: Vowel Incinerator",
  // Output every input, except primes.
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
  "Year 35: Duplicate Removal",
  // Copy each unique input to the output.
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
  ],
);

// Year 36: Alphabetizer
// FIXME

// Year 37: Scavenger Chain
// FIXME

leaderboard(
  "Year 38: Digit Exploder",
  // For each input, output its digits.
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

// Year 39: Re-Coordinator
// FIXME

leaderboard(
  "Year 40: Prime Factory",
  // For each input, output its prime factors in sorted order.
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
  "Year 41: Sorting Floor",
  // Output the input in sorted order.
  10,
  () => {
    const n = range(3, 20);
    const x = range_array(n, 1, 99);
    const y = x.slice().sort((a, b) => a - b);
    return [x, y];
  },
  [
    // http://brainfuck.org/results2.txt
    // DBC calls this a selection sort, but to be honest, it's really much more
    // like a sleepsort if you ask me. In any case, it's shockingly concise.
    [">>,[>>,]<<[[-<+<]>[>[>>]<[.[-]<[[>>+<<-]<]>>]>]<<]", "Daniel B. Cristofani"],

    // https://codegolf.stackexchange.com/a/4764
    [">,[[-[>>+<<-]>+>]<[<<]>,]+>[>+<-]>[>[>+<<->-]<[<<.>>-]<<[>>+<<-]>>+>>]", "AShelly"],
  ],
);

