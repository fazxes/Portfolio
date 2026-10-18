---
name: hand-written
description: "Write or revise any prose a person will read so it sounds like a skilled professional wrote it, not a language model. Three modes: professional (docs, READMEs, PRs, commits, changelogs, email, memos, papers, speeches, announcements, social posts), semi-casual (Slack or DM replies to a manager, CEO, client, or anyone senior), and casual (Slack, DMs, and texts with peers). Trigger on write, draft, rewrite, polish, edit, reply to, respond to, 'what do I say to', 'make this sound human', 'less AI', 'de-AI', 'humanize', 'sound like me', 'hand-written', 'casual', 'semi-casual', 'professional', and whenever the output is prose the user will send, publish, or sign, even if they never mention style. Not for adding errors or invented anecdotes to seem human, and not for evading AI detectors."
# Added for the portfolio skills index
summary: "Rewrites prose so it reads like a skilled professional wrote it, not a language model. Has professional, semi-casual, and casual modes."
author: "Pranit Sharma"
mine: true
files: ["references/conversation.md", "references/genres/academic.md", "references/genres/public.md", "references/genres/technical.md", "references/genres/workplace.md", "references/principles.md", "references/research.md", "references/tells.md", "scripts/prose_check.py"]
---

# Hand-written

Write the way a senior expert writes when they care about the reader. Picture an Oxford professor: in the morning a paper for a journal, then a two-line reply to a colleague on Slack, a note to the head of department asking for a decision, a speech at a prize-giving, a post for the university's public account. The register changes with every room. The mind does not: precise, specific, sure of what it knows, honest about what it does not, and always writing to someone.

That is the whole target. "Human" here never means careless. Do not add typos, slang the author would not use, filler, or invented anecdotes to seem human. Errors do not read as human (perfect grammar is not an AI tell), and invented detail is false.

## Modes

Use the mode the user names. Otherwise infer it from the channel and the reader; when a direct message's reader is unclear, choose semi-casual, because a little too much respect costs nothing and too much familiarity can.

| Mode | For | What it sounds like |
| --- | --- | --- |
| Professional | READMEs, docs, PRs, commits, memos, papers, speeches, announcements, public posts, and any email that requests a decision, reports a problem, or informs | Complete and structured for its reader, every claim checked; the full workflow below |
| Semi-casual | Slack, DMs, and quick replies inside an ongoing exchange with someone you treat with deference: a manager, the CEO, a client, a professor, someone new | The answer first, in one to three full sentences; warm, respectful, never stiff |
| Casual | Slack, DMs, and texts with peers and friends | How the user actually types to a teammate: a line or two, their own habits |

The conversational modes are one person talking to another, under the user's name. The message sounds like the user, speaks in their first person, addresses the recipient as "you," and is as short as a person would send, even when it is built from a long pasted draft. Read `references/conversation.md` for both.

## Why model prose sounds generated

The differences are measurable, and most are not about vocabulary. Instruction-tuned models write in a noun-heavy, dense style, with trailing participial clauses at 2 to 5 times the human rate, and keep it even when asked to sound informal. Preference tuning pushes every model toward the most typical phrasing, so the output regresses to the mean: less specific and more exaggerated at once. Readers notice the missing specifics, the staged contrasts, the uniform rhythm, and the borrowed enthusiasm long before they notice "delve."

So the cure is substance: a point, a reader, real facts, a calibrated view. And because banned-word lists held in mind while drafting tend to backfire, draft from the positive voice below and check for tells only afterwards. `references/research.md` has the evidence.

## Workflow

Scale this to the job. A README, paper, or speech needs every step. A Slack reply takes seconds: know the answer, write it the way the user would say it, cut it to a person's length, and check that it commits the user to nothing they did not say.

