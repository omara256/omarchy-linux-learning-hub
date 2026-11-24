// Linux Learning Hub Curriculum
// Supports both:
// 1. 48-Day Intensive Track (Core Linux, SysAdmin, Cyber Security)
// 2. 90-Day Full Curriculum (Foundations, Scripting, SysAdmin, Networking, Hardening, Threat Hunting)

var TOPICS_48 = [
  {
    "id": "fhs_overview",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 1,
    "title": "Filesystem Hierarchy Standard (FHS)",
    "desc": "Understand standard root directories: /bin, /etc, /home, /var, /dev, /proc, /sys, /tmp and their system roles.",
    "cmd": "ls -la / && tree -L 1 / && df -h",
    "commands": [
      {
        "cmd": "tree -L 1 /",
        "desc": "Inspect root filesystem hierarchy"
      },
      {
        "cmd": "ls -lah /etc /var /usr",
        "desc": "Explore configuration, variable data, and user programs"
      },
      {
        "cmd": "df -h",
        "desc": "Check filesystem mount points and disk utilization"
      }
    ],
    "checklist": [
      "Inspect root directory layout",
      "Understand FHS standard path purposes",
      "Check mounted filesystems"
    ],
    "explainer": "ls -la: list all files + permissions | tree -L 1: limit tree depth to 1 level | df -h: human-readable disk space",
    "verifyCmd": "test -d /etc && test -d /var && test -d /proc",
    "wikiUrl": "https://wiki.archlinux.org/title/File_hierarchy_standard"
  },
  {
    "id": "shell_navigation",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 2,
    "title": "CLI Navigation & File Operations",
    "desc": "Master navigation, absolute vs relative paths, creating, copying, moving, and safely deleting files.",
    "cmd": "pwd && cd ~ && mkdir -p lab/test && cp -r lab backup && mv backup lab_bak && rm -rf lab_bak",
    "commands": [
      {
        "cmd": "pwd && cd -",
        "desc": "Print working directory and toggle between last directories"
      },
      {
        "cmd": "mkdir -p ~/lab/test && touch ~/lab/test/sample.txt",
        "desc": "Create directory hierarchy and sample file"
      },
      {
        "cmd": "cp -r ~/lab ~/lab_bak && mv ~/lab_bak ~/lab_backup && rm -rf ~/lab_backup",
        "desc": "Copy recursive, move, and cleanup"
      }
    ],
    "checklist": [
      "Navigate using relative and absolute paths",
      "Create nested directories with mkdir -p",
      "Copy, move, and safely remove test trees"
    ],
    "explainer": "mkdir -p: create parent dirs if needed | cp -r: recursive directory copy | rm -rf: force recursive remove",
    "verifyCmd": "pwd >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Core_utilities"
  },
  {
    "id": "file_viewing",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 3,
    "title": "Viewing & Paging Files (cat, less, head, tail)",
    "desc": "Inspect file contents without opening editors; use tail -f to monitor live logs and less for scrolling.",
    "cmd": "cat /etc/os-release && less /etc/services && head -n 10 /etc/passwd && tail -f /var/log/pacman.log",
    "commands": [
      {
        "cmd": "cat /etc/os-release",
        "desc": "Print system distribution details"
      },
      {
        "cmd": "head -n 10 /etc/passwd",
        "desc": "Preview first 10 accounts"
      },
      {
        "cmd": "tail -n 20 /var/log/pacman.log 2>/dev/null || tail -n 20 /var/log/messages",
        "desc": "View recent package manager log entries"
      }
    ],
    "checklist": [
      "Concatenate and view text files with cat",
      "Page through large files using less (/ to search, q to exit)",
      "Inspect beginnings and ends with head and tail"
    ],
    "explainer": "cat: print whole file | less: scrollable viewer | head -n: first N lines | tail -f: follow live appends",
    "verifyCmd": "test -r /etc/os-release",
    "wikiUrl": "https://wiki.archlinux.org/title/Core_utilities"
  },
  {
    "id": "streams_redirection",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 4,
    "title": "I/O Redirection & Pipes (stdin, stdout, stderr)",
    "desc": "Direct stdout (1), stderr (2), append (>>), pipe data (|), and discard unneeded output to /dev/null.",
    "cmd": "echo 'learning linux' > out.txt && ls /root 2> err.txt && ls -la /etc | grep conf | wc -l",
    "commands": [
      {
        "cmd": "echo 'testing stdout' > /tmp/out.txt && echo 'append' >> /tmp/out.txt",
        "desc": "Demonstrate write (>) and append (>>)"
      },
      {
        "cmd": "ls /root 2> /tmp/err.txt; cat /tmp/err.txt",
        "desc": "Redirect standard error stream (file descriptor 2)"
      },
      {
        "cmd": "ls -la /etc | grep conf | wc -l",
        "desc": "Pipe stdout through filter to line counter"
      }
    ],
    "checklist": [
      "Differentiate stdin (0), stdout (1), and stderr (2)",
      "Redirect output streams using > and >>",
      "Combine utilities using pipes (|)"
    ],
    "explainer": ">: overwrite stdout | >>: append stdout | 2>: redirect stderr | |: pipe stdout to next stdin | wc -l: count lines",
    "verifyCmd": "which grep >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Bash"
  },
  {
    "id": "text_processing_grep",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 5,
    "title": "Text Search & Regex with grep",
    "desc": "Filter text using regular expressions, recursive directory searching (-r), line numbers (-n), and inverted matches (-v).",
    "cmd": "grep -rnE 'error|failed' /var/log/ 2>/dev/null && grep -v '^#' /etc/fstab",
    "commands": [
      {
        "cmd": "grep -rnE 'error|failed' /var/log/ 2>/dev/null | head -n 15",
        "desc": "Search log tree recursively for error patterns"
      },
      {
        "cmd": "grep -v '^#' /etc/fstab | grep -v '^$'",
        "desc": "Filter out comment lines and empty lines"
      }
    ],
    "checklist": [
      "Search files recursively with grep -r",
      "Use regular expression alternation (-E pattern1|pattern2)",
      "Exclude comments and blank lines with -v"
    ],
    "explainer": "-r: recursive search | -n: print line numbers | -E: extended regex | -v: invert match (exclude)",
    "verifyCmd": "grep --version >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Core_utilities"
  },
  {
    "id": "text_processing_awk_sed",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 6,
    "title": "Stream Editing & Parsing (sed & awk)",
    "desc": "Extract specific columns with awk or cut, and perform automated search-and-replace using sed.",
    "cmd": "awk -F: '{print $1, $3}' /etc/passwd && sed -i 's/foo/bar/g' file.txt && cut -d: -f1 /etc/group",
    "commands": [
      {
        "cmd": "awk -F: '{print $1, $3}' /etc/passwd | head -n 10",
        "desc": "Extract username and UID using awk delimiter"
      },
      {
        "cmd": "cut -d: -f1 /etc/group | head -n 10",
        "desc": "Extract first column using cut"
      },
      {
        "cmd": "echo 'hello world' | sed 's/world/linux/'",
        "desc": "Stream replace string using sed"
      }
    ],
    "checklist": [
      "Extract specific fields with awk -F",
      "Stream edit and replace patterns with sed",
      "Extract tabular fields with cut"
    ],
    "explainer": "awk -F:: split on colon delimiter | sed s/.../.../g: substitution | cut -d: -f1: column 1",
    "verifyCmd": "which awk && which sed",
    "wikiUrl": "https://wiki.archlinux.org/title/Core_utilities"
  },
  {
    "id": "permissions_basic",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 7,
    "title": "File Permissions & Ownership (chmod & chown)",
    "desc": "Master User, Group, Others permissions (r=4, w=2, x=1), octal modes, changing ownership, and default umask.",
    "cmd": "chmod 755 script.sh && chmod u=rwx,go=rx script.sh && chown $USER:$USER file.txt && umask",
    "commands": [
      {
        "cmd": "touch /tmp/perm_test.txt && ls -l /tmp/perm_test.txt",
        "desc": "Inspect default file permissions and ownership"
      },
      {
        "cmd": "chmod 644 /tmp/perm_test.txt && chmod 755 /tmp/perm_test.txt",
        "desc": "Change permission octal bits (rw-r--r-- to rwxr-xr-x)"
      },
      {
        "cmd": "umask",
        "desc": "Query current shell default umask"
      }
    ],
    "checklist": [
      "Calculate permission bits (r=4, w=2, x=1)",
      "Change permissions with chmod in numeric and symbolic forms",
      "Understand umask default mask calculation"
    ],
    "explainer": "755: rwx for owner, rx for group & others | chown: change user/group owner | umask: default permission filter",
    "verifyCmd": "umask >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/File_permissions_and_attributes"
  },
  {
    "id": "permissions_special",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 8,
    "title": "Special Bits: SUID, SGID & Sticky Bit",
    "desc": "SUID (run as file owner), SGID (inherit directory group), and Sticky Bit (prevent deleting others files).",
    "cmd": "chmod u+s /path/binary && chmod g+s /shared/dir && chmod +t /tmp/shared && ls -ld /tmp",
    "commands": [
      {
        "cmd": "ls -ld /tmp",
        "desc": "Inspect sticky bit (t) on shared temporary directory"
      },
      {
        "cmd": "find /usr/bin -perm -4000 2>/dev/null | head -n 10",
        "desc": "Audit binaries with SUID bit (e.g. passwd, sudo)"
      }
    ],
    "checklist": [
      "Identify SUID bit on executables (rws)",
      "Understand SGID bit behavior on directories",
      "Inspect Sticky Bit on /tmp"
    ],
    "explainer": "u+s: SUID (run as file owner) | g+s: SGID (inherit directory group) | +t: Sticky bit (only owner can delete)",
    "verifyCmd": "find /tmp -maxdepth 0 -perm -1000 >/dev/null 2>&1",
    "wikiUrl": "https://wiki.archlinux.org/title/File_permissions_and_attributes"
  },
  {
    "id": "links_and_inodes",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 9,
    "title": "Hard Links vs Soft (Symbolic) Links & Inodes",
    "desc": "Learn differences between pointer symlinks and direct inode hard links; verify inode numbers with ls -i.",
    "cmd": "ln -s /etc/issue link.txt && ln target.txt hardlink.txt && ls -li && stat link.txt",
    "commands": [
      {
        "cmd": "ln -s /etc/os-release /tmp/os_symlink && ls -li /tmp/os_symlink",
        "desc": "Create symbolic link and inspect inode"
      },
      {
        "cmd": "stat /tmp/os_symlink",
        "desc": "Query metadata and target path with stat"
      }
    ],
    "checklist": [
      "Create symbolic links using ln -s",
      "Differentiate hard links (same inode) vs symlinks (new inode)",
      "Inspect inodes using ls -i and stat"
    ],
    "explainer": "ln -s: create symbolic pointer link | ln: hard link to same inode | ls -i: print inode number",
    "verifyCmd": "which stat >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Core_utilities"
  },
  {
    "id": "find_and_locate",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 10,
    "title": "Filesystem Search (find & which)",
    "desc": "Search filesystems by name, modification time, file size, permissions, and locate executable binaries.",
    "cmd": "find /etc -name '*.conf' 2>/dev/null && find . -type f -mmin -60 && which bash",
    "commands": [
      {
        "cmd": "find /etc -name '*.conf' 2>/dev/null | head -n 15",
        "desc": "Find all configuration files under /etc"
      },
      {
        "cmd": "find ~ -maxdepth 2 -type f -size +1M 2>/dev/null",
        "desc": "Find files larger than 1MB in home"
      },
      {
        "cmd": "which bash foot grep",
        "desc": "Locate executable paths in current PATH"
      }
    ],
    "checklist": [
      "Search by name patterns with find -name",
      "Filter by type (-type f, -type d) and size (-size +10M)",
      "Locate binaries with which"
    ],
    "explainer": "-name: match pattern | -type f: regular files | -mmin -60: modified in last 60 mins | which: locate binary",
    "verifyCmd": "which find >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Core_utilities"
  },
  {
    "id": "archives_compression",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 11,
    "title": "Archiving & Compression (tar, gzip, xz)",
    "desc": "Create, view, and extract compressed tarballs with gzip (.tar.gz), bzip2 (.tar.bz2), and xz (.tar.xz).",
    "cmd": "tar -czvf backup.tar.gz /folder && tar -xzvf backup.tar.gz && tar -tvf backup.tar.gz",
    "commands": [
      {
        "cmd": "mkdir -p /tmp/arch_test && echo 'data' > /tmp/arch_test/a.txt",
        "desc": "Prepare test archive directory"
      },
      {
        "cmd": "tar -czvf /tmp/test.tar.gz -C /tmp arch_test",
        "desc": "Create compressed tarball with gzip (-z)"
      },
      {
        "cmd": "tar -tvf /tmp/test.tar.gz",
        "desc": "List archive table of contents without extracting"
      }
    ],
    "checklist": [
      "Create tar archives with -c",
      "Compress using gzip (-z) and xz (-J)",
      "List archive contents with -t and extract with -x"
    ],
    "explainer": "-c: create | -x: extract | -t: list table of contents | -z: gzip | -v: verbose | -f: file",
    "verifyCmd": "which tar && which gzip",
    "wikiUrl": "https://wiki.archlinux.org/title/Core_utilities"
  },
  {
    "id": "process_management",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 12,
    "title": "Process Inspection & Signals (ps, top, kill)",
    "desc": "Inspect the process tree, monitor CPU/RAM consumption, and send signals (SIGTERM 15, SIGKILL 9, SIGHUP 1).",
    "cmd": "ps aux | grep bash && pgrep -l foot && kill -15 <PID> && killall -9 bad_process",
    "commands": [
      {
        "cmd": "ps aux --sort=-%mem | head -n 10",
        "desc": "List top 10 memory-consuming processes"
      },
      {
        "cmd": "pgrep -a foot || pgrep -a bash",
        "desc": "Find process IDs and command lines with pgrep"
      },
      {
        "cmd": "kill -l",
        "desc": "List all standard POSIX signals and their numbers"
      }
    ],
    "checklist": [
      "Inspect active processes with ps aux",
      "Identify PIDs with pgrep and pidof",
      "Send signals cleanly (SIGTERM 15 vs SIGKILL 9)"
    ],
    "explainer": "ps aux: all running processes | pgrep: search PID by name | kill -15: SIGTERM (clean exit) | -9: SIGKILL",
    "verifyCmd": "pgrep -l bash >/dev/null 2>&1 || true",
    "wikiUrl": "https://wiki.archlinux.org/title/Core_utilities"
  },
  {
    "id": "job_control",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 13,
    "title": "Job Control & Sessions (bg, fg, jobs, nohup)",
    "desc": "Send jobs to background (&), resume in foreground (fg), pause with Ctrl+Z, and detach jobs with nohup and tmux.",
    "cmd": "sleep 100 & && jobs -l && fg %1 && nohup ./long_task.sh > output.log 2>&1 &",
    "commands": [
      {
        "cmd": "sleep 30 & jobs -l",
        "desc": "Launch background job and list active jobs with PID"
      },
      {
        "cmd": "kill %1 2>/dev/null || true",
        "desc": "Terminate job by job specifier number"
      }
    ],
    "checklist": [
      "Send processes to background with &",
      "Suspend with Ctrl+Z and resume with bg / fg",
      "Inspect active shell jobs with jobs -l"
    ],
    "explainer": "&: run in background | jobs -l: list background jobs with PID | fg %1: bring to foreground | nohup: immune to hangups",
    "verifyCmd": "which nohup >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Bash"
  },
  {
    "id": "env_and_profiles",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 14,
    "title": "Environment Variables & Shell Configuration",
    "desc": "Manage persistent environment variables, modify PATH, create shell aliases, and inspect ~/.bashrc.",
    "cmd": "echo $PATH && export EDITOR=nano && env && cat ~/.bashrc",
    "commands": [
      {
        "cmd": "echo 'Current Shell: '$SHELL', User: '$USER', Path: '$PATH",
        "desc": "Print essential environment variables"
      },
      {
        "cmd": "export PRACTICE_VAR='linux_mastery' && env | grep PRACTICE_VAR",
        "desc": "Export environment variable and verify in env"
      }
    ],
    "checklist": [
      "Inspect environment variables with env and printenv",
      "Export variables with export KEY=value",
      "Configure shell startup files (~/.bashrc)"
    ],
    "explainer": "export: export variable to child processes | env: print all environment vars | ~/.bashrc: interactive shell config",
    "verifyCmd": "test -n \"$SHELL\"",
    "wikiUrl": "https://wiki.archlinux.org/title/Environment_variables"
  },
  {
    "id": "bash_scripting_basics",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 15,
    "title": "Shell Scripting: Variables & Control Flow",
    "desc": "Write shell scripts with variables, conditionals (if/then/elif/else), loops (for, while), and exit codes ($?).",
    "cmd": "for f in *.txt; do [ -f \"$f\" ] && echo \"Found $f\"; done; echo \"Status: $?\"",
    "commands": [
      {
        "cmd": "bash -c 'for i in 1 2 3; do echo \"Step $i\"; done'",
        "desc": "Test loop syntax in bash subshell"
      },
      {
        "cmd": "bash -c 'if [ -d /etc ]; then echo \"/etc exists\"; fi; echo \"Exit: $?\"'",
        "desc": "Evaluate test condition and verify exit status ($?)"
      }
    ],
    "checklist": [
      "Write for loops and while loops",
      "Use test conditions [ -f ], [ -d ], [ -z ]",
      "Check exit status code with $?"
    ],
    "explainer": "for ... in ...; do ... done: iteration loop | [ -f ]: test regular file | $?: exit status of last command",
    "verifyCmd": "test -x /bin/bash",
    "wikiUrl": "https://wiki.archlinux.org/title/Bash"
  },
  {
    "id": "kernel_modules_hardware",
    "track": "linux",
    "trackName": "Linux Core",
    "day": 16,
    "title": "Kernel Information & Hardware Drivers",
    "desc": "Inspect running kernel release, load/unload kernel modules with modprobe, and query PCI/USB buses.",
    "cmd": "uname -a && lsmod && modinfo ext4 && lspci && lsusb && dmesg -T | grep -i error",
    "commands": [
      {
        "cmd": "uname -r -m -o",
        "desc": "Print kernel release, architecture, and OS name"
      },
      {
        "cmd": "lsmod | head -n 10",
        "desc": "List currently loaded kernel modules"
      },
      {
        "cmd": "lspci 2>/dev/null | head -n 8 || lsusb 2>/dev/null",
        "desc": "Query PCI or USB devices"
      }
    ],
    "checklist": [
      "Check kernel version with uname -r",
      "List loaded drivers with lsmod",
      "Inspect kernel ring buffer logs with dmesg"
    ],
    "explainer": "uname -a: kernel version & arch | lsmod: list loaded modules | modinfo: module metadata | dmesg -T: kernel buffer",
    "verifyCmd": "uname -r >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Kernel_module"
  },
  {
    "id": "systemd_service_control",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 17,
    "title": "systemd Service Management",
    "desc": "Control system services: start, stop, restart, reload, and enable daemons to start on boot.",
    "cmd": "systemctl status sshd && sudo systemctl restart sshd && sudo systemctl enable --now sshd",
    "commands": [
      {
        "cmd": "systemctl is-active dbus",
        "desc": "Query active state of core daemon"
      },
      {
        "cmd": "systemctl list-units --type=service --state=running | head -n 15",
        "desc": "List all currently running system services"
      }
    ],
    "checklist": [
      "Check unit status with systemctl status",
      "Enable and disable boot startup (--now flag)",
      "Inspect failed units with systemctl --failed"
    ],
    "explainer": "systemctl status: inspect service health | start/stop/restart: manage daemon lifecycle | enable --now: enable at boot & start immediately",
    "verifyCmd": "systemctl is-active --quiet dbus",
    "wikiUrl": "https://wiki.archlinux.org/title/Systemd"
  },
  {
    "id": "systemd_custom_unit",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 18,
    "title": "Writing Custom systemd Services",
    "desc": "Write unit files with [Unit], [Service] (ExecStart, Restart=always, User=), and [Install] sections.",
    "cmd": "sudo systemctl edit --full myapp.service && sudo systemctl daemon-reload && systemctl is-active myapp",
    "commands": [
      {
        "cmd": "systemctl cat dbus.service | head -n 20",
        "desc": "Inspect anatomy of a real systemd service unit file"
      },
      {
        "cmd": "ls -la /etc/systemd/system/",
        "desc": "Examine local administrator unit overrides and services"
      }
    ],
    "checklist": [
      "Understand [Unit], [Service], and [Install] sections",
      "Set ExecStart, Restart, and User directives",
      "Reload manager configuration with daemon-reload"
    ],
    "explainer": "[Unit]: Description & dependencies | [Service]: ExecStart & run parameters | [Install]: WantedBy=multi-user.target",
    "verifyCmd": "test -d /etc/systemd/system",
    "wikiUrl": "https://wiki.archlinux.org/title/Systemd#Writing_unit_files"
  },
  {
    "id": "journalctl_logging",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 19,
    "title": "Log Analysis with journalctl",
    "desc": "Filter systemd logs by unit, current boot session, severity priority level, and time intervals.",
    "cmd": "journalctl -u sshd -f && journalctl -b -p err && journalctl --since '30m ago'",
    "commands": [
      {
        "cmd": "journalctl -b 0 -p err..emerg | head -n 20",
        "desc": "List all error and emergency entries for current boot"
      },
      {
        "cmd": "journalctl --since '1 hour ago' --no-pager | tail -n 20",
        "desc": "Query recent log events without pager"
      }
    ],
    "checklist": [
      "Filter by current boot session with -b",
      "Filter by priority level with -p err",
      "Inspect service specific logs with -u unit"
    ],
    "explainer": "-u: filter by service unit | -b: current boot session | -p err: error level priority | -f: live follow stream",
    "verifyCmd": "journalctl -n 1 >/dev/null 2>&1",
    "wikiUrl": "https://wiki.archlinux.org/title/Systemd/Journal"
  },
  {
    "id": "cron_and_timers",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 20,
    "title": "Automated Scheduling (Cron & systemd Timers)",
    "desc": "Schedule automated recurring tasks using crontab syntax (* * * * *) and systemd timer units.",
    "cmd": "crontab -e && crontab -l && systemctl list-timers --all",
    "commands": [
      {
        "cmd": "systemctl list-timers --all",
        "desc": "List all scheduled systemd timers, triggers, and next run times"
      },
      {
        "cmd": "crontab -l 2>/dev/null || echo 'No user crontab configured yet'",
        "desc": "Check current user cron schedule"
      }
    ],
    "checklist": [
      "Understand standard cron 5-field schedule format",
      "Inspect active system timers with systemctl list-timers",
      "Compare cron jobs vs systemd timer units"
    ],
    "explainer": "crontab -l: list cron jobs | crontab -e: edit jobs | systemctl list-timers: inspect systemd timer schedule",
    "verifyCmd": "systemctl list-timers >/dev/null 2>&1",
    "wikiUrl": "https://wiki.archlinux.org/title/Systemd/Timers"
  },
  {
    "id": "user_group_admin",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 21,
    "title": "User & Group Management",
    "desc": "Create users, configure home directories, assign default shells, manage group memberships, and lock accounts.",
    "cmd": "sudo useradd -m -s /bin/bash devuser && sudo usermod -aG wheel devuser && id devuser",
    "commands": [
      {
        "cmd": "id $USER",
        "desc": "Check current user UID, primary GID, and supplementary groups"
      },
      {
        "cmd": "getent group wheel 2>/dev/null || getent group sudo",
        "desc": "Inspect administrative group membership"
      }
    ],
    "checklist": [
      "Create user with useradd -m -s",
      "Append groups with usermod -aG",
      "Inspect user IDs and groups with id"
    ],
    "explainer": "useradd -m: create home directory | -s /bin/bash: set login shell | usermod -aG: append supplementary group",
    "verifyCmd": "id -u >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Users_and_groups"
  },
  {
    "id": "sudoers_configuration",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 22,
    "title": "Privilege Delegation & /etc/sudoers",
    "desc": "Safely edit sudoers with syntax validation (visudo), configure granular permissions, and use sudoers.d drop-ins.",
    "cmd": "sudo visudo && sudo -l && ls -l /etc/sudoers.d/",
    "commands": [
      {
        "cmd": "sudo -l",
        "desc": "List privileges and allowed sudo commands for current user"
      },
      {
        "cmd": "ls -la /etc/sudoers.d/",
        "desc": "Inspect drop-in configuration snippets in sudoers.d"
      }
    ],
    "checklist": [
      "Verify sudo privileges using sudo -l",
      "Understand visudo syntax verification protection",
      "Organize configurations in /etc/sudoers.d/"
    ],
    "explainer": "visudo: safe sudoers editor with syntax validation | sudo -l: list allowed commands | sudoers.d: modular configs",
    "verifyCmd": "test -d /etc/sudoers.d",
    "wikiUrl": "https://wiki.archlinux.org/title/Sudo"
  },
  {
    "id": "storage_partitioning",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 23,
    "title": "Disk Partitioning (fdisk, parted, lsblk)",
    "desc": "Inspect block devices, partition tables (GPT vs MBR), partition types, and filesystem signatures.",
    "cmd": "lsblk -f && sudo fdisk -l /dev/sda && sudo parted -l",
    "commands": [
      {
        "cmd": "lsblk -f",
        "desc": "List all block devices, partitions, filesystem types, and mount points"
      },
      {
        "cmd": "lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS",
        "desc": "Display structured view of storage geometry"
      }
    ],
    "checklist": [
      "Inspect block storage hierarchy with lsblk -f",
      "Differentiate MBR (DOS) vs GPT partition tables",
      "Inspect filesystem types (ext4, btrfs, vfat)"
    ],
    "explainer": "lsblk -f: print filesystems and UUIDs | fdisk -l: list partition tables | parted -l: detailed partition geometry",
    "verifyCmd": "which lsblk >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Partitioning"
  },
  {
    "id": "storage_mounting_fstab",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 24,
    "title": "Filesystem Mounting & /etc/fstab",
    "desc": "Mount filesystems manually, determine partition UUIDs with blkid, and configure persistent mounts in /etc/fstab.",
    "cmd": "sudo mount /dev/sdb1 /mnt && sudo umount /mnt && blkid && sudo mount -a",
    "commands": [
      {
        "cmd": "findmnt --real",
        "desc": "List all real mounted filesystems and options"
      },
      {
        "cmd": "cat /etc/fstab",
        "desc": "Inspect system static filesystem mount definitions"
      }
    ],
    "checklist": [
      "Mount and unmount filesystems with mount and umount",
      "Identify partition UUIDs using blkid",
      "Structure entries in /etc/fstab with mount options"
    ],
    "explainer": "blkid: query block device UUIDs | mount -a: mount all fstab entries | /etc/fstab: static filesystem table",
    "verifyCmd": "test -r /etc/fstab",
    "wikiUrl": "https://wiki.archlinux.org/title/Fstab"
  },
  {
    "id": "storage_lvm",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 25,
    "title": "Logical Volume Management (LVM)",
    "desc": "Manage Physical Volumes (pvcreate), Volume Groups (vgcreate), Logical Volumes (lvcreate), and online resizing.",
    "cmd": "sudo pvs && sudo vgs && sudo lvs && sudo lvextend -L +10G -r /dev/mapper/vg-lv_root",
    "commands": [
      {
        "cmd": "sudo pvs 2>/dev/null || echo 'No LVM Physical Volumes configured on this machine'",
        "desc": "Query LVM Physical Volumes"
      },
      {
        "cmd": "sudo vgs 2>/dev/null && sudo lvs 2>/dev/null || true",
        "desc": "Query Volume Groups and Logical Volumes"
      }
    ],
    "checklist": [
      "Understand PV -> VG -> LV hierarchy",
      "Inspect LVM layers with pvs, vgs, lvs",
      "Perform volume resizing with lvextend -r"
    ],
    "explainer": "pvs: Physical Volumes | vgs: Volume Groups | lvs: Logical Volumes | lvextend -r: resize LV and filesystem together",
    "verifyCmd": "which lvs >/dev/null 2>&1 || true",
    "wikiUrl": "https://wiki.archlinux.org/title/LVM"
  },
  {
    "id": "storage_health_smart",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 26,
    "title": "Disk Space & Drive Health (df, du, smartctl)",
    "desc": "Track disk utilization, identify space hogs, and query drive SMART health indicators.",
    "cmd": "df -hT && sudo du -sh /var/* | sort -hr | head -n 10 && sudo smartctl -H /dev/nvme0n1",
    "commands": [
      {
        "cmd": "df -hT /",
        "desc": "Inspect root filesystem space and filesystem type"
      },
      {
        "cmd": "du -sh ~/* 2>/dev/null | sort -hr | head -n 10",
        "desc": "Identify largest directories in user home"
      }
    ],
    "checklist": [
      "Monitor free storage with df -hT",
      "Find space hogs using du -sh | sort -hr",
      "Check drive physical health attributes with smartctl"
    ],
    "explainer": "df -hT: human-readable disk free with types | du -sh: summarized directory size | sort -hr: sort numbers descending",
    "verifyCmd": "which df >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/S.M.A.R.T."
  },
  {
    "id": "network_ip_interfaces",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 27,
    "title": "Network Addressing & Routes (iproute2)",
    "desc": "Configure IP addresses, view MAC hardware addresses, manage network interfaces, and inspect default routes.",
    "cmd": "ip addr show && ip link show && ip route show && sudo ip route add default via 192.168.1.1",
    "commands": [
      {
        "cmd": "ip -br addr show",
        "desc": "Print concise summary of all network interfaces and IP addresses"
      },
      {
        "cmd": "ip route show",
        "desc": "Display IP kernel routing table and default gateway"
      }
    ],
    "checklist": [
      "Display IP configurations with ip addr",
      "Inspect MAC and interface states with ip link",
      "View routing gateway with ip route show"
    ],
    "explainer": "ip addr: IP addresses | ip link: link layer & MAC | ip route: routing table & default gateway",
    "verifyCmd": "ip addr show >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Network_configuration"
  },
  {
    "id": "network_dns_resolution",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 28,
    "title": "DNS Configuration & Name Lookup",
    "desc": "Configure local DNS resolution, test nameservers with dig, and manage /etc/hosts domain mappings.",
    "cmd": "resolvectl status && dig +short archlinux.org @1.1.1.1 && cat /etc/resolv.conf && cat /etc/hosts",
    "commands": [
      {
        "cmd": "getent hosts archlinux.org",
        "desc": "Resolve hostname via system NSS switch"
      },
      {
        "cmd": "cat /etc/resolv.conf",
        "desc": "Inspect system DNS resolver configuration"
      },
      {
        "cmd": "cat /etc/hosts",
        "desc": "Inspect static host-to-IP local mappings"
      }
    ],
    "checklist": [
      "Inspect DNS configuration in /etc/resolv.conf",
      "Test resolution using dig or getent hosts",
      "Configure local static names in /etc/hosts"
    ],
    "explainer": "dig +short: query DNS server | /etc/resolv.conf: active nameservers | /etc/hosts: local static mappings",
    "verifyCmd": "test -r /etc/resolv.conf",
    "wikiUrl": "https://wiki.archlinux.org/title/Domain_name_resolution"
  },
  {
    "id": "network_ports_sockets",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 29,
    "title": "Listening Ports & Sockets (ss & lsof)",
    "desc": "Identify all active TCP/UDP listening ports, associated PID/process names, and open network sockets.",
    "cmd": "ss -tulpn && sudo lsof -i :80 && sudo lsof -i TCP -s TCP:LISTEN",
    "commands": [
      {
        "cmd": "ss -tuln",
        "desc": "List all TCP and UDP listening sockets without resolving names"
      },
      {
        "cmd": "sudo ss -tulpn 2>/dev/null || ss -tuln",
        "desc": "Display listening ports along with owning process PID"
      }
    ],
    "checklist": [
      "List listening sockets with ss -tulpn",
      "Differentiate TCP (-t) and UDP (-u) sockets",
      "Identify process holding a port using lsof -i"
    ],
    "explainer": "ss -tulpn: -t (TCP), -u (UDP), -l (listening), -p (processes), -n (numeric ports)",
    "verifyCmd": "ss -tulpn >/dev/null 2>&1",
    "wikiUrl": "https://wiki.archlinux.org/title/Core_utilities"
  },
  {
    "id": "network_troubleshooting",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 30,
    "title": "Network Diagnostics (ping, traceroute, mtr)",
    "desc": "Test ICMP reachability, locate routing hops and latency spikes with mtr, and debug HTTP headers.",
    "cmd": "ping -c 4 1.1.1.1 && traceroute 8.8.8.8 && mtr -rw 1.1.1.1 && curl -Iv https://omarchy.org",
    "commands": [
      {
        "cmd": "ping -c 3 1.1.1.1",
        "desc": "Test ICMP reachability and round-trip latency to Cloudflare DNS"
      },
      {
        "cmd": "curl -Iv https://archlinux.org 2>&1 | head -n 15",
        "desc": "Inspect TLS handshake and HTTP response headers"
      }
    ],
    "checklist": [
      "Test packet connectivity with ping -c",
      "Diagnose routing hops and latency with traceroute/mtr",
      "Inspect HTTP/TLS handshakes with curl -Iv"
    ],
    "explainer": "ping -c 4: send 4 packets | traceroute: trace IP hops | curl -Iv: fetch HTTP headers with verbose TLS debug",
    "verifyCmd": "which ping >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Network_configuration"
  },
  {
    "id": "ssh_remote_administration",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 31,
    "title": "SSH Key Auth & Configuration (~/.ssh/config)",
    "desc": "Generate modern Ed25519 SSH keys, copy public keys to authorized_keys, and configure client host profiles.",
    "cmd": "ssh-keygen -t ed25519 -C 'admin' && ssh-copy-id user@remote && nano ~/.ssh/config",
    "commands": [
      {
        "cmd": "ls -la ~/.ssh/ 2>/dev/null || echo 'No ~/.ssh directory yet'",
        "desc": "Inspect existing SSH keys and permissions"
      },
      {
        "cmd": "ssh -V",
        "desc": "Check OpenSSH client version"
      }
    ],
    "checklist": [
      "Generate modern Ed25519 keys with ssh-keygen",
      "Install public keys using ssh-copy-id",
      "Configure host aliases in ~/.ssh/config"
    ],
    "explainer": "ssh-keygen -t ed25519: generate secure keypair | ssh-copy-id: install public key | ~/.ssh/config: host aliases",
    "verifyCmd": "test -d ~/.ssh",
    "wikiUrl": "https://wiki.archlinux.org/title/OpenSSH"
  },
  {
    "id": "sys_resource_monitoring",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "day": 32,
    "title": "System Performance & Resource Bottlenecks",
    "desc": "Diagnose system load averages (1/5/15 min), memory exhaustion, swap activity, and I/O wait CPU bottlenecks.",
    "cmd": "uptime && free -h && vmstat 1 5 && iostat -xz 1 3 && btop",
    "commands": [
      {
        "cmd": "uptime",
        "desc": "Print system uptime and 1, 5, 15 minute load averages"
      },
      {
        "cmd": "free -h",
        "desc": "Display total, used, available RAM and swap space"
      },
      {
        "cmd": "vmstat 1 3",
        "desc": "Sample virtual memory, process run queues, and I/O stats"
      }
    ],
    "checklist": [
      "Interpret 1/5/15 min system load averages",
      "Monitor available memory and swap pressure with free -h",
      "Analyze CPU wait states with vmstat"
    ],
    "explainer": "uptime: load averages | free -h: RAM & swap | vmstat: virtual memory & IO wait | btop: interactive monitor",
    "verifyCmd": "uptime >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/System_maintenance"
  },
  {
    "id": "ssh_hardening",
    "track": "security",
    "trackName": "CyberSec",
    "day": 33,
    "title": "SSH Daemon Hardening (sshd_config)",
    "desc": "Enforce key-only authentication, disable root remote login, change default ports, and test config syntax.",
    "cmd": "sudo nano /etc/ssh/sshd_config && PermitRootLogin no && PasswordAuthentication no && sudo sshd -t",
    "commands": [
      {
        "cmd": "sudo sshd -T 2>/dev/null | grep -iE 'permitrootlogin|passwordauthentication' || echo 'sshd not running or no sudo'",
        "desc": "Test active SSH daemon evaluated configuration"
      },
      {
        "cmd": "sudo sshd -t 2>/dev/null || true",
        "desc": "Verify sshd syntax without restarting daemon"
      }
    ],
    "checklist": [
      "Set PermitRootLogin no",
      "Disable password auth (PasswordAuthentication no)",
      "Validate syntax with sshd -t before reloading"
    ],
    "explainer": "sshd -t: test config syntax | PermitRootLogin no: prevent direct root SSH | PasswordAuthentication no: require keys",
    "verifyCmd": "test -r /etc/ssh/sshd_config || test -d /etc/ssh",
    "wikiUrl": "https://wiki.archlinux.org/title/Security#OpenSSH"
  },
  {
    "id": "firewall_ufw",
    "track": "security",
    "trackName": "CyberSec",
    "day": 34,
    "title": "Host Firewall Protection with UFW",
    "desc": "Establish default-deny incoming rules, whitelist specific administrative ports, and verify firewall status.",
    "cmd": "sudo ufw default deny incoming && sudo ufw allow 22/tcp && sudo ufw enable && sudo ufw status verbose",
    "commands": [
      {
        "cmd": "sudo ufw status verbose 2>/dev/null || echo 'UFW not active or installed'",
        "desc": "Check current UFW ruleset and status"
      },
      {
        "cmd": "which ufw iptables nft",
        "desc": "Locate installed host firewall utilities"
      }
    ],
    "checklist": [
      "Configure default deny incoming policy",
      "Explicitly allow necessary ingress ports (e.g. 22/tcp)",
      "Enable and review verbose status"
    ],
    "explainer": "default deny incoming: block unrequested inbound traffic | allow 22/tcp: permit SSH | ufw status: inspect rules",
    "verifyCmd": "which ufw >/dev/null 2>&1 || which iptables >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Uncomplicated_Firewall"
  },
  {
    "id": "firewall_iptables_nftables",
    "track": "security",
    "trackName": "CyberSec",
    "day": 35,
    "title": "Packet Filtering with iptables & nftables",
    "desc": "Understand packet traversal (INPUT, OUTPUT, FORWARD), match criteria, stateful inspection, and nftables rulesets.",
    "cmd": "sudo iptables -L -n -v --line-numbers && sudo nft list ruleset && sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT",
    "commands": [
      {
        "cmd": "sudo iptables -L -n -v 2>/dev/null | head -n 15 || echo 'Check with sudo'",
        "desc": "Inspect kernel netfilter filter table packet counts"
      },
      {
        "cmd": "sudo nft list ruleset 2>/dev/null || true",
        "desc": "Query modern nftables atomic ruleset"
      }
    ],
    "checklist": [
      "Understand INPUT, FORWARD, OUTPUT chains",
      "Inspect packet and byte counters (-v flag)",
      "Contrast legacy iptables with atomic nftables"
    ],
    "explainer": "iptables -L -n -v: list rules with numeric ports and byte counters | nft list ruleset: print nftables rules",
    "verifyCmd": "which iptables >/dev/null 2>&1 || which nft >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Nftables"
  },
  {
    "id": "pam_password_security",
    "track": "security",
    "trackName": "CyberSec",
    "day": 36,
    "title": "PAM & Password Hardening Policies",
    "desc": "Enforce password aging, expiration warnings with chage, and configure PAM password complexity modules.",
    "cmd": "sudo chage -l $USER && sudo chage -M 90 -W 7 $USER && cat /etc/pam.d/system-auth",
    "commands": [
      {
        "cmd": "chage -l $USER",
        "desc": "Query password aging, last change, and expiration for current user"
      },
      {
        "cmd": "ls -la /etc/pam.d/",
        "desc": "Inspect Pluggable Authentication Module configurations"
      }
    ],
    "checklist": [
      "Inspect password aging attributes with chage -l",
      "Understand PAM configuration stacks (auth, account, password, session)",
      "Enforce maximum password age and warnings"
    ],
    "explainer": "chage -l: list password age policies | chage -M 90: expire every 90 days | /etc/pam.d: authentication modules",
    "verifyCmd": "test -d /etc/pam.d",
    "wikiUrl": "https://wiki.archlinux.org/title/Security#Passwords"
  },
  {
    "id": "fail2ban_protection",
    "track": "security",
    "trackName": "CyberSec",
    "day": 37,
    "title": "Brute-Force Defense with Fail2ban",
    "desc": "Protect authentication services from automated brute-force attacks; monitor banned IPs and jail parameters.",
    "cmd": "sudo fail2ban-client status && sudo fail2ban-client status sshd && sudo fail2ban-client set sshd unbanip 1.2.3.4",
    "commands": [
      {
        "cmd": "sudo fail2ban-client status 2>/dev/null || echo 'Fail2ban daemon not active'",
        "desc": "Query active Fail2ban jails"
      },
      {
        "cmd": "which fail2ban-client 2>/dev/null || echo 'Fail2ban not installed on this host'",
        "desc": "Check fail2ban utility availability"
      }
    ],
    "checklist": [
      "Monitor failed authentication attempts",
      "Configure jail parameters (maxretry, findtime, bantime)",
      "Manage banned IPs with fail2ban-client"
    ],
    "explainer": "fail2ban-client status: view active jails | status <jail>: see banned IP list | unbanip: release IP",
    "verifyCmd": "which fail2ban-client >/dev/null 2>&1 || true",
    "wikiUrl": "https://wiki.archlinux.org/title/Fail2ban"
  },
  {
    "id": "file_integrity_monitoring",
    "track": "security",
    "trackName": "CyberSec",
    "day": 38,
    "title": "File Integrity Monitoring (AIDE & Hashes)",
    "desc": "Detect tampered system binaries, verify package integrity against cryptographic checksums, and configure AIDE.",
    "cmd": "sha256sum /bin/login && sudo aide --check 2>/dev/null || pacman -Qk",
    "commands": [
      {
        "cmd": "sha256sum /bin/login /bin/bash /bin/sudo 2>/dev/null",
        "desc": "Calculate SHA-256 cryptographic hashes of critical binaries"
      },
      {
        "cmd": "pacman -Qk coreutils 2>/dev/null",
        "desc": "Verify package file integrity and checksums via Arch pacman"
      }
    ],
    "checklist": [
      "Calculate cryptographic hashes with sha256sum",
      "Verify package file integrity with pacman -Qk",
      "Understand File Integrity Monitoring (FIM) database baseline"
    ],
    "explainer": "sha256sum: compute SHA-256 checksum | aide: advanced intrusion detection | pacman -Qk: audit package file tampering",
    "verifyCmd": "which sha256sum >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Security#File_integrity"
  },
  {
    "id": "suid_privesc_audit",
    "track": "security",
    "trackName": "CyberSec",
    "day": 39,
    "title": "Auditing SUID Privileges & Misconfigurations",
    "desc": "Scan filesystems for dangerous SUID/SGID binaries, GTFOBins exploitation vectors, and world-writable directories.",
    "cmd": "find / -perm -4000 -type f 2>/dev/null && sudo -l && find / -writable -type d 2>/dev/null",
    "commands": [
      {
        "cmd": "find /usr/bin -perm -4000 -type f 2>/dev/null | head -n 12",
        "desc": "Enumerate SUID executables across /usr/bin"
      },
      {
        "cmd": "find /tmp /var/tmp -maxdepth 1 -type d -perm -0002 2>/dev/null",
        "desc": "Inspect world-writable directories"
      }
    ],
    "checklist": [
      "Audit SUID binaries using find -perm -4000",
      "Check GTFOBins database for privilege escalation vectors",
      "Identify world-writable configuration files and directories"
    ],
    "explainer": "find -perm -4000: locate SUID binaries | sudo -l: audit delegated privileges | world-writable: security risk audit",
    "verifyCmd": "which find >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Security#Privilege_escalation"
  },
  {
    "id": "auditd_system_logging",
    "track": "security",
    "trackName": "CyberSec",
    "day": 40,
    "title": "Security Auditing with Linux auditd",
    "desc": "Monitor sensitive system files for unauthorized writes, audit execution events, and parse security records.",
    "cmd": "sudo auditctl -w /etc/shadow -p wa -k shadow_access && sudo ausearch -k shadow_access && sudo aureport -u",
    "commands": [
      {
        "cmd": "sudo auditctl -s 2>/dev/null || echo 'auditd daemon not active'",
        "desc": "Check Linux audit subsystem status"
      },
      {
        "cmd": "which auditctl ausearch aureport 2>/dev/null || true",
        "desc": "Locate auditd user-space tools"
      }
    ],
    "checklist": [
      "Set file system watches with auditctl -w",
      "Query security events with ausearch -k",
      "Generate audit summary reports with aureport"
    ],
    "explainer": "auditctl -w: watch file/path | -p wa: monitor write and attribute changes | ausearch -k: filter by key",
    "verifyCmd": "which auditctl >/dev/null 2>&1 || true",
    "wikiUrl": "https://wiki.archlinux.org/title/Audit_framework"
  },
  {
    "id": "apparmor_mac",
    "track": "security",
    "trackName": "CyberSec",
    "day": 41,
    "title": "Mandatory Access Control: AppArmor",
    "desc": "Confine network-facing daemons with AppArmor profiles, switch between complain and enforce modes, and read audit logs.",
    "cmd": "sudo aa-status && sudo aa-enforce /etc/apparmor.d/* 2>/dev/null || echo 'Check AppArmor status'",
    "commands": [
      {
        "cmd": "sudo aa-status 2>/dev/null || echo 'AppArmor kernel module not loaded or active'",
        "desc": "Check AppArmor enforcement status and confined profiles"
      },
      {
        "cmd": "cat /sys/kernel/security/lsm 2>/dev/null || echo 'LSM status'",
        "desc": "Inspect active Linux Security Modules"
      }
    ],
    "checklist": [
      "Check loaded profiles with aa-status",
      "Differentiate complain mode vs enforce mode",
      "Audit blocked actions in journalctl"
    ],
    "explainer": "aa-status: list loaded profiles and modes | aa-enforce: enforce strict sandbox rules | aa-complain: log violations only",
    "verifyCmd": "which aa-status >/dev/null 2>&1 || true",
    "wikiUrl": "https://wiki.archlinux.org/title/AppArmor"
  },
  {
    "id": "selinux_foundations",
    "track": "security",
    "trackName": "CyberSec",
    "day": 42,
    "title": "SELinux Fundamentals & Security Contexts",
    "desc": "Understand Type Enforcement, security context labels (user:role:type:mls), policy booleans, and AVC denials.",
    "cmd": "sestatus 2>/dev/null || echo 'SELinux status' && ls -Z /etc/shadow 2>/dev/null",
    "commands": [
      {
        "cmd": "sestatus 2>/dev/null || echo 'SELinux not installed (Arch typically uses AppArmor)'",
        "desc": "Query SELinux status and policy mode"
      },
      {
        "cmd": "ls -Z /etc/passwd 2>/dev/null || echo 'Security context labels not active'",
        "desc": "Inspect security context labels (user:role:type)"
      }
    ],
    "checklist": [
      "Understand user:role:type:mls security context format",
      "Contrast Permissive vs Enforcing modes",
      "Inspect Access Vector Cache (AVC) denial logs"
    ],
    "explainer": "sestatus: SELinux status | ls -Z: display security contexts | getsebool: view policy booleans",
    "verifyCmd": "true",
    "wikiUrl": "https://wiki.archlinux.org/title/SELinux"
  },
  {
    "id": "network_recon_nmap",
    "track": "security",
    "trackName": "CyberSec",
    "day": 43,
    "title": "Port Scanning & Reconnaissance (Nmap)",
    "desc": "Perform SYN stealth port scans, determine exact service versions, run automated NSE vulnerability scripts.",
    "cmd": "nmap -sS -T4 127.0.0.1 && nmap -sV -sC -p 22,80 127.0.0.1 && nmap --script vuln 127.0.0.1",
    "commands": [
      {
        "cmd": "nmap -T4 -p 22,80,443 127.0.0.1 2>/dev/null || echo 'nmap not installed'",
        "desc": "Perform quick TCP port check against localhost"
      },
      {
        "cmd": "which nmap 2>/dev/null || echo 'Install nmap via pacman -S nmap'",
        "desc": "Verify nmap availability"
      }
    ],
    "checklist": [
      "Perform SYN scans (-sS) vs TCP connect scans (-sT)",
      "Probe application service versions with -sV",
      "Execute default vulnerability scripts with -sC"
    ],
    "explainer": "-sS: stealth SYN scan | -sV: service version detection | -sC: run default NSE scripts | -T4: aggressive timing",
    "verifyCmd": "which nmap >/dev/null 2>&1 || true",
    "wikiUrl": "https://wiki.archlinux.org/title/Nmap"
  },
  {
    "id": "packet_capture_tcpdump",
    "track": "security",
    "trackName": "CyberSec",
    "day": 44,
    "title": "Packet Sniffing & Traffic Analysis (tcpdump)",
    "desc": "Capture real-time network packets, apply BPF syntax filters, inspect raw TCP headers, and write PCAP files.",
    "cmd": "sudo tcpdump -i any -nn 'tcp port 80 or tcp port 443' -c 10 && sudo tcpdump -w capture.pcap -i any -c 20",
    "commands": [
      {
        "cmd": "sudo tcpdump -D 2>/dev/null || echo 'Check capture interfaces with sudo'",
        "desc": "List all available network capture interfaces"
      },
      {
        "cmd": "which tcpdump 2>/dev/null || echo 'Install tcpdump via pacman -S tcpdump'",
        "desc": "Check tcpdump utility availability"
      }
    ],
    "checklist": [
      "Capture traffic on specific interfaces (-i)",
      "Filter packets using BPF expressions (host, port, proto)",
      "Save captures to PCAP format (-w file.pcap) for Wireshark"
    ],
    "explainer": "-i any: listen on all interfaces | -nn: do not resolve hostnames or port numbers | -c 10: exit after 10 packets",
    "verifyCmd": "which tcpdump >/dev/null 2>&1 || true",
    "wikiUrl": "https://wiki.archlinux.org/title/Tcpdump"
  },
  {
    "id": "rootkit_malware_detection",
    "track": "security",
    "trackName": "CyberSec",
    "day": 45,
    "title": "Rootkit Hunting & Anomaly Detection",
    "desc": "Scan for known rootkits, hidden kernel processes, backdoors, rogue crontabs, and suspicious listening daemons.",
    "cmd": "sudo rkhunter -c --sk 2>/dev/null || sudo chkrootkit 2>/dev/null || ls -la /etc/cron* /var/spool/cron/",
    "commands": [
      {
        "cmd": "ls -la /etc/cron* /var/spool/cron/ 2>/dev/null",
        "desc": "Audit all system-wide and user cron spool paths for persistence"
      },
      {
        "cmd": "which rkhunter chkrootkit lynis 2>/dev/null || true",
        "desc": "Check available security auditing scanners"
      }
    ],
    "checklist": [
      "Audit persistence mechanisms in cron and systemd",
      "Run rootkit checks with rkhunter or chkrootkit",
      "Inspect unexpected listening network services"
    ],
    "explainer": "rkhunter --check: scan for rootkits | --sk: skip interactive keypress | cron audit: check persistence points",
    "verifyCmd": "which rkhunter >/dev/null 2>&1 || true",
    "wikiUrl": "https://wiki.archlinux.org/title/Security#Rootkit_detection"
  },
  {
    "id": "vpn_wireguard_tunnels",
    "track": "security",
    "trackName": "CyberSec",
    "day": 46,
    "title": "Encrypted Tunnels & WireGuard VPN",
    "desc": "Set up encrypted VPN tunnels using WireGuard public/private key pairs (with restrictive umask 077 and chmod 600 for private key isolation), and secure traffic via SSH port forwarding.",
    "cmd": "(umask 077 && wg genkey | tee privkey | wg pubkey > pubkey) && chmod 600 privkey && ssh -L 8080:localhost:80 user@remote",
    "commands": [
      {
        "cmd": "which wg 2>/dev/null || echo 'WireGuard tools available via pacman -S wireguard-tools'",
        "desc": "Check WireGuard command presence"
      },
      {
        "cmd": "ip link show type wireguard 2>/dev/null || true",
        "desc": "Inspect active WireGuard virtual interfaces"
      }
    ],
    "checklist": [
      "Generate WireGuard keys with umask 077 isolation",
      "Configure client and peer Endpoint and AllowedIPs",
      "Establish local port forwarding tunnels with ssh -L"
    ],
    "explainer": "umask 077: strict owner-only permissions | wg genkey: generate private key | wg pubkey: derive public key",
    "verifyCmd": "which wg >/dev/null 2>&1 || true",
    "wikiUrl": "https://wiki.archlinux.org/title/WireGuard"
  },
  {
    "id": "tls_crypto_openssl",
    "track": "security",
    "trackName": "CyberSec",
    "day": 47,
    "title": "Cryptography & SSL/TLS Inspection (OpenSSL)",
    "desc": "Generate cryptographic keypairs, inspect X.509 certificate chains, expiration dates, and test TLS cipher suites.",
    "cmd": "openssl genpkey -algorithm ED25519 -out key.pem && openssl s_client -connect google.com:443 -showcerts",
    "commands": [
      {
        "cmd": "echo | openssl s_client -connect archlinux.org:443 -servername archlinux.org 2>/dev/null | openssl x509 -noout -dates -subject",
        "desc": "Inspect live SSL/TLS certificate validity dates and subject"
      },
      {
        "cmd": "openssl version",
        "desc": "Query OpenSSL cryptographic library version"
      }
    ],
    "checklist": [
      "Generate modern keypairs using OpenSSL",
      "Query remote TLS certificates with s_client",
      "Inspect certificate expiration and SAN attributes with x509"
    ],
    "explainer": "genpkey -algorithm ED25519: generate modern key | s_client: test TLS connection | x509: parse certificates",
    "verifyCmd": "which openssl >/dev/null",
    "wikiUrl": "https://wiki.archlinux.org/title/Transport_Layer_Security"
  },
  {
    "id": "container_security",
    "track": "security",
    "trackName": "CyberSec",
    "day": 48,
    "title": "Container Hardening & Isolation (Docker/Podman)",
    "desc": "Drop kernel capabilities, enforce read-only root filesystems, run rootless containers, and prevent privilege escalation.",
    "cmd": "docker run --read-only --cap-drop ALL --security-opt no-new-privileges:true alpine",
    "commands": [
      {
        "cmd": "podman --version 2>/dev/null || docker --version 2>/dev/null || echo 'Container engines (podman/docker) not installed'",
        "desc": "Query container runtime version"
      },
      {
        "cmd": "which podman docker 2>/dev/null || true",
        "desc": "Check installed container management binaries"
      }
    ],
    "checklist": [
      "Drop unnecessary capabilities (--cap-drop ALL)",
      "Enforce read-only root filesystem (--read-only)",
      "Run rootless containers with podman"
    ],
    "explainer": "--read-only: prevent container filesystem tampering | --cap-drop ALL: drop kernel capabilities | no-new-privileges: block SUID elevation",
    "verifyCmd": "which docker >/dev/null 2>&1 || which podman >/dev/null 2>&1 || true",
    "wikiUrl": "https://wiki.archlinux.org/title/Docker#Security"
  }
];

