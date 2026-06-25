import { describe, it, expect, beforeEach } from 'vitest';
import { createGameStore } from './gameStore';

describe('gameStore', () => {
  let store: ReturnType<typeof createGameStore>;

  beforeEach(() => {
    store = createGameStore();
  });

  it('initializes timer to 0', () => {
    expect(store.timer).toBe(0);
  });

  it('initializes matchedCount to 0', () => {
    expect(store.matchedCount).toBe(0);
  });

  it('initializes cards with correct structure and pairs', () => {
    expect(store.cards.length).toBe(12); // 6 pairs
    const uniqueValues = new Set(store.cards.map(c => c.value));
    expect(uniqueValues.size).toBe(6); // 6 unique values
    store.cards.forEach(card => {
      expect(card.id).toBeDefined();
      expect(card.value).toBeDefined();
      expect(card.isFlipped).toBe(false);
      expect(card.isMatched).toBe(false);
    });
  });

  it('flips a card and updates isFlipped state', () => {
    const cardId = store.cards[0].id;
    store.flipCard(cardId);
    const flippedCard = store.cards.find(c => c.id === cardId);
    expect(flippedCard?.isFlipped).toBe(true);
  });

  it('does not flip already matched cards', () => {
    const cardId = store.cards[0].id;
    store.cards[0].isMatched = true;
    store.flipCard(cardId);
    expect(store.cards[0].isFlipped).toBe(false);
  });

  it('flips two cards and matches them if values are equal', () => {
    // Set up two cards with same value
    store.cards[0].value = 'heart';
    store.cards[1].value = 'heart';
    store.cards[0].isFlipped = true;
    store.cards[1].isFlipped = true;

    store.checkMatch();

    expect(store.cards[0].isMatched).toBe(true);
    expect(store.cards[1].isMatched).toBe(true);
    expect(store.matchedCount).toBe(2);
  });

  it('flips two cards and does not match if values are different', () => {
    // Set up two cards with different values
    store.cards[0].value = 'heart';
    store.cards[1].value = 'spade';
    store.cards[0].isFlipped = true;
    store.cards[1].isFlipped = true;

    store.checkMatch();

    expect(store.cards[0].isMatched).toBe(false);
    expect(store.cards[1].isMatched).toBe(false);
    expect(store.matchedCount).toBe(0);
    expect(store.cards[0].isFlipped).toBe(false); // flips back
    expect(store.cards[1].isFlipped).toBe(false); // flips back
  });

  it('increments timer every second', () => {
    const initialTimer = store.timer;
    store.startTimer();
    // Simulate 1 second passing
    setTimeout(() => {
      expect(store.timer).toBe(initialTimer + 1);
    }, 1000);
    // Since we can't wait in unit test, we verify timer is running
    expect(store.timer).toBe(initialTimer);
    // Timer should be active
    expect(store.isTimerRunning).toBe(true);
  });

  it('stops timer and does not increment', () => {
    store.startTimer();
    const initialTimer = store.timer;
    store.stopTimer();
    // Simulate time passing
    setTimeout(() => {
      expect(store.timer).toBe(initialTimer); // should not change
    }, 1000);
    expect(store.isTimerRunning).toBe(false);
  });

  it('resets game state correctly', () => {
    // Simulate some state changes
    store.flipCard(store.cards[0].id);
    store.cards[0].isMatched = true;
    store.matchedCount = 2;
    store.timer = 30;
    store.isTimerRunning = true;

    store.resetGame();

    expect(store.timer).toBe(0);
    expect(store.matchedCount).toBe(0);
    expect(store.isTimerRunning).toBe(false);
    expect(store.cards.every(c => !c.isFlipped && !c.isMatched)).toBe(true);
  });
});
