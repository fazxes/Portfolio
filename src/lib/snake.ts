/**
 * Self-playing Snake: pure game logic, no DOM. A cell is an index, y * cols + x.
 *
 * The snake takes the shortest path to the food, but only when that move still
 * leaves a path from its head to its own tail; otherwise it stalls away from
 * the food. Following its tail is always possible, so it rarely boxes itself in.
 */

export interface SnakeGame {
  readonly cols: number;
  readonly rows: number;
  /** Head first. */
  readonly body: readonly number[];
  readonly food: number;
  /** Moves since the last bite, to end a round where the snake only circles. */
  readonly hungry: number;
}

/** End the round once the snake covers this share of the board. */
const MAX_FILL = 0.3;
/** End a round that goes this many moves without a bite. Real hunts: median 18, p99 under 100. */
const HUNGRY_LIMIT = 300;

/** A new round: a 3-cell snake on the left of the middle row. Needs `cols >= 3`. */
export function newGame(cols: number, rows: number, random: () => number = Math.random): SnakeGame {
  const row = Math.floor(rows / 2) * cols;
  const body = [row + 2, row + 1, row];
  return { cols, rows, body, food: placeFood(cols, rows, body, random), hungry: 0 };
}

/** One move, or null when the round is over: boxed in, long enough, or circling without eating. */
export function step(game: SnakeGame, random: () => number = Math.random): SnakeGame | null {
  const next = chooseMove(game);
  if (next === null) {return null;}
  const ate = next === game.food;
  const body = moved(game, next);
  if (body.length >= game.cols * game.rows * MAX_FILL || game.hungry > HUNGRY_LIMIT) {return null;}
  return {
    ...game,
    body,
    food: ate ? placeFood(game.cols, game.rows, body, random) : game.food,
    hungry: ate ? 0 : game.hungry + 1,
  };
}

function chooseMove(game: SnakeGame): number | null {
  const { body, food, cols, rows } = game;
  const head = body[0];
  if (head === undefined) {return null;}
  // The tail cell frees up as the snake moves, so it isn't an obstacle.
  const obstacles = new Set(body.slice(0, -1));

  const toFood = firstStep(head, food, obstacles, cols, rows);
  if (toFood !== null && keepsTailReachable(game, toFood)) {return toFood;}

  const options = neighbors(head, cols, rows).filter((cell) => !obstacles.has(cell));
  const safe = options.filter((cell) => keepsTailReachable(game, cell));
  let best: number | null = null;
  for (const cell of safe.length > 0 ? safe : options) {
    if (best === null || distance(cell, food, cols) > distance(best, food, cols)) {best = cell;}
  }
  return best;
}

/** The body after the head moves to `next`, growing by one if it lands on the food. */
function moved(game: SnakeGame, next: number): readonly number[] {
  return next === game.food ? [next, ...game.body] : [next, ...game.body.slice(0, -1)];
}

function keepsTailReachable(game: SnakeGame, next: number): boolean {
  const body = moved(game, next);
  const tail = body[body.length - 1] ?? next;
  return firstStep(next, tail, new Set(body.slice(1, -1)), game.cols, game.rows) !== null;
}

/** First cell on a shortest path from `from` to `to` that avoids `blocked` (breadth-first search). */
function firstStep(
  from: number,
  to: number,
  blocked: ReadonlySet<number>,
  cols: number,
  rows: number,
): number | null {
  const parent = new Map<number, number>([[from, from]]);
  const queue = [from];
  for (const cell of queue) {
    for (const next of neighbors(cell, cols, rows)) {
      if (parent.has(next) || (blocked.has(next) && next !== to)) {continue;}
      parent.set(next, cell);
      if (next === to) {
        let first = next;
        while (parent.get(first) !== from) {first = parent.get(first) ?? from;}
        return first;
      }
      queue.push(next);
    }
  }
  return null;
}

function neighbors(cell: number, cols: number, rows: number): number[] {
  const x = cell % cols;
  const y = Math.floor(cell / cols);
  const out: number[] = [];
  if (x > 0) {out.push(cell - 1);}
  if (x < cols - 1) {out.push(cell + 1);}
  if (y > 0) {out.push(cell - cols);}
  if (y < rows - 1) {out.push(cell + cols);}
  return out;
}

function distance(a: number, b: number, cols: number): number {
  return Math.abs((a % cols) - (b % cols)) + Math.abs(Math.floor(a / cols) - Math.floor(b / cols));
}

function placeFood(cols: number, rows: number, body: readonly number[], random: () => number): number {
  const taken = new Set(body);
  const free: number[] = [];
  for (let cell = 0; cell < cols * rows; cell++) {
    if (!taken.has(cell)) {free.push(cell);}
  }
  return free[Math.floor(random() * free.length)] ?? 0;
}
