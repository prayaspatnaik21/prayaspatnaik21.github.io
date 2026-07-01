---
layout: post
title: Sharpening
date: 2026-06-28
category: "Image Processing"
reading_time: 5
excerpt: "Working notes on image sharpening, edge contrast, and MTF."
math: true
---

# Sharpening

1. what exactly do you mean by a sharp image?
    1. where the edges look sharp? what exactly do you mean by edges look sharp?
    2. can we call an image properly sharp where the intensity profile across an edge in an image is very steep or in other word , it takes fewer pixels to go from bright side of the edge to dark side of the edge or vice-versa.
    3. To understand this , let's first understand Two Terms , PSF and MTF.
        1. PSF (Point Spread Function)
            1. The point spread function describes how an imaging system responds to a single ideal point of light.
            2. In perfect world , one point on the object gives you one point on the image.
            3. In reality , that point in the image spreads out onto a small blob of light.
            4. The PSF is the map of how energy from one ideal scene point is spread on the image plane.
            5. There is no definite shape of PSF. It can take wildly different , irregular forms.
            6. There is no single isolated PSF in a real photograph. A real photograph is the superposition of many scene points , each blurred by the PSF.
            7. In normal images , the situation is complex , a small area of the scene is made of many densely packed points , each of which produces its own PSF in the image.
            8. As the PSF is never infinitesimally small , the individual point spreads overlaps each other.
            9. The brightness we measure at any location is not from one point alone , it's the result of a 2D summation of many overlapping PSFs from all the neighbouring object points.

        2. MTF (Modulation Transfer Function)
            1. On a high level , Modulation Transfer equals Modulation in the image / Modulation in the object.
            2. Object Modulation - The contrast in the original scene.
            3. Image Modulation - The contrast of the same scene recorded by the sensor (after passing through the lens)
            4. As the PSF leaks light from bright into dark areas , the bright pixel becomes dimmer and the dark one becomes bright in the image. So , the image modulation is always less than the object modulation.
            5. Modulation transfer tells you the fraction of the original contrast survived through lens or in otherwords how much contrast is preserved.

        3. Edges are the most important features of an image. Border between two areas with different brightness or color.
            1. Edge profile is the variation of the pixel intensity going from one intensity area to other.
            2. It is the cumulative sum of the PSFs which tells you the how a edge boundary is produced.
            3. **If the edge profiles in the image is steep , we can call the image as a sharp image.**

2. How can we make an image look sharp?
    1. simple approach is to subtract the neighbouring pixel from the original pixel value. 
    2. In other words , subtract shifted copies of the signal.

3. Mathematical Intuition
    1. $L_{sharp}(x) = L(x) - \frac{k_{sharp}}{2} \left( L(x - v) + L(x + v) \right)$ (1D Example)
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

## Sharpening Output

### Simple Sharpening Algorithm

<div class="comparison-demo">
    <iframe
        src="{{ '/images/image-comparison-slider_cpu.html' | relative_url }}"
        title="Simple sharpening algorithm comparison"
        loading="lazy">
    </iframe>
</div>

### CUDA Based Sharpening

<div class="comparison-demo">
    <iframe
        src="{{ '/images/image-comparison-slider_gpu.html' | relative_url }}"
        title="CUDA based sharpening comparison"
        loading="lazy">
    </iframe>
</div>

6. Write the frequency analysis and connect with MTF values and how it boosts the frequency.

7. MTF (Modulation Transfer Function)
    1. what is point spread function?
    2. what is birefringent discs? and why there is low pass filter in front of the lens ? how it supresses the moire effect.
    3. 
