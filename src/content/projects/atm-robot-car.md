---
title: "ATM — Ackermann-Steering Robot Car in ROS2 + Gazebo"
summary: "A simulated robot car with realistic Ackermann steering, built to test navigation and control logic before touching real hardware."
tags: ["ROS2", "Gazebo", "Robotics", "Simulation"]
github: "https://github.com/phant0mz3ro-lumen-labs/REPLACE_ME"
status: "active"
date: 2026-05-01
featured: true
log:
  - date: 2026-04-15
    title: "Why simulate before building hardware"
    kind: "note"
    body: >
      Decided to get the control stack right in Gazebo before committing to a
      hardware platform — cheaper to fail fast in simulation than to debug motor
      controllers and wiring at the same time as navigation logic.
  - date: 2026-04-20
    title: "Differential-drive controller didn't reflect real steering"
    kind: "problem"
    body: >
      Started with ROS2's default diff-drive plugin, but a real car-like chassis
      doesn't turn like a differential-drive robot — it has a minimum turning
      radius and the wheels turn, not spin at different speeds.
  - date: 2026-04-24
    title: "Fix: switched to an Ackermann steering plugin"
    kind: "fix"
    body: >
      Rebuilt the URDF with a proper Ackermann steering geometry and swapped in a
      steering-aware controller plugin, so simulated motion actually matches how
      a real car chassis would move.
---

## Why this project

[Write the motivation: what you're ultimately building toward, and why the
simulation-first approach mattered.]

## Approach

[Architecture: URDF/SDF setup, control stack, what's simulated vs planned for
real hardware.]

## Current status / what's next

[This one is marked "active" — say where it stands right now.]
