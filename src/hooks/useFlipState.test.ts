import { renderHook, act } from '@testing-library/react';
import { useFlipState } from './useFlipState';

describe('useFlipState', () => {
  it('should initialize with all cards in idle state', () => {
    const { result } = renderHook(() => useFlipState(4));
    
    expect(result.current.flipStates).toHaveLength(4);
    expect(result.current.flipStates.every(state => state === 'idle')).toBe(true);
  });

  it('should transition card from idle to flipping', () => {
    const { result } = renderHook(() => useFlipState(4));
    
    act(() => {
      result.current.flipCard(0);
    });
    
    expect(result.current.flipStates[0]).toBe('flipping');
    expect(result.current.flipStates.slice(1).every(state => state === 'idle')).toBe(true);
  });

  it('should transition card from flipping to matched', () => {
    const { result } = renderHook(() => useFlipState(4));
    
    act(() => {
      result.current.flipCard(0);
      result.current.flipCard(1);
      result.current.matchCards([0, 1]);
    });
    
    expect(result.current.flipStates[0]).toBe('matched');
    expect(result.current.flipStates[1]).toBe('matched');
    expect(result.current.flipStates[2]).toBe('idle');
    expect(result.current.flipStates[3]).toBe('idle');
  });

  it('should transition card from flipping to hidden', () => {
    const { result } = renderHook(() => useFlipState(4));
    
    act(() => {
      result.current.flipCard(0);
      result.current.flipCard(1);
      result.current.hideCards([0, 1]);
    });
    
    expect(result.current.flipStates[0]).toBe('hidden');
    expect(result.current.flipStates[1]).toBe('hidden');
    expect(result.current.flipStates[2]).toBe('idle');
    expect(result.current.flipStates[3]).toBe('idle');
  });

  it('should not allow flipping a matched or hidden card', () => {
    const { result } = renderHook(() => useFlipState(4));
    
    act(() => {
      result.current.flipCard(0);
      result.current.flipCard(1);
      result.current.matchCards([0, 1]);
    });
    
    // Try to flip a matched card
    act(() => {
      result.current.flipCard(0);
    });
    
    expect(result.current.flipStates[0]).toBe('matched'); // unchanged
    
    // Try to flip a hidden card
    act(() => {
      result.current.flipCard(2);
      result.current.flipCard(3);
      result.current.hideCards([2, 3]);
    });
    
    act(() => {
      result.current.flipCard(2);
    });
    
    expect(result.current.flipStates[2]).toBe('hidden'); // unchanged
  });

  it('should reset all cards to idle', () => {
    const { result } = renderHook(() => useFlipState(4));
    
    act(() => {
      result.current.flipCard(0);
      result.current.flipCard(1);
      result.current.matchCards([0, 1]);
      result.current.reset();
    });
    
    expect(result.current.flipStates.every(state => state === 'idle')).toBe(true);
  });

  it('should return correct number of flipped cards', () => {
    const { result } = renderHook(() => useFlipState(6));
    
    expect(result.current.flippedCount).toBe(0);
    
    act(() => {
      result.current.flipCard(0);
    });
    expect(result.current.flippedCount).toBe(1);
    
    act(() => {
      result.current.flipCard(1);
    });
    expect(result.current.flippedCount).toBe(2);
    
    act(() => {
      result.current.hideCards([0, 1]);
    });
    expect(result.current.flippedCount).toBe(0);
  });

  it('should return correct number of matched cards', () => {
    const { result } = renderHook(() => useFlipState(8));
    
    expect(result.current.matchedCount).toBe(0);
    
    act(() => {
      result.current.flipCard(0);
      result.current.flipCard(1);
      result.current.matchCards([0, 1]);
    });
    expect(result.current.matchedCount).toBe(2);
    
    act(() => {
      result.current.flipCard(2);
      result.current.flipCard(3);
      result.current.matchCards([2, 3]);
    });
    expect(result.current.matchedCount).toBe(4);
  });
});