---
name: zig-0.17
description: >-
  Zig 0.17 version knowledge: what changed from 0.16, how to write code that
  uses no removed or deprecated 0.17 API, how to migrate 0.16 code or merge an
  upgraded main into a 0.16 branch without silent behavior changes, and how to
  install 0.17 next to 0.16. Use when writing, reviewing, or upgrading Zig code
  that targets Zig 0.17; when 0.16 code fails to compile on 0.17, or 0.17 code
  fails on a 0.16 compiler with errors such as "no field or member function
  named 'print'"; when replacing
  deprecated calls such as std.fmt.allocPrint, std.fmt.bufPrint,
  std.mem.indexOf, std.mem.copyForwards, std.fs.path, builtin.os, or
  @intFromEnum; when `**`, errdefer captures, @cImport, or @hasDecl behave
  differently; when asked what is new, removed, or deprecated in Zig 0.17
  (language, std, build.zig, toolchain); or when the user invokes $zig-0.17.
# Added for the portfolio skills index
summary: "What changed in Zig 0.17, and how to move 0.16 code over without silent behavior changes."
author: "Pranit Sharma"
mine: true
files: ["references/build-system.md", "references/examples.zig", "references/language.md", "references/std.md", "references/toolchain.md", "scripts/check_deprecated.py", "scripts/migrate.py"]
---

# Zig 0.17

Facts here were checked against the 0.17.0 release notes, language reference,
standard library source, and a real 0.16 to 0.17 port. Trust them before
re-deriving 0.17 from `lib/std` or the web; read the std source only for an API
this skill does not cover.

Project rules (for example an `AGENTS.md`) win over this skill for local helpers
and conventions. General Zig quality belongs to `zig-best-practices`.

## Check the compiler first

Read `.minimum_zig_version` in `build.zig.zon` and run `zig version`. Do not
apply these rules to a project that still targets 0.16.

When the project targets 0.17 but `zig` is 0.16, do not build with it. Zig 0.16
ignores `minimum_zig_version` and reports correct 0.17 code as broken, for
example `no field or member function named 'print' in 'mem.Allocator'` or
`no field named 'debug' in enum 'builtin.OptimizeMode'`. Never "fix" such code
back to 0.16 names. Find a 0.17 compiler with `which -a zig` and in versioned
install directories, then run it by absolute path or with a per-command
`PATH=<dir>:$PATH`. Do not upgrade, relink, or replace the shared `zig`, because
other checkouts may still need 0.16. If there is no 0.17 compiler, install one
next to 0.16 ([toolchain](references/toolchain.md)) or ask, and say which checks
did not run on 0.17.

## Changes that compile but change behavior

A clean build proves none of these. Check every one during a migration.

1. **`@hasDecl` only sees `pub` declarations**, even from the same file. A
   duck-typed probe of a non-`pub` declaration now returns `false` and silently
   disables the feature. Make the probed declaration `pub`.
2. **`std.mem.containsAtLeastScalar(T, list, element, minimum)`** swapped its
   last two parameters (0.16 was `minimum, element`). Old `u8` calls still
   compile and return wrong answers. Rewrite every call site.
3. **`@bitCast` was redefined.** Casts involving arrays or vectors now
   concatenate logical bit representations (endian-agnostic). Casts from or to
   `extern struct`/`extern union` are rejected: pun through
   `@as(*align(1) const T, @ptrCast(&value))` instead. A cast to an enum
   safety-checks the tag.
4. **`@tagName(builtin.optimize)`** yields `debug`, `safe`, `fast`, `small`. If
   a user sees the label, map it explicitly instead of printing the tag.
5. **`std.mem.eql`/`findDiff` on floats** no longer treat a slice as equal to
   itself (NaN is not equal to NaN).
6. **`std.array_list.Managed`** (which backs `std.json.Array`) gained a required
   `pointer_stability` field. Never build one with a field literal; use
   `.fromOwnedSlice(gpa, items)` or `.init(gpa)`.

## Removed: these no longer compile

