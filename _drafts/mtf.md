---
layout: post
title: How to Read MTF
category: "Image Processing"
reading_time: 12
excerpt: "Working notes on point spread functions, modulation transfer, resolving power, and edge definition."
---

# How to Read MTF?

1. Point spread Function
    1. The point spread function describes how an imaging system (a lens) respond to a single ideal point of light.
    2. In perfect world , one point on to the object -> one point on the image .
    3. In reality , that points spreads out onto a small blob of light.
    4. The PSF is the map of how that single point's enery is distributed across the image plane.

2. why PSF is not used in describing image quality?
    1. The shape is too complicated for a simple number. 
    2. The psf can take widly different , irregular forms . 
    3. There's no single number that captures these varied shapes.
    4. why a low pass filter suppresses Moire?
        1. A digital sensor is a grid of discrete pixels at a fixed spacing (pitch).
        2. when the scene contains fine repeating patterns , whose spatial frequency is close or greater than the sensor's pixel spacing.
        3. The sensor cannot sample that detail correctly.
        4. It creates false patterns - wavy bands.
        5. This is the Moire effect , caused by the interaction between the scene's fine pattern.
        6. The low pass filter works by blurring the image just enough so that spatial detail finer than the pixel spacing is suppressed
            before it reaches the sensor.
        7. Example
            1. if the stripes are wide (1 stripe pair - 5 mm on the sensor) , that's a low spatial frequency. The pattern changes slowly across 
                space.
            2. Each pixel comfortably captures one stripe or the other.
            3. If the stripes are very fine (say 1 stripe every 0.01 mm on the sensor) , that's high spatial frequency. The pattern changes rapidly across space.
            4. when one full black white stripe pair fits within one or two pixels , the sensor can no longer tell the stripes apart.
            5. The pattern spatial frequency meets or exceeds the sensor's sampling limit.
    5. we never see a single isolated PSF in a real photograh.
    6. In normal images , the situation is more complex , a small area of the scene is made of many densely packed points , each of which produces
        its own PSF in the image.
    7. Because the PSF is never infinitely small , these individual points spreads overlap each other.
    8. The brightness we measure at any location is not from one point alone. It's the result of a two dimensional summation of many overlapping PSFs from all the neighbouring object points.

3. Modulation Transfer
    1. from the image , 20 line pairs/ mm -> 1 / 20 mm for 1 full cycle - > 50 um 
    2. across - 180 um - we will see 3.5 cycles.
    3. A sinusoidal stripe pattern is used as a test target - smooth , repeating bright to dark stripes.
    4. At 20 lp/mm , one full cycle (one bright + one dark stripe) = 50 um.
    5. Every point on the pattern emits light , with a perfect lens , each points light would land exactly at its corresponding image position.
    6. Real lenses have PSF , light from each points does not stay one spot , it spreads out in a block around the ideal position. 
    7. Every point on the pattern contributes its own PSF to the surrounding. The total brightness at any position is the sum of all overlapping PSF contributions from all neighbouring points.
    8. Dark Valleys receive light they shouldn't have. Bright peaks lose light they should have kept. Light from the peaks has leaked sideways into the valley and flanks.
    9. Contrast - the difference between maximum and minimum of any periodic signal.
    10. Modulation - difference between maximum and minimum of any periodic signal.
    11. Modulation Transfer - modulation in the image / modulation in the object.
        1. Object Modulation - the contrast of sine pattern in the original scene (before the lens)
        2. Image Modulation - the contrast of the same sine pattern as recorded by the sensor (after passing through the lens)
        3. Because the PSF leaks light from bright into dark areas , the bright stripes becomes dimmer and the dark stripes becomes brighter in the image . so the image modulation is always less than the object modulation.
        4. Modulation transfer - tells you the fraction of the original contrast survived through the lens.
    12. Contrast Calculation - ( Max - Min / Max + Min )
    13. Example Maths — 50% MTF on a 6-stop object:
        1. Object has 6 aperture stops → brightness ratio 1:64 (2^6 = 64).
        2. Min = 1, Max = 64.
        3. Object contrast = (64 - 1) / (64 + 1) = 63/65 ≈ 0.97.
        4. After 50% MTF: Image contrast = 0.50 × 0.97 ≈ 0.48.
        5. Solve back for ratio: 0.48 = (Max - 1) / (Max + 1) → Max ≈ 2.9. So image ratio = 1:2.9.
        6. Convert to stops: log2(2.9) ≈ 1.5 stops.
        7. NOT 3 stops (half of 6), NOT 5 stops (1:32). Only ~1.5 stops.
        8. Reason: the Michelson contrast formula is nonlinear in stops — halving the contrast value collapses the ratio from 1:64 to 1:2.9.
    14. Important Properties of MTF
        1. Small Differences in higher MTF values are particularly significant at high object contrast levels.
        2. weak tonal values varations of less than one aperture stop do not require high MTF values.
        3. with very low MTF values , it practically does not matter how high the object contrast is. the image contrast is always low.

