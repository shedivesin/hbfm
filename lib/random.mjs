let a = 0;
let b = 0;
let c = 0;
let d = 0;

function seed() {
  a = 0xC6E384F5;
  b = 0xE8948B30;
  c = 0xF2C057E2;
  d = 0;
}

// sfc32
// https://pracrand.sourceforge.net
// Totally overkill for a project like this, but it's always good to have a
// good, fast PRNG around in case one needs it for something else.
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

// NB: This method is *BIASED,* in that some values will be more likely than
// others. For a toy application like this, it's fine, but don't reference this
// code in situations where unbiased results are important.
// https://www.pcg-random.org/posts/bounded-rands.html
function range(min, max) {
  return min + Math.floor((max + 1 - min) * float());
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
