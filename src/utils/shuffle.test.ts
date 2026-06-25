import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('should shuffle an array and return a new array', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);
    
    expect(shuffled).not.toBe(original); // new array reference
    expect(shuffled.length).toBe(original.length);
    expect(shuffled).toEqual(expect.arrayContaining(original)); // same elements
  });

  it('should not produce the same order twice in a row (high probability)', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8];
    const firstShuffle = shuffle(original);
    const secondShuffle = shuffle(original);
    
    // Very unlikely to be identical after Fisher-Yates shuffle
    expect(firstShuffle).not.toEqual(secondShuffle);
  });

  it('should handle empty array', () => {
    const empty: number[] = [];
    const shuffled = shuffle(empty);
    
    expect(shuffled).toEqual([]);
    expect(shuffled).not.toBe(empty);
  });

  it('should handle single element', () => {
    const single = [42];
    const shuffled = shuffle(single);
    
    expect(shuffled).toEqual([42]);
    expect(shuffled).not.toBe(single);
  });

  it('should preserve all elements in multi-element array', () => {
    const original = ['a', 'b', 'c', 'd', 'e'];
    const shuffled = shuffle(original);
    
    expect(shuffled.sort()).toEqual(original.sort());
  });
});