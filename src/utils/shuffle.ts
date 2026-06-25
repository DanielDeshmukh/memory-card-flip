/**
 * Implements the Fisher-Yates (Knuth) shuffle algorithm.
 * This algorithm produces an unbiased permutation of the array.
 * 
 * @param array - The array to shuffle. Must not be mutated directly; a copy is created.
 * @returns A new array with elements in random order.
 */
export function shuffle<T>(array: T[]): T[] {
  // Create a shallow copy to avoid mutating the original array
  const result = [...array];
  const length = result.length;

  // Iterate from the last element down to the second element
  for (let i = length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at index i and index j
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
