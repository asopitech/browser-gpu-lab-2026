// Blackbox tests run against the package's public API. Use `@moonbit-browser` to import.
// Prefer high-level behaviors over implementation details.

///|
test "double" {
  inspect(@moonbit-browser.double(21), content="42")
}
