<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="description-section"
  >
    <div class="description-wrapper">
      <h2>Overview</h2>
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
      <!-- Introductory Section -->
      <div
        v-if="overviewContent.introductorySection"
        class="introductory-section"
      >
        <p class="introductory-paragraph">
          {{ overviewContent.introductorySection.paragraph }}
        </p>
      </div>
      <!-- Context Section -->
      <div v-if="overviewContent.contextSection" class="context-section">
        <h3 class="context-heading">
          {{ overviewContent.contextSection.heading }}
        </h3>
        <p class="context-paragraph">
          {{ overviewContent.contextSection.paragraph }}
        </p>
      </div>
      <!-- Problem, Goals -->
      <div class="description-container">
        <div>
          <h3>The problem:</h3>
          <p>
            {{ overviewContent.problem }}
          </p>
        </div>

        <div>
          <h3>The goal:</h3>
          <p>
            {{ overviewContent.goal }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "OverviewSection",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  props: {
    overviewContent: {
      type: Object,
      required: true,
      default: () => ({
        introductorySection: null,
        contextSection: null,
        problem: "Default problem statement.",
        goal: "Default goal statement.",
      }),
      validator: (value) => {
        const hasRequired =
          Object.prototype.hasOwnProperty.call(value, "problem") &&
          typeof value.problem === "string" &&
          Object.prototype.hasOwnProperty.call(value, "goal") &&
          typeof value.goal === "string";

        if (value.introductorySection) {
          if (!(typeof value.introductorySection.paragraph === "string")) {
            console.error("Invalid type for introductorySection.paragraph");
            return false;
          }

          if (
            Object.prototype.hasOwnProperty.call(
              value.introductorySection,
              "heading"
            ) &&
            !(typeof value.introductorySection.heading === "string")
          ) {
            console.error("Invalid type for introductorySection.heading");
            return false;
          }
        }

        if (value.contextSection) {
          return (
            hasRequired &&
            Object.prototype.hasOwnProperty.call(
              value.contextSection,
              "heading"
            ) &&
            typeof value.contextSection.heading === "string" &&
            Object.prototype.hasOwnProperty.call(
              value.contextSection,
              "paragraph"
            ) &&
            typeof value.contextSection.paragraph === "string"
          );
        }
        return hasRequired;
      },
    },
  },
};
</script>

<style scoped>
/*to trigger scroll animation on scroll*/
.description-section {
  opacity: 0;
  padding: 20px;
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

.description-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.description-container,
.introductory-section,
.context-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  max-width: 900px;
  padding: 0 20px;
  /* gap: 2rem;
	margin: 2rem auto; */
  font-family: "Nunito Sans", sans-serif;
  line-height: 1.6;
  font-size: 1.1rem;
}
.description-container p {
  padding-right: 0px;
}
h2 {
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
@media (max-width: 768px) {
  .description-container p {
    padding-left: 0px;
    padding-right: 0px;
    font-size: 1rem;
  }
}
</style>
