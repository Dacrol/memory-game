import { test, expect } from '@playwright/test';

type Card = {
  color: string;
  flipped: boolean;
  matched: boolean;
};

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForSelector('text=Memory Game');
  expect(await page.innerText('text=Memory Game')).toBe('Memory Game');
});

test('should have 16 cards', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForSelector('.card');
  const cards = await page.$$('.card');
  expect(cards.length).toBe(16);
});

test('should be able to finish the game', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForSelector('.card');

  const clickCard = async (index: number) => {
    const cardSelector = `#card-${index + 1}`;
    const cardElement = await page.$(cardSelector);
    if (!cardElement) {
      throw new Error(`Cannot find card with selector ${cardSelector}`);
    }
    await cardElement.click();
    await page.waitForTimeout(1000);
  };

  const seenCards: Card[] = new Array(16).fill({
    color: '',
    flipped: false,
    matched: false,
  });

  while (seenCards.filter(card => card.matched).length !== 16) {
    const currentlyFlippedCardIndex = seenCards.findIndex(
      card => card && card.flipped && !card.matched
    );

    if (currentlyFlippedCardIndex > -1) {
      const currentlyFlippedCardColor =
        seenCards[currentlyFlippedCardIndex].color;

      const matchingCardIndex = seenCards.findIndex(
        (card, index) =>
          card &&
          card.color === currentlyFlippedCardColor &&
          !card.flipped &&
          !card.matched &&
          index !== currentlyFlippedCardIndex
      );

      if (matchingCardIndex > -1) {
        await clickCard(matchingCardIndex);
        seenCards[matchingCardIndex].matched = true;
        seenCards[matchingCardIndex].flipped = false;
        seenCards[currentlyFlippedCardIndex].matched = true;
        seenCards[currentlyFlippedCardIndex].flipped = false;
        continue;
      }
    }

    let randomIndex = Math.floor(Math.random() * 16);

    const unknownCards = seenCards.filter(card => !card.color).length;

    // select a new card if the card is already matched or known, unless there are no unknown cards left
    if (
      (unknownCards !== 0 && seenCards[randomIndex].color) ||
      seenCards[randomIndex].matched
    ) {
      continue;
    }

    await clickCard(randomIndex);

    const color = await page.getAttribute(
      `#card-${randomIndex + 1}`,
      'data-color'
    );
    if (!color) {
      throw new Error('Card does not have data-color attribute');
    }

    seenCards[randomIndex] = { color, flipped: true, matched: false };
    const flippedCards = seenCards.filter(card => card.flipped);
    if (flippedCards.length >= 2) {
      if (flippedCards.every(card => card.color === color)) {
        flippedCards.forEach(card => (card.matched = true));
      }
      flippedCards.forEach(card => (card.flipped = false));
    }
  }

  // Check if the winning message is displayed
  const winMessage = await page.innerText('#stats h2');
  expect(winMessage).toBe('You win!');
});
