---
title: "Why I model actuators before I control them"
summary: "A short note on why plant identification (measuring, not assuming, a system's real behavior) keeps saving me from wrong controller designs."
tags: ["Control Theory"]
date: 2026-08-05
---

Every time I skip measuring the actual plant and just guess gains, I regret it.
The hand-tracking rig is the clearest example — the servos weren't even the type
I assumed (positional vs. continuous-rotation), and no amount of clever PID
tuning would have fixed a controller built on the wrong model of the system.

Cheap rule I keep re-learning: characterize first, control second.
