### Offline-First Desktop Notebook & Personal Knowledge Management App

Product Vision
--------------

WiggleNote is a fast, offline-first notebook for capturing ideas, organizing knowledge, managing tasks, and building a personal second brain. It is not a word processor and does not compete with Word/Docs on document formatting. Every feature below serves capture speed, organization, search, task management, knowledge management, productivity, offline reliability, privacy, sync, or usability.

Legend
------

P = Priority (MVP / High / Medium / Low / Future) D = Difficulty (Easy / Medium / Hard)

1\. NOTES
---------

*   [X] **1.1 Instant Note Creation**  `Priority: MVP`  `Difficulty: Easy` 
    *   Purpose: Create a blank note in under 1 second from anywhere in the app.
    *   User Benefit: Zero friction between having a thought and capturing it.
    *   Why it belongs: Core capture loop of any notebook app.
    *   Dependencies: None
        
*   [X] **1.2 Markdown-Native Note Body**  `Priority: MVP`  `Difficulty: Medium`
    *   Purpose: Store note content as plain Markdown, not a proprietary format.
    *   User Benefit: Future-proof, portable, human-readable files.
    *   Why it belongs: Keeps notes lightweight and developer/writer friendly.
    *   Dependencies: Markdown renderer
        
*   [X] **1.3 Auto-Save (Debounced)**  `Priority: MVP`  `Difficulty: Easy`
    *   Purpose: Persist note changes automatically without manual save.
    *   User Benefit: Never lose work; no save-button anxiety.
    *   Why it belongs: Notebook apps prioritize frictionless capture over file management rituals.
    *   Dependencies: Local DB write layer
        
*   [X] **1.4 Note Titles Auto-Derived from First Line**  `Priority: MVP`  `Difficulty:   Easy`
    *   Purpose: Skip manual title entry for quick notes.
    *   User Benefit: Faster capture; titles stay meaningful.
    *   Why it belongs: Reduces friction, matches Bear/Apple Notes UX.
    *   Dependencies: 1.1
        
*   [X] **1.5 Note Pinning**  `Priority: MVP`  `Difficulty: Easy`
    *   Purpose: Keep important notes at the top of a list.
    *   User Benefit: Quick access to active/critical notes.
    *   Why it belongs: Lightweight organization without folders.
    *   Dependencies: None
        
*   \[ \] **1.6 Note Color Labels**  `Priority: High`  `Difficulty: Easy`
    *   Purpose: Assign a color to a note for visual categorization.
    *   User Benefit: Fast visual scanning, Keep-style organization.
    *   Why it belongs: Visual organization aid, not formatting.
    *   Dependencies: None
        
*   \[ \] **1.7 Note Templates (Personal, Non-Print)**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Reusable structured starting points (meeting notes, book notes).
        
    *   User Benefit: Speeds up recurring note types.
        
    *   Why it belongs: PKM workflow acceleration, not page layout.
        
    *   Dependencies: 1.2
        
*   \[ \] **1.8 Inline Note Linking (\[\[note\]\])**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Link directly to another note while typing.
        
    *   User Benefit: Builds a connected knowledge base naturally.
        
    *   Why it belongs: Foundation of backlinks/knowledge graph.
        
    *   Dependencies: 11.1 (Backlinks engine)
        
*   \[ \] **1.9 Note Word/Character Count**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Show live counts in the status bar.
        
    *   User Benefit: Useful for writers tracking progress.
        
    *   Why it belongs: Lightweight writer utility, not formatting.
        
    *   Dependencies: None
        
*   \[ \] **1.10 Split-Pane Note View**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: View/edit two notes side by side.
        
    *   User Benefit: Compare or reference notes while writing.
        
    *   Why it belongs: Improves PKM workflows (e.g., synthesis writing).
        
    *   Dependencies: None
        
*   \[ \] **1.11 Note Outline/Table of Contents Panel**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Auto-generate a heading-based navigation sidebar per note.
        
    *   User Benefit: Quickly jump within long notes.
        
    *   Why it belongs: Navigation aid, not print-oriented TOC.
        
    *   Dependencies: 1.2
        
*   \[ \] **1.12 Note Word Count Goals**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Set an optional target word count for a note with progress bar.
        
    *   User Benefit: Motivates writers/journalers.
        
    *   Why it belongs: Productivity nudge for writing-heavy users.
        
    *   Dependencies: 1.9
        
*   \[ \] **1.13 Quick Note Duplication**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Clone a note instantly for variant drafts.
        
    *   User Benefit: Speeds up iterative writing/brainstorming.
        
    *   Why it belongs: Common PKM workflow need.
        
    *   Dependencies: None
        
*   \[ \] **1.14 Note Read-Only / Lock Mode**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Prevent accidental edits to finalized notes.
        
    *   User Benefit: Protects reference material from corruption.
        
    *   Why it belongs: Data safety, common in PKM tools.
        
    *   Dependencies: None
        
*   \[ \] **1.15 Random Note ("Surface Old Notes")**  `Priority: Future`  `Difficulty: Easy`
    
    *   Purpose: Resurface a random older note for review.
        
    *   User Benefit: Encourages revisiting forgotten knowledge (spaced exposure).
        
    *   Why it belongs: Differentiated PKM "second brain" feature.
        
    *   Dependencies: None
        

2\. NOTEBOOKS
-------------

*   \[ \] **2.1 Nested Notebooks**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Organize notes into notebooks with sub-notebooks.
        
    *   User Benefit: Hierarchical structuring for large knowledge bases.
        
    *   Why it belongs: Core organizational unit, like Evernote/Joplin.
        
    *   Dependencies: None
        
*   \[ \] **2.2 Notebook Icons & Colors**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Visually differentiate notebooks at a glance.
        
    *   User Benefit: Faster recognition in a crowded sidebar.
        
    *   Why it belongs: Usability/visual organization.
        
    *   Dependencies: 2.1
        
*   \[ \] **2.3 Notebook-Level Default Template**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: New notes in a notebook start from a chosen template.
        
    *   User Benefit: Consistency for recurring note types (e.g., Daily Standups).
        
    *   Why it belongs: Productivity automation, not document design.
        
    *   Dependencies: 1.7, 2.1
        
*   \[ \] **2.4 Notebook Drag-and-Drop Reordering**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Manually arrange notebook order in sidebar.
        
    *   User Benefit: Personalized organization priority.
        
    *   Why it belongs: Standard usability expectation.
        
    *   Dependencies: 2.1
        
*   \[ \] **2.5 Notebook Stats Panel**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Show note count, last edited, total words per notebook.
        
    *   User Benefit: Quick overview of notebook activity.
        
    *   Why it belongs: Helps manage large PKM systems.
        
    *   Dependencies: 2.1
        
*   \[ \] **2.6 Notebook Merge**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Combine two notebooks into one.
        
    *   User Benefit: Cleanup/reorganization without manual note-moving.
        
    *   Why it belongs: Organizational maintenance tool.
        
    *   Dependencies: 2.1
        
*   \[ \] **2.7 Notebook-Level Encryption**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Lock a specific notebook with its own password.
        
    *   User Benefit: Separate privacy for sensitive notebooks (e.g., journals).
        
    *   Why it belongs: Privacy-conscious users expect granular control.
        
    *   Dependencies: 36.x (Encryption engine)
        
*   \[ \] **2.8 Notebook Cover/Banner**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Optional visual banner for a notebook's landing view.
        
    *   User Benefit: Personalization, easier mental mapping of notebooks.
        
    *   Why it belongs: Customization without page-layout complexity.
        
    *   Dependencies: 2.1
        
*   \[ \] **2.9 Shared Notebook Export Bundle**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Export an entire notebook as a self-contained folder.
        
    *   User Benefit: Easy sharing/backup of a topic area.
        
    *   Why it belongs: Portability, supports offline-first philosophy.
        
    *   Dependencies: 45.x (Export engine)
        
*   \[ \] **2.10 Notebook Search Scope**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Restrict search to within one notebook.
        
    *   User Benefit: Faster, more relevant results in large vaults.
        
    *   Why it belongs: Search refinement for organization-heavy users.
        
    *   Dependencies: 13.1
        
*   \[ \] **2.11 Notebook Archiving**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Move an entire notebook to archive without deleting it.
        
    *   User Benefit: Declutters active workspace while preserving data.
        
    *   Why it belongs: Lifecycle management of knowledge.
        
    *   Dependencies: 30.x (Archive)
        
*   \[ \] **2.12 Smart Notebook Suggestions**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Suggest a notebook for a new note based on content similarity.
        
    *   User Benefit: Reduces manual filing decisions.
        
    *   Why it belongs: AI-assisted organization, optional layer.
        
    *   Dependencies: 42.x (AI)
        

3\. DAILY NOTES
---------------

*   \[ \] **3.1 One-Click "Today" Note**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Open/create today's daily note instantly.
        
    *   User Benefit: Frictionless daily journaling/logging habit.
        
    *   Why it belongs: Core Logseq/Obsidian-style workflow.
        
    *   Dependencies: None
        
*   \[ \] **3.2 Daily Note Auto-Template**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Pre-fill new daily notes with a custom structure.
        
    *   User Benefit: Consistent daily logging format.
        
    *   Why it belongs: Habit-building productivity feature.
        
    *   Dependencies: 1.7
        
*   \[ \] **3.3 Daily Notes Calendar Navigator**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Mini calendar to jump to any day's note.
        
    *   User Benefit: Easy historical review and forward planning.
        
    *   Why it belongs: Tight calendar/notes integration, PKM staple.
        
    *   Dependencies: 6.1
        
*   \[ \] **3.4 Streak Tracker for Daily Notes**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Show consecutive days a daily note was created.
        
    *   User Benefit: Gamifies journaling consistency.
        
    *   Why it belongs: Productivity/habit motivation.
        
    *   Dependencies: 3.1
        
*   \[ \] **3.5 Carry-Over Unfinished Tasks**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Auto-roll incomplete tasks from yesterday's note to today's.
        
    *   User Benefit: Nothing falls through the cracks.
        
    *   Why it belongs: Direct integration of tasks + daily notes.
        
    *   Dependencies: 4.x
        
*   \[ \] **3.6 Weekly/Monthly Rollup Notes**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Auto-aggregate links to that week's/month's daily notes.
        
    *   User Benefit: Higher-level review without manual collection.
        
    *   Why it belongs: Supports reflection workflows in PKM.
        
    *   Dependencies: 3.1
        
*   \[ \] **3.7 Quick Jump: Yesterday/Tomorrow**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Keyboard/button navigation to adjacent daily notes.
        
    *   User Benefit: Fast chronological browsing.
        
    *   Why it belongs: Core daily-notes navigation.
        
    *   Dependencies: 3.1
        
*   \[ \] **3.8 Daily Note Mood/Energy Quick-Log**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: One-tap emoji/scale log of mood or energy at top of daily note.
        
    *   User Benefit: Lightweight self-tracking without separate app.
        
    *   Why it belongs: Personal knowledge management extends to self-data.
        
    *   Dependencies: 3.1
        
*   \[ \] **3.9 Daily Note Backlinked Mentions Panel**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Show which other notes reference today's date.
        
    *   User Benefit: Surfaces context (meetings, tasks) tied to the day.
        
    *   Why it belongs: Leverages backlink engine for time-based recall.
        
    *   Dependencies: 11.1
        
*   \[ \] **3.10 Custom Daily Note Naming/Date Format**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Let users configure date format and file naming pattern.
        
    *   User Benefit: Fits personal or regional conventions.
        
    *   Why it belongs: Customization for power users.
        
    *   Dependencies: 3.1
        

4\. TASKS
---------

*   \[ \] **4.1 Inline Task Checkboxes in Any Note**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Turn any line into a checkable task with markdown syntax.
        
    *   User Benefit: No context-switch between notes and a separate task app.
        
    *   Why it belongs: Tasks-in-notes is central to modern PKM tools.
        
    *   Dependencies: 1.2
        
*   \[ \] **4.2 Global Task Aggregator View**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Collect all open tasks across all notes into one list.
        
    *   User Benefit: Single place to see everything that needs doing.
        
    *   Why it belongs: Converts scattered notes into an actionable system.
        
    *   Dependencies: 4.1
        
*   \[ \] **4.3 Task Due Dates**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Attach an optional due date to any task.
        
    *   User Benefit: Time-aware task management.
        
    *   Why it belongs: Basic task management expectation.
        
    *   Dependencies: 4.1
        
*   \[ \] **4.4 Task Priority Levels**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Mark tasks High/Medium/Low.
        
    *   User Benefit: Helps focus on what matters first.
        
    *   Why it belongs: Standard task triage feature.
        
    *   Dependencies: 4.1
        
*   \[ \] **4.5 Recurring Tasks**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Tasks that regenerate daily/weekly/monthly.
        
    *   User Benefit: Supports habits and routine work.
        
    *   Why it belongs: Common need across PKM/task hybrids.
        
    *   Dependencies: 4.1
        
*   \[ \] **4.6 Task Filtering by Tag/Notebook/Date**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Slice the global task list by multiple facets.
        
    *   User Benefit: Context-specific to-do views (e.g., "Work tasks due this week").
        
    *   Why it belongs: Makes the aggregator genuinely useful at scale.
        
    *   Dependencies: 4.2, 9.x
        
*   \[ \] **4.7 Sub-Tasks / Nested Checklists**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Break a task into smaller checkable steps.
        
    *   User Benefit: Handles complex to-dos cleanly.
        
    *   Why it belongs: Matches real-world task complexity.
        
    *   Dependencies: 4.1
        
