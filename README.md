# Linux Learning Hub

An interactive learning and daily task tracking bar widget designed for Omarchy Linux and Quickshell.

## Highlights

- **Three Dedicated Learning Tracks**:
  - **Linux Core**: Filesystem layout, bash navigation, process management, file permissions, and core utilities.
  - **System Administration**: Systemd services, user management, package operations, storage management, and networking.
  - **Cyber Security**: SSH hardening, firewall rules (UFW/nftables), auditing, PAM configurations, and encryption basics.
- **Top Bar Integration**: Sits right on the Omarchy panel with an indicator showing real-time learning progress.
- **Interactive Checklists**: Mark topics complete as you learn; progress is saved automatically across reboots.
- **Instant Search**: Quick keyboard-driven search across commands, topics, and descriptions.
- **One-Click Command Copy**: Quickly copy relevant terminal commands directly to your clipboard.

## Directory Structure

```
├── Curriculum.js   # Curriculum definitions, tracks, tasks, and commands
├── Panel.qml       # Quickshell UI widget and bar button logic
├── manifest.json   # Omarchy plugin manifest and metadata
├── README.md       # Project documentation
└── LICENSE         # License terms
```

## Installation

### 1. Clone into your Omarchy plugins directory

```bash
git clone https://github.com/<your-username>/linux-learning-hub.git ~/.config/omarchy/plugins/learn.linux
```

### 2. Enable in Omarchy Shell

Add `learn.linux` to your status bar in `~/.config/omarchy/shell.json` (for example, in the `centerBegin` section):

```json
{
  "bar": {
    "layout": {
      "centerBegin": [
        "learn.linux"
      ]
    }
  }
}
```

Then reload the shell:
```bash
omarchy restart shell
```

## License

MIT
