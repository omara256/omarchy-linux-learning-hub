#!/usr/bin/env bash
# Omarchy Linux Learning Hub - Daily Habit Notification
# Sends a desktop notification if today's study tasks are waiting.

set -euo pipefail

PROGRESS_FILE="${HOME}/.config/omarchy/linux-learning/progress.json"

TODAY=$(date +%Y-%m-%d)
STREAK=1
COMPLETED_COUNT=0

if [ -f "$PROGRESS_FILE" ]; then
  LAST_DATE=$(jq -r '.lastActiveDate // ""' "$PROGRESS_FILE" 2>/dev/null || echo "")
  STREAK=$(jq -r '.streak // 1' "$PROGRESS_FILE" 2>/dev/null || echo "1")
  
  if [ "$LAST_DATE" = "$TODAY" ]; then
    # Already studied today!
    exit 0
  fi
fi

if command -v notify-send >/dev/null 2>&1; then
  notify-send \
    -a "Linux Learning Hub" \
    -i "system-help" \
    -u normal \
    "🐧 Linux Learning Hub • Daily Focus" \
    "Keep your 🔥 ${STREAK}-day streak alive! Today's Linux study tasks are waiting on your top bar."
fi