4. Modulation Transfer Function , resolving Power
    1. One stripe pattern is not enough — a single spatial frequency cannot characterize a lens.
    2. Coarse patterns (low spatial frequency) — wide stripes, large separation between bright and dark. Even a lens with a large PSF images these well. MTF is high.
    3. As stripes get finer — the separation between bright and dark approaches the PSF size. Light from bright zones spills heavily into dark zones. MTF drops.
    4. We must test at many stripe widths — measure the modulation transfer at each one. This gives a sequence of numbers.
    5. Plot those numbers vs. spatial frequency — the resulting curve is the Modulation Transfer Function (MTF).
    6. One period = distance from one bright stripe to the next = one line pair (one dark + one bright stripe).
    7. Spatial frequency = number of periods per millimeter on the image plane. Unit: lp/mm (line pairs per millimeter).
    8. Low lp/mm = coarse detail. High lp/mm = fine detail.
    9. X-axis of an MTF curve = spatial frequency (lp/mm).
    10. Y-axis of an MTF curve = modulation transfer (0–100%).
    11. At low frequencies — MTF is near 100%. The lens handles coarse patterns easily.
    12. As frequency increases — MTF drops. The PSF starts overlapping neighbouring stripes.
    13. At some high frequency — MTF reaches 0%. The lens can no longer distinguish bright from dark. This is the resolution limit.
    14. Diffraction Limited MTF and Resolving Power
        1. F-number (f/N) — ratio of focal length to aperture diameter: N = focal length / diameter. Higher f-number = dividing by a bigger number = smaller aperture opening.
            - e.g., 160 mm focal length: f/2 = 80 mm opening (large), f/8 = 20 mm (medium), f/16 = 10 mm (small).
        2. Diffraction — when light passes through any aperture, it bends at the edges. Cannot be eliminated. Smaller apertures (higher f-numbers) cause more bending.
        3. Diffraction-limited — the lens is so well-made that its only remaining imperfection is diffraction itself. All aberrations are negligible. This is the best a lens can possibly perform at a given f-number.
        4. Diffraction-limited MTF — the MTF curve of a perfect lens. Nearly a straight line from 100% at 0 lp/mm down to 0% at the limit frequency. No real lens can exceed this line — it is the theoretical ceiling.
        5. Limit frequency — the spatial frequency where even a perfect lens reaches 0% MTF. Approximation: limit frequency ≈ 1500 / f-number (in lp/mm).
        6. Airy disk — the PSF shape of a diffraction-limited lens with a circular aperture. PSF width in µm ≈ f-number (e.g., f/16 → PSF ≈ 16 µm wide).
        7. Why f-number matters for MTF — larger f-number (smaller aperture) → more diffraction → wider PSF → lower limit frequency → less detail resolved.
        8. Real lenses (with aberrations) — MTF drops quickly at first, then very slowly approaches zero. The curve has a pronounced sag compared to the straight diffraction-limited line.
        9. Resolving power — the spatial frequency where MTF reaches zero or falls below a low threshold (e.g., 10%). Finer patterns than this produce uniform grey.
        10. Resolving power is hard to measure — the MTF curve flattens at high frequencies, so the exact crossing point depends sensitively on the threshold chosen. This makes it imprecise and unsuitable as a quality criterion.
        11. Resolving power in air ≠ resolving power with a sensor — they should not be confused.
        12. Third reason to use MTF — we never see the lens image directly. There is always an imaging chain: lens → sensor → processing → display → eye. Each component has its own MTF.
        13. Key property — the MTF of the entire imaging chain is (approximately) the product of all individual MTFs. This makes it easy to predict system performance.
    