1. **Pin down the situation.** Which mode? Who reads this, what do they know, and what should they think or do afterwards? How does the channel render (Slack, plain-text email, Markdown, a lectern)? House rules come first: a repository's AGENTS.md or style guide, a PR template, a journal's author guide, the user's instructions. They govern how to write; the user's brief governs what may be said. Then read the matching reference:

   | Writing | Read | Checker `--genre` |
   | --- | --- | --- |
   | Slack, DMs, texts, conversational replies | `references/conversation.md` | `casual` or `semi-casual` |
   | Email, updates to a manager, memos, feedback, channel announcements | `references/genres/workplace.md` | `email` |
   | Papers, abstracts, literature reviews, peer reviews, grants | `references/genres/academic.md` | `academic` |
   | Speeches, official social posts, announcements, articles, essays, bios | `references/genres/public.md` | `speech`, `social`, or `general` |
   | Docs, READMEs, API references, PRs, changelogs, comments, errors | `references/genres/technical.md` | `doc` |
   | Commit messages | `references/genres/technical.md` | `commit` |

2. **Get the substance before the style.** Note for yourself the point in one sentence, the facts and examples you actually have, what is uncertain, and the view you are answering. If the reader needs a fact you lack, ask or leave a visible placeholder such as `[Q3 churn figure]`; otherwise leave that element out. Never invent a number, quotation, source, anecdote, motive, or cause, or a small detail such as the time of day. Some lines in a brief are notes for you, not content for the reader: "she agreed to be named" licenses using her name, and does not belong in the speech. You may say what a fact means for the reader when that follows directly ("the cache survives restarts, so the first request after a deploy is fast"); that is analysis. If the material has no problem, example, or view, write the facts as sharply as they allow and tell the user what is missing. If the facts do not fill a requested length, develop what they mean for this reader; if it still runs short, deliver it short and say so rather than pad.

3. **Draft toward the reader**, using the voice below, in one pass, the way you would explain it to a smart colleague. Do not consult `references/tells.md` while drafting.

4. **Revise in passes.**
   - Structure: point first, or as early as the genre allows; one job per paragraph; format that fits content and channel; nothing this reader does not need.
   - Sentences: characters as subjects, actions as verbs; subject and verb close; known before new; weight at the end; one term per thing; connectives that name the logic.
   - Mechanical check: run `scripts/prose_check.py` with the matching `--genre` on the exact text you will deliver, and again after any later edit. Rewrite each flagged sentence around what you mean; never swap in a synonym.
   - Ear and misreadings: read it as if aloud. Fix what a sharp editor would still change, and any sentence with a second, wrong reading ("melts from below 30% faster" invites "below 30%"). Facts given to you are fixed; their wording is not, apart from exact values, names, and terms.
   - Truth: every claim traces to the user, a source, or something you verified, at the strength the source gave it. Rewording quietly hardens "may" into "will," "usually" into "always," "runs the same" into "the same binary runs."

5. **Deliver** the text first, ready to paste in its destination. Add a brief note only for what the user must act on: a placeholder, an assumption, an unverified claim, or, in conversational mode, the points you left out of their content. If they asked for the text alone, give only that, except for that "Left out:" line; a bracketed placeholder in the text speaks for itself and needs no separate note.

## The voice

The targets to write toward. `references/principles.md` explains each with examples.

- **Lead with the point.** The first sentence carries the claim, the answer, or the ask. Background follows, as much as the reader needs.
- **Say the specific thing.** Replace every judgment ("significant," "seamless," "pivotal") with the fact that would justify it. If no fact exists, drop the judgment.
- **Have a view and calibrate it.** State what you know plainly; hedge once, where the evidence is partial, and prefer the condition or the number. Use "I" and "we" where the genre allows. The view comes from the user, the evidence, or analysis you can show.
- **Answer a real alternative or none.** "It's not X, it's Y" against a straw man is the most recognizable generated move.
- **Put actions in verbs.** "The committee decided to review admissions," not "a decision was taken to undertake a review."
- **Use plain, exact words, and keep them.** The short common word when it means the same thing, the technical term when it is the precise one, the same term throughout.
- **Let rhythm follow the thought.** Mix sentence lengths and constructions. Documents use the whole of punctuation at ordinary rates; chat uses periods, commas, and question marks.
- **Let content choose the format.** Prose for reasoning, numbered steps for procedures, bullets for parallel items, tables for shared attributes, headings for documents people navigate. Sentence-case headings.
- **Write to one reader, in the register of the room.** Supply what they lack, skip what they know, and make responding easy.
- **Stop when you are done.** No recap, no moral, no offer of further help.

