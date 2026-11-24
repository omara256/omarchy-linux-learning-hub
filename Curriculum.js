// Linux Learning Hub Curriculum
// 48 Comprehensive Topics: Linux Core (16), System Administration (16), Cyber Security (16)

var TOPICS = [
  // ==========================================
  // TRACK 1: LINUX ITSELF (CORE FUNDAMENTALS)
  // ==========================================
  {
    id: "fhs_overview",
    track: "linux",
    trackName: "Linux Core",
    day: 1,
    title: "Filesystem Hierarchy Standard (FHS)",
    desc: "Understand standard root directories: /bin, /etc, /home, /var, /dev, /proc, /sys, /tmp and their system roles.",
    cmd: "ls -la / && tree -L 1 / && df -h"
  },
  {
    id: "shell_navigation",
    track: "linux",
    trackName: "Linux Core",
    day: 2,
    title: "CLI Navigation & File Operations",
    desc: "Master navigation, absolute vs relative paths, creating, copying, moving, and safely deleting files.",
    cmd: "pwd && cd ~ && mkdir -p lab/test && cp -r lab backup && mv backup lab_bak && rm -rf lab_bak"
  },
  {
    id: "file_viewing",
    track: "linux",
    trackName: "Linux Core",
    day: 3,
    title: "Viewing & Paging Files (cat, less, head, tail)",
    desc: "Inspect file contents without opening editors; use tail -f to monitor live logs and less for scrolling.",
    cmd: "cat /etc/os-release && less /etc/services && head -n 10 /etc/passwd && tail -f /var/log/pacman.log"
  },
  {
    id: "streams_redirection",
    track: "linux",
    trackName: "Linux Core",
    day: 4,
    title: "I/O Redirection & Pipes (stdin, stdout, stderr)",
    desc: "Direct stdout (1), stderr (2), append (>>), pipe data (|), and discard unneeded output to /dev/null.",
    cmd: "echo 'learning linux' > out.txt && ls /root 2> err.txt && ls -la /etc | grep conf | wc -l"
  },
  {
    id: "text_processing_grep",
    track: "linux",
    trackName: "Linux Core",
    day: 5,
    title: "Text Search & Regex with grep",
    desc: "Filter text using regular expressions, recursive directory searching (-r), line numbers (-n), and inverted matches (-v).",
    cmd: "grep -rnE 'error|failed' /var/log/ 2>/dev/null && grep -v '^#' /etc/fstab"
  },
  {
    id: "text_processing_awk_sed",
    track: "linux",
    trackName: "Linux Core",
    day: 6,
    title: "Stream Editing & Parsing (sed & awk)",
    desc: "Extract specific columns with awk or cut, and perform automated search-and-replace using sed.",
    cmd: "awk -F: '{print $1, $3}' /etc/passwd && sed -i 's/foo/bar/g' file.txt && cut -d: -f1 /etc/group"
  },
  {
    id: "permissions_basic",
    track: "linux",
    trackName: "Linux Core",
    day: 7,
    title: "File Permissions & Ownership (chmod & chown)",
    desc: "Master User, Group, Others permissions (r=4, w=2, x=1), octal modes, changing ownership, and default umask.",
    cmd: "chmod 755 script.sh && chmod u=rwx,go=rx script.sh && chown $USER:$USER file.txt && umask"
  },
  {
    id: "permissions_special",
    track: "linux",
    trackName: "Linux Core",
    day: 8,
    title: "Special Bits: SUID, SGID & Sticky Bit",
    desc: "SUID (run as file owner), SGID (inherit directory group), and Sticky Bit (prevent deleting others' files).",
    cmd: "chmod u+s /path/binary && chmod g+s /shared/dir && chmod +t /tmp/shared && ls -ld /tmp"
  },
  {
    id: "links_and_inodes",
    track: "linux",
    trackName: "Linux Core",
    day: 9,
    title: "Hard Links vs Soft (Symbolic) Links & Inodes",
    desc: "Learn differences between pointer symlinks and direct inode hard links; verify inode numbers with ls -i.",
    cmd: "ln -s /etc/issue link.txt && ln target.txt hardlink.txt && ls -li && stat link.txt"
  },
  {
    id: "find_and_locate",
    track: "linux",
    trackName: "Linux Core",
    day: 10,
    title: "Filesystem Search (find & which)",
    desc: "Search filesystems by name, modification time, file size, permissions, and locate executable binaries.",
    cmd: "find /etc -name '*.conf' 2>/dev/null && find . -type f -mmin -60 && which bash"
  },
  {
    id: "archives_compression",
    track: "linux",
    trackName: "Linux Core",
    day: 11,
    title: "Archiving & Compression (tar, gzip, xz)",
    desc: "Create, view, and extract compressed tarballs with gzip (.tar.gz), bzip2 (.tar.bz2), and xz (.tar.xz).",
    cmd: "tar -czvf backup.tar.gz /folder && tar -xzvf backup.tar.gz && tar -tvf backup.tar.gz"
  },
  {
    id: "process_management",
    track: "linux",
    trackName: "Linux Core",
    day: 12,
    title: "Process Inspection & Signals (ps, top, kill)",
    desc: "Inspect the process tree, monitor CPU/RAM consumption, and send signals (SIGTERM 15, SIGKILL 9, SIGHUP 1).",
    cmd: "ps aux | grep bash && pgrep -l foot && kill -15 <PID> && killall -9 bad_process"
  },
  {
    id: "job_control",
    track: "linux",
    trackName: "Linux Core",
    day: 13,
    title: "Job Control & Sessions (bg, fg, jobs, nohup)",
    desc: "Send jobs to background (&), resume in foreground (fg), pause with Ctrl+Z, and detach jobs with nohup and tmux.",
    cmd: "sleep 100 & && jobs -l && fg %1 && nohup ./long_task.sh > output.log 2>&1 &"
  },
  {
    id: "env_and_profiles",
    track: "linux",
    trackName: "Linux Core",
    day: 14,
    title: "Environment Variables & Shell Configuration",
    desc: "Manage persistent environment variables, modify PATH, create shell aliases, and inspect ~/.bashrc.",
    cmd: "echo $PATH && export EDITOR=nano && env && cat ~/.bashrc"
  },
  {
    id: "bash_scripting_basics",
    track: "linux",
    trackName: "Linux Core",
    day: 15,
    title: "Shell Scripting: Variables & Control Flow",
    desc: "Write shell scripts with variables, conditionals (if/then/elif/else), loops (for, while), and exit codes ($?).",
    cmd: "for f in *.txt; do [ -f \"$f\" ] && echo \"Found $f\"; done; echo \"Status: $?\""
  },
  {
    id: "kernel_modules_hardware",
    track: "linux",
    trackName: "Linux Core",
    day: 16,
    title: "Kernel Information & Hardware Drivers",
    desc: "Inspect running kernel release, load/unload kernel modules with modprobe, and query PCI/USB buses.",
    cmd: "uname -a && lsmod && modinfo ext4 && lspci && lsusb && dmesg -T | grep -i error"
  },

  // ==========================================
  // TRACK 2: SYSTEM ADMINISTRATION (SYSADMIN)
  // ==========================================
  {
    id: "systemd_service_control",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 17,
    title: "systemd Service Management",
    desc: "Control system services: start, stop, restart, reload, and enable daemons to start on boot.",
    cmd: "systemctl status sshd && sudo systemctl restart sshd && sudo systemctl enable --now sshd"
  },
  {
    id: "systemd_custom_unit",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 18,
    title: "Writing Custom systemd Services",
    desc: "Write unit files with [Unit], [Service] (ExecStart, Restart=always, User=), and [Install] sections.",
    cmd: "sudo systemctl edit --full myapp.service && sudo systemctl daemon-reload && systemctl is-active myapp"
  },
  {
    id: "journalctl_logging",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 19,
    title: "Log Analysis with journalctl",
    desc: "Filter systemd logs by unit, current boot session, severity priority level, and time intervals.",
    cmd: "journalctl -u sshd -f && journalctl -b -p err && journalctl --since '30m ago'"
  },
  {
    id: "cron_and_timers",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 20,
    title: "Automated Scheduling (Cron & systemd Timers)",
    desc: "Schedule automated recurring tasks using crontab syntax (* * * * *) and systemd timer units.",
    cmd: "crontab -e && crontab -l && systemctl list-timers --all"
  },
  {
    id: "user_group_admin",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 21,
    title: "User & Group Management",
    desc: "Create users, configure home directories, assign default shells, manage group memberships, and lock accounts.",
    cmd: "sudo useradd -m -s /bin/bash devuser && sudo usermod -aG wheel devuser && id devuser"
  },
  {
    id: "sudoers_configuration",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 22,
    title: "Privilege Delegation & /etc/sudoers",
    desc: "Safely edit sudoers with syntax validation (visudo), configure granular permissions, and use sudoers.d drop-ins.",
    cmd: "sudo visudo && sudo -l && ls -l /etc/sudoers.d/"
  },
  {
    id: "storage_partitioning",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 23,
    title: "Disk Partitioning (fdisk, parted, lsblk)",
    desc: "Inspect block devices, partition tables (GPT vs MBR), partition types, and filesystem signatures.",
    cmd: "lsblk -f && sudo fdisk -l /dev/sda && sudo parted -l"
  },
  {
    id: "storage_mounting_fstab",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 24,
    title: "Filesystem Mounting & /etc/fstab",
    desc: "Mount filesystems manually, determine partition UUIDs with blkid, and configure persistent mounts in /etc/fstab.",
    cmd: "sudo mount /dev/sdb1 /mnt && sudo umount /mnt && blkid && sudo mount -a"
  },
  {
    id: "storage_lvm",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 25,
    title: "Logical Volume Management (LVM)",
    desc: "Manage Physical Volumes (pvcreate), Volume Groups (vgcreate), Logical Volumes (lvcreate), and online resizing.",
    cmd: "sudo pvs && sudo vgs && sudo lvs && sudo lvextend -L +10G -r /dev/mapper/vg-lv_root"
  },
  {
    id: "storage_health_smart",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 26,
    title: "Disk Space & Drive Health (df, du, smartctl)",
    desc: "Track disk utilization, identify space hogs, and query drive SMART health indicators.",
    cmd: "df -hT && sudo du -sh /var/* | sort -hr | head -n 10 && sudo smartctl -H /dev/nvme0n1"
  },
  {
    id: "network_ip_interfaces",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 27,
    title: "Network Addressing & Routes (iproute2)",
    desc: "Configure IP addresses, view MAC hardware addresses, manage network interfaces, and inspect default routes.",
    cmd: "ip addr show && ip link show && ip route show && sudo ip route add default via 192.168.1.1"
  },
  {
    id: "network_dns_resolution",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 28,
    title: "DNS Configuration & Name Lookup",
    desc: "Configure local DNS resolution, test nameservers with dig, and manage /etc/hosts domain mappings.",
    cmd: "resolvectl status && dig +short archlinux.org @1.1.1.1 && cat /etc/resolv.conf && cat /etc/hosts"
  },
  {
    id: "network_ports_sockets",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 29,
    title: "Listening Ports & Sockets (ss & lsof)",
    desc: "Identify all active TCP/UDP listening ports, associated PID/process names, and open network sockets.",
    cmd: "ss -tulpn && sudo lsof -i :80 && sudo lsof -i TCP -s TCP:LISTEN"
  },
  {
    id: "network_troubleshooting",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 30,
    title: "Network Diagnostics (ping, traceroute, mtr)",
    desc: "Test ICMP reachability, locate routing hops and latency spikes with mtr, and debug HTTP headers.",
    cmd: "ping -c 4 1.1.1.1 && traceroute 8.8.8.8 && mtr -rw 1.1.1.1 && curl -Iv https://omarchy.org"
  },
  {
    id: "ssh_remote_administration",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 31,
    title: "SSH Key Auth & Configuration (~/.ssh/config)",
    desc: "Generate modern Ed25519 SSH keys, copy public keys to authorized_keys, and configure client host profiles.",
    cmd: "ssh-keygen -t ed25519 -C 'admin' && ssh-copy-id user@remote && nano ~/.ssh/config"
  },
  {
    id: "sys_resource_monitoring",
    track: "sysadmin",
    trackName: "SysAdmin",
    day: 32,
    title: "System Performance & Resource Bottlenecks",
    desc: "Diagnose system load averages (1/5/15 min), memory exhaustion, swap activity, and I/O wait CPU bottlenecks.",
    cmd: "uptime && free -h && vmstat 1 5 && iostat -xz 1 3 && btop"
  },

  // ==========================================
  // TRACK 3: CYBER SECURITY & HARDENING
  // ==========================================
  {
    id: "ssh_hardening",
    track: "security",
    trackName: "Cyber Security",
    day: 33,
    title: "SSH Daemon Hardening (sshd_config)",
    desc: "Enforce key-only authentication, disable root remote login, change default ports, and test config syntax.",
    cmd: "sudo nano /etc/ssh/sshd_config && PermitRootLogin no && PasswordAuthentication no && sudo sshd -t"
  },
  {
    id: "firewall_ufw",
    track: "security",
    trackName: "Cyber Security",
    day: 34,
    title: "Host Firewall Protection with UFW",
    desc: "Establish default-deny incoming rules, whitelist specific administrative ports, and verify firewall status.",
    cmd: "sudo ufw default deny incoming && sudo ufw allow 22/tcp && sudo ufw enable && sudo ufw status verbose"
  },
  {
    id: "firewall_iptables_nftables",
    track: "security",
    trackName: "Cyber Security",
    day: 35,
    title: "Packet Filtering with iptables & nftables",
    desc: "Understand packet traversal (INPUT, OUTPUT, FORWARD), match criteria, stateful inspection, and nftables rulesets.",
    cmd: "sudo iptables -L -n -v --line-numbers && sudo nft list ruleset && sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT"
  },
  {
    id: "pam_password_security",
    track: "security",
    trackName: "Cyber Security",
    day: 36,
    title: "PAM & Password Hardening Policies",
    desc: "Enforce password aging, expiration warnings with chage, and configure PAM password complexity modules.",
    cmd: "sudo chage -l $USER && sudo chage -M 90 -W 7 $USER && cat /etc/pam.d/system-auth"
  },
  {
    id: "fail2ban_protection",
    track: "security",
    trackName: "Cyber Security",
    day: 37,
    title: "Brute-Force Defense with Fail2ban",
    desc: "Protect authentication services from automated brute-force attacks; monitor banned IPs and jail parameters.",
    cmd: "sudo fail2ban-client status && sudo fail2ban-client status sshd && sudo fail2ban-client set sshd unbanip 1.2.3.4"
  },
  {
    id: "file_integrity_monitoring",
    track: "security",
    trackName: "Cyber Security",
    day: 38,
    title: "File Integrity Monitoring (AIDE & Hashes)",
    desc: "Detect tampered system binaries, verify package integrity against cryptographic checksums, and configure AIDE.",
    cmd: "sha256sum /bin/login && sudo aide --check 2>/dev/null || pacman -Qk"
  },
  {
    id: "suid_privesc_audit",
    track: "security",
    trackName: "Cyber Security",
    day: 39,
    title: "Auditing SUID Privileges & Misconfigurations",
    desc: "Scan filesystems for dangerous SUID/SGID binaries, GTFOBins exploitation vectors, and world-writable directories.",
    cmd: "find / -perm -4000 -type f 2>/dev/null && sudo -l && find / -writable -type d 2>/dev/null"
  },
  {
    id: "auditd_system_logging",
    track: "security",
    trackName: "Cyber Security",
    day: 40,
    title: "Security Auditing with Linux auditd",
    desc: "Monitor sensitive system files for unauthorized writes, audit execution events, and parse security records.",
    cmd: "sudo auditctl -w /etc/shadow -p wa -k shadow_access && sudo ausearch -k shadow_access && sudo aureport -u"
  },
  {
    id: "apparmor_mac",
    track: "security",
    trackName: "Cyber Security",
    day: 41,
    title: "Mandatory Access Control: AppArmor",
    desc: "Confine network-facing daemons with AppArmor profiles, switch between complain and enforce modes, and read audit logs.",
    cmd: "sudo aa-status && sudo aa-enforce /etc/apparmor.d/* 2>/dev/null || echo 'Check AppArmor status'"
  },
  {
    id: "selinux_foundations",
    track: "security",
    trackName: "Cyber Security",
    day: 42,
    title: "SELinux Fundamentals & Security Contexts",
    desc: "Understand Type Enforcement, security context labels (user:role:type:mls), policy booleans, and AVC denials.",
    cmd: "sestatus 2>/dev/null || echo 'SELinux status' && ls -Z /etc/shadow 2>/dev/null"
  },
  {
    id: "network_recon_nmap",
    track: "security",
    trackName: "Cyber Security",
    day: 43,
    title: "Port Scanning & Reconnaissance (Nmap)",
    desc: "Perform SYN stealth port scans, determine exact service versions, run automated NSE vulnerability scripts.",
    cmd: "nmap -sS -T4 127.0.0.1 && nmap -sV -sC -p 22,80 127.0.0.1 && nmap --script vuln 127.0.0.1"
  },
  {
    id: "packet_capture_tcpdump",
    track: "security",
    trackName: "Cyber Security",
    day: 44,
    title: "Packet Sniffing & Traffic Analysis (tcpdump)",
    desc: "Capture real-time network packets, apply BPF syntax filters, inspect raw TCP headers, and write PCAP files.",
    cmd: "sudo tcpdump -i any -nn 'tcp port 80 or tcp port 443' -c 10 && sudo tcpdump -w capture.pcap -i any -c 20"
  },
  {
    id: "rootkit_malware_detection",
    track: "security",
    trackName: "Cyber Security",
    day: 45,
    title: "Rootkit Hunting & Anomaly Detection",
    desc: "Scan for known rootkits, hidden kernel processes, backdoors, rogue crontabs, and suspicious listening daemons.",
    cmd: "sudo rkhunter -c --sk 2>/dev/null || sudo chkrootkit 2>/dev/null || ls -la /etc/cron* /var/spool/cron/"
  },
  {
    id: "vpn_wireguard_tunnels",
    track: "security",
    trackName: "Cyber Security",
    day: 46,
    title: "Encrypted Tunnels & WireGuard VPN",
    desc: "Set up encrypted VPN tunnels using WireGuard public/private key pairs, and secure traffic via SSH port forwarding.",
    cmd: "wg genkey | tee privkey | wg pubkey > pubkey && ssh -L 8080:localhost:80 user@remote"
  },
  {
    id: "tls_crypto_openssl",
    track: "security",
    trackName: "Cyber Security",
    day: 47,
    title: "Cryptography & SSL/TLS Inspection (OpenSSL)",
    desc: "Generate cryptographic keypairs, inspect X.509 certificate chains, expiration dates, and test TLS cipher suites.",
    cmd: "openssl genpkey -algorithm ED25519 -out key.pem && openssl s_client -connect google.com:443 -showcerts"
  },
  {
    id: "container_security",
    track: "security",
    trackName: "Cyber Security",
    day: 48,
    title: "Container Hardening & Isolation (Docker/Podman)",
    desc: "Drop kernel capabilities, enforce read-only root filesystems, run rootless containers, and prevent privilege escalation.",
    cmd: "docker run --read-only --cap-drop ALL --security-opt no-new-privileges:true alpine"
  }
];

