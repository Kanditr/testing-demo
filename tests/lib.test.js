const lib = require("../lib");

// Test Number
describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

// Test String
describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Gun");
    expect(result).toMatch(/Gun/);
    expect(result).toContain("Gun");
  });
});

// Test Array
describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

// Test Objects
describe("getProduct", () => {});
