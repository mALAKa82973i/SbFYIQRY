// 代码生成时间: 2025-08-17 11:27:07
 * @returns The sum of a and b.
 */
export function add(a: number, b: number): number {
    return a + b;
}

/**
 * Subtracts one number from another.
 * @param a The number from which to subtract.
 * @param b The number to subtract.
 * @returns The difference of a and b.
 */
export function subtract(a: number, b: number): number {
    return a - b;
}

/**
 * Multiplies two numbers.
 * @param a The first number.
 * @param b The second number.
 * @returns The product of a and b.
 */
export function multiply(a: number, b: number): number {
    return a * b;
}

/**
 * Divides one number by another.
 * @param a The number to be divided.
 * @param b The divisor.
 * @returns The quotient of a divided by b.
 * @throws Error if b is zero.
 */
export function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error('Cannot divide by zero.');
    }
    return a / b;
}

/**
 * Calculates the power of a base number to a certain exponent.
 * @param base The base number.
 * @param exponent The exponent.
 * @returns The result of base raised to the power of exponent.
 */
export function power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
}

/**
 * Calculates the square root of a number.
 * @param number The number to find the square root of.
 * @returns The square root of the number.
 * @throws Error if the number is negative.
 */
export function squareRoot(number: number): number {
    if (number < 0) {
        throw new Error('Cannot calculate the square root of a negative number.');
    }
    return Math.sqrt(number);
}
