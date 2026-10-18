---
name: zig-best-practices
description: >-
  Apply portable Zig 0.17+ correctness, strict type design, ownership, API,
  concurrency, testing, and maintainability guidance. Use whenever writing,
  editing, reviewing, generating, or refactoring .zig files; diagnosing Zig
  allocator, error-set, I/O, comptime, fuzzing, build-mode, or binary-size
  problems; or when the user asks for idiomatic, safe, tight, or production-ready
  Zig code—even if they do not explicitly ask for best practices.
# Added for the portfolio skills index
summary: "Guidance on correctness, ownership, error handling, and testing for Zig 0.17 and later."
author: "Pranit Sharma"
mine: true
daily: 2
files: ["references/api-maintainability.md", "references/io-concurrency-security.md", "references/testing-build-size.md", "references/types-memory-errors.md"]
---

# Zig Best Practices (0.17+)

Use this skill to make Zig code easier to reason about under failure, concurrency,
and future change. Its highest-value rules cover places where otherwise plausible Zig
code commonly fails: ownership, invalidated pointers, inferred contracts, unbounded
input, safety-disabled builds, and version-sensitive standard-library APIs.

## Scope and precedence

This is portable Zig guidance, not a project style guide.

1. Read the repository's instruction files, `build.zig`, and `build.zig.zon` before
   editing. Repository-local architecture, naming, and verification rules override
   this skill's recommendations.
2. Confirm the pinned Zig version. Zig's standard library changes quickly; when an API
   is uncertain, inspect that compiler's installed standard-library source or the
   matching version of the official documentation instead of recalling another release.
3. Preserve a repository's established patterns unless they create a correctness,
   safety, or ownership defect. Consistency is valuable, but it does not excuse bugs.

## Route to the relevant reference

Read only the references needed for the task:

- Read [types-memory-errors.md](references/types-memory-errors.md) when changing data
  models, allocators, lifetimes, error sets, arithmetic, casts, optionals, generics, or
  state machines.
- Read [api-maintainability.md](references/api-maintainability.md) when adding or
  reviewing public APIs, modules, naming, documentation, or larger refactors.
- Read [io-concurrency-security.md](references/io-concurrency-security.md) when code
  touches `std.Io`, files, networks, subprocesses, paths, threads, locks, atomics,
  cancellation, or externally supplied data.
- Read [testing-build-size.md](references/testing-build-size.md) when adding tests,
  fuzzing, choosing an optimization mode, preparing production builds, changing
  dependencies, or investigating performance or binary size.

For broad code reviews, read all four.

## Working method

1. **Map the contract before editing.** Identify ownership, borrowing, lifetimes,
   allocation, error behavior, external bounds, thread ownership, and build-mode
   assumptions. If one of these cannot be explained, investigate before changing code.
2. **Make invalid states harder to express.** Prefer concrete domain types, enums,
   tagged unions, optionals, and explicit error sets over loosely related primitives.
3. **Keep effects visible.** Allocation, blocking I/O, mutation, failure, and ownership
   transfer should be apparent from the API or its documentation.
4. **Make the smallest coherent change.** Do not broaden shared semantics for one
   exceptional caller or mix unrelated cleanup into the change.
5. **Verify mechanically, then exercise behavior.** Formatting and tests catch many
   defects; applications still need their freshly built artifact exercised through the
   changed path.

## Blocking standards

Treat these as correctness issues rather than optional style:

- Every allocation has one clear owner and a cleanup path for success and failure.
- No pointer or slice outlives its storage or survives a mutation that may reallocate it.
- External lengths, offsets, counts, recursion, retries, queues, and captured output are
  validated and bounded before arithmetic, allocation, or slicing.
- Assertions and `catch unreachable` protect program-owned invariants only. Malformed
  external data receives normal error handling in every build mode.
- Integer conversions and arithmetic have explicit range and overflow reasoning.
- Shared mutable state has an owner and synchronization policy; cancellation and shutdown
  cannot leave threads or resources behind.