5. Edge Definition , Image Contrast
    1. Real photographs do not contain sinusoidal patterns — sine waves are the mathematically pure test targets for MTF but are hard to produce even in a lab.
    2. Rectangular (square-wave) stripe patterns — abrupt black-to-white transitions — are used instead on lens/camera test charts to determine effective resolving power.
    3. Modulation transfer for rectangular patterns is slightly better than for sinusoidal patterns of the same spatial frequency, because a square wave is composed of the fundamental sine wave plus odd harmonics.
    4. Neither sine nor square-wave patterns represent what is really in photographs.
    5. Edges are the most important feature — borders between two areas with different brightness or color. Our eye uses edges more than periodic patterns to judge imaging quality.
    6. Understanding the relationship between MTF and edge reproduction brings us back to the Point Spread Function (PSF).
    7. PSF, Edge Profile, and MTF are three equivalent views of the same lens performance.
        1. PSF is the fundamental spatial description — how a point is spread.
        2. Edge profile is the integral (cumulative sum) of the PSF — how a sharp boundary is reproduced. This is what photographers directly see and judge as "sharpness."
        3. MTF is the Fourier transform of the PSF — how contrast is preserved at each spatial frequency.
        4. A lens with a narrow PSF will simultaneously produce steep edges and high MTF values.
    8. A narrow PSF means the lens spreads a point of light very little. Even the faint tails of the PSF matter — though they are orders of magnitude weaker than the peak, they leak light into dark areas and affect shadow contrast.
    9. The edge profile tells us how abruptly the lens can transition from bright to dark.
        1. A perfect lens would produce an instantaneous step. In reality the PSF smears the edge, and the transition width directly reflects the PSF width.
        2. Narrow PSF → steep edge → perceived sharpness. Wide PSF → gradual edge → perceived softness.
        3. The transition width depends on the size of the brightness step — a large brightness difference (many EV stops) takes more distance to complete because the faint PSF tails contribute light further into the dark side.
    10. What a good lens looks like in terms of edge and MTF
        1. The edge transition is very steep — only about 10 µm wide. The photographer says: the image is sharp.
        2. MTF values are high across all important spatial frequencies and roll off gradually towards higher frequencies, not abruptly.
        3. For such a lens, image quality is usually limited by the sensor, focusing accuracy, or camera movements — not the lens itself.
    11. What a poorer lens looks like in terms of edge and MTF
        1. The PSF is significantly wider, so every point in the scene spreads over a larger area.
        2. The edge transition is gradual — 30 to 50 µm wide instead of 10. The photographer says: the image is soft.
        3. Deep black is still achieved eventually after enough distance from the edge, so overall contrast between large bright and dark areas remains high.
        4. MTF at low spatial frequencies (coarse detail) is only slightly lower than the good lens — wide stripes are much larger than the PSF, so contrast is preserved.
        5. MTF drops rapidly at higher spatial frequencies — fine stripes approach or fall within the PSF width, so light from bright stripes floods into dark stripes and contrast collapses.
        6. This lens has "good overall contrast but poor sharpness."
    12. Key insight: low-frequency MTF describes large-scale contrast (tonal separation between broad areas). High-frequency MTF describes fine detail rendition (sharpness, texture, edges). A lens can have high contrast but low sharpness, or vice versa — MTF at multiple frequencies is needed to tell the full story.
    13. Box-shaped LSF and spurious resolution
        1. A box-shaped LSF (uniform spread) produces a ramp-shaped edge profile — gradual, not steep — hence poor edge definition.
        2. The Fourier transform of a box function is a sinc function (sin(x)/x), which oscillates and crosses zero at regular intervals.
        3. MTF at low and medium frequencies (up to ~20 lp/mm) can still be normal and acceptable.
        4. At a specific frequency, the box width exactly matches one full stripe cycle. Light spills uniformly from bright into dark stripes — they become equally bright. Result: zero contrast (MTF = 0%).
        5. Beyond that zero point, contrast can return — the sinc function oscillates back up. But the bright and dark stripes are swapped (phase reversal). What was black becomes white and vice versa.
        6. This is called "spurious resolution" — the lens appears to resolve a fine pattern, but it is an artifact of the sinc oscillation, not genuine imaging quality.
        7. You usually do not notice the reversal in normal photos (bright/dark swap in fine textures is invisible). But with Siemens star targets (radial patterns), the reversal becomes obvious because you can see the stripes flip polarity.
        8. Measuring MTF at a single frequency is dangerous — you might accidentally pick a frequency where the sinc has bounced back up and conclude the image is sharp when it is actually badly blurred.
    14. Practical sources of box-shaped LSF
        1. Focus errors produce near-box-shaped spread functions — defocus PSF is a disk, whose radial profile integrates to something box-like. Out-of-focus images exhibit zero-crossing behavior.
        2. Motion blur produces a literal box LSF — uniform smear along the motion direction. Motion-blurred images also show spurious resolution at certain frequencies.

