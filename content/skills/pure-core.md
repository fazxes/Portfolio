---
name: pure-core
description: Apply functional-programming purity discipline to day-to-day coding in any language. Use when writing or reviewing code to keep a referentially-transparent core, push effects to the edges, represent effects as values, design by algebra and laws, and choose composition over in-place mutation. Triggers include "is this pure", "make it more functional", "tighten this up", "reduce side effects", "why is this hard to test", "review for composability", or any time code is tangled with hidden state, exceptions, or uncontrolled I/O.
# Added for the portfolio skills index
summary: "Keeps a pure core and pushes side effects to the edges, in any language."
author: "Pranit Sharma"
mine: true
daily: 3
---

# Pure Core

## Overview

A discipline skill, not a framework. It distills the transferable ideas of functional programming (as taught by Chiusano & Bjarnason, *Functional Programming in Scala*) into a handful of checks you can run on real code in any language — including Zig, which has no `flatMap`, no type classes, and no monads. The goal is code with a **pure core**: most of the logic is referentially transparent, and effects live in a thin outer shell.

This skill is for the code you write today, not for rebuilding a standard library. Apply the principles on contact with real code; do not import foreign machinery.

## When to use

- Writing new logic and deciding where I/O, errors, and state should live.
- Reviewing or refactoring code that is hard to test, hard to reason about, or tangled with hidden state.
- Debugging something that "should work" but depends on order of operations or external mutation.
- Designing a small API or combinator and choosing its operations and laws.
- Deciding whether to mutate in place, throw, or thread a value through.

Do **not** use this skill to justify rewriting working code into a foreign style, or to introduce abstractions the codebase does not already reward. The discipline is subtractive: it removes hidden effects and tightens composition. It should rarely add surface area.

## The test that governs everything

**Referential transparency (RT): can I replace this expression with its result without changing the meaning of the program?**

If yes, the expression is pure — you can reason locally, reorder, cache, parallelize, and test it by feeding inputs and checking outputs.

If no, there is a hidden effect. Find it. Common effects are fine (I/O, logging, mutation of shared state); the problem is *hidden* ones. The fix is almost always to make the effect explicit in the type or return value, not to eliminate the effect.

Run this test mentally on any function you write or touch. It is the single highest-leverage check in this skill.

## The principles

### 1. Keep a pure core; push effects to the edges

Structure a program as a pure core that computes *descriptions* of what should happen, surrounded by a thin shell that actually performs effects (reads, writes, prints, spawns).

- Pure core: `fn score(input) -> Score` — given data, returns data. No I/O, no globals, no mutation the caller can observe.
- Effectful shell: `main` reads input, calls the core, writes the result.

The maxim: inside every function with side effects is a pure function waiting to get out. Factor `f: A -> B` into pure `A -> D` (compute a description) plus an impure `D -> B` (perform it). Repeat until only the outermost shell is impure.

Anti-pattern: I/O, parsing, business logic, and formatting interleaved in one function. Split so the pure part is testable without a filesystem or a network.

### 2. Represent effects as values

Make effects visible in the data you pass and return, so the type tells the truth.

- **Errors**: prefer returning an explicit result type (`?T` / error union / `Result` / `Option`) over throwing/panicking across a recoverable boundary. Reserve panics/exceptions for programmer bugs and truly unrecoverable conditions. A signature that can fail should say so.
- **Absence**: represent "no value" as a value (`null` is acceptable in Zig via optionals; never use a sentinel like `-1` or `0` to mean "missing").
- **State**: instead of mutating shared state, thread it — take the current state, return the new state alongside the result. The caller decides whether to keep or discard it.
- **Partial results**: if a computation can produce "done with leftover input," return both the result and the remainder rather than consuming globally.

Trade-off: this adds a little ceremony at the call site. The payoff is that callers cannot forget an effect the type advertises.

### 3. Separate description from execution

Whenever you can, build a value that *describes* work, and run it separately.

- A query struct describes a lookup; a runner executes it.
- A task list describes what to do; a driver performs it.
- A parsed command describes intent; dispatch carries it out.

This lets you inspect, test, reorder, and compose the description without performing the effect. In Zig this often just means a struct + a switch over its tags in one place, rather than scattering behavior into constructors.

### 4. Design by algebra and laws

When you build a small API or combinator set, name the operations and write down the laws they must satisfy, then derive implementations so the laws hold.

- Name a tiny set of primitives; derive the rest from them.
- Write the laws as properties you could check: identity (`map(x)(id) == x`), associativity (`combine(combine(a,b),c) == combine(a,combine(b,c))`), absorption, etc.
- Let the laws find bugs. The classic lesson: writing `fork(x) == x` exposed a thread leak that the passing tests missed. State the invariant you assume; then check it.
- Zig example: if you write `merge`, state `merge(merge(a,b), c) == merge(a, merge(b,c))` and check it with random `a,b,c` in a test. A `merge` that secretly depends on argument shape or order fails this immediately, where example-based tests pass.

In practice this means: before implementing, ask "what operations, and what laws?" If you cannot state the laws, the abstraction is not ready.

### 5. Follow the types

When a function is generic, the type signature often constrains the implementation so tightly that only one body type-checks. Lean on that. Line up the types first; let the body fall out.

