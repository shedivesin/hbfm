# Human Brainfuck Machine
So, [Human Resource Machine][] is a cute game designed to teach children how a computer works and how to write programs for one. It's fun, but as a computer programmer with a few decades of experience under my belt, it's of course a bit too easy for me. I thought it might be more interesting to try and play the game using a more esoteric instruction set, and [Brainfuck][] seemed like a ~good idea at the time~ natural choice. (I always wanted an excuse to play around with Brainfuck, anyway.)

[Human Resource Machine]: https://tomorrowcorporation.com/humanresourcemachine
[Brainfuck]: https://esolangs.org/wiki/Brainfuck

So this project is a simple implementation of a Brainfuck interpreter, with a little test harness for verifying solutions to various programming problems inspired by the levels of Human Resource Machine. Solutions are scored by how large they are, how much memory they require, and how fast they run. See if you can beat my solutions!

## Brainfuck
Brainfuck is a very minimal programming language with exactly eight commands. It represents operations on a very simple kind of machine.

*   The machine has an infinitely-large *tape* consisting of *cells,* and a pointer pointing at one of these cells. The commands `<` and `>` move the pointer to the left or to the right. The pointer initially starts at the leftmost cell, and it is an error to move beyond the left edge of the tape. (In theory, there is no right edge of the tape, but in practice, this implementation will complain if you go beyond 2^15 cells.)

*   Each cell contains a non-negative integer. The commands `+` and `-` will increment or decrement the integer in the cell currently pointed to. Each cell is initially zero, and it is an error to decrement a cell below zero. (In theory, there is no maximum value to each cell, but in practice, this implementation will complain if you go beyond JavaScript's `Number.MAX_SAFE_INTEGER`, or 2^53-1.)

*   The machine has an input stream and an output stream. The command `,` will write the next value of the input stream into the cell currently pointed to, while `.` will write the value of that cell to the output. The input stream will always consist of strictly positive integers followed by an infinite sequence of zeroes. (For consistency, it is an error to write a zero to the output stream.)

*   Finally, the commands `[` and `]` give flow control, and are equivalent to `while(*p) {` and `}` in C: loop between the brackets while the value in the currently pointed to cell is nonzero. It turns out this is enough to mimic any kind of flow-control in more sophisticated machines, which mean that the halting problem applies: to keep things from spiralling out of control, this implementation fails if the machine runs for more than 2^24 steps.

None of the problems are complicated enough to require hundreds of cells, values in the thousands, or tens of millions of steps of runtime; those restrictions are really just to keep things practical and catch when something has gone horribly wrong.

## Project Structure
The project consists of the following source files:

*   `bf.mjs`: This file defines a standalone Brainfuck interpreter. It takes two arguments: a space-delimited list of inputs to the machine, and a source file to read from. (If the source file is omitted, it reads from stdin.) So, for example, an example solution to the first year is as follows:

        $ echo ',.,.,.' | ./bf.mjs '1 2 3'
        Output: 1 2 3

*   `hbfm.mjs`: This file defines each level of the game with randomly-generated test cases, along with various solutions to each level. New solutions should go in this file, and by running it, you can see how these solutions compare. Solutions are ranked by the geometric mean of their size, how much memory they consume, and how fast they run. You can also run it with `--year N` to get an example input/output for a given year.

*   `lib/brainfuck.mjs`: This file defines an interpreter for Brainfuck.

*   `lib/leaderboard.mjs`: This file defines the test suite for generating test cases and running the solutions against them.

*   `lib/random.mjs`: All of the levels are defined with random data. This file defines a little pseudo-random number generator library so that we can use a seed and ensure the random levels are defined consistently.
