let a = 0;
let b = 0;
let c = 0;
let counter = 0;

function seed() {
  a = 0xC6E384F5;
  b = 0xE8948B30;
  c = 0xF2C057E2;
  counter = 0;
}

// sfc32
// https://pracrand.sourceforge.net
function uint32() {
  counter = (counter + 1) >>> 0;

  const tmp = (a + b + counter) >>> 0;
  a = b ^ (b >>> 9);
  b = c + (c << 3);
  c = (((c << 21) | (c >>> 11)) + tmp) >>> 0;

  return tmp;
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
