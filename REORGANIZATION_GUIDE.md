# Documentation Reorganization Guide

This guide explains how to organize your documents into the new folder structure. Since GitHub doesn't allow moving binary files directly, you'll need to manually reorganize them.

## New Folder Structure

```
📁 docs/
├── 📁 01-ProjectPlanning/
│   ├── README.md
│   ├── EduTrack – Project Proposal _ Synopsis.pdf
│   ├── EduTrack – Project Scope Document.pdf
│   ├── EduTrack – Modules Document.pdf
│   └── EduTrack – Work Breakdown Structure.pdf
│
├── 📁 02-Requirements/
│   ├── README.md
│   ├── EduTrack – Software Requirements Specification (SRS).pdf
│   └── EduTrack – User Stories.pdf
│
├── 📁 03-Design/
│   ├── README.md
│   ├── EduTrack – High Level Design (HLD) & Low Level Design (LLD).pdf
│   ├── EduTrack – System Design Document.pdf
│   ├── EduTrack – Database Schema Document.pdf
│   ├── EduTrack – Database Document.pdf
│   └── ER Diagram.png
│
├── 📁 04-Development/
│   ├── README.md
│   ├── EduTrack – Backend Development Document.pdf
│   ├── EduTrack – Frontend Development Document.pdf
│   └── EduTrack – API Documentation.pdf
│
├── 📁 05-Testing/
│   ├── README.md
│   └── EduTrack – Test Cases Document.pdf
│
├── 📁 06-Deployment/
│   ├── README.md
│   └── EduTrack – Deployment Guide.pdf
│
└── 📁 07-UserGuide/
    ├── README.md
    └── EduTrack – User Manual.pdf

📁 screenshots/
├── README.md
├── admin.png
├── student.png
├── teacher.png
└── complete.png
```

## Steps to Reorganize

### Option 1: Using GitHub Web Interface
1. Navigate to each file in the repository
2. Click the "..." menu and select "Delete"
3. Upload the file to the new location in the appropriate folder

### Option 2: Using Git Command Line (Recommended)
```bash
# Clone the organize-docs branch
git clone https://github.com/snehagpt/VTU_INTERN_2026_Team15_JavaFS.git
cd VTU_INTERN_2026_Team15_JavaFS
git checkout organize-docs

# Move files to appropriate folders
mv "EduTrack – Project Proposal _ Synopsis.pdf" "docs/01-ProjectPlanning/"
mv "EduTrack – Project Scope Document.pdf" "docs/01-ProjectPlanning/"
mv "EduTrack – Modules Document.pdf" "docs/01-ProjectPlanning/"
mv "EduTrack – Work Breakdown Structure.pdf" "docs/01-ProjectPlanning/"

mv "EduTrack – Software Requirements Specification (SRS).pdf" "docs/02-Requirements/"
mv "EduTrack – User Stories.pdf" "docs/02-Requirements/"

mv "EduTrack – High Level Design (HLD) & Low Level Design (LLD).pdf" "docs/03-Design/"
mv "EduTrack – System Design Document.pdf" "docs/03-Design/"
mv "EduTrack – Database Schema Document.pdf" "docs/03-Design/"
mv "EduTrack – Database Document.pdf" "docs/03-Design/"
mv "ER Diagram.png" "docs/03-Design/"

mv "EduTrack – Backend Development Document.pdf" "docs/04-Development/"
mv "EduTrack – Frontend Development Document.pdf" "docs/04-Development/"
mv "EduTrack – API Documentation.pdf" "docs/04-Development/"

mv "EduTrack – Test Cases Document.pdf" "docs/05-Testing/"

mv "EduTrack – Deployment Guide.pdf" "docs/06-Deployment/"

mv "EduTrack – User Manual.pdf" "docs/07-UserGuide/"

mv "admin.png" "screenshots/"
mv "student.png" "screenshots/"
mv "teacher.png" "screenshots/"
mv "complete.png" "screenshots/"

# Commit the changes
git add -A
git commit -m "Reorganize documentation and screenshots into structured folders"
git push origin organize-docs
```

### Option 3: Using GitHub Desktop
1. Clone the `organize-docs` branch
2. Organize files locally using file explorer
3. Commit changes with message: "Reorganize documentation and screenshots into structured folders"
4. Push to remote

## Benefits of This Organization

✅ **Clear Navigation** - Documents grouped by project phase  
✅ **Easy Discovery** - Each folder has a README explaining contents  
✅ **Professional Structure** - Follows SDLC documentation standards  
✅ **Scalability** - Easy to add new documents as project grows  
✅ **Maintenance** - Simpler to locate and update specific documents  

## Folder Descriptions

| Folder | Purpose | Contains |
|--------|---------|----------|
| 01-ProjectPlanning | Project kickoff and planning | Proposal, scope, modules, WBS |
| 02-Requirements | Requirements analysis | SRS, user stories |
| 03-Design | System and database design | Architecture, design docs, ERD |
| 04-Development | Implementation guides | Backend, frontend, API docs |
| 05-Testing | Quality assurance | Test cases and test scenarios |
| 06-Deployment | Operations and deployment | Deployment guide |
| 07-UserGuide | End-user documentation | User manual |
| screenshots | UI/UX references | Application interface screenshots |

## Next Steps

1. ✅ Folder structure created (this branch)
2. ⏳ Move files to appropriate folders (manual step)
3. ⏳ Create Pull Request to merge with main branch
4. ⏳ Review and merge after verification

After organizing files, create a Pull Request on GitHub to merge `organize-docs` into `main`.
