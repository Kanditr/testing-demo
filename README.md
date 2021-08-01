# testing-demo

Automate testing with `Jest` library

## Note

### Unit test

```JS
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

```JS
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

```JS
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

To have`Jest`run all the time, add `Jest --watchAll` in `package.json`

### Mock Functions

To test the dependencies from outside without connect to it using mock data

Replace the real implementation with newly created function and return the expected result of real function

```JS
   db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };
```

### Interaction Testing

To test the interaction of one object with another object by apply change to one when another one is completed

```JS
describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = function (customerId) {
      return { email: "a" };
    };

    let mailSent = false;
    mail.send = function (email, message) {
      mailSent = true;
    };

    lib.notifyCustomer({ customerId: 1 });

    // expect mailSent to be true when notifyCustomer is completed execution
    expect(mailSent).toBe(true);
  });
});
```

<!-- note to myself: when we import the same node module in different file, it will import single instance in the memory -->