6. PSF vs LSF
    1. Point Spread Function (PSF) — the response of the imaging system to a single point of light.
        1. It is a 2D function — shows how light spreads in both x and y directions across the image plane.
        2. Test target: a pinhole (infinitely small dot of light).
        3. Captures full directional information about the lens.
        4. 2D Fourier transform of the PSF gives the 2D MTF.
    2. Line Spread Function (LSF) — the response of the imaging system to an infinitely thin line of light.
        1. It is a 1D function — shows how light spreads perpendicular to the line only.
        2. Test target: a thin slit.
        3. Captures spread in one direction only.
        4. 1D Fourier transform of the LSF gives the 1D MTF (in one direction, e.g., sagittal or tangential).
    3. Relationship — the LSF is the integral of the PSF along one axis: LSF(x) = ∫ PSF(x, y) dy.
        1. Every point along the bright line produces its own PSF. Since the line is continuous, all those PSFs stack up along the line direction (y). What remains is only the spread in the perpendicular direction (x).
    4. Why LSF is often preferred in practice — a pinhole lets through very little light, making the PSF hard to measure with good signal-to-noise. A slit lets through far more light, so the LSF is easier to measure accurately.
    5. The chain of integrals: PSF → integrate along one axis → LSF → integrate again → Edge Profile.
        1. PSF is the most fundamental (contains all information).
        2. LSF collapses one dimension (still shows spread width).
        3. Edge profile collapses further (shows cumulative transition at an edge).
        4. All three describe the same lens — just at different levels of detail.

7. Why a Wide Box-Shaped LSF Gives Poor Edge Definition
    1. The edge profile is the integral of the LSF, not the LSF itself.
        1. When the lens images a sharp edge, every point along the bright side contributes its own spread (its own LSF) to the image.
        2. The edge profile is the cumulative sum of all those overlapping contributions.
        3. Mathematically: Edge profile = ∫ LSF.
    2. Narrow spike LSF — integrates into a steep, near-instantaneous step. Sharp edge.
    3. Wide box LSF — integrates into a ramp (a gradual linear slope that takes the entire box width W to complete the transition). The wider the box, the longer the ramp, the softer the edge.
    4. The sharp corners of the box only determine where the ramp starts and stops — between those points the transition is a steady slope, not a step. Over the full width W, brightness changes gradually and uniformly.
    5. Example: if the box LSF is 40 µm wide, light from the bright side spills 40 µm into the dark side. At 20 µm from the edge, brightness is at 50% instead of the 0% (black) it should be. That is a soft, unsharp edge.
    6. A narrow Gaussian LSF (e.g., 10 µm wide) has no sharp corners — it is smooth and rounded. Yet it produces a steeper edge than a 40 µm box, because what matters is how concentrated the energy is, not whether the shape has sharp corners.
    7. The real driver of edge sharpness is concentration of energy near the center of the LSF.
        1. Width of the LSF determines how gradual the edge transition is — wider = softer.
        2. Shape of the LSF (sharp corners, smooth, etc.) affects the profile of the transition (linear ramp vs. S-curve) but not the fundamental sharpness.
        3. Concentration of energy near center is what actually controls edge steepness — more concentrated = steeper edge.

8. Micro Contrast vs. Macro Contrast — Resolving Power, Contrast Rendition, and Brilliance
    1. Lens design trade-off: high resolving power (pushing MTF zero-crossing to the highest possible spatial frequency) vs. good contrast rendition (keeping MTF high at low and medium frequencies). Well-corrected lenses can achieve both.
    2. "Contrast rendition" in MTF context always means micro contrast — structures so fine that the naked eye can just about see or cannot see them (e.g., on a slide).
    3. Macro contrast — the contrast between large, widely separated areas (e.g., black vs. white squares on a chessboard filling the frame) — has nothing to do with MTF.
    4. What controls each type of contrast
        1. Micro contrast is controlled by lens correction quality — how precisely light rays are directed. Small deviations of light beams (aberrations) smear detail over micrometers. This is what MTF measures.
        2. Macro contrast is controlled by veiling glare — stray light from large deviations, where light ends up far from its intended target on the image plane.
    5. Sources of veiling glare
        1. Reflections between optical surfaces — each glass-to-air interface reflects ~4% of light without coatings. In complex lenses with many elements, these reflections bounce around and reach the sensor as diffuse stray light.
        2. Scattering at interior barrel components — rough or poorly blackened internal surfaces scatter light sideways onto the image.
        3. This stray light arrives at the image plane far from the original target point — it does not stay near the PSF; it spreads across the whole frame.
    6. Why MTF does not capture macro contrast — MTF measures the fine-scale smearing caused by aberrations (PSF width). When large areas are imaged, the PSF blur at their edges is negligible relative to the area size. What reduces contrast between large areas is the uniform haze of veiling glare lifting blacks and compressing tonal range.
    7. "Brilliance of the image" mixes together micro contrast (sharpness, detail rendering, measured by MTF) and macro contrast (deep blacks, clean tonal separation, depends on veiling glare and coatings). These are often confused.
    8. Good MTF values at low spatial frequencies are necessary but not sufficient for brilliant images. A lens can have excellent MTF yet produce flat, washed-out images if it has poor anti-reflection coatings or internal scattering — veiling glare lifts shadows and compresses tonal range.
    9. How micro contrast loss and veiling glare look different in images and histograms
        1. Low micro contrast (poor MTF, no veiling glare) — the PSF smears light from white areas into adjacent black areas only at the edges. Away from edges, black remains truly black. The overall tonal separation between large bright and dark regions is preserved.
        2. High veiling glare (MTF may be fine, but stray light present) — stray light floods the entire dark area uniformly, lifting black towards grey everywhere, not just at edges. The tonal floor rises globally.
        3. Key distinction: micro contrast loss is local — it degrades edges and fine detail only (PSF smearing). Veiling glare is global — it reduces the darkest achievable tone across the entire image (uniform haze).
        4. A lens can suffer from one without the other, or both. Identifying which problem is present requires understanding this distinction.