var TOPICS_90 = [
  {
    "id": "day_01",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 1,
    "title": "Filesystem Hierarchy & Navigation",
    "desc": "Understand the Linux Directory Tree structure (FHS) and absolute vs relative paths.",
    "timeMinutes": 45,
    "cmd": "tree -L 1 /",
    "commands": [
      {
        "cmd": "tree -L 1 /",
        "desc": "Inspect root directory layout"
      },
      {
        "cmd": "ls -lah /etc /var /usr",
        "desc": "Explore core system directories"
      },
      {
        "cmd": "pwd && cd -",
        "desc": "Toggle between previous and current directory"
      }
    ],
    "checklist": [
      "Explore /, /etc, /var, /usr, /home, /dev, and /proc",
      "Practice navigation using relative and absolute paths",
      "Understand what the File Hierarchy Standard (FHS) defines"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_02",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 2,
    "title": "File & Directory Manipulation",
    "desc": "Create, copy, move, rename, and securely remove files and directories.",
    "timeMinutes": 45,
    "cmd": "mkdir -p lab/{logs,configs,backups}",
    "commands": [
      {
        "cmd": "mkdir -p lab/{logs,configs,backups}",
        "desc": "Create nested directory tree"
      },
      {
        "cmd": "cp -av /etc/os-release lab/configs/",
        "desc": "Copy preserving permissions and symlinks"
      },
      {
        "cmd": "rm -ri lab/backups",
        "desc": "Interactively and safely remove files"
      }
    ],
    "checklist": [
      "Create a test folder hierarchy using mkdir -p",
      "Copy directories with cp -r and archive mode cp -a",
      "Practice safe file removal and understand inode deletion"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_03",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 3,
    "title": "File Viewing & Pagers",
    "desc": "Efficiently inspect, search, and paginate through logs and configuration files.",
    "timeMinutes": 40,
    "cmd": "less /etc/fstab",
    "commands": [
      {
        "cmd": "less /etc/fstab",
        "desc": "Navigate with less (/search, n/N, G, 1G)"
      },
      {
        "cmd": "head -n 20 /etc/passwd",
        "desc": "View the first 20 lines of a file"
      },
      {
        "cmd": "tail -f /var/log/pacman.log",
        "desc": "Follow a live log stream in real time"
      }
    ],
    "checklist": [
      "Master navigation inside less (/ for search, g/G for top/bottom)",
      "View header and footer chunks with head and tail",
      "Monitor live appending files with tail -f"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_04",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 4,
    "title": "Standard I/O, Redirection & Pipes",
    "desc": "Harness stdin (0), stdout (1), stderr (2), redirection operators, and piping.",
    "timeMinutes": 50,
    "cmd": "ls -l /etc 2>/dev/null | grep conf",
    "commands": [
      {
        "cmd": "ls -l /etc 2>/dev/null | grep conf",
        "desc": "Filter stdout while suppressing stderr"
      },
      {
        "cmd": "echo 'test entry' >> output.txt",
        "desc": "Append output to a file"
      },
      {
        "cmd": "tee lab/summary.log",
        "desc": "Split output to both stdout and file"
      }
    ],
    "checklist": [
      "Redirect stdout (>) vs append (>>)",
      "Redirect stderr to file (2>) or /dev/null (2>/dev/null)",
      "Combine stdout and stderr (2>&1 or &>)",
      "Pipe multiple utilities together and use tee"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_05",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 5,
    "title": "Linux File Permissions (POSIX)",
    "desc": "Deep dive into read, write, execute permissions for Owner, Group, and Others.",
    "timeMinutes": 55,
    "cmd": "ls -ld /tmp /var/log",
    "commands": [
      {
        "cmd": "ls -ld /tmp /var/log",
        "desc": "Examine directory permission strings"
      },
      {
        "cmd": "chmod 750 script.sh",
        "desc": "Set permissions using octal notation"
      },
      {
        "cmd": "chmod u=rwx,g=rx,o= file.txt",
        "desc": "Set permissions using symbolic notation"
      },
      {
        "cmd": "umask",
        "desc": "Check current default creation mask"
      }
    ],
    "checklist": [
      "Understand r=4, w=2, x=1 calculation across User, Group, Others",
      "Differentiate between file execute vs directory execute (traverse)",
      "Calculate file modes created under default umask (022 / 027)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_06",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 6,
    "title": "File Ownership & Special Permissions",
    "desc": "Manage ownership (chown, chgrp) and understand SUID, SGID, and the Sticky Bit.",
    "timeMinutes": 55,
    "cmd": "sudo chown -R $USER:$USER lab/",
    "commands": [
      {
        "cmd": "sudo chown -R $USER:$USER lab/",
        "desc": "Recursively change user and group ownership"
      },
      {
        "cmd": "find /usr/bin -perm -4000 -ls 2>/dev/null",
        "desc": "Audit all SUID binaries on system"
      },
      {
        "cmd": "chmod +t shared_dir/",
        "desc": "Set the Sticky Bit on a directory"
      }
    ],
    "checklist": [
      "Change user and group ownership with chown and chgrp",
      "Understand how SUID (chmod 4755) executes with owner privilege",
      "Understand SGID on directories (inherited group ownership)",
      "Understand Sticky Bit (chmod 1777 /tmp) preventing unauthorized file deletion"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_07",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 7,
    "title": "Links: Hard Links vs Symlinks",
    "desc": "Understand inodes, filesystem linkages, and symlinks vs hard links.",
    "timeMinutes": 45,
    "cmd": "ln -s /etc/hosts ~/my_hosts_link",
    "commands": [
      {
        "cmd": "ln -s /etc/hosts ~/my_hosts_link",
        "desc": "Create a symbolic (soft) link"
      },
      {
        "cmd": "ln file.txt hardlink.txt",
        "desc": "Create a hard link sharing the same inode"
      },
      {
        "cmd": "ls -i",
        "desc": "Inspect file inode numbers"
      }
    ],
    "checklist": [
      "Create both soft and hard links",
      "Verify inode numbers using ls -i or stat",
      "Understand why hard links cannot span separate filesystems"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_08",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 8,
    "title": "Locating Files: find, which, locate",
    "desc": "Search filesystems efficiently by name, size, modification time, and permissions.",
    "timeMinutes": 50,
    "cmd": "find /etc -name '*.conf' -size +10k",
    "commands": [
      {
        "cmd": "find /etc -name '*.conf' -size +10k",
        "desc": "Find config files larger than 10KB"
      },
      {
        "cmd": "find /var/log -mtime -7 -type f",
        "desc": "Find logs modified in the last 7 days"
      },
      {
        "cmd": "find . -name '*.tmp' -delete",
        "desc": "Find and delete files matching pattern"
      }
    ],
    "checklist": [
      "Master find criteria: -type, -name, -size, -mtime",
      "Execute actions on found files using -exec or -delete",
      "Understand difference between which, whereis, and find"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_09",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 9,
    "title": "Text Searching with grep & ripgrep",
    "desc": "Master regular expressions, case-insensitive searching, and recursive lookups.",
    "timeMinutes": 45,
    "cmd": "grep -rnE 'user|password' /etc/ 2>/dev/null",
    "commands": [
      {
        "cmd": "grep -rnE 'user|password' /etc/ 2>/dev/null",
        "desc": "Recursive regex search"
      },
      {
        "cmd": "grep -v '^#' /etc/locale.gen | grep -v '^$'",
        "desc": "Strip comments and empty lines"
      },
      {
        "cmd": "rg 'export PATH' ~/.config/",
        "desc": "Fast recursive search with ripgrep"
      }
    ],
    "checklist": [
      "Use grep flags: -i (ignore case), -r (recursive), -n (line number), -v (invert)",
      "Write basic regular expressions: ^ (start), $ (end), . (wildcard), [] (classes)",
      "Practice filtering active configuration directives without comment noise"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_10",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 10,
    "title": "Streams: sort, uniq, cut, tr",
    "desc": "Combine stream utilities to slice, transform, count, and sort structured data.",
    "timeMinutes": 45,
    "cmd": "cut -d: -f1,7 /etc/passwd",
    "commands": [
      {
        "cmd": "cut -d: -f1,7 /etc/passwd",
        "desc": "Extract usernames and default login shells"
      },
      {
        "cmd": "cat /var/log/pacman.log | sort | uniq -c | sort -nr | head -n 10",
        "desc": "Count unique occurrences"
      },
      {
        "cmd": "tr '[:lower:]' '[:upper:]' < file.txt",
        "desc": "Translate characters on the fly"
      }
    ],
    "checklist": [
      "Slice delimited columns with cut -d -f",
      "Count frequency of items with sort | uniq -c | sort -nr",
      "Transform characters and whitespace with tr"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_11",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 11,
    "title": "Process Basics: ps, top, btop",
    "desc": "Identify running processes, understand PIDs, PPIDs, and monitor system resources.",
    "timeMinutes": 45,
    "cmd": "ps aux | grep systemd",
    "commands": [
      {
        "cmd": "ps aux | grep systemd",
        "desc": "List processes matching keyword"
      },
      {
        "cmd": "ps -ef --forest",
        "desc": "View process tree showing parent-child hierarchy"
      },
      {
        "cmd": "btop",
        "desc": "Modern interactive terminal system monitor"
      }
    ],
    "checklist": [
      "Understand Process IDs (PID) and Parent Process IDs (PPID)",
      "Read process state codes: R (running), S (sleeping), Z (zombie), D (disk sleep)",
      "Navigate btop to inspect CPU, Memory, Disk, and Network per-process"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_12",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 12,
    "title": "Job Control & Process Signals",
    "desc": "Manage foreground/background jobs and send signals (SIGTERM, SIGKILL, SIGHUP).",
    "timeMinutes": 50,
    "cmd": "sleep 100 &",
    "commands": [
      {
        "cmd": "sleep 100 &",
        "desc": "Start job in background"
      },
      {
        "cmd": "jobs -l && fg %1",
        "desc": "List jobs and bring job 1 to foreground"
      },
      {
        "cmd": "kill -15 <pid> || kill -9 <pid>",
        "desc": "Send graceful SIGTERM, fallback to SIGKILL"
      }
    ],
    "checklist": [
      "Use Ctrl+Z to suspend and bg / fg to control jobs",
      "Understand key signals: SIGTERM (15), SIGKILL (9), SIGHUP (1), SIGINT (2)",
      "Use pkill and killall safely"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_13",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 13,
    "title": "Compression & Archiving: tar, gzip, zstd",
    "desc": "Create, inspect, and extract tarballs and compressed archives.",
    "timeMinutes": 40,
    "cmd": "tar -czvf backup.tar.gz lab/",
    "commands": [
      {
        "cmd": "tar -czvf backup.tar.gz lab/",
        "desc": "Create gzip-compressed tar archive"
      },
      {
        "cmd": "tar -tf backup.tar.gz",
        "desc": "Inspect contents without extracting"
      },
      {
        "cmd": "tar -xzvf backup.tar.gz -C /tmp/",
        "desc": "Extract archive to destination directory"
      }
    ],
    "checklist": [
      "Understand difference between archiving (tar) and compression (gzip/zstd/xz)",
      "Master flags: -c (create), -x (extract), -v (verbose), -f (file), -z (gzip)",
      "Safely inspect archive contents with -t before extraction"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_14",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 14,
    "title": "Environment Variables & Dotfiles",
    "desc": "Manage environment variables ($PATH, $HOME), aliases, and shell configuration files.",
    "timeMinutes": 45,
    "cmd": "printenv | grep -E 'PATH|USER|SHELL'",
    "commands": [
      {
        "cmd": "printenv | grep -E 'PATH|USER|SHELL'",
        "desc": "Inspect core environment variables"
      },
      {
        "cmd": "export MY_VAR='Omarchy'",
        "desc": "Export variable to child processes"
      },
      {
        "cmd": "alias ll='ls -lah --color=auto'",
        "desc": "Define interactive command alias"
      }
    ],
    "checklist": [
      "Understand difference between shell variables and exported environment variables",
      "Understand how $PATH resolution works",
      "Inspect user profile load order (~/.bashrc, ~/.profile, ~/.config/)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_15",
    "track": "foundations",
    "trackName": "Foundations",
    "phase": 1,
    "phaseName": "Linux Foundations & Shell Mastery",
    "day": 15,
    "title": "Phase 1 Lab & Practical Assessment",
    "desc": "Hands-on challenge consolidating filesystem, permissions, and text processing.",
    "timeMinutes": 60,
    "cmd": "find /etc -type f -name '*.conf' -exec grep -H '127.0.0.1' {} +",
    "commands": [
      {
        "cmd": "find /etc -type f -name '*.conf' -exec grep -H '127.0.0.1' {} +",
        "desc": "Comprehensive pipeline lookup"
      },
      {
        "cmd": "history | tail -n 25",
        "desc": "Review recent command mastery"
      }
    ],
    "checklist": [
      "Build a multi-level lab directory and assign specific user/group permissions",
      "Write a one-liner to find the 5 largest files in /var/log",
      "Create an archive backup of your lab and test extracting it"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_16",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 16,
    "title": "Bash Script Structure & Shebang",
    "desc": "Write your first proper shell script with defensive header settings.",
    "timeMinutes": 45,
    "cmd": "#!/usr/bin/env bash\nset -euo pipefail",
    "commands": [
      {
        "cmd": "#!/usr/bin/env bash\nset -euo pipefail",
        "desc": "Standard robust script prologue"
      },
      {
        "cmd": "chmod +x my_script.sh && ./my_script.sh",
        "desc": "Mark executable and run"
      }
    ],
    "checklist": [
      "Understand the shebang line (#!/usr/bin/env bash)",
      "Understand 'set -euo pipefail' for strict error handling",
      "Understand exit statuses ($?) and exit 0 vs exit 1"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_17",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 17,
    "title": "Variables, Arguments & Quotes",
    "desc": "Master script arguments ($1, $#, $@), double vs single quotes, and command substitution.",
    "timeMinutes": 50,
    "cmd": "TIMESTAMP=$(date +%Y-%m-%d_%H%M%S)",
    "commands": [
      {
        "cmd": "TIMESTAMP=$(date +%Y-%m-%d_%H%M%S)",
        "desc": "Command substitution with $()"
      },
      {
        "cmd": "echo \"First argument: ${1:-'default_val'}\"",
        "desc": "Parameter expansion with fallback"
      }
    ],
    "checklist": [
      "Handle command-line positional arguments ($1, $2, $#, $@)",
      "Differentiate between single quotes (literal) and double quotes (interpolated)",
      "Use variable parameter expansion (${var:-default}, ${#var})"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_18",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 18,
    "title": "Conditionals & Comparison Operators",
    "desc": "Evaluate file states and numeric/string comparisons using [[ ... ]].",
    "timeMinutes": 50,
    "cmd": "[[ -f /etc/passwd ]] && echo 'File exists'",
    "commands": [
      {
        "cmd": "[[ -f /etc/passwd ]] && echo 'File exists'",
        "desc": "File test operator"
      },
      {
        "cmd": "[[ $USER == 'omara' ]] && echo 'Authorized'",
        "desc": "String comparison"
      },
      {
        "cmd": "[[ 10 -gt 5 ]] && echo 'Greater'",
        "desc": "Numeric comparison (-eq, -ne, -lt, -gt)"
      }
    ],
    "checklist": [
      "Use file tests: -f (file), -d (dir), -e (exists), -r (readable), -w (writable)",
      "Use string comparison (==, !=, -z for empty, -n for not empty)",
      "Structure if-then-elif-else-fi blocks cleanly"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_19",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 19,
    "title": "Loops: for, while, and read",
    "desc": "Iterate over lists, files, and read lines from command streams safely.",
    "timeMinutes": 50,
    "cmd": "for f in *.txt; do echo \"File: $f\"; done",
    "commands": [
      {
        "cmd": "for f in *.txt; do echo \"File: $f\"; done",
        "desc": "Iterate over matching glob items"
      },
      {
        "cmd": "while IFS= read -r line; do echo \"Line: $line\"; done < /etc/hosts",
        "desc": "Safely read file line by line"
      }
    ],
    "checklist": [
      "Construct for loops over arrays and globs",
      "Read file lines safely using 'while IFS= read -r line'",
      "Use break and continue appropriately in loops"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_20",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 20,
    "title": "Functions & Variable Scope",
    "desc": "Modularize code with reusable functions and local variable scoping.",
    "timeMinutes": 50,
    "cmd": "log_msg() { local msg=\"$1\"; echo \"[$(date +%T)] $msg\"; }",
    "commands": [
      {
        "cmd": "log_msg() { local msg=\"$1\"; echo \"[$(date +%T)] $msg\"; }",
        "desc": "Function with local variable"
      }
    ],
    "checklist": [
      "Define functions and pass positional parameters",
      "Always declare internal function variables with 'local'",
      "Return values using echo and captured subshells or return codes"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_21",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 21,
    "title": "Stream Editing with sed",
    "desc": "Search, replace, insert, and delete lines in files programmatically.",
    "timeMinutes": 50,
    "cmd": "sed 's/localhost/127.0.0.1/g' config.txt",
    "commands": [
      {
        "cmd": "sed 's/localhost/127.0.0.1/g' config.txt",
        "desc": "Substitute text in stream"
      },
      {
        "cmd": "sed -i.bak 's/DEBUG=true/DEBUG=false/' app.conf",
        "desc": "In-place edit with automatic backup"
      },
      {
        "cmd": "sed '/^#/d' file.txt",
        "desc": "Delete matching lines"
      }
    ],
    "checklist": [
      "Use the substitute command: s/pattern/replacement/flags",
      "Understand delimiters and global replacement (/g)",
      "Use in-place editing (-i) responsibly with safety backups"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_22",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 22,
    "title": "Data Processing with awk",
    "desc": "Extract, format, and compute structured column data using awk.",
    "timeMinutes": 55,
    "cmd": "awk -F: '{print $1, $3}' /etc/passwd",
    "commands": [
      {
        "cmd": "awk -F: '{print $1, $3}' /etc/passwd",
        "desc": "Print fields with custom delimiter"
      },
      {
        "cmd": "df -h | awk '$5 > 80 {print $1, $5}'",
        "desc": "Filter rows by column threshold"
      },
      {
        "cmd": "awk '{sum += $1} END {print sum}' numbers.txt",
        "desc": "Calculate aggregate sums"
      }
    ],
    "checklist": [
      "Understand awk record and field concepts ($0, $1, $NF, NR)",
      "Use BEGIN and END blocks for header and summary outputs",
      "Filter tabular output from df, ps, and netstat"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_23",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 23,
    "title": "Automation Project: Daily Health Check Script",
    "desc": "Build a real Bash script that checks disk space, RAM usage, load, and failed services.",
    "timeMinutes": 60,
    "cmd": "cat << 'EOF' > healthcheck.sh\n#!/bin/bash\nuptime\nfree -h\ndf -h /\nEOF",
    "commands": [
      {
        "cmd": "cat << 'EOF' > healthcheck.sh\n#!/bin/bash\nuptime\nfree -h\ndf -h /\nEOF",
        "desc": "Scaffold health check script"
      }
    ],
    "checklist": [
      "Gather CPU load, free memory percentage, and root disk usage",
      "Check systemctl --failed units programmatically",
      "Format clean summary report output with colored alerts"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_24",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 24,
    "title": "Automation Project: Automated Backup Script",
    "desc": "Build an automated backup script using tar or rsync with rotation.",
    "timeMinutes": 60,
    "cmd": "rsync -avz --delete /home/omara/Work/ /tmp/backup_work/",
    "commands": [
      {
        "cmd": "rsync -avz --delete /home/omara/Work/ /tmp/backup_work/",
        "desc": "Differential directory sync"
      }
    ],
    "checklist": [
      "Create compressed timestamped archives of designated folders",
      "Implement 7-day retention cleanup using find -mtime +7 -delete",
      "Add logging and error traps with trap 'echo Error' ERR"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_25",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 25,
    "title": "Parsing JSON with jq",
    "desc": "Parse, filter, and transform modern JSON API outputs and configs.",
    "timeMinutes": 45,
    "cmd": "hyprctl activewindow -j | jq '.title, .class'",
    "commands": [
      {
        "cmd": "hyprctl activewindow -j | jq '.title, .class'",
        "desc": "Query Wayland window metadata"
      },
      {
        "cmd": "curl -s https://ipapi.co/json | jq '{ip, city, org}'",
        "desc": "Extract fields from HTTP API"
      }
    ],
    "checklist": [
      "Access object keys and array elements with jq",
      "Filter array records with select()",
      "Construct new JSON objects from shell scripts"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_26",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 26,
    "title": "Handling Errors & Traps",
    "desc": "Defensive scripting: handling interruptions, cleanups, and temporary files.",
    "timeMinutes": 45,
    "cmd": "TMP=$(mktemp -d); trap 'rm -rf \"$TMP\"' EXIT",
    "commands": [
      {
        "cmd": "TMP=$(mktemp -d); trap 'rm -rf \"$TMP\"' EXIT",
        "desc": "Self-cleaning temporary directory pattern"
      }
    ],
    "checklist": [
      "Use mktemp to prevent insecure predictable temporary files",
      "Trap EXIT, SIGINT, and SIGTERM to clean up state files",
      "Handle command failures with graceful fallbacks"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_27",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 27,
    "title": "Interactive Scripts with gum",
    "desc": "Build elegant terminal dialogs, spinners, input boxes, and confirm prompts.",
    "timeMinutes": 50,
    "cmd": "gum confirm 'Proceed with operation?' && echo 'Confirmed'",
    "commands": [
      {
        "cmd": "gum confirm 'Proceed with operation?' && echo 'Confirmed'",
        "desc": "Interactive confirmation prompt"
      },
      {
        "cmd": "gum choose 'Linux' 'SysAdmin' 'CyberSecurity'",
        "desc": "Fuzzy selection menu"
      }
    ],
    "checklist": [
      "Use gum input and gum write for user inputs",
      "Use gum choose and gum filter for interactive menus",
      "Style terminal scripts with colors, borders, and spinners"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_28",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 28,
    "title": "Cron & At: Traditional Scheduling",
    "desc": "Understand crontab syntax, scheduled intervals, and execution environments.",
    "timeMinutes": 45,
    "cmd": "crontab -l 2>/dev/null",
    "commands": [
      {
        "cmd": "crontab -l 2>/dev/null",
        "desc": "List current user crontabs"
      },
      {
        "cmd": "echo '0 2 * * * /path/to/backup.sh' | crontab -",
        "desc": "Schedule nightly 2 AM job"
      }
    ],
    "checklist": [
      "Decipher the 5 cron fields: min, hour, day, month, day-of-week",
      "Understand why cron runs in minimal environment without your normal $PATH",
      "Redirect cron job stdout and stderr to log files"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_29",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 29,
    "title": "Git Basics for SysAdmins & Security",
    "desc": "Track configuration files, dotfiles, and security automation scripts in git.",
    "timeMinutes": 50,
    "cmd": "git init && git add . && git commit -m 'Initial commit'",
    "commands": [
      {
        "cmd": "git init && git add . && git commit -m 'Initial commit'",
        "desc": "Initialize repo and commit"
      },
      {
        "cmd": "git log --oneline --graph",
        "desc": "Review commit history"
      },
      {
        "cmd": "git diff",
        "desc": "Inspect pending configuration changes"
      }
    ],
    "checklist": [
      "Version control configuration directories with git",
      "Understand branching, staging, and diffs",
      "Use .gitignore to prevent committing secrets, keys, and tokens"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_30",
    "track": "scripting",
    "trackName": "Scripting",
    "phase": 2,
    "phaseName": "Shell Scripting & Automation",
    "day": 30,
    "title": "Phase 2 Lab: Build a Modular CLI Tool",
    "desc": "Combine Bash, jq, and functions into a complete operational tool.",
    "timeMinutes": 60,
    "cmd": "bash --version",
    "commands": [
      {
        "cmd": "bash --version",
        "desc": "Verify Bash capabilities"
      }
    ],
    "checklist": [
      "Build a multi-subcommand script (e.g., tool status, tool backup, tool clean)",
      "Incorporate arguments, help menu (--help), and exit status checks",
      "Verify the script executes cleanly with zero ShellCheck warnings"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_31",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 31,
    "title": "systemd Overview & Architecture",
    "desc": "Understand systemd as PID 1, targets, units, and the boot sequence.",
    "timeMinutes": 50,
    "cmd": "systemctl status",
    "commands": [
      {
        "cmd": "systemctl status",
        "desc": "View overall system control status"
      },
      {
        "cmd": "systemd-analyze blame",
        "desc": "Identify services slowing down system boot"
      },
      {
        "cmd": "systemctl get-default",
        "desc": "Check default boot target (multi-user vs graphical)"
      }
    ],
    "checklist": [
      "Understand systemd responsibilities: init, cgroups, logging, timers",
      "Differentiate between Unit types: .service, .socket, .target, .timer",
      "Analyze boot performance with systemd-analyze"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_32",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 32,
    "title": "Managing Services with systemctl",
    "desc": "Start, stop, restart, enable, disable, and reload system services.",
    "timeMinutes": 45,
    "cmd": "systemctl is-active sshd || echo 'Inactive'",
    "commands": [
      {
        "cmd": "systemctl is-active sshd || echo 'Inactive'",
        "desc": "Check if service is active"
      },
      {
        "cmd": "systemctl is-enabled systemd-timesyncd",
        "desc": "Check if enabled on boot"
      },
      {
        "cmd": "systemctl --failed",
        "desc": "List failed units across system"
      }
    ],
    "checklist": [
      "Differentiate between start/stop (runtime) and enable/disable (boot autostart)",
      "Understand 'mask' to prevent services from being started accidentally",
      "Troubleshoot failed units with systemctl status <unit>"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_33",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 33,
    "title": "Writing Custom systemd Service Units",
    "desc": "Create, test, and install custom service files in /etc/systemd/system/.",
    "timeMinutes": 55,
    "cmd": "cat /usr/lib/systemd/system/sshd.service",
    "commands": [
      {
        "cmd": "cat /usr/lib/systemd/system/sshd.service",
        "desc": "Examine a standard service unit definition"
      },
      {
        "cmd": "sudo systemctl daemon-reload",
        "desc": "Reload systemd manager after editing units"
      }
    ],
    "checklist": [
      "Understand sections: [Unit], [Service], [Install]",
      "Configure ExecStart, Restart=always, and User isolation",
      "Deploy a custom daemon service and verify with systemctl status"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_34",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 34,
    "title": "systemd Timers (Modern Cron Replacement)",
    "desc": "Create systemd timer units for reliable, loggable task scheduling.",
    "timeMinutes": 50,
    "cmd": "systemctl list-timers",
    "commands": [
      {
        "cmd": "systemctl list-timers",
        "desc": "List all active timers and next run times"
      },
      {
        "cmd": "systemctl cat shadow.timer",
        "desc": "View example timer unit definition"
      }
    ],
    "checklist": [
      "Understand monotonic timers (OnBootSec) vs real-time timers (OnCalendar)",
      "Link a .timer unit with its sibling .service unit",
      "Schedule a daily maintenance task using systemd timers"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_35",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 35,
    "title": "Centralized Logging with journalctl",
    "desc": "Query binary systemd journal logs by unit, time, priority, and boot index.",
    "timeMinutes": 50,
    "cmd": "journalctl -b -p err..emerg",
    "commands": [
      {
        "cmd": "journalctl -b -p err..emerg",
        "desc": "Show errors from current boot only"
      },
      {
        "cmd": "journalctl -u sshd -n 50 --no-pager",
        "desc": "View last 50 log lines for sshd"
      },
      {
        "cmd": "journalctl --since '1 hour ago'",
        "desc": "Filter logs by relative timestamp"
      }
    ],
    "checklist": [
      "Filter logs by unit (-u), boot (-b), and priority (-p err)",
      "Follow live journal output with -f",
      "Understand journal disk usage and vacuuming (journalctl --vacuum-size)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_36",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 36,
    "title": "User & Group Administration",
    "desc": "Manage users, groups, default shells, and account locking.",
    "timeMinutes": 50,
    "cmd": "id $USER",
    "commands": [
      {
        "cmd": "id $USER",
        "desc": "View UID, GID, and supplementary groups"
      },
      {
        "cmd": "sudo useradd -m -s /bin/bash testuser",
        "desc": "Create user with home directory"
      },
      {
        "cmd": "sudo usermod -aG wheel,audio testuser",
        "desc": "Append user to groups"
      }
    ],
    "checklist": [
      "Understand /etc/passwd, /etc/shadow, and /etc/group files",
      "Create, modify, and delete users with useradd, usermod, userdel",
      "Lock accounts with passwd -l or usermod -L"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_37",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 37,
    "title": "Sudoers & Privilege Delegation",
    "desc": "Safely grant administrative privileges without sharing root credentials.",
    "timeMinutes": 50,
    "cmd": "sudo visudo -c",
    "commands": [
      {
        "cmd": "sudo visudo -c",
        "desc": "Check sudoers syntax for errors"
      },
      {
        "cmd": "cat /etc/sudoers.d/* 2>/dev/null",
        "desc": "Inspect drop-in sudo configurations"
      }
    ],
    "checklist": [
      "Always edit sudoers with visudo to prevent syntax lockouts",
      "Understand user/group privilege specification rules",
      "Grant granular command execution without password prompts (NOPASSWD) securely"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_38",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 38,
    "title": "Arch Linux Package Management: pacman",
    "desc": "Install, update, query, search, and clean system packages.",
    "timeMinutes": 45,
    "cmd": "pacman -Qi linux",
    "commands": [
      {
        "cmd": "pacman -Qi linux",
        "desc": "Query detailed package metadata"
      },
      {
        "cmd": "pacman -Qo /usr/bin/hyprland",
        "desc": "Identify which package owns a specific file"
      },
      {
        "cmd": "pacman -Qdt",
        "desc": "List orphaned packages no longer needed"
      }
    ],
    "checklist": [
      "Master core operations: -S (sync), -R (remove), -Q (query), -U (file install)",
      "Clean package cache responsibly (paccache -r)",
      "Remove packages and their unused dependencies (-Rns)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_39",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 39,
    "title": "The Arch User Repository (AUR) & Makepkg",
    "desc": "Understand PKGBUILD recipes, source integrity verification, and makepkg.",
    "timeMinutes": 50,
    "cmd": "omarchy pkg aur list 2>/dev/null || pacman -Qm",
    "commands": [
      {
        "cmd": "omarchy pkg aur list 2>/dev/null || pacman -Qm",
        "desc": "List foreign/AUR packages"
      },
      {
        "cmd": "cat PKGBUILD 2>/dev/null || true",
        "desc": "Inspect package build recipe structure"
      }
    ],
    "checklist": [
      "Read and audit PKGBUILD variables (pkgname, source, sha256sums)",
      "Understand build stages: prepare(), build(), package()",
      "Never run makepkg as root"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_40",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 40,
    "title": "Linux Kernel & Module Management",
    "desc": "Inspect the running Linux kernel, load/unload kernel modules, and view parameters.",
    "timeMinutes": 45,
    "cmd": "uname -a",
    "commands": [
      {
        "cmd": "uname -a",
        "desc": "View kernel version and architecture"
      },
      {
        "cmd": "lsmod | head -n 15",
        "desc": "List currently loaded kernel modules"
      },
      {
        "cmd": "modinfo loop",
        "desc": "Display metadata for a kernel module"
      }
    ],
    "checklist": [
      "Inspect loaded modules with lsmod and details with modinfo",
      "Understand modprobe to load and modprobe -r to unload modules",
      "Understand kernel blacklisting in /etc/modprobe.d/"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_41",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 41,
    "title": "Kernel Runtime Parameters: sysctl",
    "desc": "Tune live kernel networking and memory parameters in /proc/sys/.",
    "timeMinutes": 45,
    "cmd": "sysctl net.ipv4.ip_forward",
    "commands": [
      {
        "cmd": "sysctl net.ipv4.ip_forward",
        "desc": "Check IP routing forward state"
      },
      {
        "cmd": "sysctl vm.swappiness",
        "desc": "Check swap usage aggressiveness"
      }
    ],
    "checklist": [
      "View and set runtime parameters with sysctl",
      "Persist kernel tuning in /etc/sysctl.d/*.conf",
      "Understand security parameters (e.g., rp_filter, disable_ipv6, ptrace_scope)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_42",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 42,
    "title": "Storage Basics: Disks, Partitions & Mounts",
    "desc": "Inspect block devices, partition tables (GPT/MBR), and filesystem mounts.",
    "timeMinutes": 55,
    "cmd": "lsblk -f",
    "commands": [
      {
        "cmd": "lsblk -f",
        "desc": "List block devices with filesystems and UUIDs"
      },
      {
        "cmd": "cat /etc/fstab",
        "desc": "View persistent mount table"
      },
      {
        "cmd": "findmnt",
        "desc": "Display hierarchical mount tree"
      }
    ],
    "checklist": [
      "Identify block devices (e.g. nvme0n1, sda, loop0)",
      "Understand filesystem UUIDs vs device names",
      "Read /etc/fstab structure (device, mountpoint, fstype, options, dump, pass)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_43",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 43,
    "title": "Modern Filesystems: Btrfs & Snapshots",
    "desc": "Understand copy-on-write (CoW), subvolumes, and filesystem snapshots.",
    "timeMinutes": 50,
    "cmd": "sudo btrfs subvolume list / 2>/dev/null || df -T",
    "commands": [
      {
        "cmd": "sudo btrfs subvolume list / 2>/dev/null || df -T",
        "desc": "Check subvolume layout"
      },
      {
        "cmd": "snapper list 2>/dev/null || true",
        "desc": "View snapshot timeline"
      }
    ],
    "checklist": [
      "Understand Copy-on-Write (CoW) advantages and trade-offs",
      "Understand subvolumes as independent filesystem branches",
      "Understand atomic snapshot backups and rollbacks"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_44",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 44,
    "title": "Memory, Swap & OOM Killer",
    "desc": "Monitor memory pressure, zram swap compression, and OOM killer behavior.",
    "timeMinutes": 45,
    "cmd": "free -h",
    "commands": [
      {
        "cmd": "free -h",
        "desc": "Examine memory buffers, cache, and swap"
      },
      {
        "cmd": "swapon --show",
        "desc": "List active swap devices and priorities"
      },
      {
        "cmd": "zramctl 2>/dev/null || true",
        "desc": "Inspect compressed in-RAM swap"
      }
    ],
    "checklist": [
      "Differentiate between used, free, buffers, and available memory",
      "Understand zram / compressed swap advantages",
      "Review dmesg/journalctl for Out-Of-Memory (OOM) invocation logs"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_45",
    "track": "sysadmin",
    "trackName": "SysAdmin",
    "phase": 3,
    "phaseName": "System Administration & Services",
    "day": 45,
    "title": "Phase 3 Lab: SysAdmin Incident Response",
    "desc": "Troubleshoot simulated service failure, disk alert, and rogue process.",
    "timeMinutes": 60,
    "cmd": "systemctl --user --failed",
    "commands": [
      {
        "cmd": "systemctl --user --failed",
        "desc": "Check for user unit failures"
      },
      {
        "cmd": "df -h",
        "desc": "Verify storage levels"
      }
    ],
    "checklist": [
      "Diagnose a crashing service unit using journalctl -u <unit>",
      "Write a systemd timer that backs up /etc nightly and logs results",
      "Audit orphan packages and clean package caches safely"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_46",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 46,
    "title": "Network Interfaces & IP Configuration",
    "desc": "Use the modern iproute2 suite (ip addr, ip link, ip route).",
    "timeMinutes": 50,
    "cmd": "ip -br addr show",
    "commands": [
      {
        "cmd": "ip -br addr show",
        "desc": "Brief view of network interfaces and IPs"
      },
      {
        "cmd": "ip route show",
        "desc": "View routing table and default gateway"
      },
      {
        "cmd": "ip link show",
        "desc": "Inspect interface states and MAC addresses"
      }
    ],
    "checklist": [
      "Understand interface naming (eth0, wlan0, enp3s0, lo)",
      "Read IPv4 and IPv6 CIDR notations (/24, /64)",
      "Trace default gateway route resolution"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_47",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 47,
    "title": "Sockets & Port Inspection: ss & netstat",
    "desc": "Discover open ports, active connections, and listening server daemons.",
    "timeMinutes": 45,
    "cmd": "ss -tulpn",
    "commands": [
      {
        "cmd": "ss -tulpn",
        "desc": "List TCP/UDP listening sockets with process names"
      },
      {
        "cmd": "ss -tan state established",
        "desc": "List established connections"
      },
      {
        "cmd": "lsof -i :22 2>/dev/null || ss -tlpn sport = :22",
        "desc": "Inspect processes on port 22"
      }
    ],
    "checklist": [
      "Understand TCP three-way handshake and connection states",
      "Identify listening sockets (0.0.0.0 vs 127.0.0.1 binding security)",
      "Correlate open listening ports to PID and process executable"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_48",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 48,
    "title": "DNS Fundamentals & Resolution (dig, drill, nslookup)",
    "desc": "Understand DNS record types (A, AAAA, CNAME, MX, TXT, PTR) and resolution order.",
    "timeMinutes": 50,
    "cmd": "cat /etc/resolv.conf",
    "commands": [
      {
        "cmd": "cat /etc/resolv.conf",
        "desc": "Check configured nameservers"
      },
      {
        "cmd": "drill archlinux.org || dig archlinux.org",
        "desc": "Query DNS A records"
      },
      {
        "cmd": "getent hosts archlinux.org",
        "desc": "Check system resolver resolution"
      }
    ],
    "checklist": [
      "Understand /etc/nsswitch.conf and hosts resolution priority",
      "Query DNS records with dig or drill",
      "Understand local DNS caching with systemd-resolved"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_49",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 49,
    "title": "Network Diagnostics: ping, traceroute, mtr",
    "desc": "Troubleshoot latency, packet loss, and routing path hops.",
    "timeMinutes": 45,
    "cmd": "ping -c 4 1.1.1.1",
    "commands": [
      {
        "cmd": "ping -c 4 1.1.1.1",
        "desc": "Send 4 ICMP echo requests to verify connectivity"
      },
      {
        "cmd": "traceroute -n 1.1.1.1 2>/dev/null || tracepath 1.1.1.1",
        "desc": "Trace network hop path"
      }
    ],
    "checklist": [
      "Identify latency bottlenecks along a network path",
      "Diagnose MTU discovery issues with tracepath",
      "Troubleshoot ICMP blocking on remote firewalls"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_50",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 50,
    "title": "HTTP, APIs & Transfers: curl & wget",
    "desc": "Interact with HTTP servers, test endpoints, headers, and download files.",
    "timeMinutes": 45,
    "cmd": "curl -I https://archlinux.org",
    "commands": [
      {
        "cmd": "curl -I https://archlinux.org",
        "desc": "Inspect HTTP response headers"
      },
      {
        "cmd": "curl -s -w 'Time: %{time_total}s\n' -o /dev/null https://google.com",
        "desc": "Benchmark response latency"
      },
      {
        "cmd": "curl -X POST -H 'Content-Type: application/json' -d '{\"status\":\"ok\"}' <url>",
        "desc": "Send JSON payload"
      }
    ],
    "checklist": [
      "Read HTTP status codes (200, 301, 401, 403, 404, 500)",
      "Follow redirects (-L) and inspect headers (-I)",
      "Automate API interactions and downloads in scripts"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_51",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 51,
    "title": "SSH Essentials: Key Pairs & Config",
    "desc": "Generate Ed25519 keys, configure ~/.ssh/config, and manage authorized_keys.",
    "timeMinutes": 55,
    "cmd": "ssh-keygen -t ed25519 -C 'user@omarchy'",
    "commands": [
      {
        "cmd": "ssh-keygen -t ed25519 -C 'user@omarchy'",
        "desc": "Generate modern secure SSH keypair"
      },
      {
        "cmd": "ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server",
        "desc": "Install public key to remote host"
      },
      {
        "cmd": "cat ~/.ssh/config 2>/dev/null || true",
        "desc": "Inspect SSH client aliases and profiles"
      }
    ],
    "checklist": [
      "Understand asymmetric public/private key cryptography",
      "Ensure ~/.ssh permissions are strictly 700 and authorized_keys is 600",
      "Configure SSH client shortcuts in ~/.ssh/config"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_52",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 52,
    "title": "SSH Server Hardening (sshd_config)",
    "desc": "Harden OpenSSH daemon to prevent brute-force and credential compromise.",
    "timeMinutes": 55,
    "cmd": "sudo sshd -T | grep -E 'passwordauthentication|permitrootlogin'",
    "commands": [
      {
        "cmd": "sudo sshd -T | grep -E 'passwordauthentication|permitrootlogin'",
        "desc": "Verify active sshd settings"
      },
      {
        "cmd": "grep -E '^PasswordAuthentication|^PermitRootLogin' /etc/ssh/sshd_config 2>/dev/null || true",
        "desc": "Inspect sshd config"
      }
    ],
    "checklist": [
      "Disable PasswordAuthentication in favor of keys",
      "Set PermitRootLogin no or prohibit-password",
      "Limit allowed users with AllowUsers or AllowGroups",
      "Change or restrict default listening ports"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_53",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 53,
    "title": "SSH Port Forwarding & Tunnels",
    "desc": "Local port forwarding (-L), remote forwarding (-R), and dynamic SOCKS5 proxy (-D).",
    "timeMinutes": 55,
    "cmd": "ssh -L 8080:localhost:80 user@remote-host",
    "commands": [
      {
        "cmd": "ssh -L 8080:localhost:80 user@remote-host",
        "desc": "Forward local port 8080 to remote port 80"
      },
      {
        "cmd": "ssh -D 1080 -N user@remote-host",
        "desc": "Create dynamic SOCKS5 proxy tunnel"
      }
    ],
    "checklist": [
      "Understand local forwarding (-L) to access internal remote services",
      "Understand remote forwarding (-R) to expose local service outward",
      "Use SSH dynamic proxy (-D) to route browser traffic securely"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_54",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 54,
    "title": "Linux Firewall with UFW (Uncomplicated Firewall)",
    "desc": "Configure host firewall rules, default drop policies, and port allowances.",
    "timeMinutes": 50,
    "cmd": "sudo ufw status verbose 2>/dev/null || sudo iptables -L -n",
    "commands": [
      {
        "cmd": "sudo ufw status verbose 2>/dev/null || sudo iptables -L -n",
        "desc": "Check firewall rule status"
      },
      {
        "cmd": "sudo ufw default deny incoming",
        "desc": "Enforce strict default drop on incoming traffic"
      },
      {
        "cmd": "sudo ufw allow 22/tcp",
        "desc": "Allow SSH traffic"
      }
    ],
    "checklist": [
      "Understand default deny incoming / allow outgoing policy",
      "Open specific service ports (TCP 22, 80, 443)",
      "Rate limit connections to prevent brute force (ufw limit ssh)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_55",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 55,
    "title": "Modern Packet Filtering: nftables & iptables",
    "desc": "Understand packet filtering chains (INPUT, OUTPUT, FORWARD) and stateful filtering.",
    "timeMinutes": 55,
    "cmd": "sudo iptables -S 2>/dev/null || true",
    "commands": [
      {
        "cmd": "sudo iptables -S 2>/dev/null || true",
        "desc": "Display raw iptables rules"
      },
      {
        "cmd": "sudo nft list ruleset 2>/dev/null || true",
        "desc": "Display nftables ruleset"
      }
    ],
    "checklist": [
      "Understand tables, chains, and rules hierarchy",
      "Understand connection tracking (ctstate ESTABLISHED,RELATED)",
      "Differentiate between DROP (silent discard) and REJECT (explicit ICMP error)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_56",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 56,
    "title": "Network Name Resolution: systemd-resolved",
    "desc": "Manage DNS caching, DNS-over-TLS, and per-interface search domains.",
    "timeMinutes": 45,
    "cmd": "resolvectl status",
    "commands": [
      {
        "cmd": "resolvectl status",
        "desc": "View active DNS servers per interface"
      },
      {
        "cmd": "resolvectl statistics",
        "desc": "View DNS cache hit rates"
      }
    ],
    "checklist": [
      "Inspect per-link DNS configurations with resolvectl",
      "Flush local DNS resolver caches (resolvectl flush-caches)",
      "Understand DNSSEC and DNS-over-TLS (DoT)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_57",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 57,
    "title": "Remote File Syncing with rsync",
    "desc": "Perform incremental, delta-compressed file syncs over encrypted SSH.",
    "timeMinutes": 50,
    "cmd": "rsync -avzP -e ssh /local/dir/ user@server:/remote/dir/",
    "commands": [
      {
        "cmd": "rsync -avzP -e ssh /local/dir/ user@server:/remote/dir/",
        "desc": "Sync directory over SSH with progress"
      },
      {
        "cmd": "rsync --dry-run -av --delete src/ dest/",
        "desc": "Simulate sync before making changes"
      }
    ],
    "checklist": [
      "Always test risky syncs with --dry-run first",
      "Understand trailing slash significance: src/ vs src",
      "Preserve permissions, timestamps, symlinks with -a (archive mode)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_58",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 58,
    "title": "VPN & Secure Mesh Networks (WireGuard & Tailscale)",
    "desc": "Understand peer-to-peer mesh networking, encrypted tunnels, and WireGuard cryptography.",
    "timeMinutes": 50,
    "cmd": "ip link show type wireguard 2>/dev/null || true",
    "commands": [
      {
        "cmd": "ip link show type wireguard 2>/dev/null || true",
        "desc": "Check for active WireGuard interfaces"
      },
      {
        "cmd": "tailscale status 2>/dev/null || true",
        "desc": "Check Tailscale mesh node connectivity"
      }
    ],
    "checklist": [
      "Understand how WireGuard utilizes Noise protocol and ChaCha20-Poly1305",
      "Compare traditional client-server VPNs with peer-to-peer mesh networks",
      "Inspect virtual VPN interface routing"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_59",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 59,
    "title": "Web Servers & Reverse Proxies (Nginx / Caddy)",
    "desc": "Understand how reverse proxies route incoming HTTP/S requests to backends.",
    "timeMinutes": 55,
    "cmd": "curl -I https://omarchy.org",
    "commands": [
      {
        "cmd": "curl -I https://omarchy.org",
        "desc": "Examine reverse proxy headers (Server, Via)"
      }
    ],
    "checklist": [
      "Understand reverse proxy roles: TLS termination, load balancing, caching",
      "Read simple reverse proxy configuration blocks (proxy_pass)",
      "Understand automatic HTTPS and ACME Let's Encrypt certificates"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_60",
    "track": "networking",
    "trackName": "Networking",
    "phase": 4,
    "phaseName": "Networking & Remote Services",
    "day": 60,
    "title": "Phase 4 Lab: Hardened Server Bastion Setup",
    "desc": "Audit open ports, configure a strict firewall, and enforce key-only SSH.",
    "timeMinutes": 60,
    "cmd": "ss -tulpn",
    "commands": [
      {
        "cmd": "ss -tulpn",
        "desc": "Audit all current listening sockets"
      },
      {
        "cmd": "ip addr show",
        "desc": "Verify network configuration"
      }
    ],
    "checklist": [
      "Scan and list every open port on your machine",
      "Configure firewall to allow only required ports and drop everything else",
      "Simulate an unauthorized remote connection attempt"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_61",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 61,
    "title": "The Security Mindset & Threat Modeling",
    "desc": "Understand the CIA Triad, Attack Surface, and Defense-in-Depth on Linux systems.",
    "timeMinutes": 45,
    "cmd": "who && w",
    "commands": [
      {
        "cmd": "who && w",
        "desc": "Check who is logged into the system"
      },
      {
        "cmd": "last -n 10",
        "desc": "Review recent login sessions"
      }
    ],
    "checklist": [
      "Identify your system attack surface (open ports, SUID binaries, cron jobs)",
      "Understand Confidentiality, Integrity, and Availability trade-offs",
      "Define a Threat Model for a Linux workstation vs a public server"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_62",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 62,
    "title": "Security Auditing with Lynis",
    "desc": "Perform automated security and compliance scans on a Linux system.",
    "timeMinutes": 55,
    "cmd": "sudo lynis audit system --quick 2>/dev/null || echo 'Install lynis to run scan'",
    "commands": [
      {
        "cmd": "sudo lynis audit system --quick 2>/dev/null || echo 'Install lynis to run scan'",
        "desc": "Run automated security audit"
      }
    ],
    "checklist": [
      "Run a system audit and review the Lynis Hardening Index",
      "Inspect /var/log/lynis.log for warnings and suggestions",
      "Identify top 3 actionable hardening recommendations"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_63",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 63,
    "title": "SUID, SGID & Capabilities Audit",
    "desc": "Hunt for dangerous SUID binaries and Linux Capabilities (getcap/setcap).",
    "timeMinutes": 50,
    "cmd": "find / -perm -4000 -type f 2>/dev/null",
    "commands": [
      {
        "cmd": "find / -perm -4000 -type f 2>/dev/null",
        "desc": "Find all SUID binaries"
      },
      {
        "cmd": "getcap -r / 2>/dev/null",
        "desc": "Audit binaries granted elevated capabilities"
      }
    ],
    "checklist": [
      "Check found SUID binaries against GTFOBins (gtfobins.github.io)",
      "Understand how Linux Capabilities divide root privileges (cap_net_bind_service)",
      "Remove unnecessary SUID bits with chmod u-s <file>"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_64",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 64,
    "title": "Privilege Escalation: Sudo Misconfigurations",
    "desc": "Understand how misconfigured sudo permissions lead to instant root takeover.",
    "timeMinutes": 55,
    "cmd": "sudo -l",
    "commands": [
      {
        "cmd": "sudo -l",
        "desc": "List allowed commands for current user"
      }
    ],
    "checklist": [
      "Analyze sudo -l output for dangerous binaries (vim, find, bash, python)",
      "Understand how wildcards in sudoers create bypass vectors",
      "Verify secure_path and env_reset are enabled in sudoers"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_65",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 65,
    "title": "Authentication & Pluggable Authentication Modules (PAM)",
    "desc": "Understand how Linux handles logins, passwords, fingerprint, and MFA in /etc/pam.d/.",
    "timeMinutes": 55,
    "cmd": "cat /etc/pam.d/system-auth",
    "commands": [
      {
        "cmd": "cat /etc/pam.d/system-auth",
        "desc": "Inspect core system authentication stack"
      }
    ],
    "checklist": [
      "Understand PAM module types: auth, account, password, session",
      "Understand control flags: required, requisite, sufficient, optional",
      "Explore how fingerprint and YubiKey MFA integrate into PAM"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_66",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 66,
    "title": "Password Hashing & /etc/shadow Security",
    "desc": "Understand modern password hashing algorithms (SHA-512, yescrypt, bcrypt) and salt.",
    "timeMinutes": 50,
    "cmd": "sudo grep '$y$' /etc/shadow 2>/dev/null || sudo head -n 3 /etc/shadow",
    "commands": [
      {
        "cmd": "sudo grep '$y$' /etc/shadow 2>/dev/null || sudo head -n 3 /etc/shadow",
        "desc": "Inspect modern yescrypt/SHA512 hashes"
      }
    ],
    "checklist": [
      "Decode /etc/shadow fields: user, hash, last changed, min/max age, warning",
      "Understand cryptographic salt preventing rainbow table precomputation",
      "Enforce strong password policy requirements"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_67",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 67,
    "title": "Brute-Force Protection with Fail2ban",
    "desc": "Automatically detect and ban abusive IP addresses attacking SSH and services.",
    "timeMinutes": 50,
    "cmd": "sudo fail2ban-client status 2>/dev/null || true",
    "commands": [
      {
        "cmd": "sudo fail2ban-client status 2>/dev/null || true",
        "desc": "Check fail2ban jail status"
      }
    ],
    "checklist": [
      "Understand how fail2ban parses log files for failed attempts with regex",
      "Configure maxretry, findtime, and bantime in jail.local",
      "Inspect dynamic firewall DROP rules created by fail2ban"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_68",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 68,
    "title": "File Integrity Monitoring (AIDE / Tripwire)",
    "desc": "Detect unauthorized changes to system binaries and configuration files.",
    "timeMinutes": 50,
    "cmd": "sha256sum /usr/bin/sudo /etc/passwd",
    "commands": [
      {
        "cmd": "sha256sum /usr/bin/sudo /etc/passwd",
        "desc": "Calculate cryptographic checksums of critical files"
      }
    ],
    "checklist": [
      "Understand how file integrity databases detect rootkit modifications",
      "Generate and verify cryptographic hash manifests",
      "Distinguish legitimate package upgrades from malicious file tampering"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_69",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 69,
    "title": "Linux Auditing Framework (auditd)",
    "desc": "Monitor system calls, file access events, and execution of sensitive binaries.",
    "timeMinutes": 55,
    "cmd": "sudo auditctl -s 2>/dev/null || true",
    "commands": [
      {
        "cmd": "sudo auditctl -s 2>/dev/null || true",
        "desc": "Check audit daemon status"
      },
      {
        "cmd": "sudo aureport -au 2>/dev/null || true",
        "desc": "View authentication attempt summary"
      }
    ],
    "checklist": [
      "Write an audit rule to monitor changes to /etc/passwd and /etc/shadow",
      "Inspect audit logs using ausearch and aureport",
      "Understand syscall tracing for incident investigations"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_70",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 70,
    "title": "Network Scanning & Discovery with Nmap",
    "desc": "Perform host discovery, port scanning, service version detection, and OS fingerprinting.",
    "timeMinutes": 55,
    "cmd": "nmap -sT 127.0.0.1",
    "commands": [
      {
        "cmd": "nmap -sT 127.0.0.1",
        "desc": "Scan local open TCP ports"
      },
      {
        "cmd": "nmap -sV -p 22 127.0.0.1",
        "desc": "Detect service version running on port 22"
      }
    ],
    "checklist": [
      "Differentiate between SYN stealth scan (-sS) and TCP connect scan (-sT)",
      "Run banner grabbing and service detection (-sV)",
      "Use Nmap Scripting Engine (NSE) for vulnerability checks (--script vuln)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_71",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 71,
    "title": "Network Packet Capture with tcpdump",
    "desc": "Capture, filter, and inspect raw network packets live on network interfaces.",
    "timeMinutes": 55,
    "cmd": "sudo tcpdump -i any -n -c 10 'tcp port 80 or tcp port 443'",
    "commands": [
      {
        "cmd": "sudo tcpdump -i any -n -c 10 'tcp port 80 or tcp port 443'",
        "desc": "Capture 10 HTTP/HTTPS packets"
      },
      {
        "cmd": "sudo tcpdump -i any -w /tmp/traffic.pcap -c 50",
        "desc": "Write raw pcap file for Wireshark"
      }
    ],
    "checklist": [
      "Construct Berkeley Packet Filters (BPF): 'host X and port Y'",
      "Analyze DNS query packets and HTTP plaintext traffic",
      "Save and load packet traces with -w and -r"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_72",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 72,
    "title": "TLS/SSL Certificates & OpenSSL",
    "desc": "Inspect certificates, verify expiry, and test remote cipher suites.",
    "timeMinutes": 50,
    "cmd": "openssl s_client -connect archlinux.org:443 -servername archlinux.org </dev/null",
    "commands": [
      {
        "cmd": "openssl s_client -connect archlinux.org:443 -servername archlinux.org </dev/null",
        "desc": "Verify remote TLS certificate chain"
      },
      {
        "cmd": "openssl x509 -in cert.pem -text -noout 2>/dev/null || true",
        "desc": "Inspect certificate details and expiry"
      }
    ],
    "checklist": [
      "Understand Certificate Authorities (CAs), chains of trust, and public keys",
      "Verify TLS certificate expiration and Subject Alternative Names (SAN)",
      "Generate a self-signed certificate for internal testing"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_73",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 73,
    "title": "AppArmor & Mandatory Access Control (MAC)",
    "desc": "Confine applications with security profiles to restrict file and network access.",
    "timeMinutes": 50,
    "cmd": "sudo aa-status 2>/dev/null || echo 'Check MAC status'",
    "commands": [
      {
        "cmd": "sudo aa-status 2>/dev/null || echo 'Check MAC status'",
        "desc": "Check AppArmor profile status"
      }
    ],
    "checklist": [
      "Understand difference between Discretionary (DAC) and Mandatory (MAC) access control",
      "Understand AppArmor enforcement modes: enforce vs complain",
      "Review an example AppArmor profile restricting a browser or daemon"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_74",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 74,
    "title": "Rootkits & Malware Detection: rkhunter & chkrootkit",
    "desc": "Scan for signs of userland and kernel rootkits, backdoors, and trojaned binaries.",
    "timeMinutes": 50,
    "cmd": "sudo rkhunter --check --skip-keypress 2>/dev/null || echo 'Install rkhunter'",
    "commands": [
      {
        "cmd": "sudo rkhunter --check --skip-keypress 2>/dev/null || echo 'Install rkhunter'",
        "desc": "Execute rootkit scan"
      }
    ],
    "checklist": [
      "Understand how rootkits hook system calls or replace system binaries",
      "Run a known rootkit signature check",
      "Distinguish false positives from actual security anomalies"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_75",
    "track": "security",
    "trackName": "CyberSec",
    "phase": 5,
    "phaseName": "Cybersecurity Fundamentals & Host Hardening",
    "day": 75,
    "title": "Phase 5 Lab: Complete Host Hardening",
    "desc": "Apply a comprehensive security baseline: audit SUID, verify SSH, and enforce firewall.",
    "timeMinutes": 60,
    "cmd": "sudo ufw status verbose",
    "commands": [
      {
        "cmd": "sudo ufw status verbose",
        "desc": "Verify firewall rules"
      },
      {
        "cmd": "sudo sshd -T",
        "desc": "Verify SSH parameters"
      }
    ],
    "checklist": [
      "Audit and remove any unnecessary SUID permissions on your test filesystem",
      "Ensure root login and password authentication are disabled in SSH",
      "Verify the host rejects unsolicited incoming connections"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_76",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 76,
    "title": "Log Forensics: Analyzing Auth & System Logs",
    "desc": "Hunt for brute-force attacks, unauthorized sudo use, and lateral movement in logs.",
    "timeMinutes": 55,
    "cmd": "journalctl _COMM=sudo --since '7 days ago'",
    "commands": [
      {
        "cmd": "journalctl _COMM=sudo --since '7 days ago'",
        "desc": "Review all sudo command executions"
      },
      {
        "cmd": "journalctl -u sshd | grep -i 'Failed password' | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr",
        "desc": "Extract attacking IP frequency"
      }
    ],
    "checklist": [
      "Detect brute-force patterns by aggregating IP occurrences",
      "Audit privileged sudo commands run by various users",
      "Recognize log tampering indicators (cleared logs, missing timestamps)"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_77",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 77,
    "title": "Investigating Rogue & Hidden Processes",
    "desc": "Find malicious processes hiding behind deleted binaries or misleading names.",
    "timeMinutes": 50,
    "cmd": "ls -l /proc/*/exe 2>/dev/null | grep '(deleted)'",
    "commands": [
      {
        "cmd": "ls -l /proc/*/exe 2>/dev/null | grep '(deleted)'",
        "desc": "Find processes executing from unlinked binaries"
      },
      {
        "cmd": "find /proc -maxdepth 2 -name cwd -ls 2>/dev/null",
        "desc": "Inspect working directories of running processes"
      }
    ],
    "checklist": [
      "Detect memory-only processes running from deleted executables",
      "Inspect /proc/<PID>/environ and /proc/<PID>/cmdline",
      "Investigate processes consuming abnormal CPU/RAM in btop"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_78",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 78,
    "title": "Persistence Mechanisms: How Malware Stays Alive",
    "desc": "Audit common persistence hooks: cron, systemd units, shell rc files, and SSH keys.",
    "timeMinutes": 55,
    "cmd": "ls -la /etc/cron* /var/spool/cron/",
    "commands": [
      {
        "cmd": "ls -la /etc/cron* /var/spool/cron/",
        "desc": "Audit all scheduled cron directories"
      },
      {
        "cmd": "find /etc/systemd/system/ ~/.config/systemd/user/ -name '*.service'",
        "desc": "Audit custom systemd units"
      },
      {
        "cmd": "cat ~/.bashrc ~/.bash_profile ~/.zshrc 2>/dev/null | grep -E 'curl|wget|bash|eval'",
        "desc": "Inspect suspicious shell hooks"
      }
    ],
    "checklist": [
      "Audit cron jobs and systemd user services for hidden persistence",
      "Check ~/.ssh/authorized_keys for unauthorized keys",
      "Inspect shell profile scripts (~/.bashrc, /etc/profile) for hidden aliases or malicious exports"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_79",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 79,
    "title": "Hands-on Wargame: OverTheWire Bandit (Levels 1\u201310)",
    "desc": "Practice real Linux command-line skills on the classic Bandit security wargame.",
    "timeMinutes": 60,
    "cmd": "ssh bandit0@bandit.labs.overthewire.org -p 2220",
    "commands": [
      {
        "cmd": "ssh bandit0@bandit.labs.overthewire.org -p 2220",
        "desc": "Connect to Bandit challenge server (password: bandit0)"
      }
    ],
    "checklist": [
      "Complete Levels 1\u20135: file reading, spaces in filenames, hidden files",
      "Complete Levels 6\u201310: file properties, search by size, base64 decoding",
      "Document solutions in your personal study notebook"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_80",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 80,
    "title": "Hands-on Wargame: OverTheWire Bandit (Levels 11\u201320)",
    "desc": "Advance to rot13, tar/bzip compression loops, SSH keys, and localhost socket netcat.",
    "timeMinutes": 60,
    "cmd": "nc -zv localhost 30000-30005 2>/dev/null",
    "commands": [
      {
        "cmd": "nc -zv localhost 30000-30005 2>/dev/null",
        "desc": "Scan port range with netcat"
      }
    ],
    "checklist": [
      "Complete Levels 11\u201315: rot13 decoding, recurring archives, SSL client connections",
      "Complete Levels 16\u201320: port scanning, RSA key exchange, SUID escalation",
      "Practice piping tools into netcat and openssl s_client"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_81",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 81,
    "title": "Container Security: Docker & Podman Basics",
    "desc": "Understand Linux namespaces, cgroups, rootless containers, and container breakout vectors.",
    "timeMinutes": 55,
    "cmd": "docker ps 2>/dev/null || podman ps 2>/dev/null || true",
    "commands": [
      {
        "cmd": "docker ps 2>/dev/null || podman ps 2>/dev/null || true",
        "desc": "Check running container instances"
      }
    ],
    "checklist": [
      "Understand how containers use Linux namespaces (PID, NET, MNT, UTS, IPC)",
      "Differentiate rootless containers from privileged root Docker containers",
      "Understand security risks of mounting /var/run/docker.sock into a container"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_82",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 82,
    "title": "Introduction to Penetration Testing & Metasploit",
    "desc": "Understand ethical hacking phases: Recon, Scanning, Exploitation, Post-Exploitation.",
    "timeMinutes": 55,
    "cmd": "which msfconsole 2>/dev/null || echo 'Metasploit framework tool'",
    "commands": [
      {
        "cmd": "which msfconsole 2>/dev/null || echo 'Metasploit framework tool'",
        "desc": "Locate penetration testing suite"
      }
    ],
    "checklist": [
      "Understand the legal and ethical boundaries of penetration testing",
      "Understand common exploit terminology: payload, exploit, meterpreter, shellcode",
      "Explore TryHackMe or HackTheBox free starter tracks"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_83",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 83,
    "title": "Web Application Security: OWASP Top 10",
    "desc": "Understand core web vulnerabilities: SQL Injection, XSS, CSRF, SSRF, Broken Access Control.",
    "timeMinutes": 50,
    "cmd": "curl -s https://owasp.org/www-project-top-ten/ | grep -i 'A0' || true",
    "commands": [
      {
        "cmd": "curl -s https://owasp.org/www-project-top-ten/ | grep -i 'A0' || true",
        "desc": "Review OWASP Top 10 categories"
      }
    ],
    "checklist": [
      "Understand SQL Injection (SQLi) and how prepared statements prevent it",
      "Understand Cross-Site Scripting (XSS) and Content Security Policy (CSP)",
      "Understand Server-Side Request Forgery (SSRF) in cloud environments"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_84",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 84,
    "title": "Backup & Disaster Recovery Strategy",
    "desc": "Implement the 3-2-1 backup rule, encrypted offsite backups, and recovery testing.",
    "timeMinutes": 50,
    "cmd": "cat << 'EOF'\n3 Copies of data\n2 Different media types\n1 Offsite backup\nEOF",
    "commands": [
      {
        "cmd": "cat << 'EOF'\n3 Copies of data\n2 Different media types\n1 Offsite backup\nEOF",
        "desc": "The 3-2-1 Rule"
      }
    ],
    "checklist": [
      "Design a resilient backup strategy following the 3-2-1 rule",
      "Encrypt backup archives with GPG or Age before cloud storage",
      "Perform a test restore drills to verify backup archive integrity"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_85",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 85,
    "title": "Security Incident Response Playbook",
    "desc": "Walk through incident handling phases: Preparation, Detection, Containment, Eradication, Recovery.",
    "timeMinutes": 55,
    "cmd": "ip route | grep default",
    "commands": [
      {
        "cmd": "ip route | grep default",
        "desc": "Check network isolation readiness"
      }
    ],
    "checklist": [
      "Step 1: Isolate compromised host from network (ip link set dev down)",
      "Step 2: Collect volatile forensic memory and state before reboot",
      "Step 3: Identify entry vector and patch root cause before restoring"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_86",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 86,
    "title": "SELinux & Advanced Mandatory Access Control",
    "desc": "Understand Security-Enhanced Linux (SELinux) contexts, policies, and booleans.",
    "timeMinutes": 50,
    "cmd": "ls -Z /etc/passwd 2>/dev/null || echo 'SELinux context display'",
    "commands": [
      {
        "cmd": "ls -Z /etc/passwd 2>/dev/null || echo 'SELinux context display'",
        "desc": "Inspect security contexts"
      }
    ],
    "checklist": [
      "Understand SELinux components: User, Role, Type, Level",
      "Understand enforcing vs permissive modes",
      "Troubleshoot access denial using audit logs and setroubleshoot"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_87",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 87,
    "title": "Automated Vulnerability Scanning (OpenVAS / Nuclei)",
    "desc": "Use vulnerability scanners to identify CVEs, outdated packages, and misconfigurations.",
    "timeMinutes": 50,
    "cmd": "which nuclei 2>/dev/null || echo 'Nuclei vulnerability scanner'",
    "commands": [
      {
        "cmd": "which nuclei 2>/dev/null || echo 'Nuclei vulnerability scanner'",
        "desc": "Check for automated vulnerability tooling"
      }
    ],
    "checklist": [
      "Understand Common Vulnerabilities and Exposures (CVE) and CVSS scores",
      "Review vulnerability report outputs and prioritize critical/high risks",
      "Distinguish automated scanner false positives from real exploits"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_88",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 88,
    "title": "Career Paths & Certifications in SysAdmin & CyberSec",
    "desc": "Plan certification roadmaps (CompTIA Security+, RHCSA, CEH, OSCP, eJPT).",
    "timeMinutes": 45,
    "cmd": "echo 'Certifications: RHCSA -> Security+ -> BTL1 / OSCP'",
    "commands": [
      {
        "cmd": "echo 'Certifications: RHCSA -> Security+ -> BTL1 / OSCP'",
        "desc": "Industry roadmap"
      }
    ],
    "checklist": [
      "Explore SysAdmin paths: Red Hat Certified System Administrator (RHCSA), Linux Foundation (LFCS)",
      "Explore Defensive (Blue Team) paths: Security+, CySA+, BTL1",
      "Explore Offensive (Red Team) paths: eJPT, PNPT, OSCP"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_89",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 89,
    "title": "Capstone Project: End-to-End System Hardening & Audit",
    "desc": "Audit, harden, firewall, and document your personal Linux workstation.",
    "timeMinutes": 60,
    "cmd": "uptime && sudo ss -tulpn",
    "commands": [
      {
        "cmd": "uptime && sudo ss -tulpn",
        "desc": "System baseline verification"
      }
    ],
    "checklist": [
      "Audit running services and disable unused network ports",
      "Verify SSH hardening and firewall drop rules",
      "Run a Lynis or rkhunter scan and achieve a hardened baseline"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  },
  {
    "id": "day_90",
    "track": "threat_hunting",
    "trackName": "Forensics",
    "phase": 6,
    "phaseName": "Incident Response, Threat Hunting & Hands-on Labs",
    "day": 90,
    "title": "Final Review & Continuous Learning Routine",
    "desc": "Establish daily habits: security news (The Hacker News, BleepingComputer), daily terminal practice.",
    "timeMinutes": 45,
    "cmd": "echo 'Congratulations on completing the 90-Day Linux, SysAdmin & CyberSec Roadmap!'",
    "commands": [
      {
        "cmd": "echo 'Congratulations on completing the 90-Day Linux, SysAdmin & CyberSec Roadmap!'",
        "desc": "Roadmap completion"
      }
    ],
    "checklist": [
      "Review your progress and checklist across all 6 phases",
      "Bookmark ongoing practice resources: OverTheWire, TryHackMe, LinuxJourney",
      "Set your next 90-day learning objective"
    ],
    "verifyCmd": "",
    "explainer": "",
    "wikiUrl": "https://wiki.archlinux.org/"
  }
];

function getCurriculumList(mode) {
  if (mode === "90") return TOPICS_90;
  return TOPICS_48;
}

function getTracks(mode) {
  if (mode === "90") {
    return [
      { id: "daily", label: " Daily Focus" },
      { id: "foundations", label: " Foundations" },
      { id: "scripting", label: " Scripting" },
      { id: "sysadmin", label: " SysAdmin" },
      { id: "networking", label: " Network" },
      { id: "security", label: " Hardening" },
      { id: "threat_hunting", label: " Forensics" },
      { id: "all", label: " All (90)" }
    ];
  }
  return [
    { id: "daily", label: " Daily Focus" },
    { id: "linux", label: " Linux Core" },
    { id: "sysadmin", label: " SysAdmin" },
    { id: "security", label: " CyberSec" },
    { id: "all", label: " All (48)" }
  ];
}

function allTopics(mode) {
  return getCurriculumList(mode);
}

function topicsForTrack(track, mode) {
  var list = getCurriculumList(mode);
  if (!track || track === "all") return list;
  var out = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].track === track) out.push(list[i]);
  }
  return out;
}

function dailyTopics(completedMap, mode) {
  completedMap = completedMap || {};
  var list = getCurriculumList(mode);
  var out = [];
  var tracks = (mode === "90")
    ? ["foundations", "scripting", "sysadmin", "networking", "security", "threat_hunting"]
    : ["linux", "sysadmin", "security"];

  // First pick 1 uncompleted from each track
  for (var t = 0; t < tracks.length; t++) {
    var trk = tracks[t];
    for (var i = 0; i < list.length; i++) {
      if (list[i].track === trk && !completedMap[list[i].id]) {
        out.push(list[i]);
        break;
      }
    }
    if (out.length >= 4) break;
  }

  // If fewer than 4 picked, fill with any remaining uncompleted
  if (out.length < 4) {
    for (var j = 0; j < list.length; j++) {
      if (!completedMap[list[j].id]) {
        var already = false;
        for (var k = 0; k < out.length; k++) {
          if (out[k].id === list[j].id) { already = true; break; }
        }
        if (!already) {
          out.push(list[j]);
          if (out.length >= 4) break;
        }
      }
    }
  }

  // If all completed, show first 4
  if (out.length === 0) {
    return list.slice(0, 4);
  }

  return out;
}

function filterTopics(list, query, filterStatus, completedMap) {
  if (!list) return [];
  completedMap = completedMap || {};
  filterStatus = filterStatus || "all";

  var q = (query || "").trim().toLowerCase();
  var out = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var isDone = !!completedMap[item.id];

    if (filterStatus === "incomplete" && isDone) continue;
    if (filterStatus === "completed" && !isDone) continue;

    if (q !== "") {
      var hay = (item.title + " " + (item.desc || "") + " " + (item.cmd || "") + " " + (item.trackName || "") + " day " + item.day).toLowerCase();
      if (hay.indexOf(q) === -1) continue;
    }

    out.push(item);
  }
  return out;
}

function calculateStats(completedMap, mode) {
  completedMap = completedMap || {};
  var list = getCurriculumList(mode);
  var total = list.length;
  var completed = 0;

  var trackStats = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var trk = item.track || "other";
    if (!trackStats[trk]) {
      trackStats[trk] = { total: 0, completed: 0, percent: 0, name: item.trackName || trk };
    }
    trackStats[trk].total++;

    var done = !!completedMap[item.id];
    if (done) {
      completed++;
      trackStats[trk].completed++;
    }
  }

  for (var k in trackStats) {
    var ts = trackStats[k];
    ts.percent = ts.total > 0 ? Math.round((ts.completed / ts.total) * 100) : 0;
  }

  var percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total: total,
    completed: completed,
    percent: percent,
    tracks: trackStats,
    linuxTotal: (trackStats.linux || trackStats.foundations || {}).total || 0,
    linuxCompleted: (trackStats.linux || trackStats.foundations || {}).completed || 0,
    linuxPercent: (trackStats.linux || trackStats.foundations || {}).percent || 0,
    sysadminTotal: (trackStats.sysadmin || {}).total || 0,
    sysadminCompleted: (trackStats.sysadmin || {}).completed || 0,
    sysadminPercent: (trackStats.sysadmin || {}).percent || 0,
    securityTotal: (trackStats.security || {}).total || 0,
    securityCompleted: (trackStats.security || {}).completed || 0,
    securityPercent: (trackStats.security || {}).percent || 0
  };
}

function getBadges(completedMap, streak, mode) {
  completedMap = completedMap || {};
  streak = streak || 1;
  var stats = calculateStats(completedMap, mode);

  return [
    {
      id: "first_step",
      title: "First Step",
      icon: "🚀",
      desc: "Completed your first Linux learning topic",
      unlocked: stats.completed >= 1
    },
    {
      id: "streak_3",
      title: "3-Day Momentum",
      icon: "🔥",
      desc: "Maintained a 3-day continuous study streak",
      unlocked: streak >= 3
    },
    {
      id: "streak_7",
      title: "Week Warrior",
      icon: "⚡",
      desc: "Kept a 7-day study habit alive without skipping",
      unlocked: streak >= 7
    },
    {
      id: "streak_14",
      title: "Fortnight Legend",
      icon: "🏆",
      desc: "Reached a remarkable 14-day study streak",
      unlocked: streak >= 14
    },
    {
      id: "core_apprentice",
      title: "Linux Explorer",
      icon: "🐧",
      desc: "Completed 5 core Linux filesystem and shell tasks",
      unlocked: stats.linuxCompleted >= 5
    },
    {
      id: "sysadmin_novice",
      title: "SysAdmin Scout",
      icon: "",
      desc: "Completed 5 systemd, storage, or networking tasks",
      unlocked: stats.sysadminCompleted >= 5
    },
    {
      id: "security_guard",
      title: "Firewall Guardian",
      icon: "🛡️",
      desc: "Completed 5 cyber security and hardening topics",
      unlocked: stats.securityCompleted >= 5
    },
    {
      id: "halfway",
      title: "Halfway Hero",
      icon: "🎖️",
      desc: "Achieved 50% overall curriculum completion",
      unlocked: stats.percent >= 50
    },
    {
      id: "mastery",
      title: "Linux Grandmaster",
      icon: "👑",
      desc: "100% curriculum conquered! True mastery achieved.",
      unlocked: stats.percent >= 100
    }
  ];
}

function exportMarkdown(progressData, mode) {
  progressData = progressData || {};
  var completedMap = progressData.completed || {};
  var streak = progressData.streak || 1;
  var stats = calculateStats(completedMap, mode);
  var list = getCurriculumList(mode);

  var lines = [];
  lines.push("# 🐧 My Linux Learning Journey");
  lines.push("");
  lines.push("> Tracked with **Omarchy Linux Learning Hub**");
  lines.push("");
  lines.push("## 📊 Progress Summary");
  lines.push("- **Overall Progress**: " + stats.completed + " / " + stats.total + " (" + stats.percent + "%)");
  lines.push("- **Current Streak**: 🔥 " + streak + " day(s)");
  lines.push("- **Curriculum**: " + (mode === "90" ? "90-Day Full Curriculum" : "48-Day Intensive Track"));
  lines.push("");
  lines.push("## 🏆 Badges & Achievements");
  var badges = getBadges(completedMap, streak, mode);
  for (var b = 0; b < badges.length; b++) {
    var bg = badges[b];
    lines.push("- " + (bg.unlocked ? "✅ " : "🔒 ") + bg.icon + " **" + bg.title + "**: " + bg.desc);
  }
  lines.push("");
  lines.push("## 📋 Learning Curriculum Checklist");
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var done = !!completedMap[item.id];
    var check = done ? "[x]" : "[ ]";
    lines.push("- " + check + " **Day " + item.day + "**: " + item.title + " *(" + item.trackName + ")*");
    lines.push("  - *Command*: `" + item.cmd + "`");
    if (item.explainer) {
      lines.push("  - *Syntax*: " + item.explainer);
    }
  }
  lines.push("");
  lines.push("---\n*Generated by Omarchy Linux Learning Hub*");
  return lines.join("\n");
}
