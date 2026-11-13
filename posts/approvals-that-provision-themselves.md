> ✏️ Draft — written as a starting point. Rewrite it in your own words, add real numbers, then set `"draft": false` in `posts.json`.

Requesting access to a cloud resource used to look like this: fill a form, wait for someone to read it, wait for someone else to approve it, wait for a third person to actually grant it. Days, sometimes. And once granted, the access quietly stayed forever.

We rebuilt it in three phases. Each one shipped value on its own.

## Phase 1 — Forms that know things

The first win was a form that fills itself. Instead of typing a resource name from memory, people pick from live dropdowns fed by the cloud provider itself: subscriptions, resource groups, roles. Fewer typos, fewer back-and-forth comments.

## Phase 2 — A workflow, not a ticket

Next, the request became a proper workflow: **Submitted → Approval → Provisioning → Completed** (or Rejected). Approvers get notified where they already work, see exactly what's being asked, and approve in one click.

One small rule made a big difference: **you can't approve your own request.** Obvious in hindsight; easy to forget in code.

## Phase 3 — Approval *is* provisioning

The final step removed the human who copies settings from the ticket into the cloud console. When the approver signs off, the system grants the role assignment directly.

The part I'm proudest of is what we *didn't* build: a powerful service account holding standing permissions. Instead, the grant happens through the **approver's own sign-in**, so the system can only do what that approver is already allowed to do. Two checks guard every grant:

1. Is this person really the approver of this request?
2. Does the cloud provider agree they're allowed to grant this role?

## Taking access away again

Access that never expires is the real risk. Every grant now has an end date, a sweeper revokes expired access automatically, and a Revoke button exists for the "oops" moments. All of it lands in the audit log.

## What I learned

- Ship in phases that are each useful on their own — nobody waited for phase 3 to get value.
- Least privilege is a design decision, not a configuration setting.
- The best automation is boring: predictable, logged, reversible.
