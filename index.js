const bricks = document.querySelectorAll('.brick');
  const scoreBoard = document.querySelector('.scorenum');
  const minifigs = document.querySelectorAll('.minifig');
  let lastbrick;
  let timeUp = false;
  let scorenum = 0;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randombrick(bricks) {
    const idx = Math.floor(Math.random() * bricks.length);
    const brick = bricks[idx];
    if (brick === lastbrick) {
      return randombrick(bricks);
    }
    lastbrick = brick;
    return brick;
  }

  function peep() {
    const time = randomTime(500, 1200);
    const brick = randombrick(bricks);
    brick.classList.add('up');
    setTimeout(() => {
      brick.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 30000)
  }

  function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }

  minifigs.forEach(minifig => minifig.addEventListener('click', bonk));