> ✏️ Draft — written as a starting point. Rewrite it in your own words, add real numbers, then set `"draft": false` in `posts.json`.

Adding AI to a product is easy. Adding AI that people don't immediately switch off is not.

We built inline suggestions — grey "ghost text" that appears as you type and that you accept with a single key. Here's what decided whether people kept it.

## Latency is the whole feature

A suggestion that shows up after you've already typed the sentence is worse than no suggestion — it's a distraction. We set a budget and designed backwards from it:

- **Stream** tokens as they arrive instead of waiting for the full answer.
- **Debounce** keystrokes so we don't fire a request for every letter.
- **Cancel** in-flight requests the moment the user keeps typing.

## Pick the model for the job, not the leaderboard

Our first instinct was to use the smartest model available. For short, inline completions, a big reasoning model was too slow and occasionally spent its whole budget "thinking" before writing anything. A smaller, faster model with a tight prompt won easily. Save the heavyweight models for tasks where people expect to wait.

## Restraint beats cleverness

The most important feature was knowing **when to stay quiet**:

- No suggestion when confidence is low.
- No suggestion inside fields where the user is clearly copying data.
- Never overwrite what they typed — suggestions only ever *append*.

## Make it feel like the product, not a plugin

Suggestions use the same tone, terms and formatting as the rest of the app, because the prompt includes that context. When AI writes like your product, people stop noticing it's AI — which is the point.

## What I'd measure next time

Acceptance rate is the obvious number, but the honest one is **"accepted and not edited afterwards."** That's when you know the suggestion was actually right.
