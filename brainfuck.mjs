function brainfuck(source, input) {
  const tape = [0];
  const output = [];
  let steps = 0;
  let p = 0;
  let q = 0;

  for(let i = 0; i < source.length; i++) {
    switch(source[i]) {
      case "+":
        // NB: I doubt it's even possible to trip this, but...
        if(tape[p] === Number.MAX_SAFE_INTEGER) { throw new Error("Data overflow"); }
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

export {brainfuck};
