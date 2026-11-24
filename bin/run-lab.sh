#!/usr/bin/env bash
# Omarchy Linux Learning Hub - Terminal Lab Runner
# Launches the chosen practice command inside the user's terminal with an interactive shell.

set -euo pipefail

TITLE="${1:-"Linux Learning Practice"}"
CMD="${2:-"uptime"}"

# Detect installed terminal
TERMINAL_BIN=""
if [ -n "${TERMINAL:-}" ] && command -v "$TERMINAL" >/dev/null 2>&1; then
  TERMINAL_BIN="$TERMINAL"
fi

if [ -z "$TERMINAL_BIN" ]; then
  for term in foot alacritty kitty ghostty xterm; do
    if command -v "$term" >/dev/null 2>&1; then
      TERMINAL_BIN="$term"
      break
    fi
  done
fi

if [ -z "$TERMINAL_BIN" ]; then
  TERMINAL_BIN="foot"
fi

# Create a temporary runner script to ensure clean environment execution
RUNNER_SCRIPT=$(mktemp /tmp/omarchy-learn-lab-XXXXXX.sh)
cat << 'EOF' > "$RUNNER_SCRIPT"
#!/usr/bin/env bash
[ -f ~/.bashrc ] && source ~/.bashrc 2>/dev/null || true

TITLE="$1"
CMD="$2"

echo -e "\033[1;36m==============================================================\033[0m"
echo -e "\033[1;33m  🐧 Omarchy Linux Learning Lab\033[0m"
echo -e "\033[1;37m  Topic:\033[0m \033[1;34m$TITLE\033[0m"
echo -e "\033[1;36m==============================================================\033[0m"
echo -e "\033[1;32m  ➜ Suggested Command:\033[0m \033[1;37m$CMD\033[0m\n"

echo -e "\033[0;90mExecuting command in lab environment...\033[0m\n"
eval "$CMD" || true

echo -e "\n\033[1;36m--------------------------------------------------------------\033[0m"
echo -e "\033[0;92m✔ Practice command completed.\033[0m"
echo -e "\033[0;90mInteractive bash shell is ready. Practice further or exit when done.\033[0m"
echo -e "\033[1;36m--------------------------------------------------------------\033[0m\n"

# Add to history so user can press Up arrow
history -s "$CMD" 2>/dev/null || true

exec bash
EOF

chmod +x "$RUNNER_SCRIPT"

# Launch detached in terminal
case "$TERMINAL_BIN" in
  foot)
    foot --title="Linux Learning Lab - $TITLE" bash "$RUNNER_SCRIPT" "$TITLE" "$CMD" &
    ;;
  kitty)
    kitty --title "Linux Learning Lab - $TITLE" bash "$RUNNER_SCRIPT" "$TITLE" "$CMD" &
    ;;
  alacritty)
    alacritty --title "Linux Learning Lab - $TITLE" -e bash "$RUNNER_SCRIPT" "$TITLE" "$CMD" &
    ;;
  ghostty)
    ghostty --title="Linux Learning Lab - $TITLE" -e bash "$RUNNER_SCRIPT" "$TITLE" "$CMD" &
    ;;
  *)
    "$TERMINAL_BIN" -e bash "$RUNNER_SCRIPT" "$TITLE" "$CMD" &
    ;;
esac

# Clean up runner script after short delay
( sleep 3 && rm -f "$RUNNER_SCRIPT" ) &