9. Edge Definition in Digital Images
    1. In an optical-only system, the MTF always starts at 100% modulation at zero spatial frequency and monotonically decreases toward zero as frequency increases. The lens can never add contrast — it can only preserve or lose it.
    2. Digital image processing changes this. The camera's ISP can manipulate the transfer function after the sensor captures the image using edge enhancement (sharpening).
    3. How edge enhancement works:
        1. At an edge (transition from dark to bright), the algorithm overshoots — it makes the bright side slightly brighter and the dark side slightly darker.
        2. This increases the micro contrast at the edge boundary.
        3. The human eye perceives this as "sharper," even though no additional spatial detail (resolution) has been created.
    4. Key insight: definition ≠ resolution. Edge enhancement boosts the contrast at existing edges, not the ability to separate closely spaced features.
    5. How edge enhancement appears in the transfer function:
        1. No enhancement — MTF starts at 100% and smoothly decreases. A pure low-pass characteristic (lens/sensor can only attenuate higher frequencies).
        2. Moderate enhancement — the ISP partially compensates the natural roll-off, making the MTF curve flatter over a range of spatial frequencies. The decrease is delayed or slowed.
        3. Over-enhancement — the ISP boosts mid-frequencies so much that the MTF curve rises above 100%. The system now has a partial high-pass character, amplifying certain frequencies beyond their original contrast. Artifacts appear.
    6. Graph interpretation — DSLR, 35mm format, 24 MP (three curves = three JPEG enhancement levels):
        1. All three curves start near 100% modulation at low spatial frequencies — coarse detail is preserved regardless of enhancement level.
        2. Bottom curve (minimal enhancement) — drops off earliest and steepest. Closest to raw optical+sensor MTF.
        3. Middle curve — maintains higher modulation longer. ISP has partially compensated the natural roll-off.
        4. Top curve (highest enhancement) — stays nearly flat up to ~50 Lp/mm (~1200 Lp/Image Height). "Very high edge definition" — constant contrast across a wide frequency band.
        5. None of the three curves exceed 100%. The enhancement stays within physical bounds — well-tuned sharpening.
        6. All curves converge toward 0% at the Nyquist limit (~2000 Lp/Image Height). No processing can recover detail beyond the sensor's sampling limit.
    7. Graph interpretation — 2/3" camera, min/med/max enhancement:
        1. Bottom curve (minimum enhancement) — smooth monotonic decrease from ~90% modulation. Behaves like a normal optical system. Clean, artifact-free, but may appear "soft."
        2. Middle curve (medium enhancement) — maintains higher modulation through mid-frequencies. Still monotonically decreasing. Good balance of sharpness and cleanliness.
        3. Top curve (maximum enhancement) — starts near 90% but rises above 100%, peaking ~115% modulation near 400–600 Lp/Image Height. This is the "buckled curve."
    8. Why the buckled curve means artifacts:
        1. When modulation exceeds 100%, the system outputs more contrast than the original scene contained.
        2. In the spatial domain this manifests as bright halos on the bright side of edges and dark halos on the dark side.
        3. These appear as additional bright lines next to edges of dark areas.
        4. This is the textbook sign of a system with partial high-pass character — amplifying mid-frequency content beyond what exists.
    9. Summary of enhancement levels:
        1. None/Minimal — smooth monotonic decrease, modulation ≤ 100%, no artifacts, image appears soft.
        2. Moderate — flatter roll-off, modulation ≤ 100%, no artifacts, image appears crisp and natural.
        3. High (well-tuned) — very flat then steep drop, modulation ≈ 100%, minimal artifacts, image appears very sharp.
        4. Over-enhanced — buckled curve rising above 100%, halos and ringing at edges, artificially sharp appearance.
    10. Fundamental rule: Modulation > 100% at any frequency = the system is creating contrast that was not in the scene = artifacts are guaranteed.
    10. Why MTF must be evaluated at multiple spatial frequencies simultaneously
        1. A single MTF value (e.g., 75% at 10 lp/mm) is ambiguous — it could correspond to completely different imaging behaviors depending on what happens at other frequencies.
        2. If low-frequency MTF is moderate but high-frequency values (20, 40 lp/mm) are very high — the lens has glare at high-contrast edges (light leaks from bright areas into dark at large scale, like the fourth PSF example with wide tails). Fine detail is sharp, but bright highlights bleed.
        3. If low-frequency MTF is moderate and high-frequency values are also lower than normal — the lens is simply less sharp (wider PSF, maybe slightly out of focus), but free of glare. Honest softness without artifacts.
        4. Analogy: knowing only one point of a frequency response is like knowing a loudspeaker's output at 440 Hz — it tells you nothing about how music actually sounds. You need the full curve.
    11. Test procedures that measure only one point of the MTF (e.g., resolving power alone, or the frequency where 50% MTF is reached) are of little value. The full shape of the MTF curve across multiple frequencies is needed to characterize imaging quality.

