class Fizz {
    public fizzbuzz = (value: number) => {
        if (value % 3 == 0 && value % 5 == 0) {
            return ("FizzBuzz");
        }
        else if (value % 3 == 0) {
            return ("Fizz");
        }
        else if (value % 5 == 0) {
            return ("Buzz");
        }
        else {
            return (value);
        }
    }
};
const fizzProgram = new Fizz();
for (let number = 1; number <= 100; number++) {
    console.log(fizzProgram.fizzbuzz(number));
};

export default Fizz;