- Public contracts state ownership and do not accidentally expose `anyerror`, `anytype`,
  internal mutable storage, or version-specific implementation details.
- The code compiles and tests with the repository's pinned Zig version.

## Common Zig 0.17+ gotchas

- **Allocator-explicit containers:** `std.ArrayList(T)` is allocator-explicit in 0.17.
  Initialize with `.empty`, then pass the allocator to operations and `deinit`. Storing an
  allocator is still valid when an object owns allocations across method calls; document
  that lifetime rather than banning the pattern.
- **Interior-pointer invalidation:** growing a list or hash table may relocate storage.
  Reacquire pointers and slices after mutation, or reserve capacity before taking them.
- **`undefined` is not initialization:** reading it is illegal behavior. Debug poison
  values such as `0xaa` are implementation details, not values code may depend on.
- **Error-set extremes:** inferred error sets are useful inside implementations; named
  error sets make stable public boundaries reviewable. `anyerror` is appropriate only
  when intentionally erasing the set is part of the contract.
- **Casts do not prove validity:** use `std.math.cast` for fallible narrowing, or establish
  and document the invariant before `@intCast`.
- **`Child.Term` tags are lowercase:** handle `.exited`, `.signal`, `.stopped`, and
  `.unknown` exhaustively. Do not copy pre-0.16 examples with capitalized tags.
- **I/O-aware locking:** Zig 0.17 exposes `std.Io.Mutex`; `lock` accepts an `std.Io` and is
  a cancellation point. Choose cancelable versus uncancelable locking deliberately.
- **The standard library is version-sensitive:** for example, Zig 0.17 exports
  `std.compress`. Verify the pinned standard library before claiming an API was removed.
  For what Zig 0.17 removed, deprecated, or silently changed, use the `zig-0.17` skill.
- **Test discovery follows imports:** colocated tests run only when their source file is
  reachable from the selected test root.
- **Fuzzing requires a target:** define a `std.testing.fuzz` entry point; a `--fuzz` flag
  does not turn ordinary unit tests into useful fuzz targets.

## Review judgment

Prioritize findings in this order:

1. Memory safety, illegal behavior, races, deadlocks, resource leaks, and corrupted state.
2. Incorrect ownership, error, external-input, cancellation, or public API contracts.
3. Maintainability problems that make future defects likely.
4. Performance or binary-size opportunities supported by measurement.
5. Pure style preferences not already decided by the repository.

Report correctness and safety findings as **blocking**. Report defensible design
alternatives as **considerations** with their tradeoff; do not present taste as a defect.

## Verification gate

Use the repository's documented commands first. If it has none, establish a baseline by
format-checking the project-owned Zig paths, then building and testing:

```sh
zig fmt --check <project-owned-zig-paths>
zig build
zig build test
```

Add only checks relevant to the claim:

- Run a defined fuzz target when parser or untrusted-byte handling changed.
- Test Debug and ReleaseSafe when behavior could depend on safety checks or optimization.
- Cross-compile when portability is claimed.
- Build with ReleaseSmall or ReleaseFast when evaluating their size or speed.
- Run the freshly built executable or library consumer when runtime integration changed.
- Compare performance or binary size only with the same target, options, stripping,
  features, and measurement method.

If a required command cannot run, state exactly what remains unverified. Never turn a
read-only review into a claim that runtime behavior was proven.

## Final self-check

- Ownership and borrowed lifetimes are visible.
- Every fallible acquisition has failure-path cleanup.
- Domain states, errors, arithmetic, and external bounds are explicit.
- Public APIs expose the minimum surface and document effects.
- I/O, concurrency, cancellation, and shutdown behavior are accounted for when relevant.
- Tests cover success, boundaries, and meaningful failure paths.
- Build-mode, performance, and size claims are measured rather than assumed.
- Repository instructions and the pinned Zig version were followed.
