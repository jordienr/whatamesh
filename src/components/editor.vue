<template>
  <h1>whatamesh</h1>

  <div>
    <div class="gradient-wrapper">
      <canvas ref="gc" id="gradient-canvas" data-transition-in :style="colors">
        <!--
        Remove data-js-darken-top to keep the same brightness in the upper part of the canvas
      -->
      </canvas>
    </div>
    <div class="tool-bar">
      <input @change="colorChange" type="color" v-model="color1" />
      <input @change="colorChange" type="color" v-model="color2" />
      <input @change="colorChange" type="color" v-model="color3" />
      <input @change="colorChange" type="color" v-model="color4" />

      <!-- <button @click="togglePlayPause">⏯</button> -->
      <!-- <button @click="toggleDarkenTop">toggle darken top</button> -->
      <button @click="refreshGradient">refresh</button>
      <button class="get-code-btn" @click="showCode = true">get code</button>
    </div>
    <footer>
      <p>
        tool by
        <a target="_blank" href="https://twitter.com/jordienr">@jordienr</a>
      </p>
      <p>
        code by <a href="https://stripe.com/" target="_blank">stripe</a> and
        <a href="https://kevinhufnagl.com" target="_blank">kevinhufnagl</a>
      </p>
    </footer>
    <div class="final-code" v-if="showCode">
      <hr />
      <h2>Installation</h2>
      <p>
        1. Create a Gradient.js file somewhere in your project and add
        <a
          target="_blank"
          href="https://gist.github.com/jordienr/64bcf75f8b08641f205bd6a1a0d4ce1d"
          >this</a
        >
        inside
      </p>
      <pre class="code"></pre>
      <h2><i>CSS</i></h2>
      <pre class="code">
        {{ cssCode }}
      </pre>
      <h2><i>HTML</i></h2>
      <pre class="code">
        {{ htmlCode }}
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
</template>

<script>
import { Gradient } from "./script";

export default {
  data() {
    return {
      showCode: false,
      play: true,
      gradient: new Gradient(),
      color1: "#c3e4ff",
      color2: "#6ec3f4",
      color3: "#eae2ff",
      color4: "#b9beff",
    };
  },
  methods: {
    toggleDarkenTop() {
      const el = document.getElementById("gradient-canvas");
      console.log(this.darkenTop);
      console.log(el);
      if (this.darkenTop) {
        el?.removeAttribute("data-js-darken-top");
      } else {
        el?.setAttribute("data-js-darken-top", "");
      }
      this.refreshGradient();
    },
    colorChange() {
      this.refreshGradient();
    },
    refreshGradient() {
      this.gradient = new Gradient();
      this.gradient.initGradient("#gradient-canvas");
    },
    togglePlayPause() {
      console.log("tpp");
      if (this.play) {
        this.gradient.pause();
      } else {
        this.gradient.play();
      }
      this.play = !this.play;
    },
  },
  computed: {
    darkenTop() {
      return document
        .getElementById("gradient-canvas")
        .hasAttribute("data-js-darken-top");
    },
    cssCode() {
      return `
      #gradient-canvas {
        width:100%;
        height:100%;
        --gradient-color-1: ${this.color1}; 
        --gradient-color-2: ${this.color2}; 
        --gradient-color-3: ${this.color3};  
        --gradient-color-4: ${this.color4};
      }
    `;
    },
    htmlCode() {
      return `
        <canvas id="gradient-canvas" ${
          this.darkenTop ? "data-js-darken-top " : ""
        }data-transition-in>
        </canvas>
      `;
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
}
.get-code-btn {
  background: white;
  color: black;
}
.final-code {
  padding-bottom: 200px;
}
footer {
  margin-top: 3rem;
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
  font-weight: 600;
  letter-spacing: 1.5px;
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
  height: 37px;
  margin: 0;
  border: none;
}
.tool-bar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
