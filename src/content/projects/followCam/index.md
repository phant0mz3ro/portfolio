---
title: "Hand-Tracking Pan-Tilt Camera Rig"
summary: "A camera on a pan-tilt bracket that visually tracks a hand in frame, closing the loop with a PI controller — using the camera itself as the position sensor, since the servos have no feedback of their own."
tags: ["Control Theory", "Computer Vision", "MediaPipe", "Arduino", "Python"]
github: "https://github.com/phant0mz3ro/REPLACE_ME"
status: "complete"
date: 2026-08-01
featured: true
log:
  - date: 2026-07-10
    title: "The servos weren't what the datasheet said"
    kind: "problem"
    body: >
      Commanding a "position" on the MG996R servos caused them to spin continuously
      and never settle, instead of moving to an angle. Testing confirmed they were
      the continuous-rotation variant, not standard positional servos — writing a
      value away from 90 spins the servo at a speed/direction proportional to the
      offset, and 90 means stop. This changes the whole control problem: the system
      controls velocity, not position, and angular position only exists implicitly
      as the time-integral of applied velocity.
  - date: 2026-07-11
    title: "Reframed as a Type-1 plant and modeled it properly"
    kind: "fix"
    body: >
      Since there's no encoder or potentiometer, the camera itself has to be the
      only feedback path — each frame, Python re-measures how far off-center the
      hand is and corrects again. Modeled the plant as G(s) = Kv/s (a single
      integrator) and measured Kv empirically by applying a fixed command offset
      for a fixed duration and measuring the actual rotation against a marked
      scale: ~1.0 deg/sec per unit offset on both axes.
  - date: 2026-07-13
    title: "Designed the PI controller from the measured plant model"
    kind: "milestone"
    body: >
      Derived Kp and Ki by matching the closed-loop transfer function to a
      standard second-order form, targeting a damping ratio of 0.8 and a natural
      frequency of 1.5 rad/s. Chose PI over pure P because the servos exhibit
      deadband/stiction near the stop point — proportional control alone could
      leave the system stuck just inside that deadband with too small a command
      to overcome it; the integral term accumulates and pushes through it.
  - date: 2026-07-14
    title: "First tuning pass was too twitchy"
    kind: "problem"
    body: >
      With ωn = 2.0 rad/s (Kp = 3.2, Ki = 4.0), the rig reacted aggressively to
      small movements. Diagnosed which parameter was actually responsible: ζ
      governs overshoot/oscillation shape, ωn governs reaction speed. Since the
      complaint was general over-eagerness rather than overshoot-and-correct
      oscillation, ωn was the right knob to turn, not ζ.
  - date: 2026-07-14
    title: "Reduced ωn to 1.5 rad/s, keeping the damping ratio fixed"
    kind: "fix"
    body: >
      Recomputed Kp = 2.4, Ki = 2.25 at the lower ωn. This scales both gains down
      together while preserving the same relative response shape, just slower —
      noticeably smoother while still tracking responsively.
  - date: 2026-07-16
    title: "Preview mirroring flipped the pan direction"
    kind: "problem"
    body: >
      Used cv2.flip() to make the on-screen preview feel natural (move right on
      screen = hand moved right), but this inverted the relationship between
      apparent horizontal hand position and the servo's real-world pan direction.
  - date: 2026-07-16
    title: "Fixed by negating the horizontal error term"
    kind: "fix"
    body: >
      Negated the horizontal error before it enters the controller, so the
      preview could stay mirrored for the user without corrupting the control
      loop's sense of direction.
  - date: 2026-07-18
    title: "Vertical FOV calibration gave an implausible aspect ratio"
    kind: "problem"
    body: >
      The initial vertical field-of-view measurement used a different distance
      from the horizontal measurement, producing numbers that didn't make sense
      together. Remeasured both at a consistent, corrected distance to get
      reliable horizontal/vertical FOV values (41.8° / 29.5°) for converting
      normalized frame position into real angular error.
  - date: 2026-07-20
    title: "Servos moved with no Python process running"
    kind: "problem"
    body: >
      During early testing, the rig would twitch even when nothing was
      controlling it. Traced to the Arduino browning out and resetting when the
      servos shared the Arduino's 5V rail under load — the sketch's setup()
      re-centers both servos to 90° on every reset, which looked exactly like
      unprompted movement.
  - date: 2026-07-20
    title: "Root cause was a missing shared ground, not just insufficient power"
    kind: "fix"
    body: >
      Switched to an external 5V supply for the servos, but that alone didn't
      fully resolve it — the servos moved erratically until a shared ground was
      added between the external supply and the Arduino. Without a common
      ground reference, the PWM signal has no consistent voltage reference to
      the servo, which reads as random motion. The shared ground, not the extra
      power, was the actual missing piece.
---

## Why this project

[Write 2–4 sentences: what motivated building a vision-driven pan-tilt rig, and
what you wanted to prove or learn — e.g. closing a control loop with a camera as
the only sensor, with no encoder feedback on the actuators.]

## System architecture

A USB webcam feeds frames to a Python process on the PC, which runs MediaPipe's
HandLandmarker to detect the hand, computes the angular error from frame
position, and runs two independent PI controllers (pan and tilt). The result is
sent over serial as `"pan,tilt\n"` to an Arduino running a minimal receive-only
sketch that writes the values directly to the servos — all control logic lives
on the PC side, since the plant is velocity-controlled and needs fresh visual
feedback every cycle anyway.

```
USB Webcam → Python (hand detect, PI control x2, anti-windup) → serial → Arduino → Pan/Tilt servos
                    ▲                                                                      │
                    └──────────────────── visual feedback (next frame) ─────────────────────┘
```

## Control theory

The servos turned out to be continuous-rotation, which made this fundamentally a
velocity-control problem rather than a position-control one — see the build log
above for how that was discovered. The plant was modeled as a single-integrator
system (G(s) = Kv/s), with Kv measured empirically rather than assumed. A PI
controller was designed directly from that model by pole-placement (targeting
ζ = 0.8, ωn = 1.5 rad/s), with clamped conditional integration for anti-windup
and a ±2° dead zone to stop the system from hunting on frame-to-frame jitter.

## What I'd do differently

- Log Kv at multiple offset levels rather than a single-point measurement, to
  check the plant is actually linear near the deadband and not just at the one
  operating point tested
- Add a real position sensor (potentiometer tap or magnetic encoder) so the
  system isn't entirely dependent on vision-frame-rate-limited feedback
- Add a feedforward term for known camera pan velocity limits, reducing how much
  of the deadband crossing relies on integral action alone
