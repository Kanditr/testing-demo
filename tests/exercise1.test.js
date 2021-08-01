const lib = require("../exercise1");

// Test FizzBuzz
describe("fizzBuzz", () => {
  it("should throw if username is falsy", () => {
    const args = ["a", null, undefined, {}];
    args.forEach((a) => {
      expect(() => {
        lib.fizzBuzz(a);
      }).toThrow();
    });
  });
});

it("should return FizzBuzz if input is divisible by 3 and 5", () => {
  const result = lib.fizzBuzz(15);
  expect(result).toBe("FizzBuzz");
});

it("should return Fizz if input is only divisible by 3", () => {
  const result = lib.fizzBuzz(3);
  expect(result).toBe("Fizz");
});

it("should return Fizz if input is only divisible by 5", () => {
  const result = lib.fizzBuzz(5);
  expect(result).toBe("Buzz");
});
