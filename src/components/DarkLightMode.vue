<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="dark-light-mode-container"
    style="font-family: 'Nunito Sans', sans-serif"
  >
    <h2 class="section-title">
      {{ darkLightContent.sectionTitle || "Dark & Light Mode" }}
    </h2>

    <div class="decoration">
      <!-- SVG Blob -->
      <svg
        class="blob-svg"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        fill="none"
      >
        <circle cx="40" cy="40" r="40" fill="#FFD800B3" />
      </svg>
      <div class="line-container">
        <div class="growing-line"></div>
      </div>
    </div>

    <p v-if="darkLightContent.paragraph" class="intro-paragraph">
      {{ darkLightContent.paragraph }}
    </p>

    <div class="images-grid">
      <div
        v-for="(image, index) in darkLightContent.images"
        :key="index"
        class="image-item"
      >
        <div class="image-wrapper">
          <img :src="image.imageUrl" :alt="image.imageAlt" class="mode-image" />
          <p v-if="image.imageCaption" class="image-caption">
            {{ image.imageCaption }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "DarkLightMode",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  props: {
    darkLightContent: {
      type: Object,
      required: true,
      default: () => ({
        sectionTitle: "Dark & Light Mode",
        paragraph: "",
        images: [],
      }),
    },
  },
};
</script>

<style scoped>
.dark-light-mode-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  color: #1e2328;
  text-align: center;
  /*for animation on scroll*/
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  will-change: opacity, transform;
}
.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.animate-out {
  opacity: 0;
  transform: translateY(40px);
}

.section-title {
  font-size: 1.5em;
  font-weight: 700;
  font-family: "Philosopher", sans-serif;
  color: #1e2328;
  text-align: center;
  margin-bottom: 20px;
}
.decoration {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
}
/*Line animation*/
.line-container {
  flex-grow: 1;
  height: 1px;
  overflow: hidden;
  position: relative;
}

.growing-line {
  width: 0;
  height: 100%;
  background-color: rgba(255, 216, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  animation: growLine 1s linear forwards;
  animation-delay: 2s;
}

@keyframes growLine {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

/*Blob animation*/
.blob-svg {
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  z-index: 1;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
  animation-delay: 2.1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.intro-paragraph {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #1e2328;
  text-align: center;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.images-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

.image-item {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.mode-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.image-caption {
  font-size: 0.9rem;
  color: #1e2328;
  text-align: center;
  padding: 10px;
}

/* Desktop layout for images */
@media (min-width: 769px) {
  .images-grid {
    flex-direction: row;
    gap: 40px;
  }

  .image-item {
    flex: 1;
    max-width: calc(50% - 20px);
  }
}

/* Responsive adjustments for overall container */
@media (max-width: 768px) {
  .dark-light-mode-container {
    padding: 20px 30px;
  }

  .intro-paragraph {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .images-grid {
    gap: 20px;
  }

  .image-item {
    border-radius: 8px;
  }

  .image-caption {
    font-size: 0.85rem;
    padding: 8px;
  }
}
</style>
