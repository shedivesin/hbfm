// 128-bit PRNG state. Yes, it's a bit evil to make it a global like this.
let a = 0;
let b = 0;
let c = 0;
let d = 0;

function seed(w, x, y, z) {
  a = w >>> 0;
  b = x >>> 0;
  c = y >>> 0;
  d = z >>> 0;
}

// sfc32
// https://pracrand.sourceforge.net
// Totally overkill for a project like this, but it's always good to have a
// good general-purpose PRNG around in case one needs it for something else.
// NB: All the ">>> 0" is to ensure that a, b, c, d, and t are all uint32s, and
// to hint to the compiler that we're working with integers and not floats.
function uint32() {
  const t = (((a + b) >>> 0) + d) >>> 0;
  a = (b ^ (b >>> 9)) >>> 0;
  b = (c + (c << 3)) >>> 0;
  c = (((c << 21) | (c >>> 11)) + t) >>> 0;
  d = (d + 1) >>> 0;
  return t;
}

function float() {
  return uint32() / 0x100000000;
}

// Debiased Modulo (Twice) method of random range generation.
// https://www.pcg-random.org/posts/bounded-rands.html
function range(min, max) {
  const range = (((max - min) >>> 0) + 1) >>> 0;
  const threshold = (0x100000000 % range) >>> 0;
  for(;;) {
    const x = uint32();
    if(x >= threshold) { return (min + ((x % range) >>> 0)) >>> 0; }
  }
}

// Like range(), but make sure it returns a value not equal to x.
function range_ne(min, max, x) {
  let y = range(min, max - 1);
  if(y >= x) { y++; }

  return y;
}

function range_array(n, min, max) {
  const array = new Array(n);
  for(let i = 0; i < n; i++) { array[i] = range(min, max); }
  return array;
}

export {seed, uint32, float, range, range_ne, range_array};