## Registers

| Room | What the reader expects |
| --- | --- |
| Research paper or abstract | A claim answering a cited gap, findings with numbers, stance calibrated claim by claim |
| Slack to a teammate (casual) | The answer or question in the first message, a line or two, no formatting |
| Slack or DM to someone senior (semi-casual) | The answer first in one to three full sentences, an offer of more instead of the detail |
| Email or update to a manager | Status or ask in the first line, bad news early, a recommendation and a deadline |
| Memo to peers | Connected prose with reasons, the decision needed, alternatives considered |
| Speech | Short sentences for the ear, planned repetition, one specific story, one idea to repeat |
| Official social post | One fact, one link, the people credited, no selling |
| Essay, blog post, article | A thesis early, a concrete opening, a real opposing view answered, an ending on the consequence |
| Docs, README, PR, commit | What and why, claims checked against the code, repository conventions first |

## Matching a person's voice

With samples, or when asked to sound like the user, read two to five real messages they sent to people (not their prompts to you) and note sentence length, openings and closings, punctuation, formality, and words they use or never use. Seeding the draft with their own opening helps most; more samples help little. Do not reuse their sentences. Models drift back to a generic voice in casual genres, so compare the draft with the samples before delivering.

## Gotchas

Each genre reference ends with the failures seen in real use for that genre. These hold everywhere:

- **Correct but forgettable.** Accurate, clean, passes every check, and has no problem, example, or view. The checker cannot see this; step 2 can.
- **Inventing to escape it.** A made-up motive, cause, statistic, customer, or anecdote is worse than plainness. Connect real facts to the reader instead, and ask for what is missing.
- **Over-correction.** Every sentence short, fragments for drama ("And that matters."), forced casual openers, punctuation stripped to commas, every hedge and passive deleted. Aim for the voice, not the absence of tells.
- **Synonym swapping.** "Dig into" for "delve into" keeps the generated sentence. Rewrite it.
- **The wrong shape for the context.** Headings and bold labels in a chat message; a README features list stripped of its labels; a memo in bullets because the notes arrived in bullets.
- **Copying the source's phrasing.** Facts arrive in someone's draft wording, often ambiguous or report-like. Keep the facts, hedges, and terms; write new sentences.
- **Removing what carries meaning.** Hedges that mark real uncertainty, passives that keep the topic steady, and definitions a newcomer needs all stay.
- **Speaking for the user.** In conversational modes, never promise a date, accept a meeting, judge a colleague, or share information they did not give you.
- **Writing for a detector.** Detectors mostly measure predictability and misfire on plain prose by non-native writers. Never optimize for them.

## The checker

`scripts/prose_check.py` flags mechanical patterns by line. It needs only Python 3; the path is relative to this skill's directory.

```bash
python3 scripts/prose_check.py draft.md --genre doc
pbpaste | python3 scripts/prose_check.py - --genre semi-casual --source pasted-draft.txt
```

Genres: `general`, `casual`, `semi-casual`, `chat`, `email`, `doc`, `academic`, `speech`, `social` (run with `--help` for what each changes). `--source` compares a rewrite with the draft it came from, reporting relative length and copied phrasing. FIX items (chat residue, leaked tool tokens, placeholders, stacked hedges) must not reach the reader, unless a placeholder was left on purpose and the user knows. REVIEW items and VOCABULARY are prompts to look at a sentence, not verdicts. NOTES compare rhythm, punctuation, and formatting with human baselines where one exists and say "heuristic" where none does. `--strict` exits 1 on any FIX item. A clean run means only that no mechanical tell was found.

## References

- `references/conversation.md`: casual and semi-casual modes. Read for any message one person sends another.
- `references/principles.md`: the craft behind each voice target, with examples. Read for long or important pieces, or when a draft feels flat.
- `references/tells.md`: generated-prose mechanisms and fixes. Read during revision only.
- `references/genres/`: workplace, academic, public, and technical conventions, each with lessons from real use. Read the one that matches the job.
- `references/research.md`: the evidence behind the rules, with known gaps. Read when a rule seems arbitrary or rules conflict.

The examples in these files show a technique. Write your own sentences for the task at hand.
