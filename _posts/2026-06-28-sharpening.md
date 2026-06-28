---
layout: post
title: Sharpening
date: 2026-06-28
category: "Image Processing"
reading_time: 5
excerpt: "Working notes on image sharpening, edge contrast, and MTF."
---

# Sharpening

1. what exactly do you mean by a sharp image?
    1. where the edges look sharp? what exactly do you mean by edges look sharp?
    2. Intensity variation across an edge is very small.
    3. can we call an image properly sharp where the variation in the intensity across an edge in a image is small.
    4. we are able to see the intensity variation clearly.

2. How can we make an image look sharp?
    1. simple approach is to subtract the neighbouring pixel from the original pixel value. 
    2. In other words , subtract shifted copies of the signal.

3. Mathematical Intuition
    1. $L_{sharp}(x) = L(x) - \frac{k_{sharp}}{2} \left( L(x - v) + L(x + v) \right)$ (1D Exampe)
    2. $L_{sharp}(x)$ - pixel value at originally at position x.
    3. $k_{sharp}$ - sharpening strength ( 0 = no sharpening , and higher -> more)
    4. V = shift distance in the same units as x (for now we can in pixel values)

4. Why the above equation works?
    1. If you are on a flat region of the signal
    2. It is same to assume $L(x)$ $\approx$ $L(x-v)$ $\approx$ $L(x+v)$ 
    3. $L_{sharp}(x) = L(x) - \frac{k_{sharp}}{2} \left(2 * L(x)\right)$
    4. $L_{sharp}(x) = L(x)( 1 - {k_{sharp}})$
    5. Everything gets slightly dimmer.
    6. we can add a normalization term to this to make $L_{sharp}(x) \approx L(x)$. 
    7. Normalization constant - 1 - ${k_{sharp}}$
    8. At an edge , $L(x-v)$ amd $L(x+v)$ differs from $L(x)$ , so the subtraction amplifies the difference making the edge steeper.

5. what is V?
    1. connects pixel distance to physical distance.
    2. $V$ = $R_{s}$ / $d_{scan}$
    3. $R_{s}$ -> sharpening radius in pixels.
    4. $d_{scan}$ -> scan rate in pixel per unit distance (pixel/mm) , you can choose any unit for this.
    5. V -> shift in physical distance (eg mm)
    6. working in pure pixel distance -> $d_{scan}$ = 1 pixel/mm -> V = $R_{s}$

6. Write the frequency analysis and connect with MTF values and how it boosts the frequency.

7. MTF (Modulation Transfer Function)
    1. what is point spread function?
    2. what is birefringent discs? and why there is low pass filter in front of the lens ? how it supresses the moire effect.
    3. 
