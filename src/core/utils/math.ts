/* eslint-disable no-magic-numbers */

function assertFiniteNumber(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${label} must be a finite number`);
  }
}

function assertInteger(value: number, label: string): void {
  if (!Number.isInteger(value)) {
    throw new TypeError(`${label} must be an integer`);
  }
}

function assertNonEmptyArray<T>(arr: T[], label: string): void {
  if (arr.length === 0) {
    throw new RangeError(`${label} requires at least one element`);
  }
}

function assertFiniteNumberArray(arr: number[], label: string): void {
  for (const [index, value] of arr.entries()) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`${label} contains a non-finite number at index ${index}`);
    }
  }
}

/**
   * Returns a random value between min and max (inclusive)
   * @example
   * ```ts
   * randomRange(1, 5); // 3
   * randomRange(1, 5, true); // 3.845013878893512
   * ```
   */
export function randomInRange(min: number, max: number, float: boolean = false): number {
  assertFiniteNumber(min, "min");
  assertFiniteNumber(max, "max");
  if (min > max) {
    throw new Error("min cannot be greater than max");
  }

  const randomValue = Math.random() * (max - min + 1) + min;
  return float ? randomValue : Math.floor(randomValue);
}

/**
  * Returns a random element from an array
  * @example
  * ```ts
  * randomArray([1, 2, 3, 4, 5]); // 2
  * randomArray(["a", "b", "c", "d", "e"]); // "d"
  * randomArray([{ a: 1 }, { b: 2 }, { c: 3 }]); // {c: 3}
  * ```
  */
export function randomInArray(arr: unknown[]): unknown {
  assertNonEmptyArray(arr, "randomInArray");

  const value = arr[Math.floor(Math.random() * arr.length)];
  if (value === undefined) {
    throw new Error("randomInArray failed to select an element");
  }

  return value;
}

/**
 * Returns a random boolean
 * @example
 * ```ts
 * randomBoolean(); // true
 * ```
 */
export function randomBoolean(): boolean {
  return Math.random() < 0.5;
}

/**
 * Returns the average value of an array of numbers
 * @example
 * ```ts
 * averageOfArray([1, 2, 3, 4, 5, 6]); // 3.5
 * ```
 */
export function averageOfArray(arr: number[]): number {
  assertNonEmptyArray(arr, "averageOfArray");
  assertFiniteNumberArray(arr, "averageOfArray");

  return arr.reduce((a, b) => {
    return a + b;
  }, 0) / arr.length;
}

/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @example
 * ```ts
 * shuffleArray([1, 2, 3, 4, 5, 6]); // [3, 1, 5, 2, 6, 4]
 * ```
 */
export function shuffleArray(array: unknown[]): unknown[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Returns the factorial of a number
 * @example
 * ```ts
 * factorial(5); // 120
 * ```
 */
export function factorial(n: number): number {
  assertFiniteNumber(n, "n");
  assertInteger(n, "n");
  if (n < 0) {
    throw new Error("factorial is only defined for non-negative integers");
  }

  return n === 0 ? 1 : n * factorial(n - 1);
}

/**
 * Returns a percentage value with a certain amount of decimal places
 * @example
 * ```ts
 * percentage(3, 28); // 11
 * percentage(3, 28, 2); // 10.71
 * ```
 */
export function percentage(n: number, total: number, precision = 0): number {
  assertFiniteNumber(n, "n");
  assertFiniteNumber(total, "total");
  assertInteger(precision, "precision");
  if (precision < 0) {
    throw new Error("precision cannot be negative");
  }

  return roundTo(n / total * 100 || 0, precision);
}

/**
 * Checks if a number is even
 * @example
 * ```ts
 * isEven(2); // true
 * isEven(3); // false
 * ```
 */
export function isEven(n: number): boolean {
  assertFiniteNumber(n, "n");
  assertInteger(n, "n");

  return n % 2 === 0;
}

/**
 * Checks if a number is odd
 * @example
 * ```ts
 * isOdd(2); // false
 * isOdd(3); // true
 * ```
 */
export function isOdd(n: number): boolean {
  assertFiniteNumber(n, "n");
  assertInteger(n, "n");

  return Math.abs(n % 2) === 1;
}

/**
 * Returns a number clamped between the minimum and maximum values.
 * @example
 * ```ts
 * clamp(11, 1, 10); // 10
 * clamp(5, 1, 10); // 5
 * ```
 */
export function clamp(num: number, min: number, max: number): number {
  assertFiniteNumber(num, "num");
  assertFiniteNumber(min, "min");
  assertFiniteNumber(max, "max");
  if (min > max) {
    throw new Error("min cannot be greater than max");
  }

  return Math.min(Math.max(num, min), max);
}

/**
 * Returns the sum of all values in an array.
 * @example
 * ```ts
 * sumOfArray([1, 2, 3, 4]); // 10
 * ```
 */
export function sumOfArray(arr: number[]): number {
  assertFiniteNumberArray(arr, "sumOfArray");

  return arr.reduce((sum, value) => {
    return sum + value;
  }, 0);
}

/**
 * Rounds a number to a given number of decimal places.
 * @example
 * ```ts
 * roundTo(10.714285, 2); // 10.71
 * ```
 */
export function roundTo(value: number, decimals = 0): number {
  assertFiniteNumber(value, "value");
  assertInteger(decimals, "decimals");
  if (decimals < 0) {
    throw new Error("decimals cannot be negative");
  }

  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Returns the greatest common divisor using the Euclidean algorithm.
 * @example
 * ```ts
 * gcd(12, 18); // 6
 * ```
 */
export function gcd(a: number, b: number): number {
  assertFiniteNumber(a, "a");
  assertFiniteNumber(b, "b");
  assertInteger(a, "a");
  assertInteger(b, "b");

  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}

/**
 * Returns the least common multiple.
 * @example
 * ```ts
 * lcm(4, 6); // 12
 * ```
 */
export function lcm(a: number, b: number): number {
  assertFiniteNumber(a, "a");
  assertFiniteNumber(b, "b");
  assertInteger(a, "a");
  assertInteger(b, "b");

  if (a === 0 || b === 0) {
    return 0;
  }
  return Math.abs(Math.trunc(a) * Math.trunc(b)) / gcd(a, b);
}

/**
 * Checks if a number is prime.
 * @example
 * ```ts
 * isPrime(2); // true
 * isPrime(12); // false
 * ```
 */
export function isPrime(n: number): boolean {
  assertFiniteNumber(n, "n");
  assertInteger(n, "n");

  const value = Math.trunc(n);
  if (value <= 1) {
    return false;
  }
  if (value === 2) {
    return true;
  }
  if (value % 2 === 0) {
    return false;
  }
  for (let i = 3; i <= Math.sqrt(value); i += 2) {
    if (value % i === 0) {
      return false;
    }
  }
  return true;
}

/**
 * Returns the next prime number greater than or equal to n.
 * @example
 * ```ts
 * nextPrime(14); // 17
 * nextPrime(17); // 17
 * ```
 */
export function nextPrime(n: number): number {
  assertFiniteNumber(n, "n");

  let candidate = Math.max(2, Math.ceil(n));
  while (!isPrime(candidate)) {
    candidate++;
  }
  return candidate;
}

/**
 * Normalizes a value into the range 0..1.
 * @example
 * ```ts
 * normalize(75, 50, 100); // 0.5
 * normalize(125, 50, 100); // 1
 * ```
 */
export function normalize(value: number, min: number, max: number): number {
  assertFiniteNumber(value, "value");
  assertFiniteNumber(min, "min");
  assertFiniteNumber(max, "max");
  if (min === max) {
    throw new Error("normalize min and max cannot be equal");
  }
  return clamp((value - min) / (max - min), 0, 1);
}

/**
 * Returns the standard deviation of an array.
 * @example
 * ```ts
 * standardDeviation([1, 2, 3, 4, 5]); // 1.4142135623730951
 * standardDeviation([1, 2, 3, 4, 5], true); // 1.5811388300841898
 * ```
 */
export function standardDeviation(arr: number[], sample = false): number {
  if (arr.length === 0) {
    throw new Error("standardDeviation requires at least one number");
  }
  assertFiniteNumberArray(arr, "standardDeviation");

  if (sample && arr.length < 2) {
    throw new Error("sample standard deviation requires at least two numbers");
  }
  const mean = averageOfArray(arr);
  let sumOfSquaredDiffs = 0;
  for (const value of arr) {
    const diff = value - mean;
    sumOfSquaredDiffs += diff * diff;
  }
  const divisor = sample ? arr.length - 1 : arr.length;
  return Math.sqrt(sumOfSquaredDiffs / divisor);
}
