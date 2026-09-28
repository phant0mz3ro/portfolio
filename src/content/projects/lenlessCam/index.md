---
title: "Lensless Imaging"
summary: "A computational imaging approach to image processing and robot visual perception using bare image sensors, discarding the lens in the process."
tags: ["Computational Imaging", "Optics", "Vision", "Simulation"]
github: "https://github.com/phant0mz3ro-lumen-labs"
status: "active"
date: 2026-09-01
featured: true
---
# Deep Dive

You may be wondering what's so special about having a camera without a lens. Basically, lenses throw away alot of information about incoming light rays and it makes a huge contribution to the size, weight and cost of the camera system.
Recent years have shown advances in reconstruction of images from raw sensor data. This is aided by the use of coded masks or diffusers.
I thought this was cool and what's even cooler is that lensless imaging retrieves more information from the scene than conventional lenses. 

## What I built

After trying to make it through the DiffuserCam papers, I wrote a full simulation pipeline:

- Angular Spectrum Method (ASM) to propagate light from scene to sensor
- A random phase diffuser model to encode the scene
- Gerchberg-Saxton (GS) and Hybrid Input-Output (HIO) phase retrieval, plus a hybrid of the two, to recover the scene

On clean simulated data, reconstructions reach an SSIM of about 0.94. I also ran depth estimation experiments on the simulated measurements.

## The hardware side

The target platform is an ESP32-CAM or Raspberry Pi cam setup. I built a low-latency MJPEG streaming server for it and tuned the camera settings for lensless capturing. I also evaluated household materials as diffusers against what true optical speckle requires. Most fall short. I decided to use frosted glass film.

## What's not done

I haven't taken the lens off yet. The lens is really difficult to screw off and I'm too scared to damage the board or something, but I'll keep trying. So right now, everything is simulation. SSIM on clean simulated data says nothing about real noise, sensor effects, or calibration error, and that gap is the real test.

## What's next

I was looking for research ideas and came across a topic about skipping reconstruction entirely and mapping the sensor data directly as input.
Take for instance my hand-tracking project.
Imagine I'm using a lensless camera and I don't need to reconstruct the scene before determining the position of the hand in the scene.

As a bonus, raw measurements are unrecognizable to a human, which is interesting for privacy-preserving sensing.

## Follow along

Code and notes are on [GitHub](github.com/phant0mz3ro-lumen-labs). 
I'll post the first real hardware captures

---