import FizzUtil from "../../utils/fizz.util";

describe("Fizz Util Tests", () => {
    let fizzUtil: FizzUtil;
    beforeEach(() => {
        fizzUtil = new FizzUtil();
    });
    it("should return Fizz when number is divisible by 3", () => {
        expect(fizzUtil.fizzbuzz(3)).toBe("Fizz");
    });
    it("should return Buzz when number is divisible by 5", () => {
        expect(fizzUtil.fizzbuzz(5)).toBe("Buzz");
    });
    it("should return FizzBuzz when number is divisible by 3 & 5", () => {
        expect(fizzUtil.fizzbuzz(15)).toBe("FizzBuzz");

    });
    
    });
    


