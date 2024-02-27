# Human Brainfuck Machine
So, [Human Resource Machine][] is a cute game designed to teach children how a computer works and how to write programs for one. It's fun, but as a computer programmer with a few decades of experience under my belt, it's of course a bit too easy for me. I thought it might be more interesting to try and play the game using a more esoteric instruction set, and [Brainfuck][] seemed like ~a good idea at the time~ a natural choice. (I always wanted an excuse to play around with Brainfuck, anyway.)

[Human Resource Machine]: https://tomorrowcorporation.com/humanresourcemachine
[Brainfuck]: https://esolangs.org/wiki/Brainfuck

So this project is a simple implementation of a Brainfuck interpreter, with a little test harness for verifying solutions to various programming problems inspired by the levels of Human Resource Machine. Solutions are scored by how large they are, how much memory they require, and how fast they run. See if you can beat my solutions!

## Brainfuck Interpreter
There is, perhaps, no one true Brainfuck specification, since minor variations crept into the language early and stuck with it. This project is no different, and its specification is as follows:

*   Memory consists of 2^15 cells.
*   The pointer is initially at the leftmost end of memory.
*   Memory does not wrap, and it is an error to move the pointer to the left of the first cell or to the right of the last.
*   Cells may contain integers between 0 and 2^53-1.
*   Cells are initially zero.
*   Cells do not wrap, and it is an error to decrement a cell from zero or increment a cell from 2^53-1. (Though how on earth you'd hit the latter restriction is beyond me.)
*   The input stream returns zero once the end of input has been reached.
*   It is an error to output zero to the output stream.
*   The machine halts after running for 2^24 steps.

None of the problems are complicated enough to require hundreds of cells, values in the thousands, or millions of steps of runtime; those restrictions are really just to keep things practical and catch when one's program spirals out of control.
