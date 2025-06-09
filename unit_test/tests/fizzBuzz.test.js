//? Import the file to be tested
const exercise = require("../exercise1");
const { absolute } = require("../lib");

/* 
    Execution paths:
        * If input is not a number throw an exception
        * If input is divisible by 3 return FizzBuzz
        * If input is divisible by 5 return FizzBuzz
        * If input is only divisible by 5 return Fizz
        * If input is only divisible by 3 return Buzz
        - If input is not divisible by 3 or 5 return it
*/

describe("FizzBuzz", () => {
  it.each([null, undefined, NaN, "string", [], {}])(
    "should throw exception if input is not a number: %p",
    (input) => {
      expect(() => {
        exercise.fizzBuzz(input);
      });
    }
  );

  it("should return FizzBuzz if input is divisible by 3 or 5", () => {
    const result = exercise.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz if it is only divisible by 3", () => {
    const result = exercise.fizzBuzz(3);
    expect(result).toBe("Fizz");
  });

  it("should return Buzz if it is only divisible 5", () => {
    const result = exercise.fizzBuzz(5);
    expect(result).toBe("Buzz");
  });

  it("should return the input if it is not divisible by 3 or 5", () => {
    const result = exercise.fizzBuzz(11);
    expect(result).toBe(11);
  });
});
