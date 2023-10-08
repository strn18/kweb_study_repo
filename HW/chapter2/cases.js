const permutation = (n, r) => {
  if (n < r || n < 0 || r < 0) return -1;
  
  let result = 1;

  for (let i=n; i>n-r; i--) result *= i;

  return result;
}

const combination = (n, r) => {
  if (n < r || n < 0 || r < 0) return -1;

  if (r == 0 || n == r) return 1;
  if (r == 1) return n;

  return combination(n-1, r) + combination(n-1, r-1);
}

const multiPermutation = (n, r) => {
  return n ** r;
}

const multiCombination = (n, r) => {
  return combination(n+r-1, r);
}

module.exports = {
  permutation, 
  combination, 
  multiPermutation, 
  multiCombination, 
}