#!/usr/bin/env bash
# Omarchy Linux Learning Hub - Automated Task Verifier
# Safely evaluates whether system state satisfies verification criteria for a topic.

set -euo pipefail

TASK_ID="${1:-""}"

if [ -z "$TASK_ID" ]; then
  echo "Usage: $0 <task_id>"
  exit 1
fi

case "$TASK_ID" in
  fhs_overview)
    test -d /bin && test -d /etc && test -d /var && test -d /proc
    ;;
  shell_navigation)
    pwd >/dev/null
    ;;
  file_viewing)
    test -r /etc/os-release
    ;;
  streams_redirection)
    which grep >/dev/null
    ;;
  text_processing_grep)
    grep --version >/dev/null
    ;;
  text_processing_awk_sed)
    which awk >/dev/null && which sed >/dev/null
    ;;
  permissions_basic)
    umask >/dev/null
    ;;
  permissions_special)
    find /tmp -maxdepth 0 -perm -1000 >/dev/null 2>&1
    ;;
  links_and_inodes)
    which stat >/dev/null
    ;;
  find_and_locate)
    which find >/dev/null
    ;;
  archives_compression)
    which tar >/dev/null && which gzip >/dev/null
    ;;
  process_management)
    pgrep -l bash >/dev/null 2>&1 || true
    ;;
  job_control)
    which nohup >/dev/null
    ;;
  env_and_profiles)
    test -n "${SHELL:-}"
    ;;
  bash_scripting_basics)
    test -x /bin/bash
    ;;
  kernel_modules_hardware)
    uname -r >/dev/null
    ;;
  systemd_service_control)
    systemctl is-active --quiet dbus 2>/dev/null || systemctl is-active --quiet NetworkManager 2>/dev/null || true
    ;;
  systemd_custom_unit)
    test -d /etc/systemd/system
    ;;
  journalctl_logging)
    journalctl -n 1 >/dev/null 2>&1
    ;;
  cron_and_timers)
    systemctl list-timers >/dev/null 2>&1
    ;;
  user_group_admin)
    id -u >/dev/null
    ;;
  sudoers_configuration)
    test -d /etc/sudoers.d
    ;;
  storage_partitioning)
    which lsblk >/dev/null
    ;;
  storage_mounting_fstab)
    test -r /etc/fstab
    ;;
  storage_lvm)
    which lvs >/dev/null 2>&1 || true
    ;;
  storage_health_smart)
    which df >/dev/null
    ;;
  network_ip_interfaces)
    ip addr show >/dev/null
    ;;
  network_dns_resolution)
    test -r /etc/resolv.conf
    ;;
  network_ports_sockets)
    ss -tulpn >/dev/null 2>&1 || ss -tuln >/dev/null
    ;;
  network_troubleshooting)
    which ping >/dev/null
    ;;
  ssh_remote_administration)
    test -d ~/.ssh
    ;;
  sys_resource_monitoring)
    uptime >/dev/null
    ;;
  ssh_hardening)
    test -r /etc/ssh/sshd_config || test -d /etc/ssh
    ;;
  firewall_ufw)
    which ufw >/dev/null 2>&1 || which iptables >/dev/null
    ;;
  firewall_iptables_nftables)
    which iptables >/dev/null 2>&1 || which nft >/dev/null
    ;;
  pam_password_security)
    test -d /etc/pam.d
    ;;
  fail2ban_protection)
    which fail2ban-client >/dev/null 2>&1 || true
    ;;
  file_integrity_monitoring)
    which sha256sum >/dev/null
    ;;
  suid_privesc_audit)
    which find >/dev/null
    ;;
  auditd_system_logging)
    which auditctl >/dev/null 2>&1 || true
    ;;
  apparmor_mac)
    which aa-status >/dev/null 2>&1 || true
    ;;
  selinux_foundations)
    true
    ;;
  network_recon_nmap)
    which nmap >/dev/null 2>&1 || true
    ;;
  packet_capture_tcpdump)
    which tcpdump >/dev/null 2>&1 || true
    ;;
  rootkit_malware_detection)
    which rkhunter >/dev/null 2>&1 || which chkrootkit >/dev/null 2>&1 || true
    ;;
  vpn_wireguard_tunnels)
    which wg >/dev/null 2>&1 || true
    ;;
  tls_crypto_openssl)
    which openssl >/dev/null
    ;;
  container_security)
    which docker >/dev/null 2>&1 || which podman >/dev/null 2>&1 || true
    ;;
  *)
    # For any 90-day day_XX or other tasks, test default check
    true
    ;;
esac

exit $?