function allTopics() {
  return TOPICS;
}

function topicsForTrack(track) {
  if (!track || track === "all") return TOPICS;
  var out = [];
  for (var i = 0; i < TOPICS.length; i++) {
    if (TOPICS[i].track === track) out.push(TOPICS[i]);
  }
  return out;
}

// Selects today's daily focus tasks:
// Picks up to 4 tasks (balanced across uncompleted tracks)
function dailyTopics(completedMap) {
  completedMap = completedMap || {};
  var out = [];
  var tracks = ["linux", "sysadmin", "security"];

  // First pick 1 uncompleted from each track
  for (var t = 0; t < tracks.length; t++) {
    var trk = tracks[t];
    for (var i = 0; i < TOPICS.length; i++) {
      if (TOPICS[i].track === trk && !completedMap[TOPICS[i].id]) {
        out.push(TOPICS[i]);
        break;
      }
    }
  }

  // If fewer than 4 picked, fill with any remaining uncompleted
  if (out.length < 4) {
    for (var j = 0; j < TOPICS.length; j++) {
      if (!completedMap[TOPICS[j].id]) {
        var already = false;
        for (var k = 0; k < out.length; k++) {
          if (out[k].id === TOPICS[j].id) { already = true; break; }
        }
        if (!already) {
          out.push(TOPICS[j]);
          if (out.length >= 4) break;
        }
      }
    }
  }

  // If all are completed, show the last 4 as review
  if (out.length === 0) {
    return TOPICS.slice(0, 4);
  }

  return out;
}

