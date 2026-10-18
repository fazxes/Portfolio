---
name: code-simplifier
description: "Post-edit code clarity/maintainability cleanup with exact behavior preservation; triggers: simplify/clean/tighten/polish/refactor recent code; valid outcome: no edits."
# Added for the portfolio skills index
summary: "Cleans up recently edited code for clarity without changing what it does. Making no edits is a valid outcome."
author: "Pranit Sharma"
mine: true
---

# Code Simplifier

Refine code without changing what it does. Prefer readable, explicit code over fewer lines or clever abstractions.

## Core Rules

- Preserve behavior exactly, including public APIs, outputs, errors, side effects, state transitions, execution order, concurrency semantics, resource ownership, and performance-sensitive behavior.
- Follow the repository's instruction files and established local patterns. Read applicable `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, and nearby code before editing.
- Limit the scope to code modified in the current session or current working diff. Do not clean up unrelated files or neighboring code unless asked.
- Treat a no-op as a successful result when the scoped code is already clear.
- Keep abstractions that clarify ownership or separate concerns. Remove or combine them only when the result is demonstrably easier to understand.
- Choose clarity over brevity. Avoid dense one-liners, nested ternaries, hidden control flow, and speculative generalization.
- Do not widen shared helper contracts for one new caller. Prefer a focused helper unless the broader contract is clearly correct for every caller.
- Do not alter tests, snapshots, or error handling merely to make a refinement pass verification.
- Never overwrite or revert unrelated user changes.

## Workflow

1. **Establish the scope.**
   - Use session edit history and the working diff to identify recently modified code.
   - Distinguish the target changes from unrelated pre-existing work.
   - If the user names a specific file, function, or broader scope, follow that scope.

2. **Read before editing.**
   - Read applicable repository instructions.
   - Inspect surrounding code, callers, tests, and related types to understand contracts and local conventions.
   - Identify behavior that must remain unchanged before considering refinements.

3. **Find concrete simplifications.**
   Look for:
   - Unnecessary nesting that can become clear early returns or straightforward branches.
   - Redundant variables, conditions, wrappers, or abstractions.
   - Repeated logic that has a stable, meaningful shared contract.
   - Names that obscure intent.
   - Comments that merely narrate obvious code.
   - Inconsistent structure relative to nearby code.
   - Dead code or imports introduced by the recent changes.

   Do not mechanically change every candidate. Each edit must make the code easier to read or maintain without weakening a contract.

4. **Apply restrained edits.**
   - Keep changes local to the scoped code.
   - Prefer explicit control flow and descriptive names.
   - Preserve useful boundaries between responsibilities.
   - Stop when further changes become subjective, speculative, or behaviorally uncertain.

5. **Verify preservation.**
   - Inspect the final diff for scope drift and accidental behavior changes.
   - Run the repository formatter and the most relevant focused tests, lint checks, or type checks.
   - Run broader verification when required by repository instructions or when the blast radius warrants it.
   - If a refinement causes a failure or its behavior cannot be proven equivalent, back it out.

6. **Report succinctly.**
   - Mention only meaningful refinements and verification performed.
   - State clearly when no worthwhile simplification was found.
   - State any verification that could not be run.

## Stop Conditions

Stop refining when:

- Every remaining change would be subjective or tangential.
- The code is clearer but not denser or more clever.
- Behavior and contracts remain intact.
- Relevant verification passes.
