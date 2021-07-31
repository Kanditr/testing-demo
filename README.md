# testing-demo

Automate testing with `Jest` library

## Note

### Unit test

```JavaScript
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
```

### Test matcher

- `toBe`: expect identical and in the same location
- `toMatch`: contain result in the location defined with regular expresssion e.g., `/containThis/`
- `toContain`: contain result anywhere in return
- `toEqual`: ensure the opject has the same properties and don't care the location in memory
- `toMatchObject`: to check that result cover all the properties in test object
- `toHaveProperty`: contain the property

```JavaScript
// function
getProduct = function (productId) {
  return { id: productId, price: 10, category: "a" };
};

// test case
describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    // fail
    expect(result).toEqual({ id: 1, price: 10 });

    // pass
    expect(result).toMatchObject({ id: 1, price: 10 });

    // pass
    expect(result).toHaveProperty("id", 1);
  });
});
```

### Test Exceptions

```JavaScript
describe("registerUSer", () => {
  it("should throw if username is falsy", () => {

    /// define exception types in array and loop them
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
```

### Continuous Running Test

add `Jest --watchAll` in `package.json`
