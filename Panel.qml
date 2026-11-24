import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Quickshell
import Quickshell.Io
import qs.Commons
import qs.Commons as Commons
import qs.Ui
import "Curriculum.js" as Curriculum

Panel {
  id: root
  moduleName: "learn.linux"
  ipcTarget: "learn.linux"
  manageIpc: true
  implicitWidth: button.implicitWidth
  implicitHeight: button.implicitHeight

  readonly property string storagePath: Quickshell.env("HOME") + "/.config/omarchy/linux-learning/progress.json"

  property var completedMap: ({})
  property string activeTab: "daily" // "daily", "linux", "sysadmin", "security", "all"
  property string searchQuery: ""
  property int streak: 1
  property string lastActiveDate: ""
  property bool confirmReset: false

  readonly property var stats: Curriculum.calculateStats(completedMap)
  readonly property real progressFraction: stats.total > 0 ? (stats.completed / stats.total) : 0
  readonly property color foreground: bar ? bar.foreground : Commons.Color.foreground
  readonly property color urgent: bar ? bar.urgent : Commons.Color.urgent
  readonly property color dim: Qt.darker(foreground, 1.55)
  readonly property string fontFamily: bar ? bar.fontFamily : Style.font.family

  readonly property var rawTopicsList: {
    if (activeTab === "daily") {
      return Curriculum.dailyTopics(completedMap)
    } else if (activeTab === "linux") {
      return Curriculum.topicsForTrack("linux")
    } else if (activeTab === "sysadmin") {
      return Curriculum.topicsForTrack("sysadmin")
    } else if (activeTab === "security") {
      return Curriculum.topicsForTrack("security")
    } else {
      return Curriculum.allTopics()
    }
  }

  readonly property var visibleTopics: Curriculum.filterTopics(rawTopicsList, searchQuery)

  function getTodayString() {
    var d = new Date()
    var year = d.getFullYear()
    var month = ("0" + (d.getMonth() + 1)).slice(-2)
    var day = ("0" + d.getDate()).slice(-2)
    return year + "-" + month + "-" + day
  }

  function updateStreak() {
    var today = getTodayString()
    if (root.lastActiveDate === today) return
    if (root.lastActiveDate) {
      var last = new Date(root.lastActiveDate)
      var now = new Date(today)
      var diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays === 1) {
        root.streak += 1
      } else if (diffDays > 1) {
        root.streak = 1
      }
    } else {
      root.streak = 1
    }
    root.lastActiveDate = today
  }

  function toggleTask(id) {
    var copy = {}
    for (var k in root.completedMap) {
      if (root.completedMap[k]) copy[k] = true
    }
    if (copy[id]) {
      delete copy[id]
    } else {
      copy[id] = true
      root.updateStreak()
    }
    root.completedMap = copy
    saveProgress()
  }

  function resetAll() {
    root.completedMap = {}
    root.streak = 1
    root.lastActiveDate = ""
    root.confirmReset = false
    saveProgress()
  }

  function saveProgress() {
    var payload = {
      version: 1,
      streak: root.streak,
      lastActiveDate: root.lastActiveDate,
      completed: root.completedMap
    }
    progressFile.setText(JSON.stringify(payload, null, 2) + "\n")
  }

  function loadProgress(raw) {
    if (!raw || raw.trim() === "") {
      root.completedMap = {}
      return
    }
    try {
      var data = JSON.parse(raw)
      if (data && typeof data === "object") {
        root.completedMap = data.completed || {}
        root.streak = typeof data.streak === "number" ? Math.max(1, data.streak) : 1
        root.lastActiveDate = data.lastActiveDate || ""
      }
    } catch (e) {
      root.completedMap = {}
    }
  }

  FileView {
    id: progressFile
    path: root.storagePath
    watchChanges: true
    atomicWrites: true
    printErrors: false
    onLoaded: root.loadProgress(text())
    onLoadFailed: root.loadProgress("{}")
    onFileChanged: reload()
  }

  // --- BAR BUTTON ---
  WidgetButton {
    id: button
    anchors.fill: parent
    bar: root.bar
    text: " " + root.stats.percent + "%"
    tooltipText: "Linux Learning: " + root.stats.completed + "/" + root.stats.total + " completed (" + root.stats.percent + "%)"
    active: root.opened
    onPressed: function(btn) {
      root.toggle()
    }
  }

  // --- POPUP PANEL ---
  KeyboardPanel {
    id: panel
    anchorItem: button
    owner: root
    bar: root.bar
    open: root.opened
    centerOnBar: false
    focusTarget: searchInput
    contentWidth: panel.fittedContentWidth(Style.space(480))
    contentHeight: panel.fittedContentHeight(mainCol.implicitHeight + Style.space(24), Style.space(620))

    PanelKeyCatcher {
      id: keyCatcher
      anchors.fill: parent
      blocked: searchInput.activeFocus
      onCloseRequested: root.close()
      onTabRequested: function(direction) { root.switchPanel(direction) }

      Flickable {
        id: flickable
        anchors.fill: parent
        contentWidth: width
        contentHeight: mainCol.implicitHeight + Style.space(28)
        clip: true
        boundsBehavior: Flickable.StopAtBounds
        flickableDirection: Flickable.VerticalFlick
        interactive: contentHeight > height
        ScrollBar.vertical: ScrollBar { policy: ScrollBar.AsNeeded }

        Column {
          id: mainCol
          width: parent.width - Style.space(16)
          x: Style.space(8)
          y: Style.space(8)
          spacing: Style.space(12)

          // HEADER HERO
          Item {
            width: parent.width
            implicitHeight: headerRow.implicitHeight

            Row {
              id: headerRow
              width: parent.width
              spacing: Style.space(10)

              // Tux Icon Box
              Rectangle {
                width: Style.space(38)
                height: Style.space(38)
                radius: Style.cornerRadius
                color: Style.selectedFillFor(root.foreground, Commons.Color.accent)
                border.width: 1
                border.color: Commons.Color.accent
                anchors.verticalCenter: parent.verticalCenter

                Text {
                  anchors.centerIn: parent
                  textFormat: Text.PlainText
                  text: ""
                  font.family: root.fontFamily
                  font.pixelSize: Style.space(22)
                  color: Commons.Color.accent
                }
              }

              // Title and Subtitle
              Column {
                anchors.verticalCenter: parent.verticalCenter
                width: parent.width - Style.space(48) - streakPill.width - Style.space(16)
                spacing: Style.space(2)

                Text {
                  textFormat: Text.PlainText
                  text: "Linux Learning Hub"
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.title
                  font.bold: true
                  color: root.foreground
                  elide: Text.ElideRight
                  width: parent.width
                }

                Text {
                  textFormat: Text.PlainText
                  text: "DAILY TASKS • SYSADMIN • CYBER SECURITY"
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.caption - 1
                  font.bold: true
                  font.letterSpacing: 1.1
                  color: root.dim
                  elide: Text.ElideRight
                  width: parent.width
                }
              }

              // Streak Badge
              Rectangle {
                id: streakPill
                implicitWidth: streakText.implicitWidth + Style.space(12)
                implicitHeight: streakText.implicitHeight + Style.space(6)
                radius: Style.cornerRadius
                color: Qt.darker(root.foreground, 3.2)
                border.width: 1
                border.color: Commons.Color.accent
                anchors.verticalCenter: parent.verticalCenter

                Text {
                  id: streakText
                  anchors.centerIn: parent
                  textFormat: Text.PlainText
                  text: "🔥 " + root.streak + "d Streak"
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.caption
                  font.bold: true
                  color: Commons.Color.accent
                }
              }
            }
          }

          // OVERALL PROGRESS SECTION
          Rectangle {
            width: parent.width
            implicitHeight: progressInnerCol.implicitHeight + Style.space(14)
            radius: Style.cornerRadius
            color: Qt.darker(Commons.Color.popups ? Commons.Color.popups.background : Commons.Color.background, 1.2)
            border.width: 1
            border.color: Qt.darker(root.foreground, 2.8)

            Column {
              id: progressInnerCol
              anchors.left: parent.left
              anchors.right: parent.right
              anchors.top: parent.top
              anchors.margins: Style.space(10)
              spacing: Style.space(8)

              // Progress Label
              Item {
                width: parent.width
                implicitHeight: Math.max(progLeft.implicitHeight, progRight.implicitHeight)

                Text {
                  id: progLeft
                  anchors.left: parent.left
                  anchors.verticalCenter: parent.verticalCenter
                  textFormat: Text.PlainText
                  text: "Overall Curriculum Progress"
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.caption
                  font.bold: true
                  color: root.foreground
                }

                Text {
                  id: progRight
                  anchors.right: parent.right
                  anchors.verticalCenter: parent.verticalCenter
                  textFormat: Text.PlainText
                  text: root.stats.completed + " / " + root.stats.total + " (" + root.stats.percent + "%)"
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.caption
                  font.bold: true
                  color: Commons.Color.accent
                }
              }

              // Progress Bar Track
              Rectangle {
                width: parent.width
                height: Style.space(8)
                radius: Style.cornerRadius
                color: Qt.darker(root.foreground, 3.4)

                Rectangle {
                  height: parent.height
                  radius: parent.radius
                  width: Math.max(0, Math.min(parent.width, parent.width * root.progressFraction))
                  color: Commons.Color.accent

                  Behavior on width {
                    NumberAnimation { duration: Style.duration(200); easing.type: Easing.OutCubic }
                  }
                }
              }

              // 3 Mini Track Badges
              Row {
                width: parent.width
                spacing: Style.space(6)

                // Linux Core
                Rectangle {
                  width: (parent.width - Style.space(12)) / 3
                  implicitHeight: linuxBadgeCol.implicitHeight + Style.space(8)
                  radius: Style.cornerRadius
                  color: root.activeTab === "linux" ? Style.selectedFillFor(root.foreground, Commons.Color.accent) : "transparent"
                  border.width: 1
                  border.color: root.activeTab === "linux" ? Commons.Color.accent : Qt.darker(root.foreground, 2.5)

                  Column {
                    id: linuxBadgeCol
                    anchors.centerIn: parent
                    spacing: Style.space(1)
                    Text {
                      anchors.horizontalCenter: parent.horizontalCenter
                      textFormat: Text.PlainText
                      text: " Linux Core"
                      font.family: root.fontFamily
                      font.pixelSize: Style.font.caption - 1
                      font.bold: true
                      color: root.foreground
                    }
                    Text {
                      anchors.horizontalCenter: parent.horizontalCenter
                      textFormat: Text.PlainText
                      text: root.stats.linuxCompleted + "/" + root.stats.linuxTotal + " (" + root.stats.linuxPercent + "%)"
                      font.family: root.fontFamily
                      font.pixelSize: Style.font.caption - 1
                      color: Commons.Color.accent
                    }
                  }

                  MouseArea {
                    anchors.fill: parent
                    cursorShape: Qt.PointingHandCursor
                    onClicked: root.activeTab = "linux"
                  }
                }

                // SysAdmin
                Rectangle {
                  width: (parent.width - Style.space(12)) / 3
                  implicitHeight: sysBadgeCol.implicitHeight + Style.space(8)
                  radius: Style.cornerRadius
                  color: root.activeTab === "sysadmin" ? Style.selectedFillFor(root.foreground, Commons.Color.accent) : "transparent"
                  border.width: 1
                  border.color: root.activeTab === "sysadmin" ? Commons.Color.accent : Qt.darker(root.foreground, 2.5)

                  Column {
                    id: sysBadgeCol
                    anchors.centerIn: parent
                    spacing: Style.space(1)
                    Text {
                      anchors.horizontalCenter: parent.horizontalCenter
                      textFormat: Text.PlainText
                      text: " SysAdmin"
                      font.family: root.fontFamily
                      font.pixelSize: Style.font.caption - 1
                      font.bold: true
                      color: root.foreground
                    }
                    Text {
                      anchors.horizontalCenter: parent.horizontalCenter
                      textFormat: Text.PlainText
                      text: root.stats.sysadminCompleted + "/" + root.stats.sysadminTotal + " (" + root.stats.sysadminPercent + "%)"
                      font.family: root.fontFamily
                      font.pixelSize: Style.font.caption - 1
                      color: Commons.Color.accent
                    }
                  }

                  MouseArea {
                    anchors.fill: parent
                    cursorShape: Qt.PointingHandCursor
                    onClicked: root.activeTab = "sysadmin"
                  }
                }

                // Cyber Security
                Rectangle {
                  width: (parent.width - Style.space(12)) / 3
                  implicitHeight: secBadgeCol.implicitHeight + Style.space(8)
                  radius: Style.cornerRadius
                  color: root.activeTab === "security" ? Style.selectedFillFor(root.foreground, Commons.Color.accent) : "transparent"
                  border.width: 1
                  border.color: root.activeTab === "security" ? Commons.Color.accent : Qt.darker(root.foreground, 2.5)

                  Column {
                    id: secBadgeCol
                    anchors.centerIn: parent
                    spacing: Style.space(1)
                    Text {
                      anchors.horizontalCenter: parent.horizontalCenter
                      textFormat: Text.PlainText
                      text: " CyberSec"
                      font.family: root.fontFamily
                      font.pixelSize: Style.font.caption - 1
                      font.bold: true
                      color: root.foreground
                    }
                    Text {
                      anchors.horizontalCenter: parent.horizontalCenter
                      textFormat: Text.PlainText
                      text: root.stats.securityCompleted + "/" + root.stats.securityTotal + " (" + root.stats.securityPercent + "%)"
                      font.family: root.fontFamily
                      font.pixelSize: Style.font.caption - 1
                      color: Commons.Color.accent
                    }
                  }

                  MouseArea {
                    anchors.fill: parent
                    cursorShape: Qt.PointingHandCursor
                    onClicked: root.activeTab = "security"
                  }
                }
              }
            }
          }

          // TAB BAR
          Row {
            width: parent.width
            spacing: Style.space(4)

            // Tab Button Component
            Repeater {
              model: [
                { id: "daily", label: " Daily Focus" },
                { id: "linux", label: " Linux Core" },
                { id: "sysadmin", label: " SysAdmin" },
                { id: "security", label: " CyberSec" },
                { id: "all", label: " All (48)" }
              ]

              delegate: Rectangle {
                id: tabBtn
                width: (mainCol.width - Style.space(16)) / 5
                implicitHeight: tabLabel.implicitHeight + Style.space(8)
                radius: Style.cornerRadius
                color: root.activeTab === modelData.id
                  ? Commons.Color.accent
                  : (tabArea.containsMouse ? Style.hoverFillFor(root.foreground, Commons.Color.accent) : "transparent")
                border.width: 1
                border.color: root.activeTab === modelData.id ? Commons.Color.accent : Qt.darker(root.foreground, 2.8)

                Text {
                  id: tabLabel
                  anchors.centerIn: parent
                  textFormat: Text.PlainText
                  text: modelData.label
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.caption - 1
                  font.bold: root.activeTab === modelData.id
                  color: root.activeTab === modelData.id
                    ? Commons.Color.background
                    : root.foreground
                  elide: Text.ElideRight
                  width: parent.width - Style.space(4)
                  horizontalAlignment: Text.AlignHCenter
                }

                MouseArea {
                  id: tabArea
                  anchors.fill: parent
                  hoverEnabled: true
                  cursorShape: Qt.PointingHandCursor
                  onClicked: {
                    root.activeTab = modelData.id
                    searchInput.text = ""
                  }
                }
              }
            }
          }

          // SEARCH INPUT FIELD
          Item {
            width: parent.width
            implicitHeight: searchInput.implicitHeight

            TextField {
              id: searchInput
              anchors.fill: parent
              placeholderText: "Search topics, commands, keywords (e.g. ssh, iptables)..."
              text: root.searchQuery
              onTextChanged: root.searchQuery = text
            }

            // Clear search button
            Rectangle {
              visible: searchInput.text !== ""
              anchors.right: parent.right
              anchors.rightMargin: Style.space(8)
              anchors.verticalCenter: parent.verticalCenter
              width: Style.space(20)
              height: Style.space(20)
              radius: width / 2
              color: clearArea.containsMouse ? Commons.Color.accent : Qt.darker(root.foreground, 2.5)

              Text {
                anchors.centerIn: parent
                textFormat: Text.PlainText
                text: "✕"
                font.pixelSize: Style.font.caption - 1
                color: clearArea.containsMouse ? Commons.Color.background : root.foreground
              }

              MouseArea {
                id: clearArea
                anchors.fill: parent
                hoverEnabled: true
                cursorShape: Qt.PointingHandCursor
                onClicked: {
                  searchInput.text = ""
                  root.searchQuery = ""
                }
              }
            }
          }

          // SECTION LABEL & COUNT
          Item {
            width: parent.width
            implicitHeight: Math.max(secLeftText.implicitHeight, secRightText.implicitHeight)

            Text {
              id: secLeftText
              anchors.left: parent.left
              anchors.verticalCenter: parent.verticalCenter
              textFormat: Text.PlainText
              text: {
                if (root.activeTab === "daily") return "TODAY'S DAILY FOCUS TASKS"
                if (root.activeTab === "linux") return "LINUX ITSELF & CORE FUNDAMENTALS"
                if (root.activeTab === "sysadmin") return "SYSTEM ADMINISTRATION TOPICS"
                if (root.activeTab === "security") return "CYBER SECURITY & HARDENING"
                return "ALL LINUX LEARNING TOPICS"
              }
              font.family: root.fontFamily
              font.pixelSize: Style.font.caption
              font.bold: true
              color: root.dim
            }

            Text {
              id: secRightText
              anchors.right: parent.right
              anchors.verticalCenter: parent.verticalCenter
              textFormat: Text.PlainText
              text: root.visibleTopics.length + " tasks listed"
              font.family: root.fontFamily
              font.pixelSize: Style.font.caption
              color: root.dim
            }
          }

          // EMPTY STATE (IF SEARCH HAS NO RESULTS)
          Item {
            visible: root.visibleTopics.length === 0
            width: parent.width
            implicitHeight: emptyCol.implicitHeight + Style.space(30)

            Column {
              id: emptyCol
              anchors.centerIn: parent
              spacing: Style.space(6)

              Text {
                anchors.horizontalCenter: parent.horizontalCenter
                textFormat: Text.PlainText
                text: "🔍 No matching topics found"
                font.family: root.fontFamily
                font.pixelSize: Style.font.body
                color: root.dim
              }

              Button {
                anchors.horizontalCenter: parent.horizontalCenter
                text: "Clear Search"
                onClicked: {
                  searchInput.text = ""
                  root.searchQuery = ""
                }
              }
            }
          }

          // TASK ITEMS LIST (REPEATER)
          Repeater {
            model: root.visibleTopics

            delegate: Item {
              id: card
              width: mainCol.width
              implicitHeight: cardRect.implicitHeight

              readonly property var topic: modelData
              readonly property bool isDone: !!root.completedMap[topic.id]
              property bool hovered: false

              Rectangle {
                id: cardRect
                width: parent.width
                radius: Style.cornerRadius
                color: card.isDone
                  ? Style.selectedFillFor(root.foreground, Commons.Color.accent)
                  : (card.hovered ? Style.hoverFillFor(root.foreground, Commons.Color.accent) : Qt.darker(Commons.Color.popups ? Commons.Color.popups.background : Commons.Color.background, 1.15))
                border.width: 1
                border.color: card.isDone
                  ? Commons.Color.accent
                  : (card.hovered ? Qt.darker(root.foreground, 2.0) : Qt.darker(root.foreground, 3.2))

                implicitHeight: itemCol.implicitHeight + Style.space(16)

                MouseArea {
                  id: cardClickArea
                  anchors.fill: parent
                  z: 1
                  hoverEnabled: true
                  cursorShape: Qt.PointingHandCursor
                  onEntered: card.hovered = true
                  onExited: card.hovered = false
                  onClicked: root.toggleTask(card.topic.id)
                }

                Column {
                  id: itemCol
                  anchors.left: parent.left
                  anchors.right: parent.right
                  anchors.top: parent.top
                  anchors.margins: Style.space(8)
                  spacing: Style.space(6)
                  z: 2

                  // Header line: Checkbox + Track pill + Day + Title
                  Row {
                    width: parent.width
                    spacing: Style.space(8)

                    // Checkbox Button
                    Rectangle {
                      id: checkBtn
                      z: 10
                      width: Style.space(22)
                      height: Style.space(22)
                      radius: Style.cornerRadius > 0 ? Style.space(4) : 0
                      color: card.isDone ? Commons.Color.accent : "transparent"
                      border.width: 1.5
                      border.color: card.isDone ? Commons.Color.accent : Qt.darker(root.foreground, 1.6)
                      anchors.verticalCenter: parent.verticalCenter

                      Text {
                        anchors.centerIn: parent
                        textFormat: Text.PlainText
                        text: "✔"
                        visible: card.isDone
                        color: Commons.Color.background
                        font.bold: true
                        font.pixelSize: Style.font.caption
                      }

                      MouseArea {
                        anchors.fill: parent
                        cursorShape: Qt.PointingHandCursor
                        onClicked: root.toggleTask(card.topic.id)
                      }
                    }

                    // Track Badge Pill
                    Rectangle {
                      radius: Style.cornerRadius
                      color: card.topic.track === "linux" ? "#1d4f73" : (card.topic.track === "sysadmin" ? "#502f6b" : "#752222")
                      implicitWidth: trackLabel.implicitWidth + Style.space(10)
                      implicitHeight: trackLabel.implicitHeight + Style.space(4)
                      anchors.verticalCenter: parent.verticalCenter

                      Text {
                        id: trackLabel
                        anchors.centerIn: parent
                        textFormat: Text.PlainText
                        text: card.topic.trackName.toUpperCase()
                        font.family: root.fontFamily
                        font.pixelSize: Style.font.caption - 2
                        font.bold: true
                        color: "#ffffff"
                      }
                    }

                    // Day Number Pill
                    Rectangle {
                      radius: Style.cornerRadius
                      color: "transparent"
                      border.width: 1
                      border.color: Qt.darker(root.foreground, 2.2)
                      implicitWidth: dayLabel.implicitWidth + Style.space(8)
                      implicitHeight: dayLabel.implicitHeight + Style.space(4)
                      anchors.verticalCenter: parent.verticalCenter

                      Text {
                        id: dayLabel
                        anchors.centerIn: parent
                        textFormat: Text.PlainText
                        text: "Day " + card.topic.day
                        font.family: root.fontFamily
                        font.pixelSize: Style.font.caption - 2
                        color: Qt.darker(root.foreground, 1.4)
                      }
                    }

                    // Title
                    Text {
                      textFormat: Text.PlainText
                      text: card.topic.title
                      font.family: root.fontFamily
                      font.pixelSize: Style.font.body
                      font.bold: true
                      font.strikeout: card.isDone
                      color: card.isDone ? Qt.darker(root.foreground, 1.7) : root.foreground
                      anchors.verticalCenter: parent.verticalCenter
                      elide: Text.ElideRight
                      width: Math.max(80, parent.width - checkBtn.width - trackLabel.parent.width - dayLabel.parent.width - Style.space(32))
                    }
                  }

                  // Description
                  Text {
                    textFormat: Text.PlainText
                    width: parent.width
                    wrapMode: Text.WordWrap
                    text: card.topic.desc
                    font.family: root.fontFamily
                    font.pixelSize: Style.font.caption
                    color: card.isDone ? Qt.darker(root.foreground, 2.0) : Qt.darker(root.foreground, 1.3)
                  }

                  // Monospace Command Snippet Box with Copy Button
                  Rectangle {
                    width: parent.width
                    implicitHeight: cmdRow.implicitHeight + Style.space(6)
                    radius: Style.space(4)
                    color: Qt.darker(Commons.Color.background, 1.3)
                    border.width: 1
                    border.color: Qt.darker(root.foreground, 2.9)

                    Row {
                      id: cmdRow
                      anchors.fill: parent
                      anchors.margins: Style.space(4)
                      spacing: Style.space(6)

                      Text {
                        textFormat: Text.PlainText
                        text: "$"
                        color: Commons.Color.accent
                        font.family: "monospace"
                        font.pixelSize: Style.font.caption
                        font.bold: true
                        anchors.verticalCenter: parent.verticalCenter
                      }

                      Text {
                        id: cmdText
                        textFormat: Text.PlainText
                        text: card.topic.cmd
                        font.family: "monospace"
                        font.pixelSize: Style.font.caption
                        color: root.foreground
                        elide: Text.ElideMiddle
                        anchors.verticalCenter: parent.verticalCenter
                        width: parent.width - Style.space(68)
                      }

                      Rectangle {
                        id: copyPill
                        z: 10
                        implicitWidth: copyLabel.implicitWidth + Style.space(8)
                        implicitHeight: copyLabel.implicitHeight + Style.space(4)
                        radius: Style.cornerRadius
                        color: copyArea.containsMouse ? Commons.Color.accent : Qt.darker(root.foreground, 2.2)
                        anchors.verticalCenter: parent.verticalCenter

                        Text {
                          id: copyLabel
                          anchors.centerIn: parent
                          textFormat: Text.PlainText
                          text: copyArea.copied ? "Copied!" : "Copy"
                          font.family: root.fontFamily
                          font.pixelSize: Style.font.caption - 2
                          font.bold: true
                          color: copyArea.containsMouse ? Commons.Color.background : root.foreground
                        }

                        MouseArea {
                          id: copyArea
                          anchors.fill: parent
                          cursorShape: Qt.PointingHandCursor
                          hoverEnabled: true
                          property bool copied: false
                          Timer {
                            id: resetCopyTimer
                            interval: 1500
                            onTriggered: copyArea.copied = false
                          }
                          onClicked: {
                            Quickshell.execDetached(["wl-copy", card.topic.cmd])
                            copied = true
                            resetCopyTimer.restart()
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          // FOOTER ACTIONS
          PanelSeparator {}

          Item {
            width: parent.width
            implicitHeight: Math.max(footerLeftBtn.implicitHeight, footerRightBtn.implicitHeight)

            Button {
              id: footerLeftBtn
              anchors.left: parent.left
              anchors.verticalCenter: parent.verticalCenter
              text: "🌟 Show Today's Tasks"
              visible: root.activeTab !== "daily"
              onClicked: {
                root.activeTab = "daily"
                searchInput.text = ""
              }
            }

            Button {
              id: footerRightBtn
              anchors.right: parent.right
              anchors.verticalCenter: parent.verticalCenter
              text: root.confirmReset ? "Confirm Reset All?" : "Reset Progress"
              onClicked: {
                if (root.confirmReset) {
                  root.resetAll()
                } else {
                  root.confirmReset = true
                }
              }
            }
          }
        }
      }
    }
  }
}
