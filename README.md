# Whatamesh

Easily create mesh gradients like Stripe.

This project wouldn't be possible without stripe and https://kevinhufnagl.com/

## Live Demo 

[https://whatamesh.vercel.app/](https://whatamesh.vercel.app/)

## Getting started

### Creating your first gradient

```html
<canvas id="gradient-canvas"></canvas>
```

```js
import { Gradient } from "whatamesh";

const gradient = new Gradient();
gradient.initGradient("#gradient-canvas");
```

```css
#gradient-canvas {
  width: 100%;
  height: 100%;
  --gradient-color-1: #449ce4;
  --gradient-color-2: #2f8bc1;
  --gradient-color-3: #ccbeee;
  --gradient-color-4: #4c57f6;
}
```