9. Tangential and Sagittal
    1. Up to now we have discussed the relationship between modulation transfer and the point spread function — how the shape and light distribution of the PSF influences MTF at various spatial frequencies. We plotted MTF as a function of spatial frequency.
    2. Such a single curve is valid only for one spot in the image. Even for that single spot, we actually require several curves.
    3. Why multiple curves are needed for one image point:
        1. Point spread functions are not necessarily circular. Some are elongated — comparable to a flat brush that can draw fine lines in one direction only.
        2. If we rotate the orientation of the stripe pattern used for measurement, we get different MTF curves depending on whether the shorter or longer elongation of the PSF is perpendicular to the stripes.
        3. When the longer axis of the PSF is parallel to the stripes — the narrow dimension does the resolving → higher MTF.
        4. When the longer axis of the PSF is perpendicular to the stripes — the wide dimension does the resolving → lower MTF.
    4. Understanding why the PSF dimension perpendicular to the stripes determines MTF:
        1. Think of the PSF as an oval stamp — say 5 µm wide and 20 µm tall.
        2. PSF long axis parallel to stripes (e.g., vertical stripes, vertical PSF elongation) — the alternation between black and white happens horizontally. The PSF is only 5 µm wide horizontally, so it smears light only 5 µm across the stripe pattern. Stripe gaps are mostly preserved → higher MTF.
        3. PSF long axis perpendicular to stripes (e.g., horizontal stripes, vertical PSF elongation) — the alternation happens vertically. The PSF is 20 µm tall, smearing light 20 µm across stripe boundaries. Bright stripes bleed heavily into dark stripes → contrast destroyed → lower MTF.
        4. The rule: MTF for a given stripe orientation is determined by the PSF width perpendicular to the stripes. Whichever PSF dimension crosses the pattern is the one that does the smearing. Narrow dimension → less smearing → higher MTF. Wide dimension → more smearing → lower MTF.
    5. Why the main orientations are always radial and tangential:
        1. Lenses are rotationally symmetric about the optical axis.
        2. The PSF elongation directions are therefore always parallel or perpendicular to the radius of the image circle — never at arbitrary angles.
        3. This gives exactly two principal directions for any off-axis image point.
    6. Sagittal (radial) direction:
        1. Stripe patterns where the longitudinal orientation of the stripes points toward the image center.
        2. "Longitudinal direction" means the direction the stripes run along (their length), not across their width. So sagittal stripes run radially — pointing at the center like spokes of a wheel. The black↔white alternation then happens in the tangential direction (along the circle).
        3. Named "sagittal" (sagitta = Latin for "arrow") — the stripes point like arrows toward the center.
        4. Also called "radial" because the stripe orientation follows the radius.
        5. This direction usually has the better (higher) modulation transfer, because the PSF is typically narrower in the radial direction for off-axis points.
    7. Tangential (meridional) direction:
        1. Stripe patterns perpendicular to the sagittal direction — i.e., stripes oriented along a tangent to a circle centered on the optical axis.
        2. Named "tangential" because the stripes follow the tangent line.
        3. Also called "meridional."
        4. This direction typically has lower MTF because the PSF tends to be broader tangentially (due to off-axis aberrations like coma and astigmatism).
    8. Diagram interpretation — non-circular PSF with stripe patterns:
        1. The PSF in the diagram is a horizontal ellipse — wider left-to-right, narrower top-to-bottom.
        2. Vertical stripes (left side, labeled "lower MTF") — stripes run vertically, black↔white alternation happens horizontally. The PSF's wide axis (horizontal) is perpendicular to the stripes — it crosses the pattern. That wide spread smears light across multiple stripe boundaries → contrast drops → lower MTF.
        3. Horizontal stripes (right side, labeled "higher MTF") — stripes run horizontally, black↔white alternation happens vertically. The PSF's narrow axis (vertical) is perpendicular to the stripes. That narrow spread barely bleeds into adjacent stripes → contrast preserved → higher MTF.
        4. The "lower MTF" or "higher MTF" label depends on which PSF axis is perpendicular to the stripes being measured. If the PSF were elongated vertically instead of horizontally, the labels would swap — vertical stripes would get higher MTF and horizontal stripes would get lower MTF.
    9. Diagram interpretation — sagittal and tangential targets around the image circle:
        1. At each position around the image circle, two sets of test patterns are placed.
        2. Blue (sagittal) patterns — stripes pointing toward the center (radial). These test the lens's ability to resolve detail in the radial direction.
        3. Black (tangential) patterns — stripes running tangent to the circle. These test the lens's ability to resolve detail in the tangential direction.
        4. At the center of the image, sagittal and tangential are undefined (all directions are equivalent due to rotational symmetry). The distinction only applies to off-axis points.
    10. Practical significance:
        1. A lens with equal sagittal and tangential MTF has a circular PSF — well-corrected for astigmatism at that field position.
        2. A large difference between sagittal and tangential MTF indicates astigmatism — the PSF is elongated, and the lens resolves significantly better in one orientation than the other.
        3. MTF charts typically show two curves per field position: one solid (sagittal) and one dashed (tangential). The gap between them reveals the degree of astigmatism.
