<template>
  <h1 class="glitch" data-glitch="whatamesh">whatamesh</h1>
  <div class="wrapper">
    <div class="preview">
      <div class="gradient-wrapper">
        <canvas
          ref="gc"
          id="gradient-canvas"
          data-transition-in
          :style="colors"
        />
        <!--
          Remove data-js-darken-top to keep the same brightness in the upper part of the canvas
        -->
      </div>
      <div class="toolbar">
        <p>
          <input @change="colorChange" type="color" v-model="color1" />
          {{ color1 }}
        </p>
        <p>
          <input @change="colorChange" type="color" v-model="color2" />
          {{ color2 }}
        </p>
        <p>
          <input @change="colorChange" type="color" v-model="color3" />
          {{ color3 }}
        </p>
        <p>
          <input @change="colorChange" type="color" v-model="color4" />
          {{ color4 }}
        </p>

        <button @click="togglePlayPause">play / pause</button>
        <button @click="toggleDarkenTop">toggle darken top</button>
        <button @click="refetch">randomize</button>
      </div>
    </div>
    <div class="final-code">
      <h2>Installation</h2>
      <p style="text-align: left">
        1. Create a <code>Gradient.js</code> file somewhere in your project and
        add
        <a
          target="_blank"
          href="https://gist.github.com/jordienr/64bcf75f8b08641f205bd6a1a0d4ce1d"
        >
          this
        </a>
        inside
      </p>
      <p style="text-align: left">2. Add the following code to your project:</p>
      <h2><i>HTML</i></h2>
      <pre class="code">
        {{ htmlCode }}
      </pre>
      <h2><i>CSS</i></h2>
      <pre class="code">
        {{ cssCode }}
      </pre>
      <h2><i>JS</i></h2>
      <pre class="code">
import { Gradient } from './Gradient.js'

// Create your instance
const gradient = new Gradient()

// Call `initGradient` with the selector to your canvas
gradient.initGradient('#gradient-canvas')
        </pre
      >
    </div>
  </div>
  <footer>
    <section>
      <h2>Check my other apps!</h2>
      <p><a href="http://weekops.com">WeekOps.com</a> a weekly planner</p>
      <p>
        <a href="http://toolhunt.dev">Toolhunt.dev</a> devtools to help you ship
        faster
      </p>
    </section>

    <section>
      <p>
        gradient code by
        <a href="https://stripe.com/" target="_blank">stripe</a> and
        <a href="https://kevinhufnagl.com" target="_blank">kevinhufnagl</a>
      </p>
      <p>
        tool by
        <a target="_blank" href="https://twitter.com/jordienr">@jordienr</a>
        & <a target="_blank" href="https://github.com/ndom91">@ndom91</a>
      </p>
    </section>
  </footer>
</template>

<script>
import { Gradient } from "./script";
import color from "color-schemes-generator";

export default {
  data() {
    return {
      play: true,
      gradient: new Gradient(),
      color1: "#c3e4ff",
      color2: "#6ec3f4",
      color3: "#eae2ff",
      color4: "#b9beff",
      darkenTop: false,
    };
  },
  methods: {
    toggleDarkenTop() {
      const el = document.getElementById("gradient-canvas");
      if (this.darkenTop) {
        el?.removeAttribute("data-js-darken-top");
        this.darkenTop = false;
      } else {
        el?.setAttribute("data-js-darken-top", "");
        this.darkenTop = true;
      }
      this.refreshGradient();
    },
    colorChange() {
      this.refreshGradient();
    },
    refetch() {
      this.setNewPalette();
      this.refreshGradient();
    },
    refreshGradient() {
      this.gradient.initGradient("#gradient-canvas");
    },
    togglePlayPause() {
      if (this.play) {
        this.gradient.pause();
      } else {
        this.gradient.play();
      }
      this.play = !this.play;
    },
    rgbToHex(red, green, blue) {
      const rgb = (red << 16) | (green << 8) | (blue << 0);
      return "#" + (0x1000000 + rgb).toString(16).slice(1);
    },
    logPalette(colors) {
      const d = colors.map((color, i) => {
        return `${color} ${i * 25}%, ${color} ${(i + 1) * 25}%`;
      });
      const a = "                                        ";
      const b =
        "); color: white; font-size:10px; text-shadow: #000 0px 0px 30px, rgba(0,0,0,0.5) 1px 1px; padding: 15px 0";
      console.log(
        "%c".concat(a),
        "background: -webkit-linear-gradient(left, ".concat(d.join(","), b)
      );
      console.log(colors.slice(0, 4).join("   "));
      console.log(a);
    },
    setNewPalette() {
      const colors = color.generate();
      this.logPalette(colors);
      this.color1 = colors[0];
      this.color2 = colors[1];
      this.color4 = colors[2];
      this.color3 = colors[3];
    },
  },
  computed: {
    cssCode() {
      return `
#gradient-canvas {
  width:100%;
  height:100%;
  --gradient-color-1: ${this.color1}; 
  --gradient-color-2: ${this.color2}; 
  --gradient-color-3: ${this.color3};  
  --gradient-color-4: ${this.color4};
}`;
    },
    htmlCode() {
      return `
<canvas id="gradient-canvas" ${
        this.darkenTop ? "data-js-darken-top " : ""
      }data-transition-in />`;
    },
    colors() {
      return {
        "--gradient-color-1": this.color1,
        "--gradient-color-2": this.color2,
        "--gradient-color-3": this.color3,
        "--gradient-color-4": this.color4,
      };
    },
  },
  mounted() {
    this.gradient.initGradient("#gradient-canvas");
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");

* {
  font-family: JetBrains Mono;
}
pre.code {
  text-align: start;
  max-width: 800px;
  max-height: 400px;
  overflow: auto;
  margin: auto;
  background: rgb(27, 27, 27);
  padding: 2rem;
}
.get-code-btn {
  background: white;
  color: black;
}
footer {
  margin: 4rem 0 2rem 0;
}
button {
  background: none;
  color: white;
  border: 1px solid white;
  height: 37px;
  padding: 0 1rem;
  margin: 0 0.33rem;
  &:hover {
    box-shadow: 3px 3px 0px 1px rgb(223, 135, 241);
  }
}
a {
  color: lightblue;
}
h1 {
  margin: 0;
  font-style: italic;
  padding-top: 1.5rem;
  font-size: 21px;
  font-weight: 200;
  letter-spacing: 4px;
}
.wrapper {
  display: flex;
  flex: 1 1;
  width: 100%;
  justify-content: center;
}
.preview {
  margin: 0 4rem;
}
.final-code {
  margin: 0 4rem;
}
.gradient-wrapper {
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  max-width: 900px;
  border-radius: 1rem;
  height: 500px;
}
#gradient-canvas {
  width: 100%;
  height: 100%;
}

input[type="color"] {
  padding: 0;
  border: none;
  background: none;
  height: 45px;
  margin: 0;
  border: none;
}
.toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 0 auto;
}
.toolbar p {
  display: flex;
  margin: 0;
  font-size: 1.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.toolbar button {
  margin-top: 20px;
  width: 100%;
}
.toolbar button:hover {
  cursor: pointer;
}

@media screen and (max-width: 1024px) {
  .wrapper {
    flex-direction: column;
  }
}
</style>
