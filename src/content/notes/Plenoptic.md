
---
title:  "Plenoptic Cameras"
summary: "A brief note on Plenotpic cameras"
tags: ["computational imaging","vision"]
date: 2026-08-18

---
## Prelude
conventional cameras use lenses to focus an array of light onto a sensor
We've come to understand that light carries a lot of information encoded in it's intensity and phase.
However, most of those information is disposed of by lenses. 
#### What's so important about "the information"
It reveals details about the landscape that are used to perform tasks like
3D reconstruction
Depth Estimation
and so on...
#### How?
without the lens each ray of light is mapped on to every point on the sensor...then multiple relationships are formed that help us to recreate the scene

Over the course of my pursuit in vision and imaging, I hope to have a greater understanding of light, waves and imaging and contribute immensely to the field

### What does a Plenoptic do?
It focuses light passing through a lens on an array of tiny lenses
#### Why is this important?
Each mini-lens contribute to a specific region in the sensor plane
More importantly, Each mini-lens tells us what the object looks like from that particular angle.
This allows us, with computational help, to change the angle of view of the object  with one capture
This is of course limited by the field of view (FOV) of the major lens

Another important function of the Plenoptic lens is the ability to apply focus to any part of the object.. this a result of having details of the scene from multiple perspective in one capture

We hope to see what cool thing we could come up with next