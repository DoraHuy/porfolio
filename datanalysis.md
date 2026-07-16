# PROJECT SPECIFICATION DOCUMENT

# **"THE ARCHITECT'S UNIVERSE"**

> **Version:** 1.0.0  
> **Created:** July 16, 2026  
> **Author:** Senior Business Analyst & Senior Designer  
> **Status:** Final Specification

---

# TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Objectives & Target Audience](#2-objectives--target-audience)
3. [Information Architecture](#3-information-architecture)
4. [User Experience Flow](#4-user-experience-flow)
5. [UI & Interaction Specification](#5-ui--interaction-specification)
6. [Technical Specification](#6-technical-specification)
7. [Content Specification](#7-content-specification)
8. [Implementation Plan](#8-implementation-plan)
9. [Appendix](#9-appendix)

---

# 1. PROJECT OVERVIEW

## 1.1 Project Name

**"The Architect's Universe"** — An Interactive 3D Portfolio for a Full-Stack Developer

---

## 1.2 Project Summary

An immersive 3D portfolio website where users begin by seeing a 3D developer holding a miniature technology universe in the palm of their hand.

When the user clicks the screen, the developer raises their hand as the floating technologies scatter into space, forming an energy vortex before expanding into a fully interactive 3D architectural universe. This universe serves as the portfolio, containing:

- About
- Skills
- Projects
- Core Competencies
- Education

---

## 1.3 Design Philosophy

> *"More than just a portfolio—this is a declaration of architectural thinking, where every line of code becomes a building block in creating a personal universe."*

---

## 1.4 Core Requirements

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| CR-001 | 3D Developer Character | Mandatory | A stylized game-like 3D developer standing in a dark cosmic environment. The character must include full rigging for hand, head, and body animations. |
| CR-002 | Technology Cluster | Mandatory | Technology icons and 3D objects representing Java, React, Next.js, Redis, Prisma, Axios, TanStack Query, Zustand, MySQL, PostgreSQL, GitHub, and more, floating and glowing above the developer's palm. |
| CR-003 | Cinematic Transition Animation | Mandatory | Sequence: Click → Shockwave → Developer looks up → Hand raises → Technologies ascend → Energy vortex forms → Developer swings hand → Big Bang → Camera zooms out into Portfolio Mode. Total duration: approximately 3.5 seconds. |
| CR-004 | 3D Portfolio Universe | Mandatory | A fully interactive 3D world consisting of four primary modules: About Station, Skill Garden, Project Solar System, and Education Constellation. |
| CR-005 | About Module | Mandatory | A central hub featuring a miniature avatar, personal introduction, core competencies, and a "Human Behind the Code" section. |
| CR-006 | Skills Module | Mandatory | A technology garden containing four Tech Trees: Frontend, Backend, Database, and DevOps. Each tree follows a hierarchy: Roots → Trunk → Branches → Leaves. |
| CR-007 | Projects Module | Mandatory | A solar system where each project is represented as an orbiting planet. Planet size reflects project complexity and impact. |
| CR-008 | Education Module | Mandatory | A constellation where each connected star represents an academic achievement or professional certification. |
| CR-009 | Information Panel | Mandatory | A holographic glassmorphism panel with glowing borders that displays detailed information when users interact with a module. |
| CR-010 | Responsive & 2D Fallback | Mandatory | Automatically detects low-performance devices and recommends switching to a lightweight 2D experience. Manual switching must also be available. |
| CR-011 | Performance Optimization | Mandatory | Initial loading time under 5 seconds on average networks and maintain at least 30 FPS on mid-range devices. |
| CR-012 | Personal Introduction Video | Optional | An Easter Egg named "Human Behind the Code" featuring a short 30-second personal introduction video. |
| CR-013 | Download CV | Mandatory | A persistent Download CV (PDF) button available from every screen. |
| CR-014 | Navigation | Mandatory | Home button to return to the Idle State and support orbit controls (rotate, pan, zoom) while exploring the Portfolio Universe. |

---

# 2. OBJECTIVES & TARGET AUDIENCE

## 2.1 Business Objectives

| Objective | Description | Success Metric |
|-----------|-------------|----------------|
| Freelance Opportunities | Demonstrate a diverse technical skill set to attract potential clients. | Number of inquiries submitted through the contact form. |
| Product Company Applications | Showcase architectural thinking and problem-solving abilities. | Interview invitation rate. |
| Personal Branding | Build a unique and memorable identity within the developer community. | Website traffic, shares, and engagement. |

---

## 2.2 Primary Audience: Human Resources (HR)

| Attribute | Description |
|-----------|-------------|
| Persona | HR specialists aged 25–35 with limited technical knowledge. |
| Technical Background | Basic understanding of common programming technologies. |
| Primary Interests | Strong first impression, communication skills, cultural fit, and notable achievements. |
| Viewing Time | Approximately 30 seconds to 2 minutes during the first visit. |
| Decision | Whether the candidate should proceed to technical evaluation. |
| Pain Points | Reviewing countless traditional portfolios that fail to clearly differentiate candidates. |

---

## 2.3 Secondary Audience: Tech Leads / CTOs

| Attribute | Description |
|-----------|-------------|
| Persona | Technical leaders with 8+ years of engineering experience. |
| Technical Background | Deep expertise in software architecture and engineering best practices. |
| Primary Interests | System architecture, code quality, technical decision-making, and problem-solving ability. |
| Viewing Time | Approximately 5–15 minutes. |
| Decision | Whether to invite the candidate for a technical interview. |
| Pain Points | Visually attractive portfolios that lack technical depth or architectural thinking. |

---

## 2.4 User Experience Strategy

### For HR

- Deliver a strong "WOW" moment within the first three seconds.
- Provide intuitive navigation with minimal learning curve.
- Highlight the business impact of every project using non-technical language.
- Include a "Human Behind the Code" section to present personality, interests, and passion.
- Offer an always-visible Download CV button for traditional recruitment workflows.

---

### For Tech Leads

- Clearly organize the technology stack into logical categories.
- Present detailed project case studies:
  - Problem
  - Solution
  - Architecture
  - Results
- Provide GitHub repositories and live demos.
- Include architectural diagrams inside project detail panels.

---

# 3. INFORMATION ARCHITECTURE

## 3.1 Overall Information Architecture
# 3. INFORMATION ARCHITECTURE

## 3.1 Overall Information Architecture

```text
THE ARCHITECT'S UNIVERSE PORTFOLIO
│
├── HOME SCREEN (Idle State)
│   ├── Background: 3D cosmic environment with animated particle stars
│   ├── 3D Developer Character (game-inspired, futuristic smart-casual outfit)
│   ├── Technology Cluster floating above the developer's palm (glowing cubes)
│   ├── Introduction Text: "[Your Name] – Full-Stack Architect"
│   └── Interaction Prompt: "[Click Anywhere to Explore]" with ripple animation
│
├── TRANSITION ANIMATION (3.5 Seconds)
│   ├── Shockwave emitted from the click position
│   ├── Developer looks up
│   ├── Developer raises hand
│   ├── Technologies ascend and form an energy vortex
│   └── Big Bang transition into Portfolio Mode
│
├── PORTFOLIO MODE
│   │
│   ├── CENTRAL HUB: About Station
│   │   ├── Circular holographic control platform
│   │   ├── Miniature developer avatar (Scale: 0.3)
│   │   ├── Floating holographic displays
│   │   ├── About Information Panel (On Click)
│   │   │   ├── Avatar
│   │   │   ├── Personal Introduction
│   │   │   ├── Position & Experience
│   │   │   ├── Core Competencies
│   │   │   └── ❤️ "Meet the Human Behind the Code" Button
│   │   └── Personal Video Popup (30 Seconds)
│   │
│   ├── MODULE 1: Skill Garden
│   │   ├── Frontend Tree (Cyan #4FC3F7)
│   │   │   ├── Roots: JavaScript, TypeScript
│   │   │   ├── Trunk: React, Next.js
│   │   │   └── Branches & Leaves: TanStack Query, Zustand, Axios, CSS/SCSS, Tailwind CSS
│   │   │
│   │   ├── Backend Tree (Blue #1565C0)
│   │   │   ├── Roots: Maven, Gradle
│   │   │   ├── Trunk: Java
│   │   │   └── Branches & Leaves: Spring Boot, Hibernate
│   │   │
│   │   ├── Database Tree (Purple #AB47BC)
│   │   │   ├── Roots: SQL Fundamentals
│   │   │   ├── Trunk: MySQL, PostgreSQL
│   │   │   └── Branches & Leaves: Prisma ORM, Redis
│   │   │
│   │   └── DevOps Tree (Orange #FFA726)
│   │       ├── Roots: Linux, Networking
│   │       ├── Trunk: Docker, CI/CD
│   │       └── Branches & Leaves: GitHub Actions, Vercel, AWS
│   │
│   ├── MODULE 2: Project Solar System
│   │   ├── Central Sun (Golden Energy Core)
│   │   ├── Project Planet 1 (Largest flagship project)
│   │   ├── Project Planet 2
│   │   ├── Project Planet 3
│   │   └── Asteroid Belt (Small side projects)
│   │
│   └── MODULE 3: Education Constellation
│       ├── Primary Star (University Degree)
│       ├── Certification Star 1
│       ├── Certification Star 2
│       └── Constellation Connection Lines
│
├── HOLOGRAPHIC INFORMATION PANELS
│   ├── About Panel
│   ├── Skills Panel (Technology Details)
│   ├── Project Panel (Project Case Study)
│   └── Education Panel
│
└── PERSISTENT USER INTERFACE
    ├── Home Button (Top Left)
    ├── Download CV Button (Top Right)
    └── 2D View / 3D View Toggle (Below Download CV Button)
```
## 3.2 Navigation Map

```text
                         ┌────────────────────────┐
                         │     LOADING SCREEN     │
                         │      (2–3 Seconds)     │
                         └───────────┬────────────┘
                                     │
                                     ▼
                         ┌────────────────────────┐
                         │       IDLE STATE       │
                         │      (Home Screen)     │
                         └───────────┬────────────┘
                                     │
                                 USER CLICK
                                     │
                                     ▼
                         ┌────────────────────────┐
                         │       TRANSITION       │
                         │     (3.5 Seconds)      │
                         └───────────┬────────────┘
                                     │
                                     ▼
                         ┌────────────────────────┐
                         │    PORTFOLIO MODE      │
                         │    (Universe Map)      │
                         └───────────┬────────────┘
                                     │
          ┌──────────────────────────┼──────────────────────────┐
          │                          │                          │
          ▼                          ▼                          ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   ABOUT STATION  │      │   SKILL GARDEN   │      │ PROJECT SOLAR     │
│                  │      │                  │      │ SYSTEM            │
└────────┬─────────┘      └────────┬─────────┘      └────────┬─────────┘
         │                         │                         │
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   ABOUT PANEL    │      │   SKILL PANEL    │      │ PROJECT PANEL    │
└────────┬─────────┘      └────────┬─────────┘      └────────┬─────────┘
         │                         │                         │
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│ PERSONAL VIDEO   │      │ TECHNOLOGY       │      │ PROJECT CASE      │
│ "Human Behind    │      │ DETAILS          │      │ STUDY + LINKS     │
│ the Code"        │      │                  │      │                  │
└──────────────────┘      └──────────────────┘      └──────────────────┘

          ┌──────────────────────────┼──────────────────────────┐
          │                          │                          │
          ▼                          ▼                          ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│ EDUCATION        │      │   HOME BUTTON    │      │ 2D VIEW TOGGLE   │
│ CONSTELLATION    │      │ (Return to Idle) │      │ (Performance Mode)│
└────────┬─────────┘      └──────────────────┘      └──────────────────┘
         │
         ▼
┌──────────────────┐
│ EDUCATION PANEL  │
└──────────────────┘
```
## 3.3 State Machine

```text
                    ┌─────────────────┐
                    │     LOADING     │
                    └────────┬────────┘
                             │
                     onLoadComplete()
                             │
                             ▼
                    ┌─────────────────┐
          ┌────────►│    IDLE STATE   │◄──────────────────────────┐
          │         └────────┬────────┘                           │
          │                  │                                    │
          │            onClick()                                 │
          │                  │                                    │
          │                  ▼                                    │
          │         ┌─────────────────┐                           │
          │         │   TRANSITION    │                           │
          │         └────────┬────────┘                           │
          │                  │                                    │
          │           onComplete()                                │
          │                  │                                    │
          │                  ▼                                    │
          │      ┌────────────────────────┐                       │
          │      │ PORTFOLIO OVERVIEW     │                       │
          │      └──────┬──────┬──────────┘                       │
          │             │      │                                  │
          │             │      └──────────────┐                   │
          │             ▼                     ▼                   ▼
          │      ┌────────────┐      ┌────────────┐      ┌────────────┐
          │      │ABOUT PANEL │      │SKILL PANEL │      │PROJECT PANEL│
          │      └─────┬──────┘      └─────┬──────┘      └─────┬──────┘
          │            │                   │                   │
          │            └───────────┬───────┴───────────────────┘
          │                        │
          │               onClose() / onHome()
          │                        │
          └────────────────────────┘

                     onHome()
                         │
                         ▼
                   Return to IDLE STATE
```

---

# 4. USER EXPERIENCE FLOW

## 4.1 Happy Path

| Step | Screen | User Action | System Response | Duration |
|------|--------|-------------|-----------------|----------|
| 1 | Loading | Open the website | Display the loading screen with logo/icon while loading 3D models and assets. | 2–3 seconds |
| 2 | Idle State | Observe the screen | Display the 3D universe, developer character holding the technology cluster, and fade in the introduction text. | Immediately after loading |
| 3 | Idle State | Read the introduction | Display **"[Your Name] – Full-Stack Architect"** and the animated prompt **"Click Anywhere to Explore"** with ripple effects. | Instant |
| 4 | Idle State | Left-click anywhere | Trigger the cinematic transition beginning with a shockwave from the clicked position. | 0.3 seconds |
| 5 | Transition | Watch the animation | The developer looks up, raises a hand, technologies ascend into an energy vortex, followed by a Big Bang transition. | Next 3.2 seconds |
| 6 | Portfolio Overview | Explore the environment | Camera zooms out to reveal the four portfolio modules connected by glowing laser paths. Modules illuminate sequentially to guide attention. | Instant |
| 7 | Portfolio Overview | Move the mouse | Nearby modules emit a subtle glow when the cursor approaches. | 0.1 seconds |
| 8 | Portfolio Overview | Hover over a module | The selected module glows brighter and displays its name as a tooltip. | 0.2 seconds |
| 9 | Portfolio Overview | Click the **Skill Garden** | Camera flies toward the Skill Garden and reveals the four technology trees. | 0.8 seconds |
| 10 | Skill Garden | Hover over the **Frontend Tree** | Highlight the tree and display the label **Frontend Stack**. | 0.2 seconds |
| 11 | Skill Garden | Click the **Frontend Tree** | Open the holographic Skill Panel showing the Frontend technology stack with proficiency indicators. | 0.5 seconds |
| 12 | Skill Panel | Read the information | Display technology details with animated proficiency bars. | Instant |
| 13 | Skill Panel | Click the **Close (X)** button | Close the panel and return the camera to the Skill Garden. | 0.5 seconds |
| 14 | Skill Garden | Click the **Home** button | Camera returns to the Idle State and the developer resumes the original pose. | 1.5 seconds |
| 15 | Portfolio Overview | Click the **Project Solar System** | Camera flies into the solar system where project planets orbit the central sun. | 0.8 seconds |
| 16 | Project Solar System | Click the largest planet | Zoom into the flagship project and open the Project Case Study panel. | 1.0 second |
| 17 | Project Panel | Read the case study and click the GitHub link | Open the GitHub repository in a new browser tab. | Instant |
| 18 | Project Panel | Click the **Close** button | Close the panel and return to the Project Solar System. | 0.5 seconds |
| 19 | Any Screen | Click **Download CV** | Download the PDF version of the résumé. | Instant |

---

## 4.2 Alternative Paths

### Alternative Flow A: Low-Performance Device

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | Visit the website | Detect a low-performance GPU or older mobile device. |
| 2 | — | Display a dialog: **"Your device may not provide the best 3D experience. Would you like to switch to 2D Mode?"** |
| 3 | Click **Accept** | Switch to a lightweight 2D interface while preserving the visual identity, color palette, and typography. |
| 4 | Click **Decline** | Continue in 3D mode and display a small performance warning in the corner. |

---

### Alternative Flow B: Quick CV Download

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | From any screen, click **Download CV** | Immediately begin downloading the PDF résumé without leaving the website. |

---

### Alternative Flow C: "Human Behind the Code"

| Step | User Action | System Response |
|------|-------------|-----------------|
| 1 | From the About Panel, click **❤️ Meet the Human Behind the Code** | Open a modal window containing a 30-second personal introduction video. The background becomes blurred. |
| 2 | — | The video starts playing automatically. |
| 3 | Close the popup or wait until the video finishes | Close the modal and return to the About Panel. |

---

## 4.3 HR Journey Map (Primary Persona)
## 4.3 HR Journey Map (Primary Persona)

| Stage | Discovery | First Impression | Evaluation | Decision |
|-------|-----------|------------------|------------|----------|
| **User Action** | Receive the portfolio link | Open the landing page | Explore the portfolio modules | Download CV / Contact |
| **Emotion** | 🤔 Curious | 😲 "Wow!" | 👍 Impressed | ✅ Confident |
| **Thoughts** | "Another portfolio..." | "What is this? It looks amazing!" | "This developer seems highly capable." | "Worth inviting for an interview." |
| **Touchpoints** | Email / LinkedIn link | Idle State (Landing Scene) | About Panel, Project Panel | Download CV Button / Contact Form |
| **Opportunities** | Attractive title such as **"Full-Stack Architect"** | Deliver a memorable "WOW" moment that encourages HR to continue exploring | Clearly highlight the business value and impact of each project | Provide a well-structured CV that is easy to download, print, and share |
| **Pain Points** | The link may be ignored if the title is not compelling | Slow loading times may cause users to leave before experiencing the portfolio | Poor information architecture makes it difficult to discover important content | Missing a traditional PDF résumé may reduce recruiter confidence |

---

# 5. USER INTERFACE & INTERACTION SPECIFICATION

## 5.1 Design System

### 5.1.1 Color Palette

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Deep Space | `#0A0A0F` | (10, 10, 15) | Primary background across the entire experience |
| Dark Matter | `#12121A` | (18, 18, 26) | Background for panels and cards |
| Nebula Blue | `#4FC3F7` | (79, 195, 247) | Primary accent color, panel borders, highlighted text, technology glow, Frontend elements |
| Cosmic Purple | `#AB47BC` | (171, 71, 188) | Energy vortex effects, Database module, secondary visual effects |
| Deep Ocean | `#1565C0` | (21, 101, 192) | Backend module and secondary connection paths |
| Solar Gold | `#FFD54F` | (255, 213, 79) | Business value highlights, achievements, Project Sun |
| Star White | `#ECEFF1` | (236, 239, 241) | Primary text and headings on dark backgrounds |
| Meteor Gray | `#90A4AE` | (144, 164, 174) | Secondary text, descriptions, metadata, labels |
| Success Green | `#66BB6A` | (102, 187, 106) | High proficiency indicators (80–100%) |
| Warning Orange | `#FFA726` | (255, 167, 38) | Medium proficiency indicators (60–79%) and DevOps module |
| Error Red | `#EF5350` | (239, 83, 80) | Low proficiency indicators (<60%). Use sparingly. |
| Nebula Pink | `#EC407A` | (236, 64, 122) | "❤️ Meet the Human Behind the Code" button and special emphasis |

---

### 5.1.2 Typography System

| Style | Font Family | Weight | Size | Line Height | Letter Spacing | Usage |
|-------|-------------|--------|------|-------------|----------------|-------|
| Display XL | Orbitron | 700 (Bold) | 48px / 3rem | 1.2 | 0.05em | Main title on the Idle State |
| Display L | Space Grotesk | 700 (Bold) | 36px / 2.25rem | 1.3 | 0.02em | Module titles within Portfolio Mode |
| Heading M | Space Grotesk | 600 (SemiBold) | 24px / 1.5rem | 1.4 | 0.01em | Panel headings and project titles |
| Heading S | Space Grotesk | 500 (Medium) | 20px / 1.25rem | 1.4 | 0.01em | Secondary headings |
| Body L | Inter | 400 (Regular) | 18px / 1.125rem | 1.6 | 0 | Primary descriptive content |
| Body M | Inter | 400 (Regular) | 16px / 1rem | 1.6 | 0 | Panel content and project descriptions |
| Body S | Inter | 400 (Regular) | 14px / 0.875rem | 1.5 | 0.01em | Labels, tags, metadata |
| Caption | Inter | 500 (Medium) | 12px / 0.75rem | 1.5 | 0.02em | Tooltips and image captions |
| Code | Space Mono | 400 (Regular) | 14px / 0.875rem | 1.6 | 0 | Technology names, code snippets, and technical terminology |

---

### Font Imports

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Space+Mono&display=swap');
```### 5.1.3 Visual Effects

#### Glassmorphism Panel

```css
.hologram-panel {
  background: rgba(18, 18, 26, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(79, 195, 247, 0.3);
  border-radius: 16px;

  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

**Purpose**

- Creates a futuristic holographic interface.
- Simulates semi-transparent glass with depth.
- Used for all information panels and modal windows.

---

#### Glow Effect (Hover State)

```css
.glow-hover {
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.glow-hover:hover {
  box-shadow:
    0 0 20px rgba(79, 195, 247, 0.5),
    0 0 40px rgba(79, 195, 247, 0.2);

  border-color: rgba(79, 195, 247, 0.6);
}
```

**Purpose**

- Provides immediate visual feedback during hover interactions.
- Highlights interactive objects throughout the portfolio.
- Reinforces the sci-fi and holographic aesthetic.

---

#### Neon Border (Active Module)

```css
.neon-border {
  border: 2px solid #4FC3F7;
  animation: neon-pulse 2s ease-in-out infinite;
}

@keyframes neon-pulse {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(79, 195, 247, 0.5);
  }

  50% {
    box-shadow: 0 0 25px rgba(79, 195, 247, 0.8);
  }
}
```

**Purpose**

- Indicates the currently active module or selected object.
- Draws the user's attention without overwhelming the interface.
- Reinforces navigation and interaction feedback through animated lighting.
#### Particle Trail

**Purpose**

Creates a dynamic particle trail that follows moving objects, reinforcing motion and energy within the 3D universe.

| Property | Value |
|----------|-------|
| Effect | Particle trail attached to moving modules and animated objects |
| Particle Count | 10–15 particles |
| Lifetime | 2 seconds |
| Particle Size | 2–5 px |
| Color | Matches the associated module's primary color |
| Opacity | Fade out from **0.8 → 0** over its lifetime |
| Emission | Continuous while the object is moving |

---

#### Scan Line (Hologram Panel)

```css
.scan-line {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(79, 195, 247, 0.8),
    transparent
  );

  animation: scan-line 3s linear infinite;
  pointer-events: none;
}

@keyframes scan-line {
  0% {
    transform: translateY(0);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
```

**Purpose**

- Simulates a futuristic holographic scanning effect.
- Reinforces the sci-fi interface aesthetic.
- Adds subtle motion to information panels without distracting the user.
- Applied to hologram panels, modal windows, and technology information cards.