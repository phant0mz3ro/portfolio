---
title: "Real-Time Sign Language Recognition"
summary: "A computer vision system that classifies sign language gestures in real time, using hand landmark tracking instead of raw pixel classification."
tags: ["Computer Vision", "TensorFlow", "MediaPipe", "OpenCV"]
github: "https://github.com/phant0mz3ro/REPLACE_ME"
status: "complete"
date: 2026-03-01
featured: true
log:
  - date: 2026-02-10
    title: "Starting point: why not just classify raw frames?"
    kind: "note"
    body: >
      First instinct was to feed raw webcam frames into a CNN. Decided against it —
      too sensitive to background, lighting, and skin tone, and would need a huge
      dataset to generalize. Switched to MediaPipe hand landmarks (21 keypoints per
      hand) as the input representation instead, which strips away everything except
      hand geometry.
  - date: 2026-02-14
    title: "Landmark-only model overfit almost instantly"
    kind: "problem"
    body: >
      With only ~40 samples per gesture class, the classifier hit 99% train accuracy
      and under 60% on unseen validation clips. Classic overfitting — the model was
      memorizing specific hand positions rather than the shape of the gesture.
  - date: 2026-02-16
    title: "Fix: normalize landmarks + augment with synthetic jitter"
    kind: "fix"
    body: >
      Normalized all landmarks relative to the wrist point and scaled by hand size,
      so the model became invariant to hand position/distance from camera. Added
      small random rotation and translation jitter to synthetic copies of each
      sample. Validation accuracy jumped from ~60% to ~91%.
  - date: 2026-02-22
    title: "96% classification accuracy on held-out test set"
    kind: "milestone"
    body: >
      Final model reached 96% accuracy across the gesture vocabulary, running at
      real-time frame rates on a standard laptop webcam feed.
---

## Why this project

[Write 2-4 sentences here: what problem this solves, why you picked it, and what
you wanted to learn or prove by building it.]

## Approach

[Explain the technical approach at a level a smart non-specialist recruiter and a
technical interviewer can both follow. Diagrams/screenshots go well here.]

## What I'd do differently

[This is the section recruiters remember — be honest about the limits of the
current build and what a v2 would fix.]
