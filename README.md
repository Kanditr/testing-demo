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

```JS
// Equality
expect(...).toBe();
expect(...).toEqual();
// Truthiness
expect(...).toBeDefined();
expect(...).toBeNull();
expect(...).toBeTruthy();
expect(...).toBeFalsy();
// Numbers
expect(...).toBeGreaterThan();
expect(...).toBeGreaterThanOrEqual();
expect(...).toBeLessThan();
expect(...).toBeLessThanOrEqual();
// Strings
expect(...).toMatch(/regularExp/);
// Arrays
expect(...).toContain();
// Objects
expect(...).toBe();
// check for the equality of object references
expect(...).toEqual();
// check for the equality of properties
expect(...).toMatchObject();
expect(...).toHaveProperty()
// Exceptions
expect(() => { someCode }).toThrow();
```

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

To test the dependencies from outside without connect to it, replace the real implementation with newly created function and return the expected result of real function

```JS
   db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };
```

```JS
const mockFunction = jest.fn()

// Return value
mockFunction.mockReturnValue(1)
const result = mockFunction()

// Return a promise
mockFunction.mockResolveValue(1)
const result = await mockFunction()

// Return a rejection
mockFunction.mockRejectedValue(new Error('...'))
const result = await mockFunction()

// Set Mock function and check if function have been called
mail.send = jest.fn();
expect(mail.send).toHaveBeenCalled();
expect(mail.send.mock.calls[0][0]).toBe("a"); // return first argument of mock return -> email
expect(mail.send.mock.calls[0][1]).toMatch(/order/); // return second argument of mock return -> message

```

Example of using `Jest` mock function

```JS
describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {

    // mock fetching db data
    db.getCustomerSync = jest.fn().mockReturnValue({ email:'a'})

    // set mail.send to be mock function
    mail.send = jest.fn();

    // call function to test
    lib.notifyCustomer({ customerId: 1 });

    // test if mail.send have been called
    expect(mail.send).toHaveBeenCalled();
  });
});
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