*   \[ \] **4.8 Task Completion History**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Log when tasks were completed.
        
    *   User Benefit: Personal productivity insight over time.
        
    *   Why it belongs: Supports reflection and review workflows.
        
    *   Dependencies: 4.1
        
*   \[ \] **4.9 Kanban Board View for Tasks**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Visualize tasks across To Do / In Progress / Done columns.
        
    *   User Benefit: Alternative visual workflow for project-style tasks.
        
    *   Why it belongs: Productivity-focused, optional view layer.
        
    *   Dependencies: 4.1, 4.2
        
*   \[ \] **4.10 Quick Task Capture Bar**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Add a task to a chosen list without opening a note.
        
    *   User Benefit: Removes friction for fast task entry.
        
    *   Why it belongs: Aligns with Quick Capture philosophy.
        
    *   Dependencies: 15.x
        
*   \[ \] **4.11 Task-to-Note Linking**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Link a task to a related note for context.
        
    *   User Benefit: Keeps task and supporting detail connected.
        
    *   Why it belongs: Bridges tasks and knowledge management.
        
    *   Dependencies: 1.8
        
*   \[ \] **4.12 Task Time Estimates**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Optional estimated duration per task.
        
    *   User Benefit: Helps with daily planning/capacity.
        
    *   Why it belongs: Lightweight planning aid.
        
    *   Dependencies: 4.1
        
*   \[ \] **4.13 Overdue Task Highlighting**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Visually flag tasks past due date.
        
    *   User Benefit: Prevents missed deadlines.
        
    *   Why it belongs: Core usability for task trust.
        
    *   Dependencies: 4.3
        
*   \[ \] **4.14 "Someday/Maybe" Task Bucket**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: A holding list for non-committed ideas/tasks.
        
    *   User Benefit: GTD-style mental offloading without clutter.
        
    *   Why it belongs: Reduces anxiety, classic PKM/GTD pattern.
        
    *   Dependencies: 4.2
        

5\. CHECKLISTS
--------------

*   \[ \] **5.1 Standalone Checklist Note Type**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: A note format optimized purely for checklist content.
        
    *   User Benefit: Fast list creation (packing, groceries, steps).
        
    *   Why it belongs: Common quick-capture use case (Google Keep-style).
        
    *   Dependencies: 1.2
        
*   \[ \] **5.2 Checklist Progress Bar**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Show % complete for a checklist note.
        
    *   User Benefit: Visual sense of progress.
        
    *   Why it belongs: Motivational feedback, lightweight.
        
    *   Dependencies: 5.1
        
*   \[ \] **5.3 Reorderable Checklist Items**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Drag to reorder list items.
        
    *   User Benefit: Easy prioritization within a list.
        
    *   Why it belongs: Basic usability for lists.
        
    *   Dependencies: 5.1
        
*   \[ \] **5.4 Auto-Sort Checked Items to Bottom**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Move completed items down automatically.
        
    *   User Benefit: Keeps focus on remaining items.
        
    *   Why it belongs: Common Keep/Apple Notes behavior users expect.
        
    *   Dependencies: 5.1
        
*   \[ \] **5.5 Checklist Templates (Packing, Groceries, Routines)**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Preloaded reusable checklist starters.
        
    *   User Benefit: Speeds up common recurring lists.
        
    *   Why it belongs: Capture-speed feature.
        
    *   Dependencies: 1.7
        
*   \[ \] **5.6 Shared Checklist Quick-Share Export**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Export a checklist as plain text for sharing elsewhere.
        
    *   User Benefit: Easy handoff without needing the app.
        
    *   Why it belongs: Lightweight interoperability.
        
    *   Dependencies: 45.x
        
*   \[ \] **5.7 Checklist Item Notes/Subtext**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Add a small note under a checklist item.
        
    *   User Benefit: Extra context without cluttering the main list.
        
    *   Why it belongs: Improves checklist usefulness for complex tasks.
        
    *   Dependencies: 5.1
        
*   \[ \] **5.8 Multi-Column Checklist Layout**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: View long checklists in 2-3 columns.
        
    *   User Benefit: Better use of screen space for long lists.
        
    *   Why it belongs: Usability, not document layout (interactive, not print).
        
    *   Dependencies: 5.1
        
*   \[ \] **5.9 Checklist Reset Button**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Uncheck all items at once for reuse.
        
    *   User Benefit: Great for recurring checklists (e.g., weekly routine).
        
    *   Why it belongs: Supports repeatable workflows.
        
    *   Dependencies: 5.1
        
*   \[ \] **5.10 Indented Checklist Hierarchy**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Nest checklist items under parent items.
        
    *   User Benefit: Group related sub-items logically.
        
    *   Why it belongs: Matches real-world list complexity.
        
    *   Dependencies: 5.1
        

6\. CALENDAR
------------

*   \[ \] **6.1 Built-In Calendar View**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Month/week view showing notes and tasks by date.
        
    *   User Benefit: Visual, time-based overview of activity.
        
    *   Why it belongs: Connects daily notes/tasks visually.
        
    *   Dependencies: 3.x, 4.x
        
*   \[ \] **6.2 Click-to-Create Note on Date**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Click any calendar day to open/create that day's note.
        
    *   User Benefit: Fast navigation into the past or future.
        
    *   Why it belongs: Core calendar-notes integration.
        
    *   Dependencies: 6.1
        
*   \[ \] **6.3 Task Due Dates on Calendar**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Overlay tasks with due dates onto the calendar.
        
    *   User Benefit: Single view of obligations and notes.
        
    *   Why it belongs: Unifies tasks and time.
        
    *   Dependencies: 4.3, 6.1
        
*   \[ \] **6.4 Heatmap View (Note Activity)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: GitHub-style heatmap showing days with note activity.
        
    *   User Benefit: Visualizes consistency, motivates habit-building.
        
    *   Why it belongs: Differentiated reflection tool, common in PKM tools.
        
    *   Dependencies: 6.1
        
*   \[ \] **6.5 Calendar Week Numbers**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Display ISO week numbers alongside dates.
        
    *   User Benefit: Useful for planners/professionals.
        
    *   Why it belongs: Small usability add for planning users.
        
    *   Dependencies: 6.1
        
*   \[ \] **6.6 Local Calendar File Import (.ics, read-only)**  `Priority: Future`  `Difficulty: Medium`
    
    *   Purpose: Display external calendar events for context only.
        
    *   User Benefit: See life events alongside notes without full sync complexity.
        
    *   Why it belongs: Optional integration that stays offline-first (file-based).
        
    *   Dependencies: 6.1, 45.x
        
*   \[ \] **6.7 Mini Calendar Widget in Sidebar**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Persistent small calendar for quick date jumps.
        
    *   User Benefit: Always-available navigation.
        
    *   Why it belongs: Frequent-action accessibility.
        
    *   Dependencies: 6.1
        
*   \[ \] **6.8 Custom Event Markers**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Add non-task personal markers (birthdays, deadlines) to calendar.
        
    *   User Benefit: Lightweight personal event tracking without full calendar app.
        
    *   Why it belongs: Keeps personal context inside the notebook.
        
    *   Dependencies: 6.1
        
*   \[ \] **6.9 Calendar Filter by Notebook/Tag**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Show only items from selected notebooks/tags on calendar.
        
    *   User Benefit: Reduces visual noise for focused planning.
        
    *   Why it belongs: Organization-aware calendar.
        
    *   Dependencies: 6.1, 9.x
        
*   \[ \] **6.10 Year-at-a-Glance View**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Compact 12-month overview with activity density.
        
    *   User Benefit: High-level review of the year's work/journaling.
        
    *   Why it belongs: Reflection/review tool, common PKM annual review pattern.
        
    *   Dependencies: 6.4
        

7\. REMINDERS
-------------

*   \[ \] **7.1 Set Reminder on Any Note or Task**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Attach a date/time alert to a note or task.
        
    *   User Benefit: Nothing important gets forgotten.
        
    *   Why it belongs: Core productivity safety net.
        
    *   Dependencies: OS notification API
        
*   \[ \] **7.2 Native OS Notifications**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Trigger system-level notification when a reminder fires.
        
    *   User Benefit: Reminders work even if app window is closed/minimized.
        
    *   Why it belongs: Required for reminders to be trustworthy offline.
        
    *   Dependencies: Electron notification module
        
*   \[ \] **7.3 Snooze Reminder**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Postpone a reminder by a chosen interval.
        
    *   User Benefit: Flexible response to notifications.
        
    *   Why it belongs: Standard reminder UX expectation.
        
    *   Dependencies: 7.1
        
*   \[ \] **7.4 Recurring Reminders**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Reminders that repeat on a schedule.
        
    *   User Benefit: Supports habits, medication, routines.
        
    *   Why it belongs: Common real-world reminder need.
        
    *   Dependencies: 7.1
        
*   \[ \] **7.5 Location-Independent Time-Based Reminders Only**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Explicitly scope reminders to time (not geofencing) for desktop.
        
    *   User Benefit: Sets clear, reliable expectations for a desktop app.
        
    *   Why it belongs: Avoids overscoping into mobile-only territory.
        
    *   Dependencies: 7.1
        
*   \[ \] **7.6 Reminder Inbox/Upcoming List**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Central view of all pending reminders, sorted by time.
        
    *   User Benefit: At-a-glance overview of what's coming up.
        
    *   Why it belongs: Mirrors global task aggregator pattern.
        
    *   Dependencies: 7.1
        
*   \[ \] **7.7 Quiet Hours Setting**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Mute non-urgent reminder notifications during set hours.
        
    *   User Benefit: Respects focus time/sleep, especially for night-owl users.
        
    *   Why it belongs: Personal productivity/wellbeing feature.
        
    *   Dependencies: 7.2
        
*   \[ \] **7.8 Reminder-to-Task Conversion**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Promote a reminder into a full task with sub-items.
        
    *   User Benefit: Smooth escalation from "remember this" to "do this."
        
    *   Why it belongs: Bridges reminders and task system.
        
    *   Dependencies: 4.1, 7.1
        
*   \[ \] **7.9 Missed Reminder Recovery**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Show reminders that fired while app/computer was off.
        
    *   User Benefit: Offline-first reliability — nothing silently lost.
        
    *   Why it belongs: Critical for an offline-first app's trustworthiness.
        
    *   Dependencies: 7.1, 34.x (Offline storage)
        
*   \[ \] **7.10 Custom Reminder Sounds/Labels**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Personalize how reminders look/sound.
        
    *   User Benefit: Distinguish urgent vs. casual reminders.
        
    *   Why it belongs: Customization/usability.
        
    *   Dependencies: 7.2
        

8\. TAGS
--------

