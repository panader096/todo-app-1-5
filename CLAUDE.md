# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A to-do app that lets users add tasks, mark them done, and delete them. Data persists across reloads via localStorage. Deployed on GitHub Pages.

## Stack
- Plain HTML, CSS, JavaScript (no framework)
- Data stored in `localStorage`
- No build step — open `index.html` directly in a browser or via GitHub Pages

## Running the app
Open `index.html` in a browser. No server needed.

## Files
- `index.html` — structure
- `style.css` — styles
- `app.js` — all logic

## Conventions
- Keep everything in the three files above; do not add new pages or files without asking
- Do not add external libraries or packages without asking

## Core interactions
1. Type a task in the input field and press Enter or click Add
2. Tick a checkbox to mark a task done — text gets a strikethrough
3. Click the delete button on a task to remove it
4. Tasks persist across reloads (localStorage)

## Stretch ideas (not yet built)
- Filter tasks: All / Active / Completed
- Edit a task in place
- Drag-to-reorder
- Due dates
