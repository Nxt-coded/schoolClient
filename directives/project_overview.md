# Project Overview: School Management Platform (startSchoolFe)

## Description
This is the frontend of a comprehensive School Management Platform. It serves students, teachers, parents, and administrators, providing tools for dashboarding, report card generation, payment tracking, and lesson management.

## Tech Stack
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS, DaisyUI, Radix UI
- **State Management**: Redux Toolkit, Redux Persist
- **Animations**: Framer Motion
- **Database/Auth**: Firebase
- **Data Visualization**: Apexcharts, Chart.js, Recharts
- **Rich Text Editing**: ckeditor5, Quill
- **PDF Generation**: @react-pdf/renderer, jsPDF, html2canvas

## Core Features
1. **Student Dashboard**: Overview of performance, results, and assignments.
2. **Teacher Dashboard**: Grade management, report card generation, and lesson planning.
3. **Report Card System**: Multiple templates for generating and printing student report cards.
4. **Subscription Management**: Handling school/student subscriptions.
5. **CBT (Computer Based Test)**: Testing and analytics module.

## Project Structure
- `src/pagesForStudents`: Student-specific pages and components.
- `src/pagesForTeachers`: Teacher-specific pages and components.
- `src/global`: State management (Redux) and common utilities.
- `src/router`: Application routing logic.
- `directives/`: (New) SOPs for the Agent architecture.
- `execution/`: (New) Deterministic Python scripts for the Agent architecture.