10. MTF Curves for Lenses
    1. For a sensor (spatially uniform), you can plot MTF vs. spatial frequency — one curve tells the whole story. But a lens has different performance at center vs. edge. You'd need 12+ curves on a frequency plot — unreadable.
    2. Solution: Plot MTF (%) on the y-axis and image height u' (mm) — distance from optical axis — on the x-axis.
    3. Each graph has 6 curves:
        - 3 spatial frequencies: 10 lp/mm (coarse detail), 20 lp/mm, 40 lp/mm (fine detail)
        - 2 orientations each: solid lines = sagittal (radial), dashed lines = tangential (concentric)
        - Top pair is always 10 lp/mm (easiest to reproduce), bottom pair is 40 lp/mm (hardest).
    4. u' = 0 is the image center, u' = 12mm is the long edge of 24×36mm frame, u' ≈ 21mm is the corner.
    5. Wide open (f/1.4):
        - Center: ~80% MTF at 10 lp/mm, ~38% at 40 lp/mm — good contrast, medium definition.
        - Edge: curves drop — corners become softer.
        - Gap between sagittal (solid) and tangential (dashed) = astigmatism (lens focuses radial and tangential lines at different planes).
        - Strong tendency to flare in corners — tangential lines collapse at u' > 15mm, meaning contrast is lost for tangential structures at edges.
    6. Stopped down (f/5.6):
        - Center: nearly 100% at 10 lp/mm, ~80% at 40 lp/mm — excellent.
        - Curves stay high and flat until ~18mm, then drop slightly in corners.
        - Much more uniform across the field than wide open.
    7. Why stopping down raises all curves:
        - Most aberrations (spherical, coma, astigmatism) are caused by light rays passing through outer portions of the lens.
        - Stopping down blocks those outer rays with the diaphragm — only well-behaved central rays form the image.
        - Result: all MTF curves shift upward (better contrast at all frequencies and all field positions).
        - Tradeoff: less light (longer exposure needed), and eventually diffraction from small aperture limits sharpness (typically beyond f/11 on 35mm).
        - In the f/1.4 → f/5.6 range, aberration reduction far outweighs any diffraction penalty.
    8. Curves oscillating at edges (field curvature):
        - The 40 lp/mm line goes up then back down around u'=15-20mm instead of smoothly declining.
        - This happens because the lens's focal plane is curved (like a bowl), not flat like the sensor.
        - At certain distances from center, the curved focal plane intersects the flat sensor — giving a local MTF peak.
        - Then it curves away again — giving a dip.
        - 10 lp/mm doesn't oscillate because coarse detail is more tolerant of slight defocus.
    9. Prime vs. Zoom comparison (85mm, f/5.6):
        - High-quality prime: nearly flat curves across entire field — image quality is sensor-limited (lens is better than sensor).
        - Inexpensive zoom: curves drop steadily from center to edge, 40 lp/mm drops fastest — lacks "biting sharpness" at fine detail.
    10. Super-wide lens comparison (21mm, f/5.6):
        - Good lens: sagittal holds well, but tangential drops at edges — directional blur in corners.
        - Cheap lens: tangential MTF very low toward edges — corners look smeared for tangential structures.
    11. Key interpretation table:
        - Curves high and flat across field → sharp everywhere, uniform quality.
        - Curves dropping at edges → softer corners.
        - Gap between solid (S) and dashed (T) → astigmatism.
        - 40 lp/mm curve very low → lack of fine detail / micro contrast — images look soft.
        - Curves oscillating at edges → field curvature — focus plane doesn't match flat sensor.
        - Stopping down raises all curves → aberrations reduced by blocking outer rays.