| 0.16 | 0.17 |
|---|---|
| `[1]T{v} ** n`, `"ab" ** n` | `const a: [n]T = @splat(v);`; for repeated strings use a comptime helper ([language](references/language.md)) |
| `errdefer \|err\| ...` | Split the function; handle the error in the caller |
| `void{}` | `{}` |
| `i0` | `u0` |
| `@cImport` | The translate-c package ([build system](references/build-system.md)) |
| `opt == .ReleaseSafe` and other old tags in `==`/`!=` | `.debug`, `.safe`, `.fast`, `.small` |
| `std.heap.StackFallbackAllocator`, `stackFallback` | `std.heap.BufferFirstAllocator.init(buffer, fallback)` |
| `@typeInfo(T).@"struct".fields` | `.field_names`, `.field_types`, `.field_attrs`, `.decl_names` |
| `b.build_root`, `if (b.args) \|a\| run.addArgs(a)` | `b.root` (a `Cache.Path`), `run.addPassthruArgs()` |

The full list, including `std.ascii`, bit sets, packed ints, `Uri.getHost`, and
`std.zon.parse`, is in [std](references/std.md).

## Deprecated: still compiles, do not write it

| Deprecated | Use |
|---|---|
| `std.fmt.allocPrint(gpa, f, a)` | `gpa.print(f, a)` (same error set) |
| `std.fmt.bufPrint(buf, f, a)`, `bufPrintSentinel`, `BufPrintError` | `std.mem.print`, `std.mem.printSentinel`, `std.mem.PrintError` |
| `std.mem.indexOf*`, `lastIndexOf*` | `std.mem.find`, `findScalar`, `findAny`, `findPos`, `findLast`, `findScalarLast`, `findLastAny` |
| `std.mem.copyForwards(T, d, s)` / `copyBackwards` | `@memmove(d[0..s.len], s)`; `@memmove` requires equal lengths |
| anything in `std.fs` | `std.Io.Dir.path`, `std.Io.Dir.max_path_bytes`, `std.Io.Dir.max_name_bytes` |
| `path.resolve`, `path.relative` | `std.Io.Dir.path.resolveAlloc`, `relativeAlloc` |
| `@import("builtin").os`, `.cpu`, `.abi`, `.object_format` | `builtin.target.os`, `.target.cpu`, `.target.abi`, `.target.ofmt` |
| `builtin.mode`, `std.debug.runtime_safety` | `builtin.optimize`, `builtin.optimize.runtimeSafety()` |
| `std.builtin`, `std.lang.OptimizeMode` | `std.lang`, `std.lang.Optimize` |
| `@intFromEnum`, `@enumFromInt` | `@backingInt`, `@fromBackingInt` (`zig fmt` upgrades them) |
| `std.ArrayListUnmanaged`, `*ArrayHashMapUnmanaged`, `*BitSet*` | `std.ArrayList`, `std.array_hash_map.String`/`Auto`/`Custom`, `std.bit_set.Integer`/`Array`/`Static`/`Dynamic` |
| `list.getLast()`, `getLastOrNull()` | `list.last().?`, `list.last()` |
| `std.heap.DebugAllocator` | `std.heap.SafeAllocator` |
| `std.unicode.utf8Decode` | Validate with `utf8ByteSequenceLength`, then `utf8Decode2/3/4` |
| `std.meta.fieldNames`, `fieldInfo`, `fieldTypes` | `@typeInfo` |
| Run `addArtifactArg`, `addFileArg`, `addPrefixed*Arg`, ... | `addArtifactArg2(x, .{ .prefix = "-p" })`, `addFileArg2`, ... |
| `b.addTranslateC` | The translate-c package |

Every deprecated name in this table forwards to its replacement, so the rename
cannot change behavior; the only exceptions are the `copyForwards` and
`utf8Decode` rows. `std.Io.Dir.path` is the same module as `std.fs.path`, so
`join`, `basename`, `dirname`, and the rest carry over unchanged. Rarer
deprecations (`readAlloc`, `sendMany`, `Target.isAARCH64`, `tar`, default `.{}`
initialization of hash maps) are in [std](references/std.md).

## New in 0.17 worth using

