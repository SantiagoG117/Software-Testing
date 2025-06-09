/*
 *   With unit tests we want to make sure all the execution paths of the tested function are covered.
 *   When creating unit test we should not talk to external resources. The purpose of unit tests is to decouple our code from external dependencies that may not be
 *   available at the time of running our tests. This provides quickness and reliability when executing our tests.
 */

//? Import the file to be tested
const lib = require("../lib");
//? Import external resources for mock testing
const db = require("../db");
const mail = require("../mail");

//? Test numbers
describe("absolute", () => {
  it(`Should return positive number if input is positive`, () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it(`Should return positive number if input is negative`, () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it(`Should return 0 if input is 0`, () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

//? Test strings
describe("greet", () => {
  it("Should return the greeting message", () => {
    const result = lib.greet("Santiago");
    expect(result).toMatch(/Santiago/); //Match a regular expression to make the test more flexible
    expect(result).toContain("Santiago");
  });
});

//?Array testing:
/* 
        - When testing arrays don't look for exact locations
        - When testing arrays don't test for exact lengths
*/
describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"])); // To contain ALL of these values in any order
  });
});

//? Object testing:
/* 
    When testing objects we must consider their memory references. 
    Two objects may have the same key-vaue pairs but be in two different memory locations, thus they will be different
*/
describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 }); //! TO SPECIFIC DO NOT USE: Test if both the result and test object have the exact same key-value pairs
    expect(result).toMatchObject({ id: 1, price: 10 }); //Test if both the result and test object have at least the provided key-value pairs in the test
    expect(result).toHaveProperty("id", 1); // Make sure the result object have a property called id with a value of 1
  });
});

//? Testing exceptions
/*   
When testing if a function throws an exception when a falsy argument is passed we must 
send that function inside the callback function of expect.

We cannot simply send the result of the function to expect and then test the result because
the exception won't be stored in result.

Parameterize tests: Allows us to run the same logic with multiple values (in this case all the
possible falsy values) instead of writing test cases for each input.
*/
describe("registerUser", () => {
  it.each([null, undefined, NaN, "", 0, false])(
    "should return exception if username is falsy: %p",
    (input) => {
      expect(() => {
        lib.registerUser(input);
      }).toThrow();
    }
  );

  // Happy path
  it("should return a user object", () => {
    const result = lib.registerUser("Santiago");
    expect(result).toMatchObject({
      username: "Santiago",
    });
    expect(result.id).toBeGreaterThan(0); //Test current time
  });
});

//? Mock functions:
/* 
  Test a function that directly or indirectly talks to an external resource
  Replace the async function with an identical fake or mock implementation that does not talk to an external resource to get the data. 
  */
describe("applyDiscount", () => {
  it("should apply a 10% discount if customer has more than 10 points", () => {
    //Set a mock function that does not talk to the database
    db.getCustomerSync = function (customerId) {
      return { id: customerId, points: 20 };
    };

    //We are making an assersion against the total price property. It is easier to extract it
    const order = { id: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9); //Total price with 10% discount
  });
});

//? Interaction testing:
/*
  Test the interaction of one object with another object.
  In this example we want to make sure that notifyCustomer calls mail.send properly
 */
describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    // Set mock functions for external resources
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    //Call the function to be tested
    lib.notifyCustomer({ customerId: 1 });

    //Assertion: The function was called
    expect(mail.send).toHaveBeenCalled();
    //Assertion: mail.send was called with an email and a message
    //! Acceptable approach only when testing arguments that are not strings
    expect(mail.send).toHaveBeenCalledWith(
      "a",
      "Your order was placed successfully."
    );
    //* For testing string arguments:
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/); //As long as we have the word order in the message, it should pass
  });
});
