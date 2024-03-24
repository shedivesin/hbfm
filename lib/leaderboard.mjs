import {brainfuck} from "./brainfuck.mjs";
import {seed} from "./random.mjs";

let YEAR;
let FIRST = true;

for(let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if(arg === "-y" || arg === "--year") {
    if(i + 1 === process.argv.length) { throw new Error("No year specified"); }

    const year = parseInt(process.argv[i + 1]);
    if(Number.isNaN(year)) { throw new Error("Invalid year specified"); }

    YEAR = year;
  }
}

function header(str, level) {
  if(YEAR !== undefined) { return; }

  if(FIRST) { FIRST = false; }
  else { console.log(); }

  console.log("\x1B[1m%s %s\x1B[0m", "#".repeat(level), str);
}

function array_equal(a, b) {
  if(a.length !== b.length) { return false; }
  for(let i = 0; i < a.length; i++) { if(a[i] !== b[i]) { return false; } }
  return true;
}

function highlight(str, highlight) {
  if(highlight) { str = "\x1B[1;32m" + str + "\x1B[0m"; }
  return str;
}

function by_score(a, b) {
  return a.score - b.score;
}

function leaderboard(year, name, n, generator, solutions) {
  header(`Year ${year}: ${name}`, 2);

  // Seed data just grabbed from /dev/random...
  seed(0xC6E384F5, 0xE8948B30, 0xF2C057E2, 0xFD280B06);

  const cases = new Array(n);
  for(let i = 0; i < n; i++) { cases[i] = generator(); }

  if(YEAR !== undefined) {
    if(YEAR === year) {
      console.log("Year %d: %s", year, name);
      console.log("Input: %s", cases[0][0].join(" "));
      console.log("Output: %s", cases[0][1].join(" "));
    }

    return;
  }

  if(!solutions.length) {
    console.log("\x1B[1;31mNo solutions yet.\x1B[0m");
    return;
  }

  const successes = [];
  for(let i = 0; i < solutions.length; i++) {
    const [solution, name] = solutions[i];
    const size = solution.match(/[+\-,\.<>\[\]]/g)?.length ?? 0;
    if(size > 0xFF) { throw new Error("Very large solutions are disallowed"); }

    let tape = 1;
    let steps = 0;

    for(const [input, output] of cases) {
      try {
        const result = brainfuck(solution, input);
        if(!array_equal(result.output, output)) { throw new Error("Incorrect output: " + result.output.join("-") + " vs. " + output.join("-")); }

        tape = Math.max(tape, result.tape);
        steps += result.steps;
      }
      catch(err) {
        console.warn(solution);
        console.warn(name);
        console.warn(input);
        throw err;
      }
    }

    // The entry's score is the geometric mean of size, tape, and speed.
    const score = Math.cbrt(size * tape * steps);

    successes.push({id: i + 1, solution, name, size, tape, steps, score});
  }

  successes.sort(by_score);

  let min_size = Infinity;
  let min_tape = Infinity;
  let min_steps = Infinity;
  for(const {size, tape, steps} of successes) {
    min_size = Math.min(min_size, size);
    min_tape = Math.min(min_tape, tape);
    min_steps = Math.min(min_steps, steps);
  }

  console.log("|id|entrant             |size|tape|   speed|");
  console.log("|--|--------------------|----|----|--------|");
  for(let i = 0; i < successes.length; i++) {
    const {id, name, size, tape, steps, score} = successes[i];
    console.log(
      "|%s|%s|%s|%s|%s|",
      id.toString().padStart(2),
      name.padEnd(20),
      highlight(size.toString().padStart(4), size === min_size),
      highlight(tape.toString().padStart(4), tape === min_tape),
      highlight(steps.toString().padStart(8), steps === min_steps),
    );
  }
}

export {header, leaderboard};
