<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="competitive-audit-container"
    style="font-family: 'Nunito Sans', sans-serif"
  >
    <h2 class="section-title">Competitive Audit</h2>

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

    <div class="audit-content-wrapper">
      <!-- Conditional rendering for paragraphs -->
      <div
        v-if="auditContent.paragraphs && auditContent.paragraphs.length"
        class="text-blocks"
      >
        <p
          v-for="(paragraph, index) in auditContent.paragraphs"
          :key="index"
          class="audit-paragraph"
        >
          {{ paragraph }}
        </p>
      </div>

      <!-- Conditional rendering for multiple lists -->
      <div
        v-if="auditContent.lists && auditContent.lists.length"
        class="audit-lists-section"
      >
        <div
          v-for="(listBlock, listIndex) in auditContent.lists"
          :key="listIndex"
          class="audit-list-block"
        >
          <h3 class="audit-list-heading">{{ listBlock.heading }}</h3>
          <ol v-if="listBlock.numbered" class="audit-list numbered-list">
            <li
              v-for="(item, itemIndex) in listBlock.items"
              :key="itemIndex"
              class="audit-list-item"
            >
              <span v-html="formatListItem(item)"></span>
            </li>
          </ol>
          <ul v-else class="audit-list bulleted-list">
            <li
              v-for="(item, itemIndex) in listBlock.items"
              :key="itemIndex"
              class="audit-list-item"
            >
              <span v-html="formatListItem(item)"></span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Conditional rendering for image -->
      <div v-if="auditContent.imageUrl" class="audit-image-wrapper">
        <img
          :src="auditContent.imageUrl"
          :alt="auditContent.imageAlt"
          class="audit-image"
        />
        <p v-if="auditContent.imageCaption" class="audit-image-caption">
          {{ auditContent.imageCaption }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "CompetitiveAuditSection",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  props: {
    auditContent: {
      type: Object,
      required: true,

      default: () => ({
        paragraphs: [
          "Our competitive audit involved a thorough analysis of existing solutions in the market, identifying key players, their strengths, weaknesses, and the opportunities they presented. We focused on understanding user experiences within these platforms, noting common features, design patterns, and areas where competitors fell short in meeting user needs.",
          "This research highlighted several critical gaps in the market, particularly concerning user-friendly interfaces and comprehensive features for specific user segments. Many existing tools were either overly complex for casual users or lacked the depth required by more advanced operators.",
          "The insights gained from this audit were instrumental in shaping our unique value proposition, allowing us to strategically position our solution to address unmet user demands and differentiate ourselves from the competition.",
        ],
        lists: [],
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      }),
    },
  },
  methods: {
    // Formats a list item to bold text before the first colon (or similar separator)
    formatListItem(item) {
      const parts = item.split(/:(.*)/s); // Split at the first colon
      if (parts.length > 1) {
        return `<strong>${parts[0]}:</strong> ${parts[1].trim()}`;
      }
      return item;
    },
  },
};
</script>

<style scoped>
/* Main container for the entire competitive audit section */
.competitive-audit-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  color: #1e2328;
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
/* Section title styling */
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

/* Wrapper for text blocks and image to control overall width */
.audit-content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.6;
}

/* Container for text paragraphs */
.text-blocks {
  width: 100%;
  margin-bottom: 30px;
  text-align: left;
  font-family: "Nunito Sans", sans-serif;
}

.audit-paragraph {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #1e2328;
  margin-bottom: 1em;
}

/* Wrapper for the image to ensure it matches text block width */
.audit-image-wrapper {
  width: 100%;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
}

.audit-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 8px;
}

.audit-image-caption {
  font-size: 0.9rem;
  color: #1e2328;
  text-align: center;
  padding: 10px;
  background-color: #f7f7f7;
  border-top: 1px solid #eee;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .audit-content-wrapper {
    max-width: 100%;
  }

  .audit-image-caption {
    font-size: 0.8rem;
  }
}
</style>




