/** Sum a contiguous Float64 sequence stored in linear memory. */
export function sum(pointer: usize, length: i32): f64 {
  let total: f64 = 0;
  for (let index: i32 = 0; index < length; index++) {
    total += load<f64>(pointer + <usize>index * 8);
  }
  return total;
}

/** A scalar export used to run the language-produced module in standalone WASM runtimes. */
export function add(left: i32, right: i32): i32 {
  return left + right;
}