- `@divCeil(a, b)` instead of `std.math.divCeil(T, a, b) catch unreachable`.
- A slice with a comptime-known length coerces to an array pointer and
  dereferences to an array: `const a: [3]u16 = slice.*;`.
- `std.heap.SafeAllocator` for leak and misuse detection in tests and debug
  tools. It never reuses memory, so it is not a production allocator.
- `list.last()` and `list.lastPtr()`, `std.Io.Semaphore.waitTimeout`,
  `SafetyLock.lockShared`, `std.zon.parse.updateFrom*`.
- Build system: `findProgramLazy`, `dependOnFileContents`, `b.pathList`,
  `addOptionPathDirectory`, `dependencyLazy`, `--print-configuration`.
- `zig build -fincremental --watch` works for most x86_64-linux projects.
- `zig fmt --complexity` reports token and AST-node counts per file.

## Writing new 0.17 code

Use only the right-hand columns above. Before reporting the work done, run the
bundled scanner and require zero removed and zero deprecated findings:

```sh
python3 <this skill>/scripts/check_deprecated.py <files or directories>
```

## Migrating 0.16 code

1. If the migration touches CI, release targets, or OS minimums, read
   [toolchain](references/toolchain.md) first. A single-file migration does
   not need it.
2. Apply the mechanical renames, then let `zig fmt` (0.17) rewrite
   `@intFromEnum` and `@enumFromInt`:

   ```sh
   python3 <this skill>/scripts/migrate.py --write <files or directories>
   zig fmt <files or directories>
   ```

   [`scripts/migrate.py`](scripts/migrate.py) only makes renames that forward
   exactly to their 0.17 declaration (`allocPrint`, `bufPrint`, `indexOf*`,
   `builtin.os`, `builtin.mode` comparisons, `ArrayListUnmanaged`,
   `std.builtin`, `std.fs.path`, and more). It never edits strings or comments,
   and it prints a `NOTE` for each site that needs judgment. Without `--write`
   it only reports.
3. Fix compile errors, but do not stop there. Zig analyzes lazily, so build
   every artifact the project ships and run the full test suite, not one
   `zig build`.
4. Run `check_deprecated.py --review`. Replace every removed and deprecated
   finding that remains (`**`, `errdefer` captures, `copyForwards`, allocators,
   and so on), and read every review hotspot against the six behavior changes
   above.
5. Rewrite `copyForwards` sites individually: `@memmove(d, s)` is only correct
   when the lengths already match, so trim the destination to `s.len`
   otherwise.
6. Add a test for each silent change you fix, so a later merge cannot undo it.
7. Report what remains deprecated on purpose and why, for example a
   translate-c dependency the project has not approved.

**Merging an upgraded `main` into a 0.16 branch:** merge instead of rebasing,
so each conflict is resolved once and no intermediate commit has to build on
0.17. Where a conflict differs only in 0.16 spellings, take `main`'s side; where
the branch changed behavior, keep the change and write it the 0.17 way. Then run
steps 2 to 4 on the whole merged tree. `migrate.py` leaves code that is already
0.17 unchanged, so it only rewrites what the branch added.

## Reviewing Zig code

Run the scanner on the changed files and check each finding. Treat a new
`@hasDecl` probe, `containsAtLeastScalar` call, or `@bitCast` of an array, an
extern struct, or into an enum as a review question, not a style nit.

## References

The tables above cover most tasks. Load a reference only when the task needs
more than they say, because each one costs context:

- [references/language.md](references/language.md): when a change touches casts,
  builtins, comptime, reflection, or removed syntax and you need before and
  after code.
- [references/std.md](references/std.md): when you need an exact signature, an
  allocator or container API, ZON parsing, or a rare deprecation.
- [references/build-system.md](references/build-system.md): when editing
  `build.zig`, `build.zig.zon`, package fetching, translate-c, or editor
  tooling.
- [references/toolchain.md](references/toolchain.md): when installing 0.17 next
  to 0.16, changing CI, release targets, OS minimums, or libc, and for gotchas
  from a real port.
- [references/examples.zig](references/examples.zig): compile-checked snippets
  for the patterns above. `zig test references/examples.zig` passes on 0.17.0.
