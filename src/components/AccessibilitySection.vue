<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="accessibility-section-container"
    style="font-family: 'Inter', sans-serif"
  >
    <h2 class="section-title">
      {{ accessibilityContent.sectionTitle || "Accessibility" }}
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

    <p v-if="accessibilityContent.introParagraph" class="intro-paragraph">
      {{ accessibilityContent.introParagraph }}
    </p>

    <!-- Variation for Budgeting and Vacation app  -->
    <div
      v-if="accessibilityContent.type === 'three-columns-paragraphs'"
      class="columns-grid three-columns"
    >
      <div
        v-for="(col, index) in accessibilityContent.columns"
        :key="index"
        class="column-item"
      >
        <div class="svg-icon-wrapper" v-html="col.svg"></div>
        <p v-if="col.paragraph1" class="column-paragraph">
          {{ col.paragraph1 }}
        </p>
        <p v-if="col.paragraph2" class="column-paragraph">
          {{ col.paragraph2 }}
        </p>
      </div>
    </div>

    <!-- Variation for Rabbitry -->
    <div
      v-else-if="accessibilityContent.type === 'four-columns-mixed'"
      class="columns-grid four-columns"
    >
      <!-- Column 1: SVG, P, Button (Modal) -->
      <div class="column-item">
        <div
          class="svg-icon-wrapper"
          v-html="accessibilityContent.columns[0].svg"
        ></div>
        <p class="column-paragraph">
          {{ accessibilityContent.columns[0].paragraph }}
        </p>
        <button
          @click="
            openModal(
              accessibilityContent.columns[0].modalImageUrl,
              accessibilityContent.columns[0].modalImageAlt
            )
          "
          class="action-button"
          aria-label="View Accessible Design Example"
        >
          Color Contrast
        </button>
      </div>

      <!-- Column 2: SVG, P, Small Image -->
      <div class="column-item">
        <div
          class="svg-icon-wrapper"
          v-html="accessibilityContent.columns[1].svg"
        ></div>
        <p class="column-paragraph">
          {{ accessibilityContent.columns[1].paragraph }}
        </p>
        <img
          v-if="accessibilityContent.columns[1].imageUrl"
          :src="accessibilityContent.columns[1].imageUrl"
          :alt="accessibilityContent.columns[1].imageAlt"
          class="small-column-image"
        />
      </div>

      <!-- Column 3: SVG, Two P -->
      <div class="column-item">
        <div
          class="svg-icon-wrapper"
          v-html="accessibilityContent.columns[2].svg"
        ></div>
        <p class="column-paragraph">
          {{ accessibilityContent.columns[2].paragraph1 }}
        </p>
        <p class="column-paragraph">
          {{ accessibilityContent.columns[2].paragraph2 }}
        </p>
      </div>

      <!-- Column 4: SVG, One P -->
      <div class="column-item">
        <div
          class="svg-icon-wrapper"
          v-html="accessibilityContent.columns[3].svg"
        ></div>
        <p class="column-paragraph">
          {{ accessibilityContent.columns[3].paragraph }}
        </p>
      </div>
    </div>

    <!-- Image Modal Component (for Rabbitry) -->
    <ImageModal
      :isVisible="isModalOpen"
      :imageUrl="currentModalImageUrl"
      :altText="currentModalImageAlt"
      @close="closeModal"
    />
  </section>
</template>

<script>
import ImageModal from "./ImageModal.vue";
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "AccessibilitySection",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  components: {
    ImageModal,
  },
  props: {
    accessibilityContent: {
      type: Object,
      required: true,
      default: () => ({
        sectionTitle: "Accessibility",
        introParagraph: "",
        type: "three-columns-paragraphs",
        columns: [],
      }),
    },
  },
  data() {
    return {
      isModalOpen: false,
      currentModalImageUrl: "",
      currentModalImageAlt: "",
    };
  },
  methods: {
    openModal(url, alt) {
      this.currentModalImageUrl = url;
      this.currentModalImageAlt = alt;
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      this.currentModalImageUrl = "";
      this.currentModalImageAlt = "";
    },
  },
};
</script>

<style scoped>
.accessibility-section-container {
  max-width: 900px;
  margin: 0px auto;
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

.columns-grid {
  display: grid;
  gap: 10px;
  padding: 20px 0;
}

.three-columns {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.four-columns {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.column-item {
  background-color: #f8faff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.column-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.svg-icon-wrapper {
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  color: #2b6cb0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.svg-icon-wrapper svg {
  width: 100%;
  height: 100%;
}

.column-paragraph {
  font-size: 1rem;
  line-height: 1.5;
  color: #1e2328;
  margin-bottom: 15px;
}

.column-paragraph:last-of-type {
  margin-bottom: 0;
}

.small-column-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 15px;
}

/* Button styles for Variation 3 */
.action-button {
  border: none;
  padding: 0.5rem 1rem;
  color: #1e2328;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  font-weight: 500;
  font-size: 1rem;
  font-family: "Nunito Sans", sans-serif;
  transition: background-color 0.3s ease;
  background: linear-gradient(
    42deg,
    rgba(255, 255, 153, 1) 0%,
    rgba(255, 216, 0, 1) 35%,
    rgba(102, 204, 255, 1) 80%,
    rgba(41, 86, 109, 1) 100%
  );
  background-size: 300% 300%;
  animation: gradientFlow 10s ease infinite;
  transform: scale(1.05);
  margin-top: 20px;
}

.action-button:hover {
  background-position: 100% 50%;
  transform: translateY(-5px) scale(1.08);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.action-button:focus {
  box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.5);
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 0%;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .accessibility-section-container {
    padding: 20px 30px;
  }

  .intro-paragraph {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .columns-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .column-item {
    padding: 20px;
  }

  .svg-icon-wrapper {
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
  }

  .column-paragraph {
    font-size: 0.95rem;
    margin-bottom: 10px;
  }

  .action-button {
    padding: 8px 15px;
    font-size: 0.9rem;
    margin-top: 15px;
  }
  .small-column-image {
    max-width: 40%;
  }
}
</style>