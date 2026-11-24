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

  readonly property string pluginDir: Quickshell.env("HOME") + "/.config/omarchy/plugins/learn.linux"
  readonly property string storagePath: Quickshell.env("HOME") + "/.config/omarchy/linux-learning/progress.json"

  property string curriculumMode: "48" // "48" or "90"
  property string barStyle: "percent" // "percent", "streak", "detailed"
  property string filterStatus: "all" // "all", "incomplete", "completed"
  property string activeTab: "daily"
  property string searchQuery: ""
  property int streak: 1
  property string lastActiveDate: ""
  property bool confirmReset: false
  property int selectedIndex: 0

  property var completedMap: ({})
  property var explainMap: ({})
  property var expandedMap: ({})
  property var verifiedMap: ({})

  readonly property var stats: Curriculum.calculateStats(completedMap, curriculumMode)
  readonly property real progressFraction: stats.total > 0 ? (stats.completed / stats.total) : 0
  readonly property color foreground: bar ? bar.foreground : Commons.Color.foreground
  readonly property color urgent: bar ? bar.urgent : Commons.Color.urgent
  readonly property color dim: Qt.darker(foreground, 1.55)
  readonly property string fontFamily: bar ? bar.fontFamily : Style.font.family

  readonly property var currentTracks: Curriculum.getTracks(curriculumMode)

  readonly property var rawTopicsList: {
    if (activeTab === "daily") {
      return Curriculum.dailyTopics(completedMap, curriculumMode)
    } else {
      return Curriculum.topicsForTrack(activeTab, curriculumMode)
    }
  }

  readonly property var visibleTopics: Curriculum.filterTopics(rawTopicsList, searchQuery, filterStatus, completedMap)

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

  function markCompleted(id) {
    var copy = {}
    for (var k in root.completedMap) {
      if (root.completedMap[k]) copy[k] = true
    }
    copy[id] = true
    root.updateStreak()
    root.completedMap = copy
    saveProgress()
  }

  function toggleExplain(id) {
    var copy = {}
    for (var k in root.explainMap) {
      if (root.explainMap[k]) copy[k] = true
    }
    if (copy[id]) {
      delete copy[id]
    } else {
      copy[id] = true
    }
    root.explainMap = copy
  }

  function toggleExpand(id) {
    var copy = {}
    for (var k in root.expandedMap) {
      if (root.expandedMap[k]) copy[k] = true
    }
    if (copy[id]) {
      delete copy[id]
    } else {
      copy[id] = true
    }
    root.expandedMap = copy
  }

  function setVerifiedStatus(id, passed) {
    var copy = {}
    for (var k in root.verifiedMap) {
      copy[k] = root.verifiedMap[k]
    }
    copy[id] = passed ? "passed" : "failed"
    root.verifiedMap = copy
  }

  function copyCommand(cmd) {
    Quickshell.execDetached(["wl-copy", cmd])
  }

  function runInTerminal(title, cmd) {
    Quickshell.execDetached([root.pluginDir + "/bin/run-lab.sh", title, cmd])
  }

  function verifyTask(id) {
    verifierProc.running = false
    verifierProc.currentTaskId = id
    verifierProc.command = [root.pluginDir + "/bin/verify-task.sh", id]
    verifierProc.running = true
  }

  function openWiki(url) {
    if (!url) return
    Quickshell.execDetached(["xdg-open", url])
  }

  function cycleBarStyle() {
    if (root.barStyle === "percent") {
      root.barStyle = "streak"
    } else if (root.barStyle === "streak") {
      root.barStyle = "detailed"
    } else {
      root.barStyle = "percent"
    }
    saveProgress()
  }

  function toggleCurriculumMode() {
    root.curriculumMode = (root.curriculumMode === "48") ? "90" : "48"
    root.activeTab = "daily"
    root.selectedIndex = 0
    saveProgress()
  }

  function exportJourney() {
    var md = Curriculum.exportMarkdown({
      completed: root.completedMap,
      streak: root.streak,
      lastActiveDate: root.lastActiveDate
    }, root.curriculumMode)
    var exportPath = Quickshell.env("HOME") + "/Documents/MY_LINUX_JOURNEY.md"
    Quickshell.execDetached([
      "bash", "-c",
      "mkdir -p \"$HOME/Documents\" && cat << 'EOF' > \"" + exportPath + "\"\n" + md + "\nEOF\nwl-copy \"" + exportPath + "\"\nnotify-send -a 'Linux Learning Hub' 'Journey Exported' 'Saved to " + exportPath + " (path copied to clipboard)'"
    ])
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
      version: 2,
      curriculumMode: root.curriculumMode,
      barStyle: root.barStyle,
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
        if (data.curriculumMode === "48" || data.curriculumMode === "90") {
          root.curriculumMode = data.curriculumMode
        }
        if (data.barStyle) {
          root.barStyle = data.barStyle
        }
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

  Process {
    id: verifierProc
    property string currentTaskId: ""
    onExited: function(exitCode, exitStatus) {
      if (exitCode === 0 && currentTaskId) {
        root.markCompleted(currentTaskId)
        root.setVerifiedStatus(currentTaskId, true)
      } else if (currentTaskId) {
        root.setVerifiedStatus(currentTaskId, false)
      }
    }
  }

  // --- BAR BUTTON ---
  WidgetButton {
    id: button
    anchors.fill: parent
    bar: root.bar
    text: {
      if (root.barStyle === "streak") {
        return "🔥 " + root.streak + "d •  " + root.stats.percent + "%"
      } else if (root.barStyle === "detailed") {
        return " " + root.stats.completed + "/" + root.stats.total + " (" + root.stats.percent + "%)"
      } else {
        return " " + root.stats.percent + "%"
      }
    }
    tooltipText: "Linux Learning (" + (root.curriculumMode === "90" ? "90-Day Full" : "48-Day Intensive") + "): " + root.stats.completed + "/" + root.stats.total + " completed (" + root.stats.percent + "%)\nStreak: 🔥 " + root.streak + " days (Right-click to toggle bar style)"
    active: root.opened
    onPressed: function(btn) {
      if (btn.button === Qt.RightButton) {
        root.cycleBarStyle()
      } else {
        root.toggle()
      }
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
    contentWidth: panel.fittedContentWidth(Style.space(560))
    contentHeight: panel.fittedContentHeight(mainCol.implicitHeight + Style.space(24), Style.space(680))

    PanelKeyCatcher {
      id: keyCatcher
      anchors.fill: parent
      blocked: searchInput.activeFocus
      onCloseRequested: root.close()
      onTabRequested: function(direction) { root.switchPanel(direction) }

      onMoveRequested: function(dx, dy) {
        if (root.visibleTopics.length === 0) return
        var next = root.selectedIndex + dy
        if (next < 0) next = 0
        if (next >= root.visibleTopics.length) next = root.visibleTopics.length - 1
        root.selectedIndex = next
      }

      onActivateRequested: function() {
        if (root.visibleTopics.length > 0 && root.selectedIndex >= 0 && root.selectedIndex < root.visibleTopics.length) {
          root.toggleTask(root.visibleTopics[root.selectedIndex].id)
        }
      }

      onReturnRequested: function() {
        if (root.visibleTopics.length > 0 && root.selectedIndex >= 0 && root.selectedIndex < root.visibleTopics.length) {
          var item = root.visibleTopics[root.selectedIndex]
          root.runInTerminal(item.title, item.cmd)
        }
      }

      onTextKey: function(t, modifiers) {
        if (t === "/") {
          searchInput.forceActiveFocus()
          searchInput.selectAll()
          return
        }
        if (root.visibleTopics.length === 0 || root.selectedIndex < 0 || root.selectedIndex >= root.visibleTopics.length) return
        var item = root.visibleTopics[root.selectedIndex]
        if (t === "c") {
          root.copyCommand(item.cmd)
        } else if (t === "r") {
          root.runInTerminal(item.title, item.cmd)
        } else if (t === "v") {
          root.verifyTask(item.id)
        } else if (t === "e") {
          root.toggleExplain(item.id)
        } else if (t === "x") {
          root.toggleExpand(item.id)
        }
      }

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
          spacing: Style.space(10)

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
                width: Style.space(40)
                height: Style.space(40)
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
                  font.pixelSize: Style.space(24)
                  color: Commons.Color.accent
                }
              }

              // Title and Subtitle
              Column {
                anchors.verticalCenter: parent.verticalCenter
                width: parent.width - Style.space(50) - headerRightCol.width - Style.space(16)
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
                  text: (root.curriculumMode === "90" ? "90-DAY FULL DEVOPS & CYBER ROADMAP" : "48-DAY FAST TRACK: CORE • SYSADMIN • CYBERSEC")
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.caption - 1
                  font.bold: true
                  font.letterSpacing: 1.05
                  color: root.dim
                  elide: Text.ElideRight
                  width: parent.width
                }
              }

              // Header Right Actions (Curriculum Mode Switcher + Streak Pill)
              Column {
                id: headerRightCol
                anchors.verticalCenter: parent.verticalCenter
                spacing: Style.space(4)

                // Streak Badge
                Rectangle {
                  id: streakPill
                  anchors.right: parent.right
                  implicitWidth: streakText.implicitWidth + Style.space(12)
                  implicitHeight: streakText.implicitHeight + Style.space(5)
                  radius: Style.cornerRadius
                  color: Qt.darker(root.foreground, 3.2)
                  border.width: 1
                  border.color: Commons.Color.accent

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

                // Curriculum Mode Switcher Pill
                Rectangle {
                  anchors.right: parent.right
                  implicitWidth: modeText.implicitWidth + Style.space(10)
                  implicitHeight: modeText.implicitHeight + Style.space(4)
                  radius: Style.cornerRadius
                  color: modeArea.containsMouse ? Style.hoverFillFor(root.foreground, Commons.Color.accent) : "transparent"
                  border.width: 1
                  border.color: Qt.darker(root.foreground, 2.2)

                  Text {
                    id: modeText
                    anchors.centerIn: parent
                    textFormat: Text.PlainText
                    text: (root.curriculumMode === "90" ? "90 Days ▾" : "48 Days ▾")
                    font.family: root.fontFamily
                    font.pixelSize: Style.font.caption - 1
                    font.bold: true
                    color: Commons.Color.accent
                  }

                  MouseArea {
                    id: modeArea
                    anchors.fill: parent
                    hoverEnabled: true
                    cursorShape: Qt.PointingHandCursor
                    onClicked: root.toggleCurriculumMode()
                  }
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
                  text: (root.curriculumMode === "90" ? "90-Day Full Curriculum Progress" : "48-Day Intensive Progress")
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
            }
          }

          // TAB BAR (CURRICULUM TRACKS)
          Flickable {
            width: parent.width
            implicitHeight: tabRow.implicitHeight
            contentWidth: tabRow.implicitWidth
            flickableDirection: Flickable.HorizontalFlick
            clip: true

            Row {
              id: tabRow
              spacing: Style.space(4)

              Repeater {
                model: root.currentTracks

                delegate: Rectangle {
                  id: tabBtn
                  implicitWidth: tabLabel.implicitWidth + Style.space(16)
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
                  }

                  MouseArea {
                    id: tabArea
                    anchors.fill: parent
                    hoverEnabled: true
                    cursorShape: Qt.PointingHandCursor
                    onClicked: {
                      root.activeTab = modelData.id
                      root.selectedIndex = 0
                      searchInput.text = ""
                    }
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
              placeholderText: "Search topics, commands, keywords... (Press / to focus, Esc to exit)"
              text: root.searchQuery
              onTextChanged: {
                root.searchQuery = text
                root.selectedIndex = 0
              }
              Keys.onEscapePressed: {
                if (text !== "") {
                  text = ""
                } else {
                  keyCatcher.forceActiveFocus()
                }
              }
              Keys.onDownPressed: {
                keyCatcher.forceActiveFocus()
              }
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

          // FILTER BAR & KEYBOARD HINTS
          Item {
            width: parent.width
            implicitHeight: filterRow.implicitHeight

            Row {
              id: filterRow
              anchors.left: parent.left
              anchors.verticalCenter: parent.verticalCenter
              spacing: Style.space(6)

              Text {
                anchors.verticalCenter: parent.verticalCenter
                textFormat: Text.PlainText
                text: "Filter:"
                font.family: root.fontFamily
                font.pixelSize: Style.font.caption - 1
                color: root.dim
              }

              // All Filter
              Rectangle {
                implicitWidth: allFiltText.implicitWidth + Style.space(10)
                implicitHeight: allFiltText.implicitHeight + Style.space(4)
                radius: Style.cornerRadius
                color: root.filterStatus === "all" ? Style.selectedFillFor(root.foreground, Commons.Color.accent) : "transparent"
                border.width: 1
                border.color: root.filterStatus === "all" ? Commons.Color.accent : Qt.darker(root.foreground, 2.5)

                Text {
                  id: allFiltText
                  anchors.centerIn: parent
                  textFormat: Text.PlainText
                  text: "All"
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.caption - 1
                  font.bold: root.filterStatus === "all"
                  color: root.filterStatus === "all" ? Commons.Color.accent : root.foreground
                }

                MouseArea {
                  anchors.fill: parent
                  cursorShape: Qt.PointingHandCursor
                  onClicked: { root.filterStatus = "all"; root.selectedIndex = 0 }
                }
              }

              // Incomplete Filter
              Rectangle {
                implicitWidth: incFiltText.implicitWidth + Style.space(10)
                implicitHeight: incFiltText.implicitHeight + Style.space(4)
                radius: Style.cornerRadius
                color: root.filterStatus === "incomplete" ? Style.selectedFillFor(root.foreground, Commons.Color.accent) : "transparent"
                border.width: 1
                border.color: root.filterStatus === "incomplete" ? Commons.Color.accent : Qt.darker(root.foreground, 2.5)

                Text {
                  id: incFiltText
                  anchors.centerIn: parent
                  textFormat: Text.PlainText
                  text: "Pending"
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.caption - 1
                  font.bold: root.filterStatus === "incomplete"
                  color: root.filterStatus === "incomplete" ? Commons.Color.accent : root.foreground
                }

                MouseArea {
                  anchors.fill: parent
                  cursorShape: Qt.PointingHandCursor
                  onClicked: { root.filterStatus = "incomplete"; root.selectedIndex = 0 }
                }
              }

              // Completed Filter
              Rectangle {
                implicitWidth: compFiltText.implicitWidth + Style.space(10)
                implicitHeight: compFiltText.implicitHeight + Style.space(4)
                radius: Style.cornerRadius
                color: root.filterStatus === "completed" ? Style.selectedFillFor(root.foreground, Commons.Color.accent) : "transparent"
                border.width: 1
                border.color: root.filterStatus === "completed" ? Commons.Color.accent : Qt.darker(root.foreground, 2.5)

                Text {
                  id: compFiltText
                  anchors.centerIn: parent
                  textFormat: Text.PlainText
                  text: "Done ✔"
                  font.family: root.fontFamily
                  font.pixelSize: Style.font.caption - 1
                  font.bold: root.filterStatus === "completed"
                  color: root.filterStatus === "completed" ? Commons.Color.accent : root.foreground
                }

                MouseArea {
                  anchors.fill: parent
                  cursorShape: Qt.PointingHandCursor
                  onClicked: { root.filterStatus = "completed"; root.selectedIndex = 0 }
                }
              }
            }

            // Keyboard hints badge
            Text {
              anchors.right: parent.right
              anchors.verticalCenter: parent.verticalCenter
              textFormat: Text.PlainText
              text: "⌨ [j/k] move • [space] check • [r]un • [c]opy"
              font.family: root.fontFamily
              font.pixelSize: Style.font.caption - 2
              color: root.dim
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
                return "CURRICULUM TOPICS"
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
                text: "Reset Search & Filters"
                onClicked: {
                  searchInput.text = ""
                  root.searchQuery = ""
                  root.filterStatus = "all"
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

              readonly property int cardIndex: index
              readonly property var topic: modelData
              readonly property bool isDone: !!root.completedMap[topic.id]
              readonly property bool isSelected: root.selectedIndex === cardIndex
              readonly property bool isExplained: !!root.explainMap[topic.id]
              readonly property bool isExpanded: !!root.expandedMap[topic.id]
              readonly property string verifyStatus: root.verifiedMap[topic.id] || ""
              property bool hovered: false

              Rectangle {
                id: cardRect
                width: parent.width
                radius: Style.cornerRadius
                color: card.isDone
                  ? Style.selectedFillFor(root.foreground, Commons.Color.accent)
                  : (card.hovered || card.isSelected ? Style.hoverFillFor(root.foreground, Commons.Color.accent) : Qt.darker(Commons.Color.popups ? Commons.Color.popups.background : Commons.Color.background, 1.15))
                border.width: card.isSelected ? 2 : 1
                border.color: card.isSelected
                  ? Commons.Color.accent
                  : (card.isDone ? Commons.Color.accent : (card.hovered ? Qt.darker(root.foreground, 2.0) : Qt.darker(root.foreground, 3.2)))

                implicitHeight: itemCol.implicitHeight + Style.space(16)

                MouseArea {
                  id: cardClickArea
                  anchors.fill: parent
                  z: 1
                  hoverEnabled: true
                  cursorShape: Qt.PointingHandCursor
                  onEntered: card.hovered = true
                  onExited: card.hovered = false
                  onClicked: {
                    root.selectedIndex = card.cardIndex
                  }
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
                      color: {
                        var t = card.topic.track
                        if (t === "linux" || t === "foundations") return "#1d4f73"
                        if (t === "sysadmin") return "#502f6b"
                        if (t === "scripting") return "#285c3f"
                        if (t === "networking") return "#245e6b"
                        if (t === "threat_hunting") return "#7a3e1b"
                        return "#752222"
                      }
                      implicitWidth: trackLabel.implicitWidth + Style.space(10)
                      implicitHeight: trackLabel.implicitHeight + Style.space(4)
                      anchors.verticalCenter: parent.verticalCenter

                      Text {
                        id: trackLabel
                        anchors.centerIn: parent
                        textFormat: Text.PlainText
                        text: (card.topic.trackName || "TOPIC").toUpperCase()
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

                  // Monospace Command Snippet Box with Actions
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
                        width: parent.width - Style.space(170)
                      }

                      // Action Buttons (Run + Copy)
                      Row {
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: Style.space(4)

                        // Run in Terminal Button
                        Rectangle {
                          id: runPill
                          z: 10
                          implicitWidth: runLabel.implicitWidth + Style.space(8)
                          implicitHeight: runLabel.implicitHeight + Style.space(4)
                          radius: Style.cornerRadius
                          color: runArea.containsMouse ? Commons.Color.accent : Qt.darker(root.foreground, 2.2)

                          Text {
                            id: runLabel
                            anchors.centerIn: parent
                            textFormat: Text.PlainText
                            text: " Run"
                            font.family: root.fontFamily
                            font.pixelSize: Style.font.caption - 2
                            font.bold: true
                            color: runArea.containsMouse ? Commons.Color.background : root.foreground
                          }

                          MouseArea {
                            id: runArea
                            anchors.fill: parent
                            cursorShape: Qt.PointingHandCursor
                            hoverEnabled: true
                            onClicked: {
                              root.runInTerminal(card.topic.title, card.topic.cmd)
                            }
                          }
                        }

                        // Copy Button
                        Rectangle {
                          id: copyPill
                          z: 10
                          implicitWidth: copyLabel.implicitWidth + Style.space(8)
                          implicitHeight: copyLabel.implicitHeight + Style.space(4)
                          radius: Style.cornerRadius
                          color: copyArea.containsMouse ? Commons.Color.accent : Qt.darker(root.foreground, 2.2)

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
                              root.copyCommand(card.topic.cmd)
                              copied = true
                              resetCopyTimer.restart()
                            }
                          }
                        }
                      }
                    }
                  }

                  // Secondary Toolbar: Verify + Explain Syntax + Expand Steps + Wiki Doc
                  Row {
                    width: parent.width
                    spacing: Style.space(6)

                    // Verify Button
                    Rectangle {
                      implicitWidth: verText.implicitWidth + Style.space(8)
                      implicitHeight: verText.implicitHeight + Style.space(4)
                      radius: Style.cornerRadius
                      color: {
                        if (card.verifyStatus === "passed") return "#285c3f"
                        if (card.verifyStatus === "failed") return "#752222"
                        return verArea.containsMouse ? Style.hoverFillFor(root.foreground, Commons.Color.accent) : "transparent"
                      }
                      border.width: 1
                      border.color: card.verifyStatus === "passed" ? "#285c3f" : (card.verifyStatus === "failed" ? "#752222" : Qt.darker(root.foreground, 2.4))

                      Text {
                        id: verText
                        anchors.centerIn: parent
                        textFormat: Text.PlainText
                        text: {
                          if (card.verifyStatus === "passed") return "✔ Verified!"
                          if (card.verifyStatus === "failed") return "✕ Check Failed"
                          return " Verify Check"
                        }
                        font.family: root.fontFamily
                        font.pixelSize: Style.font.caption - 2
                        color: (card.verifyStatus === "passed" || card.verifyStatus === "failed") ? "#ffffff" : root.dim
                      }

                      MouseArea {
                        id: verArea
                        anchors.fill: parent
                        hoverEnabled: true
                        cursorShape: Qt.PointingHandCursor
                        onClicked: root.verifyTask(card.topic.id)
                      }
                    }

                    // Explain Syntax Button
                    Rectangle {
                      visible: !!card.topic.explainer
                      implicitWidth: expText.implicitWidth + Style.space(8)
                      implicitHeight: expText.implicitHeight + Style.space(4)
                      radius: Style.cornerRadius
                      color: card.isExplained ? Style.selectedFillFor(root.foreground, Commons.Color.accent) : "transparent"
                      border.width: 1
                      border.color: card.isExplained ? Commons.Color.accent : Qt.darker(root.foreground, 2.4)

                      Text {
                        id: expText
                        anchors.centerIn: parent
                        textFormat: Text.PlainText
                        text: "💡 Syntax Breakdown"
                        font.family: root.fontFamily
                        font.pixelSize: Style.font.caption - 2
                        color: card.isExplained ? Commons.Color.accent : root.dim
                      }

                      MouseArea {
                        anchors.fill: parent
                        cursorShape: Qt.PointingHandCursor
                        onClicked: root.toggleExplain(card.topic.id)
                      }
                    }

                    // Expand Steps Button
                    Rectangle {
                      visible: (card.topic.commands && card.topic.commands.length > 1) || (card.topic.checklist && card.topic.checklist.length > 0)
                      implicitWidth: stepsText.implicitWidth + Style.space(8)
                      implicitHeight: stepsText.implicitHeight + Style.space(4)
                      radius: Style.cornerRadius
                      color: card.isExpanded ? Style.selectedFillFor(root.foreground, Commons.Color.accent) : "transparent"
                      border.width: 1
                      border.color: card.isExpanded ? Commons.Color.accent : Qt.darker(root.foreground, 2.4)

                      Text {
                        id: stepsText
                        anchors.centerIn: parent
                        textFormat: Text.PlainText
                        text: card.isExpanded ? "▲ Hide Steps" : "▼ Lab Steps"
                        font.family: root.fontFamily
                        font.pixelSize: Style.font.caption - 2
                        color: card.isExpanded ? Commons.Color.accent : root.dim
                      }

                      MouseArea {
                        anchors.fill: parent
                        cursorShape: Qt.PointingHandCursor
                        onClicked: root.toggleExpand(card.topic.id)
                      }
                    }

                    // Wiki Documentation Link
                    Rectangle {
                      visible: !!card.topic.wikiUrl
                      implicitWidth: wikiText.implicitWidth + Style.space(8)
                      implicitHeight: wikiText.implicitHeight + Style.space(4)
                      radius: Style.cornerRadius
                      color: "transparent"
                      border.width: 1
                      border.color: Qt.darker(root.foreground, 2.6)

                      Text {
                        id: wikiText
                        anchors.centerIn: parent
                        textFormat: Text.PlainText
                        text: "📖 Arch Wiki"
                        font.family: root.fontFamily
                        font.pixelSize: Style.font.caption - 2
                        color: root.dim
                      }

                      MouseArea {
                        anchors.fill: parent
                        cursorShape: Qt.PointingHandCursor
                        onClicked: root.openWiki(card.topic.wikiUrl)
                      }
                    }
                  }

                  // Expanded Syntax Explanation Container
                  Rectangle {
                    visible: card.isExplained && !!card.topic.explainer
                    width: parent.width
                    implicitHeight: expBoxCol.implicitHeight + Style.space(12)
                    radius: Style.space(4)
                    color: Qt.darker(Commons.Color.accent, 3.8)
                    border.width: 1
                    border.color: Commons.Color.accent

                    Column {
                      id: expBoxCol
                      anchors.left: parent.left
                      anchors.right: parent.right
                      anchors.top: parent.top
                      anchors.margins: Style.space(8)
                      spacing: Style.space(4)

                      Text {
                        textFormat: Text.PlainText
                        text: "💡 Command Syntax & Flags:"
                        font.family: root.fontFamily
                        font.pixelSize: Style.font.caption - 1
                        font.bold: true
                        color: Commons.Color.accent
                      }

                      Text {
                        textFormat: Text.PlainText
                        width: parent.width
                        wrapMode: Text.WordWrap
                        text: card.topic.explainer
                        font.family: "monospace"
                        font.pixelSize: Style.font.caption - 1
                        color: root.foreground
                      }
                    }
                  }

                  // Expanded Sub-steps / Commands Container
                  Rectangle {
                    visible: card.isExpanded
                    width: parent.width
                    implicitHeight: subStepsCol.implicitHeight + Style.space(12)
                    radius: Style.space(4)
                    color: Qt.darker(Commons.Color.background, 1.2)
                    border.width: 1
                    border.color: Qt.darker(root.foreground, 2.6)

                    Column {
                      id: subStepsCol
                      anchors.left: parent.left
                      anchors.right: parent.right
                      anchors.top: parent.top
                      anchors.margins: Style.space(8)
                      spacing: Style.space(6)

                      // Checklist goals
                      Repeater {
                        model: card.topic.checklist || []
                        delegate: Row {
                          width: parent.width
                          spacing: Style.space(6)
                          Text {
                            textFormat: Text.PlainText
                            text: "•"
                            color: Commons.Color.accent
                            font.bold: true
                          }
                          Text {
                            textFormat: Text.PlainText
                            width: parent.width - Style.space(16)
                            wrapMode: Text.WordWrap
                            text: modelData
                            font.family: root.fontFamily
                            font.pixelSize: Style.font.caption - 1
                            color: root.foreground
                          }
                        }
                      }

                      // Sub-commands list
                      Repeater {
                        model: card.topic.commands || []
                        delegate: Rectangle {
                          width: parent.width
                          implicitHeight: subCmdRow.implicitHeight + Style.space(6)
                          radius: Style.space(4)
                          color: Qt.darker(Commons.Color.background, 1.4)
                          border.width: 1
                          border.color: Qt.darker(root.foreground, 3.0)

                          Row {
                            id: subCmdRow
                            anchors.fill: parent
                            anchors.margins: Style.space(4)
                            spacing: Style.space(6)

                            Column {
                              width: parent.width - Style.space(80)
                              spacing: Style.space(2)
                              Text {
                                textFormat: Text.PlainText
                                text: modelData.desc
                                font.family: root.fontFamily
                                font.pixelSize: Style.font.caption - 2
                                font.bold: true
                                color: root.dim
                              }
                              Text {
                                textFormat: Text.PlainText
                                text: "$" + " " + modelData.cmd
                                font.family: "monospace"
                                font.pixelSize: Style.font.caption - 1
                                color: root.foreground
                                elide: Text.ElideRight
                                width: parent.width
                              }
                            }

                            Rectangle {
                              implicitWidth: subCopyText.implicitWidth + Style.space(8)
                              implicitHeight: subCopyText.implicitHeight + Style.space(4)
                              radius: Style.cornerRadius
                              color: subCopyArea.containsMouse ? Commons.Color.accent : Qt.darker(root.foreground, 2.2)
                              anchors.verticalCenter: parent.verticalCenter

                              Text {
                                id: subCopyText
                                anchors.centerIn: parent
                                textFormat: Text.PlainText
                                text: subCopyArea.copied ? "✔" : "Copy"
                                font.pixelSize: Style.font.caption - 2
                                color: subCopyArea.containsMouse ? Commons.Color.background : root.foreground
                              }

                              MouseArea {
                                id: subCopyArea
                                anchors.fill: parent
                                cursorShape: Qt.PointingHandCursor
                                property bool copied: false
                                Timer {
                                  id: subResetTimer
                                  interval: 1500
                                  onTriggered: subCopyArea.copied = false
                                }
                                onClicked: {
                                  root.copyCommand(modelData.cmd)
                                  copied = true
                                  subResetTimer.restart()
                                }
                              }
                            }
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

            Row {
              anchors.left: parent.left
              anchors.verticalCenter: parent.verticalCenter
              spacing: Style.space(6)

              Button {
                id: footerLeftBtn
                text: "🌟 Today's Tasks"
                visible: root.activeTab !== "daily"
                onClicked: {
                  root.activeTab = "daily"
                  root.selectedIndex = 0
                  searchInput.text = ""
                }
              }

              Button {
                text: "📋 Export Journey (.md)"
                onClicked: root.exportJourney()
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