- Prefer the most general signature that compiles.
- If two implementations fit the same signature and laws, you are missing a distinction (or a law).
- When stuck, write the type and let the compiler tell you what's available.

This is the "follow the types" habit: it surfaces missing arguments, impossible cases, and unnecessary assumptions.

### 6. Compose small pure pieces; avoid defensive copying

Build behavior by combining small pure functions rather than writing one monolithic procedure. Because pure pieces don't interfere, composition is safe and cheap.

- Prefer data sharing over copying when data is immutable: returning a slice into an input is fine if nobody mutates it.
- Compose transforms as a pipeline; let fusion happen naturally (each step produces only what the next needs).
- When a generic pattern repeats across two functions, extract it once — but only after the second occurrence, not the first.

Anti-pattern: a single function that reads, validates, transforms, writes, and logs. Split into pure stages and a small effectful driver; the stages reuse independently.

### 7. Contain mutation locally

Mutation is not forbidden. The rule is scope: in-place mutation is pure *if no outside code can observe it*.

- Sort a local array in place and return a slice of it — fine, if the array never escapes.
- Keep a mutable accumulator inside a tight loop, then return its final value — fine.
- Mutating a struct the caller handed you, or a global, or shared state — not fine; that is an observable side effect.

In Zig specifically: `var` locals and `ArrayList` mutation inside a function body are often correct and fast. The line is whether the mutation is visible past the function boundary. When in doubt, prefer to return a new value over mutating an argument.

## How to apply (day-to-day)

1. **Before writing**: decide what is pure core and what is effectful shell. Put I/O at the edges.
2. **While writing**: run the RT test on each function. If it fails, make the effect explicit in the return type or thread it through.
3. **On review**: look for hidden state (globals, mutated args, time, randomness, I/O inside logic), recoverable errors hidden as panics, and monolithic functions that mix pure and impure.
4. **When designing an API**: name the operations, state the laws, pick the minimal primitives, follow the types.
5. **When refactoring**: extract the pure part first; the impure remainder usually shrinks to a driver.

## Worked example (Zig)

Impure blob — logic and I/O fused, untestable without a filesystem:

```zig
fn report(path: []const u8) !void {
    const data = try std.fs.cwd().readFileAlloc(alloc, path, max);
    var score: u32 = 0;
    for (data) |b| { if (b == 'x') score += 1; }   // logic mixed with I/O
    try std.io.getStdOut().writer().print("{d}\n", .{score});
}
```

Pure core + thin driver — the logic is now testable by feeding bytes:

```zig
// pure: bytes in, score out
fn scoreX(data: []const u8) u32 {
    var n: u32 = 0;
    for (data) |b| { if (b == 'x') n += 1; }
    return n;
}

// effectful shell: I/O only, no business logic
fn report(path: []const u8) !void {
    const data = try std.fs.cwd().readFileAlloc(alloc, path, max);
    defer alloc.free(data);
    try std.io.getStdOut().writer().print("{d}\n", .{scoreX(data)});
}
```

The split took one extraction and made the core trivially testable. That is the shape this skill pushes toward: the smallest change that moves logic out of the effectful shell.

## Smell list

A code path probably violates the discipline if it has any of these. Each is a hidden effect; the fix is to make it explicit in the type or return value.

- **Signature hides a failure** — `fn parse(s) -> T` that can return garbage or panic. Bites because callers cannot see the failure mode and skip handling it; the bug surfaces far from the cause. Fix: return `!?T` or a result type so the signature forces a decision.
- **Signature hides I/O, time, or randomness** — a "calculation" that reads the clock, logs, or draws entropy. Bites because results are non-reproducible: tests flake and bugs hide. Fix: take the dependency as an argument (a clock, a reader, a seed) so the pure core is deterministic.
- **Mutating an argument in place** — `fn normalize(buf: *Buffer) void` when it could return a value. Bites because callers holding the original see it change under them, breaking local reasoning. Fix: return a new value; or, if mutation is required for speed, document it loudly and keep it local (principle 7).
- **Recoverable error swallowed** — `catch |_| {}` or an ignored `try`. Bites because the failure is invisible and execution continues in a wrong state. Fix: propagate with a real error type, or explicitly decide and document why ignoring is correct here.
- **Logic only testable through I/O** — to exercise the branch you must create files, open a socket, or set a global. Bites because the branch never gets tested. Fix: extract the pure stage and test it with plain data.
- **Shared mutable state across modules** — a global or static that several files read and write. Bites because ordering changes silently change results. Fix: thread the state through, or confine it to one owner.
- **Two code blocks same law, different shape** — two loops doing "count and sum" differently. Bites because one is probably wrong and neither is named. Fix: name the operation, state the law, use one implementation.

## What this skill is not

- Not a call to add monads, type classes, or Scala-style abstractions to Zig. The principles are language-agnostic; the machinery is not.
- Not "never mutate." Local, unobservable mutation is good and fast.
- Not "never throw." Panics for programmer bugs are correct; the line is recoverability.
- Not a reason to rewrite working, tested code. Apply at the point of change.

## Calibration

Prefer the smallest change that removes the hidden effect. If a function becomes pure by returning one extra value, do that — don't restructure the whole module. If a law is useful only when stated and never checked, skip it until it earns its place. The discipline pays for itself only when it makes code easier to test, reason about, or compose; when it does not, leave the code alone.
