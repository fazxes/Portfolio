---
name: align-scope
description: Review every meaningful decision in a pull request, proposal, issue, or draft plan with the user before planning or implementation. Use when the user says "ask me one by one," "QA every decision," "get us on the same page," "review the scope with me," "before making a plan," "what should we keep or remove," or wants to prevent overengineering, scope creep, unnecessary features, or a bloated PR. Inspect the evidence first, explain each decision in plain language, give a direct recommendation, and ask exactly one decision question at a time.
# Added for the portfolio skills index
summary: "Goes through every decision in a pull request, proposal, issue, or plan with you, one at a time, before any planning starts."
author: "Pranit Sharma"
mine: true
files: ["assets/scope-lock-template.md", "references/decision-catalog.md", "references/interview-guide.md"]
---

# Align Scope

Turn an existing PR or early idea into an explicitly agreed scope. Investigate first, then walk the user through every meaningful decision one at a time. Do not write the implementation plan until the scope is locked.

## Establish the evidence

Choose the relevant starting mode:

- **PR:** Read repository instructions, the latest target branch, PR title/body, commits, changed files, full diff, affected source, tests, and claimed verification. Compare against the current base rather than assuming the PR diff expresses the desired contract.
- **Draft plan:** Read the whole plan and verify its important premises against the current source. Treat each proposed addition, removal, and behavioral change as a candidate decision.
- **Idea or issue:** Read the request and inspect the existing behavior, ownership boundaries, conventions, and nearby tests before inventing a solution.

Keep investigation read-only unless the user separately authorizes edits. Do not confuse agreement on scope with permission to modify code.

## Name the behavior contract first

State, in simple runtime terms, what the user is trying to make true. Cover only applicable dimensions:

- user-visible result and ordering;
- errors, warnings, and fallback behavior;
- state ownership and persistence;
- permissions and security boundaries;
- rendering and host-specific behavior;
- cancellation and retry behavior;
- compatibility and configuration defaults.

If the intended outcome itself is unclear, make it the first decision. Architecture cannot be judged until the required behavior is known.

## Build the decision inventory

Create an internal inventory before asking questions. Include every choice that could materially change:

- observable behavior or compatibility;
- product policy, defaults, limits, or user control;
- data, control-flow, or state ownership;
- errors, warnings, recovery, permissions, or cancellation;
- public interfaces, dependencies, migrations, or persistence;
- what the PR or plan adds, removes, fixes, or deliberately leaves unchanged;
- documentation and runtime proof required to make the change usable and credible.

Read [references/decision-catalog.md](references/decision-catalog.md) after collecting evidence. Use it as a completeness check, not as a questionnaire: include only decisions that are applicable and independently meaningful.

Do not create separate questions for mechanical edits such as imports, local names, formatting, or an implementation detail with only one reasonable answer. Group inseparable mechanics under the product or architecture decision they implement. Split decisions when the user could reasonably accept one and reject the other.

Order the inventory from behavior to implementation:

1. desired outcome and non-goals;
2. user-facing policy and edge cases;
3. ownership and boundaries;
4. implementation shape and simplification;
5. compatibility, rollout, documentation, and proof.

Tell the user only the estimated count, then begin. Do not dump the entire inventory. Label each prompt `Decision N of M`. If investigation or an answer reveals another material decision, disclose the revised count and why it changed.

## Ask exactly one decision at a time

Each turn must contain one decision question, not a bundle disguised with subparts. Use this compact shape:

1. **Job:** Name the responsibility in plain language.
2. **What it means:** Explain what the current or proposed code does without jargon.
3. **Why it exists:** Give the real motivation or one concrete scenario where it matters.
4. **Recommendation:** Say `keep`, `remove`, `simplify`, `change`, or `defer`, followed by the reason and main trade-off.
5. **Question:** Ask for one explicit choice.

Before the first question, read [references/interview-guide.md](references/interview-guide.md). Follow its do/don't rules and examples throughout the interview, especially when the user asks for clarification or changes an earlier answer.

Lead with the simple explanation. Mention files and symbols afterward only when they help the user verify the claim. Prefer a yes/no or small mutually exclusive choice when that fully represents the decision.

Make an independent recommendation based on the smallest coherent behavior, not on what the PR already contains. Recommend removal or deferral when a component has no required job. Recommend keeping complexity when removing it would violate an agreed contract. Surface caveats and disagreement instead of optimizing for agreement.

## Handle each answer

- When the user says `yes` or `agree`, bind that answer to the recommendation, record it in one sentence, and move to the next decision.
- When the user asks for an explanation, answer only that clarification, use a concrete example, and repeat the same single question. Do not count it as decided.
- When the answer is ambiguous, clarify the same decision rather than advancing.
- When the user delegates with “you decide,” adopt the recommendation, state the resulting choice, and continue.
- When an answer changes an earlier decision, update the earlier record and revisit only decisions whose consequences actually changed.
- When the user asks how many remain, give the current count, then continue with the pending decision.
- When a newly discovered consequence requires another choice, add it visibly. Never hide it inside the eventual plan.

After every resolved choice, emit a short `Recorded:` sentence. This creates a durable conversational ledger and makes mistaken interpretations easy to correct.

## Lock the scope

After the last decision, summarize:

- the agreed behavior contract;
- keep, remove, simplify, change, and defer decisions;
- explicit non-goals;
- unresolved risks or assumptions;
- required verification.

Ask one final question: whether this scope lock is correct. Do not write or edit a plan while any material decision remains unresolved unless the user explicitly asks the agent to choose it.

Use [assets/scope-lock-template.md](assets/scope-lock-template.md) for the final handoff. Adapt it to the task and omit empty optional sections, but preserve the distinction between agreed work, rejected work, and unresolved work.

Once confirmed, produce a plan-ready decision brief or use the requested planning skill. Every plan item must trace to an agreed decision. Do not silently restore rejected work, add “nice-to-haves,” broaden cleanup, or treat implementation convenience as product scope.
