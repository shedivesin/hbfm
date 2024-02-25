let y = 0;

function seed() {
  y = 2463534242;
}

// https://www.jstatsoft.org/article/view/v008i14, p. 4
function uint32() {
  y ^= y << 13;
  y ^= y >> 17;
  y ^= y <<  5;
  return y >>> 0;
}

function float() {
  return (uint32() - 1) / 0xFFFFFFFF;
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
