#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

# jq filter to extract streaming text from assistant messages
stream_text='select(.type == "assistant").message.content[]? | select(.type == "text").text // empty | gsub("\n"; "\r\n") | . + "\r\n\n"'

# jq filter to extract final result
final_result='select(.type == "result").result // empty'

for ((i=1; i<=$1; i++)); do
  tmpfile=$(mktemp)
  trap "rm -f $tmpfile" EXIT

  
claude --dangerously-skip-permissions  \
    --verbose \
    --print \
    --output-format stream-json \
    --model claude-sonnet-4-6 \
    "
You are working autonomously on the feature defined in:
docs/migration/uszkota-pl/05-plan.json

You can save/check progress in:
docs/migration/uszkota-pl/progress.txt

You have access to the following files:
- docs/migration/uszkota-pl/01-scout.md
- docs/migration/uszkota-pl/02-designer.md
- docs/migration/uszkota-pl/03-architect.md
- docs/migration/uszkota-pl/04-content.md
- docs/migration/uszkota-pl/05-plan.json
- docs/migration/uszkota-pl/assets/
- docs/migration/uszkota-pl/progress.txt

Work iteratively in small, safe steps.

────────────────────────────────────────
CORE RULES

- Work on ONE task at a time
- Each task must fit in a single commit
- Prefer small, focused changes
- Do not expand scope
- After finishing a task, ALWAYS output <promise>COMPLETE</promise> and STOP
- If ALL items in plan.json have passes: true, output <promise>COMPLETE</promise> and STOP

────────────────────────────────────────
TASK SELECTION

At each iteration:
- Choose the highest-priority unfinished work
- Favor foundations, integration points, and risky areas first
- If a task is too large, split it before coding

────────────────────────────────────────
TEST-DRIVEN WORKFLOW

- Tests define “done”
- Write a failing test first
- Use the appropriate test type:
  - design-spec tests for UI / layout
  - unit tests for logic / state
- Do NOT add end-to-end tests

For UI work:
- Use design tokens only
- Never use raw values

────────────────────────────────────────
IMPLEMENTATION

- Implement the minimum needed to pass tests
- Stop once tests pass
- Avoid refactors unless required
- Add missing shadcn primitives as needed

────────────────────────────────────────
FEEDBACK LOOPS (REQUIRED)

Before committing, all must pass:
- pnpm run typecheck
- pnpm run test or pnpm run test:visual
- pnpm run lint
- pnpm run format

────────────────────────────────────────
COMMIT & STATE UPDATE

After a successful commit:
1. Update the related task in the plan.json by changing:
  "passes": false → true
2. Append a short entry to:
  plans/tailwind-tokens/progress.txt
  Keep it concise:
  what was done, why, files touched, notes for next step.
3. If ALL items now have passes: true → output <promise>COMPLETE</promise>
   Otherwise → output <promise>COMPLETE</promise>
4. STOP immediately. Do not start another task.

────────────────────────────────────────

" \
  | grep --line-buffered '^{' \
  | tee "$tmpfile" \
  | jq --unbuffered -rj "$stream_text"

  # Check for ALL_COMPLETE (all tasks done) → exit early
  if grep -q '<promise>ALL_COMPLETE</promise>' <(jq -r "$stream_text" "$tmpfile") ||
     [[ "$(jq -r "$final_result" "$tmpfile")" == *"<promise>ALL_COMPLETE</promise>"* ]]; then
    echo "All tasks complete after $i iterations."
    exit 0
  fi

  # Check for COMPLETE (one task done) → continue to next iteration
  if grep -q '<promise>COMPLETE</promise>' <(jq -r "$stream_text" "$tmpfile") ||
     [[ "$(jq -r "$final_result" "$tmpfile")" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "Task done. Starting iteration $((i+1))..."
  else
    echo "Warning: no COMPLETE marker detected in iteration $i"
  fi
done