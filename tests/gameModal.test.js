const { openGame, closeGame } = require('../js/games');

function setupDOM() {
  document.body.innerHTML = `
    <div id="gameModal" style="display:none"></div>
    <h1 id="modalTitle"></h1>
    <iframe id="gameFrame"></iframe>
  `;
}

describe('game modal functions', () => {
  beforeEach(() => {
    setupDOM();
    document.body.style.overflow = 'auto';
  });

  test('openGame sets modal info and shows modal', () => {
    openGame('Cool Game', 'https://example.com');
    const modal = document.getElementById('gameModal');
    const modalTitle = document.getElementById('modalTitle');
    const gameFrame = document.getElementById('gameFrame');

    expect(modal.style.display).toBe('block');
    expect(modalTitle.textContent).toBe('Cool Game');
    expect(gameFrame.src).toBe('https://example.com/');
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('closeGame hides modal and clears frame', () => {
    // First open to set values
    openGame('Test', 'https://example.com');
    closeGame();
    const modal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');

    expect(modal.style.display).toBe('none');
    expect(gameFrame.src).toBe('');
    expect(document.body.style.overflow).toBe('auto');
  });
});
