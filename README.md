# Human Brainfuck Machine
[Human Resource Machine][] is too easy. Let's beat it in [Brainfuck][].

[Human Resource Machine]: https://tomorrowcorporation.com/humanresourcemachine
[Brainfuck]: https://esolangs.org/wiki/Brainfuck

So, Human Resource Machine is a cute game designed to teach children how a
computer works and how to write programs for one. It's fun, but as a computer
programmer with a few decades of experience under my belt, it's of course a
bit too easy for me. I thought it might be more interesting to try and play
the game using more esoteric instruction set, and Brainfuck seemed like a
natural choice. (I always wanted an excuse to play around with Brainfuck,
anyway.)

So this project is a simple little implementation of a Brainfuck interpreter,
with a little test harness for verifying solutions to various programming
problems inspired by the levels of Human Resource Machine. Solutions are scored
by how large they are, how fast they are, and how much memory they require.
(Bonus points if your solution is portable: that is, it doesn't go to the left
of the initial tape cell, it doesn't require more than 30k tape cells, and
doesn't require cells to wrap on over- or under-flow.) See if you can beat my
solutions!
