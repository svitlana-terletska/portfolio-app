<template>
  <div class="intro-panel bg-intro">
    <!-- Video -->
    <div class="video-wrapper">
      <video
        ref="introVideo"
        autoplay
        muted
        playsinline
        @click="togglePlayback"
        class="intro-video"
        @canplay="handleCanPlay"
        @play="updatePlayButton"
        @pause="updatePlayButton"
        @ended="handleVideoEnded"
      >
        <source :src="`${videoBaseUrl}UXDesignerAtWork.mp4`" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        @click.stop="togglePlayback"
        class="play-btn"
        aria-label="Toggle video"
      >
        {{ isPaused ? "▶" : "⏸" }}
      </button>
    </div>

    <!-- Text — animations only fire once videoEnded prop is true -->
    <div class="intro-text do-animate">
      <p class="tagline-top">
        "Designing thoughtful solutions with strategy and soul."
      </p>

      <h1 class="intro-heading">
        <span
          v-for="(char, index) in headingChars"
          :key="index"
          class="char"
          :style="{ animationDelay: `${1.5 + 0.15 + index * 0.05}s` }"
        >
          {{ char === " " ? "\u00A0" : char }}
        </span>
      </h1>

      <h2 class="myname">I'm Svitlana Terletska,<br />UX Designer</h2>

      <p class="tagline-bottom">Explore my thought process through design.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IntroSection",
  props: {
    videoEnded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["videoEnded"],
  computed: {
    headingChars() {
      return "Welcome".split("");
    },
    videoBaseUrl() {
      return process.env.BASE_URL || "/";
    },
  },
  data() {
    return {
      isPaused: false,
    };
  },
  methods: {
    togglePlayback() {
      const video = this.$refs.introVideo;
      if (!video) return;
      video.paused ? video.play() : video.pause();
      this.updatePlayButton();
    },
    updatePlayButton() {
      const video = this.$refs.introVideo;
      if (!video) return;
      this.isPaused = video.paused;
    },
    handleCanPlay() {
      const video = this.$refs.introVideo;
      video.classList.add("fade-in");
      this.updatePlayButton();
    },
    handleVideoEnded() {
      this.isPaused = true;
      this.$emit("videoEnded");
    },
  },
};
</script>

<style scoped>
.intro-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  position: relative;
}

.bg-intro {
  background-color: #1e2328;
}

.intro-panel::after {
  content: "";
  position: absolute;
  top: 10%;
  right: 0;
  height: 80%;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.12) 30%,
    rgba(255, 255, 255, 0.12) 70%,
    transparent
  );
}

/* Video */
.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.intro-video {
  width: 100%;
  border-radius: 0.75rem;
  opacity: 0;
  transition: opacity 1s ease-in;
  display: block;
}

.fade-in {
  opacity: 1;
}

.play-btn {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: scale(1.1);
}

/* ── Text container */
.intro-text {
  text-align: center;
  color: #fff;
  font-family: "Nunito Sans", sans-serif;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 380px;
  position: relative;
}

.intro-text::before {
  content: "";
  position: absolute;
  inset: 0;

  opacity: 0.04;
  z-index: 0;
  pointer-events: none;
}

.intro-text > * {
  position: relative;
  z-index: 1;
}

.tagline-top {
  opacity: 0;
  font-family: "Philosopher", serif;
  font-style: italic;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.do-animate .tagline-top {
  animation: fadeIn 1.5s ease-out forwards;
  animation-delay: 3.5s;
}

/* "Welcome" heading */
.intro-heading {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  justify-content: center;
}

.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  /* animationDelay applied via :style, starting at 0.15s */
}

.do-animate .char {
  animation: slideUp 1.5s ease-out forwards;
}

/* Name */
.myname {
  font-family: "Philosopher", serif;
  font-size: 1.1rem;
  opacity: 0;
  transform: translateY(20px);
  line-height: 1.6;
  margin: 0.5rem 0;
}

.do-animate .myname {
  animation: slideFadeUp 1.5s ease-out forwards;
  animation-delay: 4s;
}

/* Tagline */
.tagline-bottom {
  font-size: 0.9rem;
  opacity: 0;
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.75);
}

.do-animate .tagline-bottom {
  animation: fadeIn 1.5s ease-out forwards;
  animation-delay: 4.25s;
}

/* ── Keyframes ── */
@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@media (max-width: 900px) {
  .intro-panel {
    height: auto;
    padding: 2.5rem 1.5rem;
    min-height: 60vh;
  }

  .intro-panel::after {
    display: none;
  }

  .video-wrapper {
    max-width: 90vw;
  }
}
</style>