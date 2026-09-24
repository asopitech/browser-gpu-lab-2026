/** Sum a contiguous Float64 sequence stored in linear memory. */
export function sum(pointer: usize, length: i32): f64 {
  let total: f64 = 0;
  for (let index: i32 = 0; index < length; index++) {
    total += load<f64>(pointer + <usize>index * 8);
  }
  return total;
}
