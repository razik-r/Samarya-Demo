Design a luxury hospitality hero section with a full-screen cinematic background video while ensuring text remains perfectly readable at all times regardless of changing video frames, lighting, or movement.

Background video treatment:

* Use a full-screen immersive video with soft natural movement
* Apply a layered readability system instead of simply darkening the entire video
* Add a subtle dark gradient overlay:

```css
linear-gradient(
180deg,
rgba(0,0,0,.20),
rgba(0,0,0,.60)
)
```

* Add a localized radial gradient behind the hero content only:

```css
radial-gradient(
circle,
rgba(0,0,0,.45),
transparent 70%
)
```

* Apply soft blur to this radial layer
* Add a subtle film grain texture (3–5% opacity)
* Reduce video contrast slightly
* Slightly reduce saturation
* Keep movement calm and cinematic

Video effects:

* brightness: 0.7–0.8
* contrast: 0.85–0.9
* saturate: 0.9
* scale slowly from 1 → 1.05 over 15–20 seconds
* optional blur: 1–2px

Layout:

* Avoid placing text over bright sky regions, sunlight, or moving subjects
* Create a safe content zone where the background remains visually stable
* Maintain generous whitespace

Text treatment:

* Use white or warm-white text:
  #F5F2EC

* Add subtle text shadow:

```css
0 2px 10px rgba(0,0,0,.5)
```

* Avoid strong glowing text effects
* Ensure heading remains highly legible across every frame

Hero content card:

* Optional ultra-subtle glass effect:

```css
background: rgba(0,0,0,.15)
backdrop-filter: blur(18px)
border:1px solid rgba(255,255,255,.1)
border-radius:24px
```

Do not make it look like a heavy floating card.

Design goals:

* Premium through restraint
* Cinematic luxury
* Text should feel naturally integrated with the video
* Maintain emotional atmosphere without sacrificing readability
* Similar quality to Aman, Six Senses, Apple product pages, and modern Awwwards hospitality sites

Target feeling:

"Immersive cinematic background with text that feels effortlessly readable rather than placed on top of a video."