function filterTopics(list, query) {
  if (!query || query.trim() === "") return list;
  var q = query.trim().toLowerCase();
  var out = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var hay = (item.title + " " + item.desc + " " + item.cmd + " " + item.trackName + " day " + item.day).toLowerCase();
    if (hay.indexOf(q) !== -1) {
      out.push(item);
    }
  }
  return out;
}

function calculateStats(completedMap) {
  completedMap = completedMap || {};
  var total = TOPICS.length;
  var completed = 0;

  var linuxTotal = 0;
  var linuxDone = 0;
  var sysTotal = 0;
  var sysDone = 0;
  var secTotal = 0;
  var secDone = 0;

  for (var i = 0; i < TOPICS.length; i++) {
    var item = TOPICS[i];
    var done = !!completedMap[item.id];
    if (done) completed++;

    if (item.track === "linux") {
      linuxTotal++;
      if (done) linuxDone++;
    } else if (item.track === "sysadmin") {
      sysTotal++;
      if (done) sysDone++;
    } else if (item.track === "security") {
      secTotal++;
      if (done) secDone++;
    }
  }

  var percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  var linuxPercent = linuxTotal > 0 ? Math.round((linuxDone / linuxTotal) * 100) : 0;
  var sysPercent = sysTotal > 0 ? Math.round((sysDone / sysTotal) * 100) : 0;
  var secPercent = secTotal > 0 ? Math.round((secDone / secTotal) * 100) : 0;

  return {
    total: total,
    completed: completed,
    percent: percent,
    linuxTotal: linuxTotal,
    linuxCompleted: linuxDone,
    linuxPercent: linuxPercent,
    sysadminTotal: sysTotal,
    sysadminCompleted: sysDone,
    sysadminPercent: sysPercent,
    securityTotal: secTotal,
    securityCompleted: secDone,
    securityPercent: secPercent
  };
}
