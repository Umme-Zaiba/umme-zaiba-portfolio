> ✏️ Draft — written as a starting point. Rewrite it in your own words, add real numbers, then set `"draft": false` in `posts.json`.

Most enterprise software isn't hard because of any single feature. It's hard because every customer believes their process is unique — and they're usually right.

I spent the last stretch of my work helping a case-management platform get ready for real teams. Here's what stuck with me.

## 1. Onboarding is the product

The first version asked new teams to configure *everything* before they could create a single case: case types, statuses, roles, forms, notifications. It was powerful and completely terrifying.

We flipped it. Start with sensible defaults, let people create their first case in minutes, and reveal configuration **when they need it**, not before. Setup time dropped dramatically, and support questions changed from *"how do I start?"* to *"how do I customise this?"* — a much better problem.

## 2. "Make it generic" is a trap and a superpower

Every feature request arrives wearing a specific costume: *"we need a DevOps access form"*. The tempting move is to build exactly that. The better move is to ask what shape the problem really has — a form, a few dynamic fields, an approval step — and build the shape.

But generic has a cost. Too generic and nobody can find the button. My rule of thumb now:

- Build the specific thing **once**.
- Build it again for the second customer and notice what changed.
- Only on the third, extract the generic version.

## 3. Workflows need an escape hatch

Configurable workflow engines are wonderful until a case needs to go somewhere the diagram didn't imagine. We learned to always ship a manual override — with an audit trail — alongside the automated path. People trust automation more when they know they can step around it.

## 4. Measure the boring things

The most useful metrics weren't fancy: time to first case, number of support tickets per new team, and how often people abandoned the setup screen. Boring numbers, very honest feedback.

## What I'd do differently

I'd write the "first ten minutes" user journey **before** writing any backend code. Almost every big rework we did traced back to a first-run experience we hadn't designed.

---

*If you're building something similar, I'd love to compare notes — say hi.*