11. Through-Focus MTF (MTF vs. Defocus)
    1. The third type of MTF curve — MTF plotted against defocus position (mm) rather than spatial frequency or image height.
    2. Axes:
        - Y-axis: MTF (%) at specific spatial frequencies (10, 20, 40 lp/mm).
        - X-axis: Defocus in mm — how far the sensor is from best focus.
        - Zero (yellow line) = current sensor position (best focus at f/1.4 for 20 lp/mm in center).
        - Negative (left) = closer to lens. Positive (right) = farther from lens (toward pressure plate).
    3. The sensor sits at the focal plane of the lens. Focusing adjusts the lens so the image forms exactly on the sensor surface.
        - Sensor too close → light hasn't converged yet → blurry.
        - Sensor too far → light already converged and diverging → also blurry.
        - Through-focus MTF graphs show what happens to image quality as you slide through that focal plane.
    4. Focused in center at f/1.4:
        - Three curves (10, 20, 40 lp/mm) all peak near zero — lens is correctly focused.
        - The peak for 20 lp/mm defines "best focus" (yellow line position).
        - Tolerance range for best MTF is only a few hundredths of a mm. Move sensor ±0.05mm and you lose significant sharpness.
        - Black triangles mark geometric depth of focus (for 0.03mm circle of confusion).
        - At edges of this range, 40 lp/mm MTF drops to ~20% — barely acceptable.
        - Curves are slightly asymmetric (skewed) — blur looks different in front of focus vs. behind (related to bokeh character).
        - Maxima for different frequencies can be at different positions — no single focus position is simultaneously optimal for all detail levels.
    5. Stopped down to f/4, image center (without refocusing):
        - MTF peaks increase — stopping down reduces aberrations, so maximum achievable contrast improves.
        - Curves shift to the RIGHT — best focus has moved away from sensor position. This is focus shift.
        - The sensor (yellow line at zero) is no longer at the peak — not getting full benefit of stopping down.
        - Focus shift happens because spherical aberration causes rays at different distances from optical axis to focus at different points.
        - At f/1.4 all rays contribute. At f/4 only central rays pass — these converge at a slightly different point (~0.05mm shift).
        - Black dots (right y-axis) show corresponding object distance: focused at 3m at f/1.4, best focus moves to ~3.25m at f/4 without touching focus ring.
        - Geometric depth-of-focus (black triangles) gives right length but wrong position — the focused zone has shifted.
    6. Off-center measurements (f/4, 40 lp/mm, sagittal + tangential):
        - At 10mm from center: both curves shift less than at center, slightly to the left. Best focus position differs from center — this is field curvature.
        - At 15mm: sagittal and tangential peaks at different defocus positions — this is astigmatism (lens focuses radial and tangential lines at different depths).
        - At 18mm (edge): sagittal peak returns to zero (back to sensor position), tangential shifted right. Field curvature is not a simple bowl — it has reversal points and undulates.
        - Key insight: best focus position changes across the image. No single flat sensor can be simultaneously in perfect focus everywhere.
    7. Same lens, two focus positions (0 and 0.05mm shift):
        - Left graph (axis = 0): weaker in center, more uniform across field.
        - Right graph (axis = 0.05mm): excellent center, but deep dip around 15mm.
        - It's the same lens — only 0.05mm of focus difference.
        - 0.05mm is within normal mechanical camera tolerances (AF calibration, mirror alignment).
        - Two identical cameras with same lens can produce visibly different sharpness patterns due to sub-0.1mm alignment differences.
    8. Key inferences:
        - A single MTF vs. image-height chart can be misleading — it represents one specific focus position.
        - Focus shift is real — stopping down moves best focus. AF calibrated at f/1.4 may not be optimal at f/4.
        - Field curvature is complex — it undulates, with different behavior for sagittal vs. tangential.
        - 0.05mm matters — within normal manufacturing tolerances, yet causes drastically different MTF charts.
        - You cannot judge a lens from a single MTF chart without knowing the exact focus position it was measured at.
