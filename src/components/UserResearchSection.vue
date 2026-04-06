<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="research-section-container"
  >
    <!-- Section 1: SVG Graphic and Introductory Text -->
    <div class="research-intro-section">
      <h2 class="section-title">
        {{
          researchContent.introTitle ||
          "Understanding Our Users: Research Insights"
        }}
      </h2>

      <div class="decoration">
        <!-- SVG Blob -->
        <svg
          class="blob-svg"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="none"
        >
          <circle cx="40" cy="40" r="40" fill="#FFD800B3" />
          <rect x="20" y="21" width="40" height="40" rx="3" fill="white" />
          <rect x="29" y="35" width="5" height="15" rx="1" fill="#ff97b8" />
          <rect x="37" y="41" width="5" height="9" rx="1" fill="#ff97b8" />
          <rect x="45" y="30" width="5" height="20" rx="1" fill="#ff97b8" />
        </svg>
        <div class="line-container">
          <div class="growing-line"></div>
        </div>
      </div>

      <p class="intro-paragraph">
        {{ researchContent.introParagraph }}
      </p>

      <!--Bulleted list with h3 heading below the introParagraph -->
      <div
        v-if="researchContent.introBulletedList"
        class="intro-bulleted-list-block"
      >
        <h3 class="intro-list-heading">
          {{ researchContent.introBulletedList.heading }}
        </h3>
        <ul class="intro-bulleted-list">
          <li
            v-for="(item, index) in researchContent.introBulletedList.items"
            :key="'intro-bullet-' + index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Section 2: User Pain Points (Column Structure) -->
    <div class="pain-points-section">
      <h2 class="section-title">
        {{ researchContent.painPointsTitle || "User Pain Points" }}
      </h2>
      <div class="pain-points-grid">
        <div
          v-for="(point, index) in researchContent.painPoints"
          :key="index"
          class="pain-point-card"
        >
          <div class="pain-point-number-circle">
            {{ point.number }}
          </div>
          <h3 class="pain-point-headline">{{ point.headline }}</h3>
          <p class="pain-point-description">{{ point.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "UserResearchSection",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  props: {
    researchContent: {
      type: Object,
      required: true,
      default: () => ({
        introTitle: "Understanding Our Users: Research Insights",
        introParagraph: "Default introductory paragraph about user research.",
        introBulletedList: null,
        painPointsTitle: "User Pain Points",
        painPoints: [],
      }),
      validator: (value) => {
        // Basic validation for required properties
        let isValid =
          Object.prototype.hasOwnProperty.call(value, "introTitle") &&
          typeof value.introTitle === "string" &&
          Object.prototype.hasOwnProperty.call(value, "introParagraph") &&
          typeof value.introParagraph === "string" &&
          Object.prototype.hasOwnProperty.call(value, "painPointsTitle") &&
          typeof value.painPointsTitle === "string" &&
          Object.prototype.hasOwnProperty.call(value, "painPoints") &&
          Array.isArray(value.painPoints);

        // Validate introBulletedList if present
        if (value.introBulletedList) {
          isValid =
            isValid &&
            Object.prototype.hasOwnProperty.call(
              value.introBulletedList,
              "heading"
            ) &&
            typeof value.introBulletedList.heading === "string" &&
            Object.prototype.hasOwnProperty.call(
              value.introBulletedList,
              "items"
            ) &&
            Array.isArray(value.introBulletedList.items);
        }
        return isValid;
      },
    },
  },
};
</script>

<style scoped>
/* Main container for the entire research section */
.research-section-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: radial-gradient(
      at 99.6228448275862% 50.208333333333336%,
      #fff297 0px,
      transparent 30%
    ),
    radial-gradient(at 1% 100%, #b6cdd4 0px, transparent 30%), #f7f8f9;
  border-radius: 10px;
  color: #1e2328;
  /*on scroll animation*/
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

/* General section title styling */
.section-title {
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

/* --- Section 1 Styles --- */
.research-intro-section {
  margin-bottom: 60px;
  text-align: center;
}

.svg-graphic-wrapper {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro-paragraph {
  font-size: 1.1rem;
  font-family: "Nunito Sans", sans-serif;
  line-height: 1.6;
  color: #1e2328;
  max-width: 700px;
  margin: 0 auto;
}

/*Styles for the intro bulleted list block */
.intro-bulleted-list-block {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  padding: 20px;
}

.intro-list-heading {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e2328;
  text-align: center;
  font-family: "Philosopher", sans-serif;
}

.intro-bulleted-list {
  list-style: disc;
  padding-left: 50px;
  font-size: 1.1rem;
  line-height: 1.6;
  font-family: "Nunito Sans", sans-serif;
  color: #1e2328;
  margin: 0;
}

.intro-bulleted-list li {
  margin-bottom: 8px;
}

.intro-bulleted-list li:last-child {
  margin-bottom: 0;
}

/* --- Section 2 Styles --- */
.pain-points-section {
  padding-top: 20px;
  font-family: "Nunito Sans", sans-serif;
}

.pain-points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 10px 0;
}

.pain-point-card {
  border: 1px solid #ebf8ff;
  border-radius: 8px;
  padding: 10px 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.63);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pain-point-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.pain-point-number-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #febf00;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 auto 20px auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.pain-point-headline {
  font-weight: 600;
  color: #1e2328;
  margin-bottom: 15px;
}

.pain-point-description {
  font-size: 1rem;
  line-height: 1.5;
  color: #1e2328;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .research-section-container {
    margin: 20px;
    padding: 15px;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  .intro-paragraph {
    font-size: 1rem;
  }

  .pain-points-grid {
    grid-template-columns: 1fr;
  }

  .pain-point-card {
    padding: 20px;
  }

  .pain-point-number-circle {
    width: 45px;
    height: 45px;
    font-size: 1.6rem;
    margin-bottom: 15px;
  }

  .pain-point-headline {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  .intro-bulleted-list-block {
    margin: 20px auto;
    padding: 15px;
  }

  .intro-list-heading {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .intro-bulleted-list {
    font-size: 0.95rem;
    padding-left: 20px;
  }
}
</style>
