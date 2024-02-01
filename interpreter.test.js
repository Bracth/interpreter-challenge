import interpreter, { Errors } from "./interpreter"

describe("interpreter error when not all the elements are integers", () => {
    test("test if return error when string is in the list", async () => {
        const result = await interpreter(["2", 3, 5, 6, 7, 8])
        expect(result).toBe(Errors.ERROR_ALL_ELEMENTS_NOT_INTS)
    })

    test("test if return error when bool is in the list", async () => {
        const result = await interpreter([2, 3, 5, 6, true, 8])
        expect(result).toBe(Errors.ERROR_ALL_ELEMENTS_NOT_INTS)
    })

    test("test if return error when a float number is in the list", async () => {
        const result = await interpreter([2, 3, 5.645, 6, 2, 8])
        expect(result).toBe(Errors.ERROR_ALL_ELEMENTS_NOT_INTS)
    })

})

describe("interpreter error when not valid opcode", () => {
    test("test if return error when we pass a not valid opcode", async () => {
        const result = await interpreter([10, 3, 5, 6, 7, 8])
        expect(result).toBe(Errors.ERROR_NOT_VALID_OPCODE)
    })

    test("test if return error when we pass a not valid opcode in another position", async () => {
        const result = await interpreter([1, 0, 3, 6, 7, 8])
        expect(result).toBe(Errors.ERROR_NOT_VALID_OPCODE)
    })

})

describe("interpreter test part 1", () => {
    test("test if return expect value for opcode 1", async () => {
        const result = await interpreter([1, 0, 0, 0, 99])

        expect(result.join(",")).toBe([2, 0, 0, 0, 99].join(","))
    })

    test("test if return expect value for opcode 2", async () => {
        const result = await interpreter([2, 3, 0, 3, 99])
        expect(result.join(",")).toBe([2, 3, 0, 6, 99].join(","))
    })

    test("test if return expect value for opcode 1 and 2 combined", async () => {
        const result = await interpreter([1, 1, 1, 4, 99, 5, 6, 0, 99])
        expect(result.join(",")).toBe([30, 1, 1, 4, 2, 5, 6, 0, 99].join(","))
    })

})

//**
/* NOTE: I am not sure how is the best way to test part 2, I am not use to use readline from node to get user inputs, I don´t know how to fake one, I am going to investigate cause this is very interesting
/* 
*/
describe("interpreter test part 2", () => {
    test("test if return expect value with parameter mode 1002", async () => {
        const result = interpreter([3, 0, 4, 0, 99])
    })

    test("test if return expect value and console.log the ccorrect one", async () => {
        const consoleSpy = jest.spyOn(console, 'log');

        const result = interpreter([4, 0, 99])

        expect(consoleSpy).toHaveBeenCalledWith(4);

        consoleSpy.mockRestore()
    })

})


describe("interpreter test part 3", () => {
    test("test if return expect value with parameter mode 1002", async () => {
        const result = await interpreter([1002, 4, 3, 4, 33])

        expect(result.join(",")).toBe([1002, 4, 3, 4, 99].join(","))
    })

    test("test if return expect value with parameter mode 1101", async () => {
        const result = await interpreter([1101, 2, 1, 1, 99])

        expect(result.join(",")).toBe([1101, 3, 1, 1, 99].join(","))
    })

    test("test if return expect value with parameter mode 4 and 1001", async () => {
        const consoleSpy = jest.spyOn(console, 'log');

        const result = await interpreter([4, 2, 1001, 1, 6, 3, 99])

        expect(consoleSpy).toHaveBeenCalledWith(1001);

        expect(result.join(",")).toBe([4, 2, 1001, 8, 6, 3, 99].join(","))

        consoleSpy.mockRestore()
    })
})