*   \[ \] **8.1 Inline Hashtags (#tag)**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Tag notes by typing # anywhere in content.
        
    *   User Benefit: Frictionless, content-driven organization.
        
    *   Why it belongs: Core PKM organization method (Obsidian/Bear style).
        
    *   Dependencies: 1.2
        
*   \[ \] **8.2 Tag Autocomplete**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Suggest existing tags while typing #.
        
    *   User Benefit: Prevents duplicate/inconsistent tags (e.g., #idea vs #ideas).
        
    *   Why it belongs: Tag hygiene at scale.
        
    *   Dependencies: 8.1
        
*   \[ \] **8.3 Nested/Hierarchical Tags (#project/wigglenote)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Support tag hierarchies for fine-grained categorization.
        
    *   User Benefit: Scales organization for power users.
        
    *   Why it belongs: Common advanced PKM pattern.
        
    *   Dependencies: 8.1
        
*   \[ \] **8.4 Tag Browser Panel**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Sidebar listing all tags with note counts.
        
    *   User Benefit: Discoverability of existing organizational structure.
        
    *   Why it belongs: Makes tags navigable, not just searchable.
        
    *   Dependencies: 8.1
        
*   \[ \] **8.5 Tag Rename/Merge**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Rename a tag everywhere or merge two tags into one.
        
    *   User Benefit: Keeps taxonomy clean over time.
        
    *   Why it belongs: Maintenance tool, essential at scale.
        
    *   Dependencies: 8.1
        
*   \[ \] **8.6 Tag Color Coding**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Assign colors to specific tags.
        
    *   User Benefit: Faster visual recognition.
        
    *   Why it belongs: Visual organization aid.
        
    *   Dependencies: 8.1
        
*   \[ \] **8.7 Multi-Tag Filtering (AND/OR)**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Filter notes by combinations of tags.
        
    *   User Benefit: Precise retrieval in large vaults.
        
    *   Why it belongs: Search/organization power feature.
        
    *   Dependencies: 8.1, 13.x
        
*   \[ \] **8.8 Orphan Tag Cleanup Suggestions**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Flag tags used only once or unused tags for review.
        
    *   User Benefit: Keeps tagging system healthy.
        
    *   Why it belongs: Long-term knowledge base hygiene.
        
    *   Dependencies: 8.4
        
*   \[ \] **8.9 Tag-Based Smart Note Creation**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Auto-apply a tag based on which notebook/template is used.
        
    *   User Benefit: Reduces manual tagging effort.
        
    *   Why it belongs: Automation for consistent organization.
        
    *   Dependencies: 8.1, 2.3
        
*   \[ \] **8.10 Recently Used Tags Quick-Picker**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Show last-used tags for fast reapplication.
        
    *   User Benefit: Speeds up tagging during quick capture.
        
    *   Why it belongs: Capture-speed optimization.
        
    *   Dependencies: 8.1
        

9\. FOLDERS
-----------

*   \[ \] **9.1 Flexible Folder Structure**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Optional folder system alongside notebooks for users who prefer it.
        
    *   User Benefit: Accommodates both folder-first and tag-first organizers.
        
    *   Why it belongs: Caters to different mental models of organization.
        
    *   Dependencies: None
        
*   \[ \] **9.2 Drag-and-Drop Note Filing**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Drag notes into folders/notebooks directly.
        
    *   User Benefit: Fast, intuitive reorganization.
        
    *   Why it belongs: Basic usability expectation.
        
    *   Dependencies: 9.1
        
*   \[ \] **9.3 Folder Color/Icon Customization**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Visually distinguish folders.
        
    *   User Benefit: Faster visual navigation.
        
    *   Why it belongs: Usability/customization.
        
    *   Dependencies: 9.1
        
*   \[ \] **9.4 Collapsible Folder Tree**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Expand/collapse nested folders in sidebar.
        
    *   User Benefit: Manages visual complexity in large vaults.
        
    *   Why it belongs: Core navigation usability.
        
    *   Dependencies: 9.1
        
*   \[ \] **9.5 Folder-Level Note Count Badges**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Show number of notes per folder.
        
    *   User Benefit: Quick sense of folder size/activity.
        
    *   Why it belongs: Lightweight overview aid.
        
    *   Dependencies: 9.1
        
*   \[ \] **9.6 Multi-Select Bulk Move**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Select multiple notes and move them together.
        
    *   User Benefit: Efficient reorganization at scale.
        
    *   Why it belongs: Productivity for power users managing large vaults.
        
    *   Dependencies: 9.1
        
*   \[ \] **9.7 Folder Search Scope Filter**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Search within a specific folder only.
        
    *   User Benefit: Faster, relevant results.
        
    *   Why it belongs: Search refinement.
        
    *   Dependencies: 9.1, 13.1
        
*   \[ \] **9.8 Smart Default Folder per Note Type**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: New checklist/journal/etc. notes default to a configured folder.
        
    *   User Benefit: Reduces manual filing decisions.
        
    *   Why it belongs: Automation for consistent organization.
        
    *   Dependencies: 9.1
        
*   \[ \] **9.9 Folder Favorites/Pins**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Pin frequently used folders to top of sidebar.
        
    *   User Benefit: Fast access to active work areas.
        
    *   Why it belongs: Usability for repeat workflows.
        
    *   Dependencies: 9.1
        
*   \[ \] **9.10 Folder vs. Tag Hybrid View**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: View notes by folder, then further filter by tag in same screen.
        
    *   User Benefit: Combines both organizational systems without conflict.
        
    *   Why it belongs: Original feature bridging folder-first and tag-first users.
        
    *   Dependencies: 9.1, 8.1
        

10\. SMART COLLECTIONS
----------------------

*   \[ \] **10.1 Saved Search Collections**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Save a search/filter query as a persistent dynamic "folder."
        
    *   User Benefit: Auto-updating views like "Unread research notes."
        
    *   Why it belongs: Notion/Evernote-style dynamic organization.
        
    *   Dependencies: 13.x
        
*   \[ \] **10.2 Rule-Based Auto-Collections**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Define rules (tag + date + notebook) that auto-populate a collection.
        
    *   User Benefit: Zero-maintenance dynamic views.
        
    *   Why it belongs: Advanced PKM automation, differentiator vs. static folders.
        
    *   Dependencies: 10.1
        
*   \[ \] **10.3 "On This Day" Smart Collection**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Auto-surface notes created on this date in previous years.
        
    *   User Benefit: Memory/reflection feature, builds long-term engagement.
        
    *   Why it belongs: Original PKM reflection feature.
        
    *   Dependencies: 3.x
        
*   \[ \] **10.4 "Needs Review" Collection**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Auto-collect notes untouched for X months.
        
    *   User Benefit: Surfaces stale knowledge for pruning/updating.
        
    *   Why it belongs: Knowledge base maintenance, second-brain hygiene.
        
    *   Dependencies: 10.2
        
*   \[ \] **10.5 Combined Tag+Notebook+Date Smart Filters**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Build multi-condition filters via simple UI (no query language).
        
    *   User Benefit: Power-user filtering without learning syntax.
        
    *   Why it belongs: Accessible advanced organization.
        
    *   Dependencies: 8.x, 9.x, 6.x
        
*   \[ \] **10.6 Pinned Smart Collections in Sidebar**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Keep favorite smart collections visible at all times.
        
    *   User Benefit: Fast access to recurring views.
        
    *   Why it belongs: Usability for frequent actions.
        
    *   Dependencies: 10.1
        
*   \[ \] **10.7 Collection Note Count Live Badge**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Show live count of items matching a smart collection.
        
    *   User Benefit: At-a-glance awareness (e.g., "12 overdue tasks").
        
    *   Why it belongs: Actionable visibility.
        
    *   Dependencies: 10.1
        
*   \[ \] **10.8 Export a Smart Collection's Notes**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Bulk export all notes currently matching a saved filter.
        
    *   User Benefit: Easy reporting/backup of a topic slice.
        
    *   Why it belongs: Practical utility for filtered data.
        
    *   Dependencies: 10.1, 45.x
        

11\. BACKLINKS
--------------

*   \[ \] **11.1 Automatic Backlinks Panel**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Show all notes linking to the currently open note.
        
    *   User Benefit: Reveals connections you didn't manually track.
        
    *   Why it belongs: Foundational PKM/second-brain feature (Obsidian-style).
        
    *   Dependencies: 1.8
        
*   \[ \] **11.2 Unlinked Mentions Detection**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Find notes that mention a title's text but aren't linked yet.
        
    *   User Benefit: Surfaces missed connection opportunities.
        
    *   Why it belongs: Strengthens the knowledge graph over time.
        
    *   Dependencies: 11.1
        
*   \[ \] **11.3 Backlink Context Preview**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Show a snippet of surrounding text for each backlink.
        
    *   User Benefit: Understand context without opening every note.
        
    *   Why it belongs: Makes backlinks panel actually useful, not just a count.
        
    *   Dependencies: 11.1
        
*   \[ \] **11.4 Link Count Badge on Notes**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Show how many notes link to/from a given note.
        
    *   User Benefit: Identifies "hub" notes (highly connected ideas).
        
    *   Why it belongs: Surfaces structural importance of notes.
        
    *   Dependencies: 11.1
        
*   \[ \] **11.5 Broken Link Detection**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Flag links pointing to deleted/renamed notes.
        
    *   User Benefit: Maintains knowledge base integrity.
        
    *   Why it belongs: Data hygiene for a link-heavy system.
        
    *   Dependencies: 11.1
        
*   \[ \] **11.6 Quick-Create Note from Broken Link**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Click a link to a non-existent note to instantly create it.
        
    *   User Benefit: Enables "write now, organize later" workflows.
        
    *   Why it belongs: Core Obsidian-style frictionless linking pattern.
        
    *   Dependencies: 1.8
        
*   \[ \] **11.7 Aliases for Note Titles**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Let a note be linked to under alternate names.
        
    *   User Benefit: Flexible vocabulary without duplicate notes.
        
    *   Why it belongs: Real-world knowledge has synonyms.
        
    *   Dependencies: 1.8
        
*   \[ \] **11.8 Block-Level Linking**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Link to a specific paragraph/block, not just a whole note.
        
    *   User Benefit: Precise references in dense notes.
        
    *   Why it belongs: Advanced PKM capability (Logseq-style granularity).
        
    *   Dependencies: 1.8
        

12\. KNOWLEDGE GRAPH
--------------------

*   \[ \] **12.1 Interactive Graph View**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Visualize notes as nodes and links as connecting edges.
        
    *   User Benefit: See the shape of your knowledge base at a glance.
        
    *   Why it belongs: Signature PKM feature (Obsidian/AnyType-style).
        
    *   Dependencies: 11.1
        
*   \[ \] **12.2 Local Graph (Current Note's Neighborhood)**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Show only directly connected notes around the open note.
        
    *   User Benefit: Focused, less overwhelming exploration.
        
    *   Why it belongs: Practical entry point into the larger graph.
        
    *   Dependencies: 12.1
        
*   \[ \] **12.3 Graph Filtering by Tag/Notebook**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Show/hide graph nodes based on tag or notebook.
        
    *   User Benefit: Reduces visual clutter for focused exploration.
        
    *   Why it belongs: Makes graph usable at scale.
        
    *   Dependencies: 12.1
        
*   \[ \] **12.4 Graph Node Sizing by Connection Count**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Larger nodes for more-linked notes.
        
    *   User Benefit: Visually surfaces central/important ideas.
        
    *   Why it belongs: Adds analytical value to the visualization.
        
    *   Dependencies: 12.1
        
*   \[ \] **12.5 Click-to-Navigate from Graph**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Click any graph node to open that note.
        
    *   User Benefit: Graph becomes a navigation tool, not just a visualization.
        
    *   Why it belongs: Makes the graph functional, not decorative.
        
    *   Dependencies: 12.1
        
*   \[ \] **12.6 Graph Clustering by Tag Color**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Color-code nodes by their primary tag.
        
    *   User Benefit: Visual pattern recognition of topic clusters.
        
    *   Why it belongs: Enhances graph's analytical usefulness.
        
    *   Dependencies: 12.1, 8.1
        
*   \[ \] **12.7 Orphan Notes Highlight**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Visually flag notes with zero connections.
        
    *   User Benefit: Identifies isolated knowledge worth connecting.
        
    *   Why it belongs: Encourages a more connected knowledge base.
        
    *   Dependencies: 12.1
        
*   \[ \] **12.8 Graph Performance Mode for Large Vaults**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Simplified rendering for vaults with thousands of notes.
        
    *   User Benefit: Keeps the graph usable without lag.
        
    *   Why it belongs: Ensures offline performance promise holds at scale.
        
    *   Dependencies: 12.1, 38.x (Performance)
        

13\. SEARCH
-----------

*   \[ \] **13.1 Full-Text Search**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Search across all note content instantly.
        
    *   User Benefit: Core retrieval capability for any sizeable vault.
        
    *   Why it belongs: Non-negotiable for a notebook app.
        
    *   Dependencies: Local search index
        
*   \[ \] **13.2 Instant-As-You-Type Results**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Show matching results while typing the query.
        
    *   User Benefit: Faster perceived speed and discovery.
        
    *   Why it belongs: Modern search UX expectation.
        
    *   Dependencies: 13.1
        
*   \[ \] **13.3 Search Filters (tag, notebook, date, type)**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Narrow results using structured filters alongside text.
        
    *   User Benefit: Precision retrieval in large vaults.
        
    *   Why it belongs: Scales search for power users.
        
    *   Dependencies: 13.1, 8.x, 9.x
        
*   \[ \] **13.4 Fuzzy Search / Typo Tolerance**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Return relevant results despite minor spelling errors.
        
    *   User Benefit: More forgiving, faster search experience.
        
    *   Why it belongs: Reduces search friction.
        
    *   Dependencies: 13.1
        
*   \[ \] **13.5 Search Result Snippets with Highlighting**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Show matched text in context with the query highlighted.
        
    *   User Benefit: Faster identification of the right note.
        
    *   Why it belongs: Standard, expected search UX.
        
    *   Dependencies: 13.1
        
*   \[ \] **13.6 Search Within Attachments (PDF/Image OCR text)**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Extend full-text search to attached file content.
        
    *   User Benefit: True "search everything" capability.
        
    *   Why it belongs: Differentiator vs. plain markdown-only search tools.
        
    *   Dependencies: 22.x, 23.x
        
*   \[ \] **13.7 Recent Searches History**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Quickly re-run previous queries.
        
    *   User Benefit: Speeds up repeated lookups.
        
    *   Why it belongs: Minor usability convenience.
        
    *   Dependencies: 13.1
        
*   \[ \] **13.8 Regex Search Mode (Advanced)**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Allow regex-based queries for power users.
        
    *   User Benefit: Precise pattern matching for developers/writers.
        
    *   Why it belongs: Targets developer segment of audience.
        
    *   Dependencies: 13.1
        
*   \[ \] **13.9 Search Operators (tag:, notebook:, before:, after:)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Type structured query syntax inline in the search bar.
        
    *   User Benefit: Fast power-user querying without UI clicking.
        
    *   Why it belongs: Matches expectations from Obsidian/Notion users.
        
    *   Dependencies: 13.3
        
*   \[ \] **13.10 Saved Search → Smart Collection Promotion**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: One click to turn a search into a persistent smart collection.
        
    *   User Benefit: Converts ad-hoc lookup into reusable organization.
        
    *   Why it belongs: Bridges search and organization layers.
        
    *   Dependencies: 13.1, 10.1
        
*   \[ \] **13.11 Global Search Across Trash/Archive (Optional Toggle)**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Include archived/trashed notes in search when enabled.
        
    *   User Benefit: Nothing is truly "lost" until permanently deleted.
        
    *   Why it belongs: Data safety net for search.
        
    *   Dependencies: 13.1, 30.x, 31.x
        

14\. COMMAND PALETTE
--------------------

*   \[ \] **14.1 Universal Command Palette (Ctrl+K / Ctrl+Shift+P)**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Keyboard-driven access to all app actions and navigation.
        
    *   User Benefit: Mouse-free, fast control for power users.
        
    *   Why it belongs: Expected by developer/power-user audience.
        
    *   Dependencies: None
        
*   \[ \] **14.2 Fuzzy Command Matching**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Match partial/misspelled command names.
        
    *   User Benefit: Faster command discovery without exact recall.
        
    *   Why it belongs: Makes the palette genuinely fast to use.
        
    *   Dependencies: 14.1
        
*   \[ \] **14.3 Note Jump via Command Palette**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Type a note title to instantly open it.
        
    *   User Benefit: Fastest possible note navigation.
        
    *   Why it belongs: Core "quick switcher" pattern from Obsidian/VSCode.
        
    *   Dependencies: 14.1, 13.1
        
*   \[ \] **14.4 Recently Opened Notes in Palette**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Show recent notes by default when palette opens empty.
        
    *   User Benefit: Fast return to recent work.
        
    *   Why it belongs: Reduces typing for common navigation.
        
    *   Dependencies: 14.1
        
*   \[ \] **14.5 Action Shortcuts (Create Task, New Note, Toggle Theme)**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Execute app actions directly from the palette.
        
    *   User Benefit: Single interface for navigation and actions.
        
    *   Why it belongs: Maximizes palette utility.
        
    *   Dependencies: 14.1
        
*   \[ \] **14.6 Plugin Command Registration**  `Priority: Future`  `Difficulty: Medium`
    
    *   Purpose: Let plugins add their own commands to the palette.
        
    *   User Benefit: Extensible power-user workflows.
        
    *   Why it belongs: Supports the plugin ecosystem.
        
    *   Dependencies: 14.1, 41.x
        
*   \[ \] **14.7 Command Palette Keyboard-Only Navigation**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Arrow keys/Enter fully control selection and execution.
        
    *   User Benefit: True no-mouse workflow for efficiency.
        
    *   Why it belongs: Core usability for the palette pattern.
        
    *   Dependencies: 14.1
        

15\. QUICK CAPTURE
------------------

*   \[ \] **15.1 Global Hotkey Quick Capture Window**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: System-wide shortcut opens a small capture box from anywhere.
        
    *   User Benefit: Capture a thought without switching focus from current work.
        
    *   Why it belongs: The single most important "capture speed" feature.
        
    *   Dependencies: OS-level hotkey registration
        
*   \[ \] **15.2 Capture-to-Inbox Default Behavior**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Quick captures land in an "Inbox" notebook for later filing.
        
    *   User Benefit: Removes decision-making from the capture moment.
        
    *   Why it belongs: GTD-style frictionless capture philosophy.
        
    *   Dependencies: 15.1, 2.1
        
*   \[ \] **15.3 Quick Capture with Tag/Notebook Picker**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Optionally assign tag/notebook at capture time without leaving box.
        
    *   User Benefit: Balance of speed and organization for users who want it.
        
    *   Why it belongs: Optional structure without slowing default flow.
        
    *   Dependencies: 15.1
        
*   \[ \] **15.4 Clipboard Quick Capture**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: One shortcut saves current clipboard content as a new note.
        
    *   User Benefit: Instantly archive copied text/links/snippets.
        
    *   Why it belongs: Common research/developer workflow.
        
    *   Dependencies: 15.1
        
*   \[ \] **15.5 Screenshot Quick Capture**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Capture a screen region directly into a new note.
        
    *   User Benefit: Visual capture without external tools.
        
    *   Why it belongs: Speeds up visual note-taking.
        
    *   Dependencies: 15.1, 22.x
        
*   \[ \] **15.6 Capture Window Stays-on-Top Mode**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Keep the capture box visible while referencing other windows.
        
    *   User Benefit: Supports capturing while reading/comparing sources.
        
    *   Why it belongs: Practical research workflow support.
        
    *   Dependencies: 15.1
        
*   \[ \] **15.7 Quick Capture Auto-Timestamp**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Automatically timestamp every quick capture.
        
    *   User Benefit: Preserves chronological context automatically.
        
    *   Why it belongs: Useful metadata with zero user effort.
        
    *   Dependencies: 15.1
        
*   \[ \] **15.8 Voice-to-Text Quick Capture**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Dictate a note via microphone into text.
        
    *   User Benefit: Hands-free, fastest possible capture method.
        
    *   Why it belongs: Speed-of-thought capture, especially offline-capable STT.
        
    *   Dependencies: 15.1, OS speech API
        
*   \[ \] **15.9 URL Quick Capture with Title Auto-Fetch**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Paste a URL and auto-generate a bookmark note with page title.
        
    *   User Benefit: Fast, low-effort web clipping.
        
    *   Why it belongs: Supports bookmarking workflow (requires online fetch only).
        
    *   Dependencies: 15.1, 28.x
        

16\. FLOATING NOTES
-------------------

*   \[ \] **16.1 Always-on-Top Floating Note Window**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Detach a note into a small floating window above other apps.
        
    *   User Benefit: Reference notes while working in other applications.
        
    *   Why it belongs: Desktop-native productivity advantage over web apps.
        
    *   Dependencies: Electron multi-window support
        
*   \[ \] **16.2 Floating Note Opacity Control**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Adjust transparency of the floating window.
        
    *   User Benefit: See through to content behind it when needed.
        
    *   Why it belongs: Desktop power-user customization.
        
    *   Dependencies: 16.1
        
*   \[ \] **16.3 Floating Note Resizing/Pinning Position**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Freely resize and snap floating notes to screen edges.
        
    *   User Benefit: Flexible multi-tasking layouts.
        
    *   Why it belongs: Desktop window-management expectation.
        
    *   Dependencies: 16.1
        
*   \[ \] **16.4 Multiple Simultaneous Floating Notes**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Open several floating windows at once.
        
    *   User Benefit: Reference multiple notes while working.
        
    *   Why it belongs: Supports complex multi-source workflows (research/dev).
        
    *   Dependencies: 16.1
        
*   \[ \] **16.5 Floating Mini Task List Widget**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: A persistent small floating window showing today's tasks.
        
    *   User Benefit: Ambient task awareness without opening the full app.
        
    *   Why it belongs: Productivity-focused desktop integration.
        
    *   Dependencies: 16.1, 4.2
        
*   \[ \] **16.6 Floating Note Auto-Hide on Focus Loss**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Optionally collapse floating note when not in use.
        
    *   User Benefit: Reduces screen clutter automatically.
        
    *   Why it belongs: Usability refinement.
        
    *   Dependencies: 16.1
        
*   \[ \] **16.7 Keyboard Shortcut to Toggle Floating Mode**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: One key to detach/reattach current note.
        
    *   User Benefit: Fast, frictionless workflow switching.
        
    *   Why it belongs: Keyboard-first usability.
        
    *   Dependencies: 16.1, 17.x
        

17\. KEYBOARD SHORTCUTS
-----------------------

*   \[ \] **17.1 Comprehensive Default Shortcut Set**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Cover all core actions (new note, search, bold, save, navigate).
        
    *   User Benefit: Fast, efficient operation without touching the mouse.
        
    *   Why it belongs: Baseline expectation for a serious notebook tool.
        
    *   Dependencies: None
        
*   \[ \] **17.2 Fully Customizable Keybindings**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Let users remap any shortcut to their preference.
        
    *   User Benefit: Fits existing muscle memory (e.g., from Vim, VSCode).
        
    *   Why it belongs: Power-user/developer audience expectation.
        
    *   Dependencies: 17.1
        
*   \[ \] **17.3 Vim Keybinding Mode (Optional)**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Full modal editing support for note bodies.
        
    *   User Benefit: Appeals strongly to the developer segment.
        
    *   Why it belongs: Differentiator for technical users.
        
    *   Dependencies: 17.2
        
*   \[ \] **17.4 Shortcut Cheat Sheet Overlay**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Press one key to view all active shortcuts in an overlay.
        
    *   User Benefit: Discoverability without leaving the app.
        
    *   Why it belongs: Reduces learning curve.
        
    *   Dependencies: 17.1
        
*   \[ \] **17.5 Shortcut Conflict Detection**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Warn when a custom keybinding conflicts with another.
        
    *   User Benefit: Prevents broken/confusing shortcut setups.
        
    *   Why it belongs: Quality-of-life for power-user customization.
        
    *   Dependencies: 17.2
        
*   \[ \] **17.6 Global System Shortcuts (Quick Capture, Show/Hide App)**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Shortcuts that work even when the app isn't focused.
        
    *   User Benefit: True ambient productivity tool.
        
    *   Why it belongs: Required for quick capture and floating notes to shine.
        
    *   Dependencies: 15.1, OS hotkey registration
        
*   \[ \] **17.7 Per-Note-Type Shortcut Sets**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Different shortcuts active in checklist vs. rich text vs. drawing.
        
    *   User Benefit: Context-appropriate efficiency.
        
    *   Why it belongs: Refines usability across diverse note types.
        
    *   Dependencies: 17.1
        

18\. RICH TEXT EDITING
----------------------

*   \[ \] **18.1 WYSIWYG Markdown Editing**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Live-render Markdown formatting as you type (TipTap-based).
        
    *   User Benefit: Clean visual writing without raw syntax clutter.
        
    *   Why it belongs: Core editor experience.
        
    *   Dependencies: TipTap editor
        
*   \[ \] **18.2 Inline Formatting Toolbar (Bold/Italic/Code/Highlight)**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Floating toolbar on text selection for quick formatting.
        
    *   User Benefit: Fast, discoverable formatting without memorizing syntax.
        
    *   Why it belongs: Standard rich editor usability.
        
    *   Dependencies: 18.1
        
*   \[ \] **18.3 Slash Commands (/) for Block Insertion**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Type / to insert headings, lists, code blocks, images, etc.
        
    *   User Benefit: Fast block creation without menus.
        
    *   Why it belongs: Notion-style efficient content creation.
        
    *   Dependencies: 18.1
        
*   \[ \] **18.4 Code Blocks with Syntax Highlighting**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Dedicated code block type with language-aware highlighting.
        
    *   User Benefit: Critical for the developer audience.
        
    *   Why it belongs: Core requirement for developer note-taking.
        
    *   Dependencies: 18.1
        
*   \[ \] **18.5 Tables**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Insert and edit simple tables within notes.
        
    *   User Benefit: Structured data within a note (not a spreadsheet replacement).
        
    *   Why it belongs: Common knowledge-organization need.
        
    *   Dependencies: 18.1
        
*   \[ \] **18.6 Callout/Admonition Blocks (Note, Warning, Tip)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Styled highlighted blocks for emphasis.
        
    *   User Benefit: Visually organize important information within notes.
        
    *   Why it belongs: PKM-standard content structuring (Obsidian-style).
        
    *   Dependencies: 18.1
        
*   \[ \] **18.7 Collapsible Toggle Blocks**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Expandable/collapsible sections within a note.
        
    *   User Benefit: Manage information density in long notes.
        
    *   Why it belongs: Notion-style progressive disclosure.
        
    *   Dependencies: 18.1
        
*   \[ \] **18.8 Highlight Text Color**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Multiple highlight colors for emphasis.
        
    *   User Benefit: Visual emphasis for review/study notes.
        
    *   Why it belongs: Common student/researcher need.
        
    *   Dependencies: 18.1
        
*   \[ \] **18.9 Block Drag-and-Drop Reordering**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Drag any content block to reorder within a note.
        
    *   User Benefit: Fast restructuring of notes.
        
    *   Why it belongs: Editing efficiency, Notion-style block model.
        
    *   Dependencies: 18.1
        
*   \[ \] **18.10 Math/LaTeX Block Support**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Render mathematical notation inline or as blocks.
        
    *   User Benefit: Essential for students/researchers in STEM fields.
        
    *   Why it belongs: Targets the student/researcher segment specifically.
        
    *   Dependencies: 18.1, KaTeX library
        
*   \[ \] **18.11 Footnotes**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Add referenced footnotes within a note.
        
    *   User Benefit: Supports academic/research-style note-taking.
        
    *   Why it belongs: Research-oriented content structuring.
        
    *   Dependencies: 18.1
        
*   \[ \] **18.12 Find & Replace Within Note**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Search and replace text inside the currently open note.
        
    *   User Benefit: Efficient editing for longer notes.
        
    *   Why it belongs: Basic editor utility.
        
    *   Dependencies: 18.1
        

19\. MARKDOWN
-------------

*   \[ \] **19.1 Standard Markdown Syntax Support**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Full CommonMark compatibility for headings, lists, emphasis, etc.
        
    *   User Benefit: Portable, familiar syntax for technical users.
        
    *   Why it belongs: Plain-text durability is core to the offline-first promise.
        
    *   Dependencies: 18.1
        
*   \[ \] **19.2 Raw Markdown Source Mode Toggle**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Switch between WYSIWYG and raw markdown text view.
        
    *   User Benefit: Power users can edit/paste raw syntax directly.
        
    *   Why it belongs: Appeals to developer audience preferring plain text.
        
    *   Dependencies: 19.1
        
*   \[ \] **19.3 GitHub-Flavored Markdown Extensions**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Support tables, task lists, strikethrough per GFM spec.
        
    *   User Benefit: Compatibility with widely-used markdown conventions.
        
    *   Why it belongs: Developer-familiar standard.
        
    *   Dependencies: 19.1
        
*   \[ \] **19.4 Markdown File Storage on Disk (Plain .md Files)**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Optionally store notes as real .md files in a folder structure.
        
    *   User Benefit: Maximum data portability and tool interoperability.
        
    *   Why it belongs: Core to "your data is yours" privacy/offline philosophy.
        
    *   Dependencies: 34.x
        
*   \[ \] **19.5 Markdown Linting/Formatting Helper**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Auto-fix common markdown inconsistencies on save.
        
    *   User Benefit: Clean, consistent markdown output.
        
    *   Why it belongs: Quality-of-life for markdown purists.
        
    *   Dependencies: 19.1
        
*   \[ \] **19.6 Custom Markdown Extensions (Wiki-links, Tags)**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Support \[\[wiki-links\]\] and #tags as markdown-adjacent syntax.
        
    *   User Benefit: Enables PKM features while staying markdown-based.
        
    *   Why it belongs: Bridges markdown purity with linking features.
        
    *   Dependencies: 1.8, 8.1
        
*   \[ \] **19.7 Markdown Paste Auto-Conversion**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Pasted markdown text auto-renders as formatted content.
        
    *   User Benefit: Seamless content import from other markdown sources.
        
    *   Why it belongs: Interoperability convenience.
        
    *   Dependencies: 19.1
        
*   \[ \] **19.8 Export Single Note as .md File**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: One-click export of a note to a standalone markdown file.
        
    *   User Benefit: Easy sharing/portability of individual notes.
        
    *   Why it belongs: Reinforces no-lock-in philosophy.
        
    *   Dependencies: 19.1, 45.x
        

20\. ATTACHMENTS
----------------

*   \[ \] **20.1 Drag-and-Drop File Attachment**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Drop any file type directly into a note.
        
    *   User Benefit: Fast, natural way to attach supporting materials.
        
    *   Why it belongs: Core capture capability beyond plain text.
        
    *   Dependencies: Local file storage
        
*   \[ \] **20.2 Local Attachment Storage (No Cloud Dependency)**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Store attached files within the local app data structure.
        
    *   User Benefit: Guarantees offline access to all attached content.
        
    *   Why it belongs: Core to offline-first promise.
        
    *   Dependencies: 34.x
        
*   \[ \] **20.3 Attachment Preview Without External App**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: View common file types inline without leaving WiggleNote.
        
    *   User Benefit: Faster review workflow.
        
    *   Why it belongs: Reduces context-switching.
        
    *   Dependencies: 20.1
        
*   \[ \] **20.4 Attachment Storage Usage Dashboard**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Show how much disk space attachments are consuming.
        
    *   User Benefit: Transparency and control over local storage.
        
    *   Why it belongs: Practical offline-storage management.
        
    *   Dependencies: 20.1
        
*   \[ \] **20.5 Orphaned Attachment Cleanup**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Identify and optionally delete attachments no longer linked to notes.
        
    *   User Benefit: Prevents storage bloat over time.
        
    *   Why it belongs: Long-term storage hygiene.
        
    *   Dependencies: 20.1
        
*   \[ \] **20.6 Attachment File Renaming**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Rename attached files from within the note interface.
        
    *   User Benefit: Better organization without leaving the app.
        
    *   Why it belongs: Basic file management convenience.
        
    *   Dependencies: 20.1
        
*   \[ \] **20.7 Drag-to-Reorder Multiple Attachments**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Reorder multiple files attached to one note.
        
    *   User Benefit: Logical presentation of supporting materials.
        
    *   Why it belongs: Usability refinement.
        
    *   Dependencies: 20.1
        
*   \[ \] **20.8 Attachment Size Limit Warnings**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Warn when a file is very large before attaching.
        
    *   User Benefit: Prevents accidental performance/storage issues.
        
    *   Why it belongs: Protects performance promise.
        
    *   Dependencies: 20.1
        

21\. IMAGES
-----------

*   \[ \] **21.1 Paste Image Directly from Clipboard**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Ctrl+V an image (e.g., screenshot) directly into a note.
        
    *   User Benefit: Fastest possible visual capture workflow.
        
    *   Why it belongs: Critical capture-speed feature.
        
    *   Dependencies: 20.1
        
*   \[ \] **21.2 Inline Image Resizing**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Drag image corners to resize within the note.
        
    *   User Benefit: Basic visual control without external editing.
        
    *   Why it belongs: Common, lightweight editing need.
        
    *   Dependencies: 21.1
        
*   \[ \] **21.3 Image Captions**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Add a text caption below an inserted image.
        
    *   User Benefit: Adds context to visual content.
        
    *   Why it belongs: Improves usefulness of image-heavy notes.
        
    *   Dependencies: 21.1
        
*   \[ \] **21.4 Image Gallery/Grid View for Multi-Image Notes**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Auto-arrange multiple images into a clean grid.
        
    *   User Benefit: Better presentation for visual-heavy notes (moodboards).
        
    *   Why it belongs: Usability for visual thinkers.
        
    *   Dependencies: 21.1
        
*   \[ \] **21.5 Basic Image Annotation (Arrows, Text, Highlight)**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Lightweight markup tools directly on inserted images.
        
    *   User Benefit: Quick visual explanations without external tools.
        
    *   Why it belongs: Useful for developers (screenshots) and students (diagrams).
        
    *   Dependencies: 21.1, 26.x
        
*   \[ \] **21.6 Image Compression on Import**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Optionally compress large images to save storage.
        
    *   User Benefit: Keeps vault lightweight and fast.
        
    *   Why it belongs: Supports performance/offline-storage goals.
        
    *   Dependencies: 21.1
        
*   \[ \] **21.7 Full-Screen Image Lightbox View**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Click an image to view it full-screen.
        
    *   User Benefit: Detailed inspection of visual content.
        
    *   Why it belongs: Standard usability expectation.
        
    *   Dependencies: 21.1
        
*   \[ \] **21.8 Image Alt-Text for Accessibility**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Add descriptive alt text to images.
        
    *   User Benefit: Supports screen-reader users.
        
    *   Why it belongs: Accessibility commitment.
        
    *   Dependencies: 21.1, 39.x
        

22\. PDFs
---------

*   \[ \] **22.1 PDF Attachment with Inline Preview**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Attach and view PDFs without leaving the note.
        
    *   User Benefit: Keep reference documents alongside related notes.
        
    *   Why it belongs: Common research/professional workflow need.
        
    *   Dependencies: 20.1, PDF.js
        
*   \[ \] **22.2 PDF Annotation (Highlight, Notes on Pages)**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Mark up attached PDFs directly within WiggleNote.
        
    *   User Benefit: Active reading/research without switching apps.
        
    *   Why it belongs: Strong differentiator for researchers/students.
        
    *   Dependencies: 22.1
        
*   \[ \] **22.3 PDF Text Extraction for Search**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Index PDF text content for full-text search.
        
    *   User Benefit: Find information buried in attached PDFs.
        
    *   Why it belongs: Extends search promise to all content types.
        
    *   Dependencies: 22.1, 13.6
        
*   \[ \] **22.4 PDF Page Thumbnail Navigation**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Sidebar of page thumbnails for quick jumping.
        
    *   User Benefit: Faster navigation in long documents.
        
    *   Why it belongs: Usability for document-heavy workflows.
        
    *   Dependencies: 22.1
        
*   \[ \] **22.5 Linked Note-to-PDF-Page References**  `Priority: Low`  `Difficulty: Hard`
    
    *   Purpose: Link a note directly to a specific PDF page.
        
    *   User Benefit: Precise citation/reference within research workflows.
        
    *   Why it belongs: Deepens PKM connections to source material.
        
    *   Dependencies: 22.1, 11.1
        
*   \[ \] **22.6 PDF Excerpt-to-Note Quoting**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Select PDF text and send it as a quoted block into a note.
        
    *   User Benefit: Frictionless research note-taking from source documents.
        
    *   Why it belongs: Speeds up research synthesis workflow.
        
    *   Dependencies: 22.1, 18.6
        

23\. AUDIO NOTES
----------------

*   \[ \] **23.1 In-App Voice Recording**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Record audio directly into a note.
        
    *   User Benefit: Capture thoughts/lectures/meetings hands-free.
        
    *   Why it belongs: Speed-of-thought capture method.
        
    *   Dependencies: OS microphone API
        
*   \[ \] **23.2 Local Audio Playback Controls**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Play, pause, scrub recorded audio within the note.
        
    *   User Benefit: Review captured audio without external player.
        
    *   Why it belongs: Core usability for the feature to be useful.
        
    *   Dependencies: 23.1
        
*   \[ \] **23.3 Audio Note Auto-Transcription (Offline Model)**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Convert speech to text locally without internet.
        
    *   User Benefit: Searchable, readable text from voice notes, fully private.
        
    *   Why it belongs: Major differentiator while preserving offline-first/privacy.
        
    *   Dependencies: 23.1, local STT model
        
*   \[ \] **23.4 Timestamped Audio Markers**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Add text markers tied to specific moments in a recording.
        
    *   User Benefit: Quick navigation to important moments (e.g., meeting notes).
        
    *   Why it belongs: Makes long recordings practically usable.
        
    *   Dependencies: 23.1, 23.2
        
*   \[ \] **23.5 Playback Speed Control**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Speed up/slow down audio playback.
        
    *   User Benefit: Faster review of long recordings.
        
    *   Why it belongs: Common productivity feature for audio content.
        
    *   Dependencies: 23.2
        
*   \[ \] **23.6 Audio Waveform Visualization**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Show a visual waveform during recording/playback.
        
    *   User Benefit: Easier navigation to silence/speech sections.
        
    *   Why it belongs: Usability for audio editing/review.
        
    *   Dependencies: 23.1
        

24\. WHITEBOARD
---------------

*   \[ \] **24.1 Infinite Canvas Whiteboard Note Type**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: A freeform canvas for spatial idea arrangement.
        
    *   User Benefit: Visual thinking beyond linear text (mind maps, diagrams).
        
    *   Why it belongs: AnyType/Whimsical-style visual PKM, original layer.
        
    *   Dependencies: Canvas rendering engine
        
*   \[ \] **24.2 Sticky Notes on Canvas**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Draggable text cards on the whiteboard.
        
    *   User Benefit: Quick spatial brainstorming.
        
    *   Why it belongs: Core whiteboard primitive.
        
    *   Dependencies: 24.1
        
*   \[ \] **24.3 Connector Lines Between Canvas Elements**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Draw relationship lines between notes/cards on canvas.
        
    *   User Benefit: Visualize relationships spatially (complements graph view).
        
    *   Why it belongs: Core mind-mapping capability.
        
    *   Dependencies: 24.1
        
*   \[ \] **24.4 Embed Existing Notes onto Canvas**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Drag a real note onto the whiteboard as a live card.
        
    *   User Benefit: Bridges linear notes and spatial thinking.
        
    *   Why it belongs: Original integration between two organizational paradigms.
        
    *   Dependencies: 24.1, 1.1
        
*   \[ \] **24.5 Canvas Zoom & Pan**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Navigate large canvases smoothly.
        
    *   User Benefit: Supports complex, large-scale visual mapping.
        
    *   Why it belongs: Basic usability for an infinite canvas.
        
    *   Dependencies: 24.1
        
*   \[ \] **24.6 Canvas Snapshot Export (Image)**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Export the whiteboard as a PNG/SVG image.
        
    *   User Benefit: Share visual maps outside the app.
        
    *   Why it belongs: Portability of visual work.
        
    *   Dependencies: 24.1, 45.x
        
*   \[ \] **24.7 Canvas Templates (Mind Map, Flowchart Starters)**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Preset canvas layouts for common visual thinking patterns.
        
    *   User Benefit: Faster start for structured brainstorming.
        
    *   Why it belongs: Capture-speed for visual workflows.
        
    *   Dependencies: 24.1
        

25\. DRAWING
------------

*   \[ \] **25.1 Freehand Drawing Canvas**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Sketch directly within a note using mouse/stylus/touch.
        
    *   User Benefit: Visual note-taking for diagrams and sketches.
        
    *   Why it belongs: Common student/designer use case.
        
    *   Dependencies: Canvas rendering
        
*   \[ \] **25.2 Pressure-Sensitive Stylus Support**  `Priority: Low`  `Difficulty: Hard`
    
    *   Purpose: Variable line width based on stylus pressure (where hardware supports it).
        
    *   User Benefit: Natural drawing experience on tablets/convertible laptops.
        
    *   Why it belongs: Quality improvement for drawing-heavy users.
        
    *   Dependencies: 25.1
        
*   \[ \] **25.3 Shape Tools (Line, Rectangle, Circle, Arrow)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Quick-insert basic shapes for diagrams.
        
    *   User Benefit: Faster, cleaner diagrams than freehand.
        
    *   Why it belongs: Practical diagramming support.
        
    *   Dependencies: 25.1
        
*   \[ \] **25.4 Multi-Color Pen/Eraser Tools**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Basic drawing toolkit with color and eraser options.
        
    *   User Benefit: Essential baseline drawing functionality.
        
    *   Why it belongs: Core requirement for any drawing feature.
        
    *   Dependencies: 25.1
        
*   \[ \] **25.5 Layered Drawing (Background Image + Sketch Layer)**  `Priority: Low`  `Difficulty: Hard`
    
    *   Purpose: Draw on top of an inserted image or PDF page.
        
    *   User Benefit: Annotate diagrams/screenshots precisely.
        
    *   Why it belongs: Connects drawing with PDF/image annotation use cases.
        
    *   Dependencies: 25.1, 21.5, 22.2
        
*   \[ \] **25.6 Undo/Redo Stack for Drawings**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Step backward/forward through drawing actions.
        
    *   User Benefit: Forgiving, low-risk sketching experience.
        
    *   Why it belongs: Basic editing safety net.
        
    *   Dependencies: 25.1
        

26\. JOURNAL
------------

*   \[ \] **26.1 Dedicated Journal Mode**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: A distraction-free, distraction-minimal writing mode for journaling.
        
    *   User Benefit: Encourages reflective, private writing habit.
        
    *   Why it belongs: Differentiates daily notes (logging) from journaling (reflection).
        
    *   Dependencies: 3.x
        
*   \[ \] **26.2 Guided Journal Prompts**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Optional daily reflection prompts to inspire writing.
        
    *   User Benefit: Helps users who struggle with a blank page.
        
    *   Why it belongs: Habit-building feature for reflective writers.
        
    *   Dependencies: 26.1
        
*   \[ \] **26.3 Private Journal Encryption by Default**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Journal entries auto-encrypted with a separate passphrase.
        
    *   User Benefit: Strong privacy for the most sensitive content type.
        
    *   Why it belongs: Matches privacy-conscious positioning for personal writing.
        
    *   Dependencies: 36.x
        
*   \[ \] **26.4 Mood Tracking Integrated with Journal**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Log mood alongside each journal entry.
        
    *   User Benefit: Track emotional patterns over time.
        
    *   Why it belongs: Lightweight self-knowledge feature.
        
    *   Dependencies: 26.1, 3.8
        
*   \[ \] **26.5 Journal Timeline/Review Mode**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Scroll chronologically through past entries in a clean reading view.
        
    *   User Benefit: Easy reflection on personal growth over time.
        
    *   Why it belongs: Encourages long-term engagement with journaling.
        
    *   Dependencies: 26.1
        
*   \[ \] **26.6 "On This Day" Journal Memories**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Surface journal entries from this date in past years.
        
    *   User Benefit: Nostalgic reflection, builds habit loop.
        
    *   Why it belongs: Emotional engagement feature.
        
    *   Dependencies: 10.3, 26.1
        

27\. BOOKMARKS
--------------

*   \[ \] **27.1 Web Link Bookmark Notes**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Save a URL as a structured bookmark note with metadata.
        
    *   User Benefit: Organize web research alongside personal notes.
        
    *   Why it belongs: Common research/PKM need (Pocket/Raindrop-style, lightweight).
        
    *   Dependencies: 15.9
        
*   \[ \] **27.2 Auto-Fetch Title, Favicon, Preview Image**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Automatically populate bookmark metadata from the URL.
        
    *   User Benefit: Saves manual entry effort.
        
    *   Why it belongs: Reduces friction for web capture.
        
    *   Dependencies: 27.1, internet connection (graceful offline fallback)
        
*   \[ \] **27.3 Bookmark Tagging & Notes**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Add personal tags/commentary to a saved bookmark.
        
    *   User Benefit: Turns passive saving into active knowledge building.
        
    *   Why it belongs: PKM-oriented bookmarking, not just link-hoarding.
        
    *   Dependencies: 27.1, 8.1
        
*   \[ \] **27.4 Dead Link Detection**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Periodically check if saved links are still live.
        
    *   User Benefit: Maintains a healthy, trustworthy bookmark collection.
        
    *   Why it belongs: Long-term collection hygiene.
        
    *   Dependencies: 27.1, internet connection
        
*   \[ \] **27.5 Offline Page Snapshot (Optional)**  `Priority: Low`  `Difficulty: Hard`
    
    *   Purpose: Save a local readable copy of the page content/text.
        
    *   User Benefit: Bookmark remains useful even if the source disappears.
        
    *   Why it belongs: Reinforces offline-first reliability for saved content.
        
    *   Dependencies: 27.1
        
*   \[ \] **27.6 Bookmark Grid/Card View**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Visual card layout for browsing saved links.
        
    *   User Benefit: Faster visual recognition than a plain list.
        
    *   Why it belongs: Usability for visually-oriented bookmark browsing.
        
    *   Dependencies: 27.1
        

28\. FAVORITES
--------------

*   \[ \] **28.1 One-Click Favorite/Star Toggle**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Mark any note as a favorite from anywhere in the UI.
        
    *   User Benefit: Fast access to most-used content.
        
    *   Why it belongs: Universal lightweight prioritization pattern.
        
    *   Dependencies: None
        
*   \[ \] **28.2 Dedicated Favorites Sidebar Section**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Always-visible list of starred notes.
        
    *   User Benefit: One-click access to top-priority notes.
        
    *   Why it belongs: Makes favoriting actually useful for navigation.
        
    *   Dependencies: 28.1
        
*   \[ \] **28.3 Favorite Notebooks/Tags (Not Just Notes)**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Extend favoriting to other entity types.
        
    *   User Benefit: Consistent quick-access pattern across the whole app.
        
    *   Why it belongs: Generalizes a proven usability pattern.
        
    *   Dependencies: 28.1
        
*   \[ \] **28.4 Reorderable Favorites List**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Manually arrange favorite items by priority.
        
    *   User Benefit: Personalized quick-access ordering.
        
    *   Why it belongs: Usability refinement.
        
    *   Dependencies: 28.2
        
*   \[ \] **28.5 Favorite via Keyboard Shortcut**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Star/unstar the current note with one keypress.
        
    *   User Benefit: Speed for keyboard-driven users.
        
    *   Why it belongs: Keyboard-first usability philosophy.
        
    *   Dependencies: 28.1, 17.1
        

29\. ARCHIVE
------------

*   \[ \] **29.1 One-Click Archive (Distinct from Delete)**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Move a note out of active view without deleting it.
        
    *   User Benefit: Declutter without risk of data loss.
        
    *   Why it belongs: Lifecycle management, common Gmail/Apple Notes pattern.
        
    *   Dependencies: None
        
*   \[ \] **29.2 Archive View / Browser**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Dedicated screen to browse all archived notes.
        
    *   User Benefit: Archived content remains findable.
        
    *   Why it belongs: Archive must remain accessible to be trustworthy.
        
    *   Dependencies: 29.1
        
*   \[ \] **29.3 Restore from Archive**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: One click to move an archived note back to active status.
        
    *   User Benefit: Reversible decluttering.
        
    *   Why it belongs: Core archive functionality.
        
    *   Dependencies: 29.1
        
*   \[ \] **29.4 Auto-Archive Old Completed Tasks/Notes (Optional Rule)**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Automatically archive items meeting user-defined staleness criteria.
        
    *   User Benefit: Hands-off workspace tidiness.
        
    *   Why it belongs: Automation reduces organizational burden.
        
    *   Dependencies: 29.1, 10.2
        
*   \[ \] **29.5 Archive Search Inclusion Toggle**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Optionally include archived notes in search results.
        
    *   User Benefit: Nothing is permanently hidden from retrieval.
        
    *   Why it belongs: Search completeness/trust.
        
    *   Dependencies: 29.1, 13.11
        
*   \[ \] **29.6 Bulk Archive Selection**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Archive multiple notes at once.
        
    *   User Benefit: Efficient cleanup for large vaults.
        
    *   Why it belongs: Productivity at scale.
        
    *   Dependencies: 29.1
        

30\. TRASH
----------

*   \[ \] **30.1 Soft-Delete to Trash**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Deleted notes go to a recoverable Trash, not permanent deletion.
        
    *   User Benefit: Protects against accidental data loss.
        
    *   Why it belongs: Critical data-safety baseline.
        
    *   Dependencies: None
        
*   \[ \] **30.2 Restore from Trash**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: One click to recover a deleted note.
        
    *   User Benefit: Mistake-forgiving workflow.
        
    *   Why it belongs: Core trash functionality.
        
    *   Dependencies: 30.1
        
*   \[ \] **30.3 Auto-Empty Trash After N Days (Configurable)**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Permanently remove trashed notes after a set retention period.
        
    *   User Benefit: Balances safety net with storage/privacy management.
        
    *   Why it belongs: Prevents indefinite accumulation of deleted data.
        
    *   Dependencies: 30.1
        
*   \[ \] **30.4 Permanent Delete (Explicit, Confirmed)**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Manually and permanently erase a note immediately.
        
    *   User Benefit: Full user control over sensitive data removal.
        
    *   Why it belongs: Privacy requirement — users must be able to truly delete.
        
    *   Dependencies: 30.1
        
*   \[ \] **30.5 Trash Item Preview Before Restore**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: View note content while still in Trash before deciding to restore.
        
    *   User Benefit: Confident, informed recovery decisions.
        
    *   Why it belongs: Usability for the recovery workflow.
        
    *   Dependencies: 30.1
        
*   \[ \] **30.6 Deletion Reason/Context Menu Handling (Right-Click Delete)**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Right-click any note/list item to delete with proper pointer-event handling.
        
    *   User Benefit: Fast, reliable deletion from any view.
        
    *   Why it belongs: Core interaction pattern already in active development.
        
    *   Dependencies: 30.1
        

31\. VERSION HISTORY
--------------------

*   \[ \] **31.1 Automatic Local Version Snapshots**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Periodically save note versions without manual action.
        
    *   User Benefit: Recover from accidental edits or content loss.
        
    *   Why it belongs: Data-safety net beyond simple undo.
        
    *   Dependencies: 34.x
        
*   \[ \] **31.2 Version History Timeline View**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Browse past versions of a note chronologically.
        
    *   User Benefit: Understand how a note evolved over time.
        
    *   Why it belongs: Makes version data actually usable.
        
    *   Dependencies: 31.1
        
*   \[ \] **31.3 Restore to Previous Version**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Roll a note back to an earlier saved state.
        
    *   User Benefit: Undo unwanted changes beyond session-based undo.
        
    *   Why it belongs: Core value of having version history at all.
        
    *   Dependencies: 31.1
        
*   \[ \] **31.4 Version Diff Viewer**  `Priority: Low`  `Difficulty: Hard`
    
    *   Purpose: Highlight what changed between two versions.
        
    *   User Benefit: Quickly understand edits without re-reading full content.
        
    *   Why it belongs: Advanced usability for the history feature.
        
    *   Dependencies: 31.2
        
*   \[ \] **31.5 Named/Manual Snapshots**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Let users manually save a labeled checkpoint of a note.
        
    *   User Benefit: Deliberate milestone-saving (e.g., "before major rewrite").
        
    *   Why it belongs: Gives writers explicit control over draft history.
        
    *   Dependencies: 31.1
        
*   \[ \] **31.6 Version Retention Policy Settings**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Configure how many versions/how long history is kept.
        
    *   User Benefit: Balances safety net with local storage usage.
        
    *   Why it belongs: Practical storage management for offline-first app.
        
    *   Dependencies: 31.1
        

32\. BACKUP
-----------

*   \[ \] **32.1 Manual Full Backup Export**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: One-click export of entire vault to a single backup file/folder.
        
    *   User Benefit: User-controlled, portable safety copy.
        
    *   Why it belongs: Essential trust feature for an offline-first app.
        
    *   Dependencies: 34.x, 45.x
        
*   \[ \] **32.2 Scheduled Automatic Local Backups**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Periodic backups to a user-chosen local/external folder.
        
    *   User Benefit: Hands-off protection against data loss or drive failure.
        
    *   Why it belongs: Reduces reliance on cloud sync for data safety.
        
    *   Dependencies: 32.1
        
*   \[ \] **32.3 Backup-to-External-Drive Option**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Target USB/external drives as backup destinations.
        
    *   User Benefit: Offline-only users get real redundancy without cloud.
        
    *   Why it belongs: Core offline-first/privacy-conscious workflow.
        
    *   Dependencies: 32.1
        
*   \[ \] **32.4 Backup Integrity Verification**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Check that a backup file is complete and uncorrupted.
        
    *   User Benefit: Confidence that backups will actually work when needed.
        
    *   Why it belongs: Trust-building data-safety feature.
        
    *   Dependencies: 32.1
        
*   \[ \] **32.5 One-Click Restore from Backup**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Restore an entire vault from a backup file.
        
    *   User Benefit: Fast disaster recovery, including on a new machine.
        
    *   Why it belongs: Backup is only useful if restore is easy.
        
    *   Dependencies: 32.1
        
*   \[ \] **32.6 Backup Reminder Notifications**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Gently remind users who haven't backed up recently.
        
    *   User Benefit: Encourages good data-safety habits.
        
    *   Why it belongs: Proactive protection for users who forget.
        
    *   Dependencies: 32.2
        

33\. OFFLINE STORAGE
--------------------

*   \[ \] **33.1 100% Local-First Data Storage (SQLite)**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: All notes, tasks, and metadata live in a local database by default.
        
    *   User Benefit: Full functionality with zero internet dependency.
        
    *   Why it belongs: Core architectural promise of WiggleNote.
        
    *   Dependencies: SQLite
        
*   \[ \] **33.2 Instant App Startup (No Network Wait)**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: App is fully usable immediately on launch, no loading spinners for data.
        
    *   User Benefit: Reliability and speed users can depend on anywhere.
        
    *   Why it belongs: Direct expression of the offline-first value proposition.
        
    *   Dependencies: 33.1
        
*   \[ \] **33.3 Local Database Integrity Checks**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Periodic checks to catch and repair data corruption.
        
    *   User Benefit: Long-term reliability of the local data store.
        
    *   Why it belongs: Protects the core data asset of the app.
        
    *   Dependencies: 33.1
        
*   \[ \] **33.4 Storage Location Customization**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Let users choose where their vault is stored on disk.
        
    *   User Benefit: Flexibility for power users (e.g., on a synced folder).
        
    *   Why it belongs: Power-user control over their own data.
        
    *   Dependencies: 33.1
        
*   \[ \] **33.5 Vault Size & Health Dashboard**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Show total notes, storage used, last backup, DB health status.
        
    *   User Benefit: Transparency into the local data footprint.
        
    *   Why it belongs: Builds user trust in the offline storage system.
        
    *   Dependencies: 33.1
        
*   \[ \] **33.6 Portable Vault Mode (USB Drive Friendly)**  `Priority: Low`  `Difficulty: Hard`
    
    *   Purpose: Run the entire vault from a portable drive across machines.
        
    *   User Benefit: True offline portability without cloud dependency.
        
    *   Why it belongs: Strong fit for privacy-conscious, offline-only users.
        
    *   Dependencies: 33.1, 33.4
        

34\. CLOUD SYNC
---------------

*   \[ \] **34.1 Optional, Opt-In Cloud Sync**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Sync is entirely off by default; user explicitly enables it.
        
    *   User Benefit: Respects offline-first/privacy positioning while offering choice.
        
    *   Why it belongs: "Sync only if you choose" is a stated core principle.
        
    *   Dependencies: 33.1
        
*   \[ \] **34.2 Bring-Your-Own-Storage Sync (User's Own Drive/Dropbox folder)**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Sync via file-level storage the user already controls, not a proprietary server.
        
    *   User Benefit: Maximum control and privacy over where data lives.
        
    *   Why it belongs: Original, privacy-respecting sync model vs. typical SaaS lock-in.
        
    *   Dependencies: 34.1, 19.4
        
*   \[ \] **34.3 Conflict Resolution UI**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Clear, manual resolution when the same note is edited on two devices.
        
    *   User Benefit: Prevents silent data loss from sync conflicts.
        
    *   Why it belongs: Essential trust requirement for any multi-device sync.
        
    *   Dependencies: 34.1
        
*   \[ \] **34.4 Selective Notebook Sync**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Choose which notebooks sync vs. stay device-local.
        
    *   User Benefit: Keep sensitive notebooks local-only while syncing the rest.
        
    *   Why it belongs: Granular privacy control within a sync feature.
        
    *   Dependencies: 34.1, 2.1
        
*   \[ \] **34.5 Sync Status Indicator**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Clear visual signal of sync state (synced, syncing, conflict, offline).
        
    *   User Benefit: Builds trust through transparency.
        
    *   Why it belongs: Reduces anxiety around an inherently risky operation.
        
    *   Dependencies: 34.1
        
*   \[ \] **34.6 End-to-End Encrypted Sync**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Encrypt data before it ever leaves the device during sync.
        
    *   User Benefit: Cloud provider (even if user's own) never sees plaintext.
        
    *   Why it belongs: Aligns privacy promise with the one feature most likely to break it.
        
    *   Dependencies: 34.1, 36.x
        
*   \[ \] **34.7 Manual "Sync Now" Trigger**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Force an immediate sync instead of waiting for automatic interval.
        
    *   User Benefit: Control and predictability for users who want it.
        
    *   Why it belongs: User control over an opt-in feature.
        
    *   Dependencies: 34.1
        

35\. SECURITY
-------------

*   \[ \] **35.1 App Lock (PIN / Password / Biometric where available)**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Require authentication to open the app.
        
    *   User Benefit: Protects sensitive notes from casual access.
        
    *   Why it belongs: Baseline privacy protection for personal data.
        
    *   Dependencies: OS auth API
        
*   \[ \] **35.2 Auto-Lock After Inactivity**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Lock the app automatically after a configurable idle period.
        
    *   User Benefit: Protection if a device is left unattended.
        
    *   Why it belongs: Practical privacy safeguard.
        
    *   Dependencies: 35.1
        
*   \[ \] **35.3 Per-Notebook Password Protection**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Lock individual notebooks independently of the app-level lock.
        
    *   User Benefit: Layered privacy for the most sensitive content.
        
    *   Why it belongs: Granular privacy control.
        
    *   Dependencies: 35.1, 2.7
        
*   \[ \] **35.4 Secure Local Credential Storage**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Store any passwords/keys using OS-level secure storage (not plaintext).
        
    *   User Benefit: Protects the protection mechanism itself.
        
    *   Why it belongs: Fundamental security hygiene.
        
    *   Dependencies: OS keychain API
        
*   \[ \] **35.5 Failed Unlock Attempt Throttling**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Slow down repeated incorrect PIN/password attempts.
        
    *   User Benefit: Resistance against brute-force access attempts.
        
    *   Why it belongs: Standard security best practice.
        
    *   Dependencies: 35.1
        
*   \[ \] **35.6 Security Audit Log (Local)**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Local log of lock/unlock events and failed attempts.
        
    *   User Benefit: Awareness of access attempts to sensitive data.
        
    *   Why it belongs: Transparency feature for privacy-conscious users.
        
    *   Dependencies: 35.1
        

36\. ENCRYPTION
---------------

*   \[ \] **36.1 At-Rest Database Encryption (SQLCipher)**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Encrypt the entire local database file by default option.
        
    *   User Benefit: Data unreadable if the device/file is stolen.
        
    *   Why it belongs: Core privacy guarantee for a privacy-positioned product.
        
    *   Dependencies: SQLCipher
        
*   \[ \] **36.2 User-Held Encryption Keys (Zero-Knowledge)**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Only the user holds the decryption key/passphrase — not WiggleNote.
        
    *   User Benefit: True privacy; not even the developer can read user data.
        
    *   Why it belongs: Strongest possible privacy promise.
        
    *   Dependencies: 36.1
        
*   \[ \] **36.3 Encrypted Attachment Storage**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Extend encryption to attached files, not just text.
        
    *   User Benefit: Complete data protection, not partial.
        
    *   Why it belongs: Closes a common gap in "encrypted notes" products.
        
    *   Dependencies: 36.1, 20.2
        
*   \[ \] **36.4 Recovery Key Generation**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: One-time printable/exportable recovery key for forgotten passwords.
        
    *   User Benefit: Prevents permanent lockout while preserving zero-knowledge design.
        
    *   Why it belongs: Usability safety net for an otherwise unforgiving system.
        
    *   Dependencies: 36.2
        
*   \[ \] **36.5 Encryption Status Indicator**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Clear UI signal showing which notebooks/notes are encrypted.
        
    *   User Benefit: Confidence and clarity about protection status.
        
    *   Why it belongs: Transparency builds trust in the security model.
        
    *   Dependencies: 36.1
        
*   \[ \] **36.6 Clear Warning on Encryption Limitations**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Explain what encryption does/doesn't protect against (e.g., screen recording).
        
    *   User Benefit: Sets honest expectations, avoids false sense of security.
        
    *   Why it belongs: Ethical transparency in a privacy-positioned product.
        
    *   Dependencies: 36.1
        

37\. PERFORMANCE
----------------

*   \[ \] **37.1 Sub-100ms Note Open Time**  `Priority: MVP`  `Difficulty: Hard`
    
    *   Purpose: Notes open near-instantly regardless of vault size.
        
    *   User Benefit: Fluid, frustration-free everyday use.
        
    *   Why it belongs: Speed is a stated core value of the product.
        
    *   Dependencies: 33.1
        
*   \[ \] **37.2 Lazy-Loaded Note Lists (Virtualized Scrolling)**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Render only visible items in long note/task lists.
        
    *   User Benefit: Smooth scrolling even with thousands of notes.
        
    *   Why it belongs: Scalability for power users with large vaults.
        
    *   Dependencies: 33.1
        
*   \[ \] **37.3 Background Indexing for Search**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Build/update the search index without blocking the UI.
        
    *   User Benefit: Search stays fast even as the vault grows.
        
    *   Why it belongs: Keeps the search promise fast at scale.
        
    *   Dependencies: 13.1
        
*   \[ \] **37.4 Low Memory Footprint Mode**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Optimized resource usage for older/lower-spec machines.
        
    *   User Benefit: Wider hardware accessibility.
        
    *   Why it belongs: Broadens the addressable audience.
        
    *   Dependencies: None
        
*   \[ \] **37.5 Startup Performance Profiling/Telemetry (Local Only, Opt-In)**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Diagnose slow startup on the user's own machine, data stays local.
        
    *   User Benefit: Faster troubleshooting without sending data externally.
        
    *   Why it belongs: Maintains privacy stance while still enabling diagnostics.
        
    *   Dependencies: None
        
*   \[ \] **37.6 Image/Attachment Lazy Loading**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Only load attachment previews when scrolled into view.
        
    *   User Benefit: Faster note list rendering with heavy media.
        
    *   Why it belongs: Performance at scale for media-rich vaults.
        
    *   Dependencies: 20.1
        

38\. ACCESSIBILITY
------------------

*   \[ \] **38.1 Full Keyboard Navigation**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Every action reachable without a mouse.
        
    *   User Benefit: Usable for motor-impaired users and keyboard-preferring power users.
        
    *   Why it belongs: Core accessibility and power-user requirement.
        
    *   Dependencies: 17.1
        
*   \[ \] **38.2 Screen Reader Compatibility (ARIA Labeling)**  `Priority: High`  `Difficulty: Medium`
    
    *   Purpose: Proper semantic labeling for assistive technology.
        
    *   User Benefit: Usable for blind/low-vision users.
        
    *   Why it belongs: Fundamental accessibility requirement.
        
    *   Dependencies: None
        
*   \[ \] **38.3 Adjustable Font Size (App-Wide)**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Scale UI and note text size independently of OS settings.
        
    *   User Benefit: Comfortable reading for low-vision users.
        
    *   Why it belongs: Common, high-impact accessibility need.
        
    *   Dependencies: None
        
*   \[ \] **38.4 High-Contrast Theme**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: A theme optimized for maximum readability contrast.
        
    *   User Benefit: Supports users with visual impairments.
        
    *   Why it belongs: Accessibility-focused customization.
        
    *   Dependencies: 40.x
        
*   \[ \] **38.5 Reduced Motion Mode**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Disable/minimize animations and transitions.
        
    *   User Benefit: Prevents discomfort for users sensitive to motion.
        
    *   Why it belongs: Accessibility best practice.
        
    *   Dependencies: None
        
*   \[ \] **38.6 Dyslexia-Friendly Font Option**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Built-in option for fonts designed for dyslexic readers.
        
    *   User Benefit: Improves readability for users with dyslexia.
        
    *   Why it belongs: Inclusive design for the student audience especially.
        
    *   Dependencies: None
        
*   \[ \] **38.7 Configurable Line Height/Letter Spacing**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Fine-tune text density for personal readability needs.
        
    *   User Benefit: Reduces reading fatigue for many users.
        
    *   Why it belongs: Accessibility and comfort customization.
        
    *   Dependencies: None
        

39\. CUSTOMIZATION
------------------

*   \[ \] **39.1 Light/Dark/System Theme Modes**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: Switch between light, dark, and OS-matched themes.
        
    *   User Benefit: Visual comfort matching environment and preference.
        
    *   Why it belongs: Already core to current WiggleNote development work.
        
    *   Dependencies: CSS variable theming system
        
*   \[ \] **39.2 Custom Accent Color Selection**  `Priority: MVP`  `Difficulty: Easy`
    
    *   Purpose: User-selectable accent color applied across the UI.
        
    *   User Benefit: Personal visual identity within the app.
        
    *   Why it belongs: Already part of active WiggleNote theming implementation.
        
    *   Dependencies: 39.1
        
*   \[ \] **39.3 Custom Theme Creator/Editor**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Let advanced users define their own full color palette.
        
    *   User Benefit: Deep personalization for design-conscious users.
        
    *   Why it belongs: Extends the existing theming system meaningfully.
        
    *   Dependencies: 39.1
        
*   \[ \] **39.4 Adjustable Sidebar Width (Resizable)**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Drag to resize the sidebar panel.
        
    *   User Benefit: Personalized layout fitting screen size/preference.
        
    *   Why it belongs: Already part of recent WiggleNote development.
        
    *   Dependencies: None
        
*   \[ \] **39.5 Custom Editor Font Selection**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Choose font family for the note-writing area.
        
    *   User Benefit: Personal comfort and identity in the writing space.
        
    *   Why it belongs: Writer-focused personalization.
        
    *   Dependencies: None
        
*   \[ \] **39.6 Customizable Default Note View (List/Grid/Card)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Choose how notes are displayed by default.
        
    *   User Benefit: Fits different visual organization preferences.
        
    *   Why it belongs: Accommodates different user mental models.
        
    *   Dependencies: None
        
*   \[ \] **39.7 Custom App Icon Themes**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Offer alternate app icon styles to choose from.
        
    *   User Benefit: Personal branding/desktop aesthetic consistency.
        
    *   Why it belongs: Builds on existing icon design work for WiggleNote.
        
    *   Dependencies: None
        
*   \[ \] **39.8 Sidebar Section Reordering**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Drag to reorder sidebar sections (Notebooks, Tags, Favorites, etc.).
        
    *   User Benefit: Prioritize what matters most to the individual user.
        
    *   Why it belongs: Personalization for varied workflows.
        
    *   Dependencies: None
        

40\. PLUGINS
------------

*   \[ \] **40.1 Plugin API/SDK**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Documented interface for third-party developers to extend WiggleNote.
        
    *   User Benefit: Unlocks community-driven feature growth.
        
    *   Why it belongs: Drives long-term ecosystem growth, like Obsidian's community.
        
    *   Dependencies: None
        
*   \[ \] **40.2 Plugin Marketplace/Browser**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: In-app discovery and installation of community plugins.
        
    *   User Benefit: Easy access to extended functionality without manual setup.
        
    *   Why it belongs: Makes the plugin ecosystem actually usable.
        
    *   Dependencies: 40.1
        
*   \[ \] **40.3 Sandboxed Plugin Execution**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Run plugins in a restricted environment to limit risk.
        
    *   User Benefit: Protects user data/privacy from poorly-behaved plugins.
        
    *   Why it belongs: Security requirement for any extensibility system.
        
    *   Dependencies: 40.1
        
*   \[ \] **40.4 Plugin Permission Prompts**  `Priority: Future`  `Difficulty: Medium`
    
    *   Purpose: Clearly disclose what data/access a plugin requests before install.
        
    *   User Benefit: Informed consent, protects privacy-conscious users.
        
    *   Why it belongs: Trust and transparency for an open ecosystem.
        
    *   Dependencies: 40.1
        
*   \[ \] **40.5 Custom CSS Snippets (Lightweight Theming Plugins)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Let users apply small custom CSS tweaks without a full plugin.
        
    *   User Benefit: Low-effort entry point into customization before full plugins exist.
        
    *   Why it belongs: Bridges built-in theming and full plugin ecosystem.
        
    *   Dependencies: 39.1
        
*   \[ \] **40.6 Plugin Auto-Update Management**  `Priority: Future`  `Difficulty: Medium`
    
    *   Purpose: Keep installed plugins current with developer approval control.
        
    *   User Benefit: Security and stability without constant manual checks.
        
    *   Why it belongs: Maintenance necessity for a healthy plugin ecosystem.
        
    *   Dependencies: 40.2
        

41\. DEVELOPER FEATURES
-----------------------

*   \[ \] **41.1 Code Block Language Auto-Detection**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Automatically apply correct syntax highlighting based on content.
        
    *   User Benefit: Faster, cleaner code snippet capture.
        
    *   Why it belongs: Direct value for the developer segment of the audience.
        
    *   Dependencies: 18.4
        
*   \[ \] **41.2 Snippet Manager (Reusable Code/Text Blocks)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Save and quickly insert frequently used code/text snippets.
        
    *   User Benefit: Speeds up repetitive documentation/note tasks for devs.
        
    *   Why it belongs: Targets developer productivity directly.
        
    *   Dependencies: 18.4
        
*   \[ \] **41.3 Local REST/CLI API for Note Access**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Allow scripts/tools to read/write notes programmatically (local only).
        
    *   User Benefit: Enables custom developer workflows and automation.
        
    *   Why it belongs: Strong differentiator for the developer audience specifically.
        
    *   Dependencies: 33.1
        
*   \[ \] **41.4 Git-Friendly Vault Structure (Plain Files)**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Vault stored as plain files compatible with version control.
        
    *   User Benefit: Developers can track note history with familiar tools.
        
    *   Why it belongs: Speaks directly to the developer segment's existing workflows.
        
    *   Dependencies: 19.4
        
*   \[ \] **41.5 JSON/YAML Frontmatter Support**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Structured metadata block at the top of notes.
        
    *   User Benefit: Enables advanced querying/automation for technical users.
        
    *   Why it belongs: Standard PKM/developer convention (Obsidian-compatible).
        
    *   Dependencies: 19.1
        
*   \[ \] **41.6 Inline Diagram-as-Code (Mermaid Support)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Render flowcharts/diagrams from text syntax.
        
    *   User Benefit: Fast, version-controllable diagramming for technical notes.
        
    *   Why it belongs: High-value, low-effort feature for developer documentation.
        
    *   Dependencies: 18.1
        

42\. AI (OPTIONAL)
------------------

*   \[ \] **42.1 Local/On-Device AI Summarization**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Summarize long notes using a model that runs locally.
        
    *   User Benefit: AI convenience without sending data to the cloud.
        
    *   Why it belongs: Preserves privacy/offline-first stance while adding AI value.
        
    *   Dependencies: Local LLM runtime
        
*   \[ \] **42.2 Smart Tag Suggestions**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Suggest relevant tags based on note content.
        
    *   User Benefit: Reduces manual organization effort.
        
    *   Why it belongs: Organization-improving AI use case, opt-in only.
        
    *   Dependencies: 42.1, 8.1
        
*   \[ \] **42.3 AI-Powered Related Notes Suggestions**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Surface semantically related notes beyond explicit links.
        
    *   User Benefit: Discovers non-obvious connections in the knowledge base.
        
    *   Why it belongs: Strengthens the "second brain" promise.
        
    *   Dependencies: 42.1, 11.1
        
*   \[ \] **42.4 Explicit AI Opt-In Toggle (Off by Default)**  `Priority: Future`  `Difficulty: Easy`
    
    *   Purpose: All AI features disabled until the user explicitly enables them.
        
    *   User Benefit: Respects privacy-conscious users who want a fully offline tool.
        
    *   Why it belongs: Honors the product's privacy-first positioning.
        
    *   Dependencies: None
        
*   \[ \] **42.5 AI Writing Assistance (Optional, Cloud or Local)**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Grammar/clarity suggestions on demand, never automatic.
        
    *   User Benefit: Helpful for writers without forcing AI into the workflow.
        
    *   Why it belongs: Optional productivity layer, clearly user-initiated.
        
    *   Dependencies: 42.4
        
*   \[ \] **42.6 Transparent AI Data Usage Disclosure**  `Priority: Future`  `Difficulty: Easy`
    
    *   Purpose: Clearly show what data (if any) leaves the device for AI features.
        
    *   User Benefit: Informed trust, no surprises about privacy trade-offs.
        
    *   Why it belongs: Ethical requirement for any optional AI feature.
        
    *   Dependencies: 42.4
        

43\. MOBILE COMPANION
---------------------

*   \[ \] **43.1 Lightweight Mobile Quick-Capture App**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: A minimal mobile app focused purely on fast capture.
        
    *   User Benefit: Extend capture-anywhere philosophy beyond the desktop.
        
    *   Why it belongs: Captures ideas that occur away from the desktop.
        
    *   Dependencies: 34.1 (sync) or local file export
        
*   \[ \] **43.2 Mobile-to-Desktop Sync via Same Opt-In Sync System**  `Priority: Future`  `Difficulty: Hard`
    
    *   Purpose: Reuse the same user-controlled sync mechanism for mobile.
        
    *   User Benefit: Consistent privacy model across devices.
        
    *   Why it belongs: Maintains "sync only if you choose" principle on mobile too.
        
    *   Dependencies: 34.1, 43.1
        
*   \[ \] **43.3 Mobile Widget for Quick Task/Note Capture**  `Priority: Future`  `Difficulty: Medium`
    
    *   Purpose: Home-screen widget for instant capture without opening the app.
        
    *   User Benefit: Matches desktop quick-capture speed on mobile.
        
    *   Why it belongs: Mobile parity with desktop's core capture-speed value.
        
    *   Dependencies: 43.1
        
*   \[ \] **43.4 Read-Only Mobile Vault Browser**  `Priority: Future`  `Difficulty: Medium`
    
    *   Purpose: View (not edit) the full vault on mobile as a lighter-weight option.
        
    *   User Benefit: Reference notes on the go without full sync complexity.
        
    *   Why it belongs: Lower-effort mobile companion option.
        
    *   Dependencies: 43.1
        
*   \[ \] **43.5 Mobile Voice Capture**  `Priority: Future`  `Difficulty: Medium`
    
    *   Purpose: Quickly record audio/voice notes from mobile.
        
    *   User Benefit: Hands-free capture while away from a computer.
        
    *   Why it belongs: Mobile context favors voice over typing.
        
    *   Dependencies: 23.1, 43.1
        

44\. DESKTOP INTEGRATION
------------------------

*   \[ \] **44.1 System Tray / Menu Bar Presence**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Keep WiggleNote accessible from the tray without a taskbar window.
        
    *   User Benefit: Always-available quick capture without clutter.
        
    *   Why it belongs: Native desktop app expectation.
        
    *   Dependencies: Electron tray API
        
*   \[ \] **44.2 Global Hotkey to Show/Hide Main Window**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: One keypress to bring WiggleNote forward from anywhere.
        
    *   User Benefit: Instant access matching the speed of thought.
        
    *   Why it belongs: Core ambient-productivity desktop pattern.
        
    *   Dependencies: 44.1
        
*   \[ \] **44.3 OS-Native Notifications Integration**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Use Windows/macOS/Linux native notification systems.
        
    *   User Benefit: Consistent, familiar reminder/alert experience.
        
    *   Why it belongs: Required for reminders feature to feel native.
        
    *   Dependencies: 7.2
        
*   \[ \] **44.4 Drag-and-Drop from File Explorer**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Drag files from the OS file manager directly into notes.
        
    *   User Benefit: Seamless attachment workflow.
        
    *   Why it belongs: Native desktop interaction expectation.
        
    *   Dependencies: 20.1
        
*   \[ \] **44.5 Multi-Monitor Window Memory**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Remember window position/size across multiple monitors.
        
    *   User Benefit: Consistent workspace setup on relaunch.
        
    *   Why it belongs: Quality-of-life for desktop multi-monitor users.
        
    *   Dependencies: None
        
*   \[ \] **44.6 Right-Click "Send to WiggleNote" OS Context Menu**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Add a system-level right-click option to capture selected text/files.
        
    *   User Benefit: Capture from anywhere in the OS, not just within the app.
        
    *   Why it belongs: Deep desktop integration for capture speed.
        
    *   Dependencies: OS shell extension
        
*   \[ \] **44.7 Auto-Launch on System Startup (Optional)**  `Priority: Medium`  `Difficulty: Easy`
    
    *   Purpose: Optionally start WiggleNote (minimized to tray) on boot.
        
    *   User Benefit: Always ready without manual launching.
        
    *   Why it belongs: Supports ambient always-available positioning.
        
    *   Dependencies: 44.1
        

45\. IMPORT & EXPORT
--------------------

*   \[ \] **45.1 Import from Markdown Files/Folders**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: Bulk-import existing .md files into WiggleNote's structure.
        
    *   User Benefit: Easy migration from Obsidian/Joplin/plain markdown setups.
        
    *   Why it belongs: Removes switching cost, critical for adoption.
        
    *   Dependencies: 19.1
        
*   \[ \] **45.2 Import from Evernote (.enex)**  `Priority: High`  `Difficulty: Hard`
    
    *   Purpose: Parse and migrate Evernote export files.
        
    *   User Benefit: Lowers barrier for users leaving Evernote.
        
    *   Why it belongs: Targets a large existing notebook-app user base.
        
    *   Dependencies: None
        
*   \[ \] **45.3 Import from Notion Export**  `Priority: Medium`  `Difficulty: Hard`
    
    *   Purpose: Parse Notion's export format into WiggleNote notes.
        
    *   User Benefit: Eases migration from Notion for PKM-focused users.
        
    *   Why it belongs: Captures users seeking a lighter, offline alternative.
        
    *   Dependencies: None
        
*   \[ \] **45.4 Export Entire Vault to Markdown Folder**  `Priority: MVP`  `Difficulty: Medium`
    
    *   Purpose: One-click export of all notes as plain .md files with structure preserved.
        
    *   User Benefit: Guarantees no lock-in, reinforces data ownership.
        
    *   Why it belongs: Core trust feature for a privacy-first product.
        
    *   Dependencies: 19.4
        
*   \[ \] **45.5 Export to PDF (Single Note or Notebook)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Generate a readable PDF from note content for sharing/printing.
        
    *   User Benefit: Easy sharing with people who don't use WiggleNote.
        
    *   Why it belongs: Practical interoperability without becoming a layout tool.
        
    *   Dependencies: 18.1
        
*   \[ \] **45.6 Export to HTML (Static Page Bundle)**  `Priority: Low`  `Difficulty: Medium`
    
    *   Purpose: Generate a browsable static HTML version of a notebook.
        
    *   User Benefit: Shareable, no-install way to publish notes.
        
    *   Why it belongs: Lightweight publishing option for selected content.
        
    *   Dependencies: 18.1
        
*   \[ \] **45.7 Selective Export (Choose Notes/Tags/Notebooks)**  `Priority: High`  `Difficulty: Easy`
    
    *   Purpose: Export only a filtered subset instead of the whole vault.
        
    *   User Benefit: Precise control for sharing or partial backup.
        
    *   Why it belongs: Practical flexibility beyond all-or-nothing export.
        
    *   Dependencies: 45.4, 10.1
        
*   \[ \] **45.8 Import Conflict Handling (Duplicate Detection)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Detect and let users resolve duplicate notes during import.
        
    *   User Benefit: Clean imports without accidental duplication.
        
    *   Why it belongs: Data integrity during migration workflows.
        
    *   Dependencies: 45.1
        
*   \[ \] **45.9 CSV Export for Tasks**  `Priority: Low`  `Difficulty: Easy`
    
    *   Purpose: Export the task list as CSV for use in spreadsheets/other tools.
        
    *   User Benefit: Interoperability with external planning/reporting tools.
        
    *   Why it belongs: Practical data portability for task data specifically.
        
    *   Dependencies: 4.2
        
*   \[ \] **45.10 Scheduled Auto-Export (Mirror to Folder)**  `Priority: Medium`  `Difficulty: Medium`
    
    *   Purpose: Continuously mirror the vault as plain markdown to a chosen folder.
        
    *   User Benefit: Always-current human-readable backup outside the app's database.
        
    *   Why it belongs: Belt-and-suspenders data safety aligned with offline-first values.
        
    *   Dependencies: 45.4, 32.2
        

* * *

Summary
-------

*   Total categories covered: 45
    
*   Total features specified: ~520+
    

**Out of scope:** page layout, columns, mail merge, track changes, page numbering, print-oriented editing, desktop publishing, book publishing tools, resume builders, brochure creation, WordArt, advanced typography, and print-ready document templates — consistent with WiggleNote's positioning as a notebook, not a word processor.

### Next Steps

*   Pick 8-10 MVP-priority features per category to scope a true v1.0
    
*   Validate developer-segment features (Mermaid, Git-friendly vaults, local API) against actual CODEWITHAJOYDAS audience feedback
    
*   Treat AI, Plugins, and Mobile Companion as post-v1.0 expansion tracks
    
*   If any single category needs full 100-feature depth for a planning exercise, request it specifically and it can be expanded standalone