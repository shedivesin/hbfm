import {brainfuck} from "./brainfuck.mjs";
import {seed} from "./random.mjs";

function array_equal(a, b) {
  if(a.length !== b.length) { return false; }
  for(let i = 0; i < a.length; i++) { if(a[i] !== b[i]) { return false; } }
  return true;
}

function highlight(str, highlight) {
  if(highlight) { str = "\x1B[1;32m" + str + "\x1B[0m"; }
  return str;
}

function leaderboard(name, n, generator, solutions) {
  console.log();
  console.log("## %s", name);

  if(!solutions.length) {
    console.log("\x1B[1;31mNo solutions yet.\x1B[0m");
    return;
  }

  seed();

  const cases = new Array(n);
  for(let i = 0; i < n; i++) { cases[i] = generator(); }

  const successes = [];
  for(const [solution, name] of solutions) {
    const size = solution.match(/[+\-,\.<>\[\]]/g).length;
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

    successes.push({solution, name, size, tape, steps});
  }

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
    const {name, size, tape, steps} = successes[i];
    console.log(
      "|%s|%s|%s|%s|%s|",
      (i + 1).toString().padStart(2),
      name.padEnd(20),
      highlight(size.toString().padStart(4), size === min_size),
      highlight(tape.toString().padStart(4), tape === min_tape),
      highlight(steps.toString().padStart(8), steps === min_steps),
    );
  }
}

export {leaderboard};
