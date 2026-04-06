<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="responsive-design-container"
    style="font-family: 'Nunito Sans', sans-serif"
  >
    <h2 class="section-title">
      {{ responsiveContent.sectionTitle || "Responsive Design" }}
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

    <div v-if="responsiveContent.imageUrl" class="responsive-image-block">
      <div class="image-wrapper">
        <img
          :src="responsiveContent.imageUrl"
          :alt="responsiveContent.imageAlt || 'Responsive design showcase'"
          class="responsive-showcase-image"
        />
        <p v-if="responsiveContent.imageCaption" class="image-caption">
          {{ responsiveContent.imageCaption }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "ResponsiveDesignSection",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  props: {
    responsiveContent: {
      type: Object,
      required: true,
      default: () => ({
        sectionTitle: "Responsive Design",
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      }),
    },
  },
};
</script>

<style scoped>
.responsive-design-container {
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
  background-color: rgba(255, 151, 184, 0.6);
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

.responsive-image-block {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
}

.responsive-showcase-image {
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .responsive-design-container {
    padding: 20px 30px;
  }

  .responsive-image-block {
    border-radius: 8px;
  }

  .image-caption {
    font-size: 0.85rem;
    padding: 8px;
  }
}
</style>
