<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="takeaways-section-container"
    style="font-family: 'Inter', sans-serif"
  >
    <!-- Variation 1: h3 heading and a paragraph, 2 columns -->
    <div
      v-if="takeawaysContent.type === 'two-columns-simple'"
      class="section-block"
    >
      <h2 class="section-title">
        {{ takeawaysContent.sectionTitle || "Key Takeaways" }}
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

      <div class="columns-grid two-columns">
        <div
          v-for="(col, index) in takeawaysContent.columns"
          :key="index"
          class="column-item"
        >
          <h3 class="column-heading">{{ col.heading }}</h3>
          <p class="column-paragraph">{{ col.paragraph1 }}</p>
          <p v-if="col.paragraph2" class="column-paragraph">
            {{ col.paragraph2 }}
          </p>
        </div>
      </div>
    </div>

    <!-- Variation 2: Next steps heading and 3 columns container below it. Each column has SVG and a paragraph -->
    <div
      v-else-if="takeawaysContent.type === 'next-steps-three-columns'"
      class="section-block"
    >
      <h2 class="section-title">
        {{ takeawaysContent.nextStepsHeading || "Next Steps" }}
      </h2>
      <div class="columns-grid three-columns">
        <div
          v-for="(col, index) in takeawaysContent.columns"
          :key="index"
          class="column-item"
        >
          <div class="svg-icon-wrapper" v-html="col.svg"></div>
          <p class="column-paragraph">{{ col.paragraph }}</p>
        </div>
      </div>
    </div>

    <!-- Variation 3: Two sections. The first section has a heading is called Takeaways and two two-column containers below it. Each column has an SVG, a heading, and 1-2 paragraphs. The second section has Next Steps heading and 3 column container with SVG and paragraph in each column. -->
    <div
      v-else-if="takeawaysContent.type === 'two-sections-detailed'"
      class="section-block"
    >
      <h2 class="section-title">
        {{ takeawaysContent.takeawaysSection.heading || "Takeaways" }}
      </h2>
      <div
        v-for="(container, cIndex) in takeawaysContent.takeawaysSection
          .twoColumnContainers"
        :key="`takeaway-container-${cIndex}`"
        class="columns-grid two-columns detailed-takeaways"
      >
        <div
          v-for="(col, colIndex) in container.columns"
          :key="`takeaway-col-${cIndex}-${colIndex}`"
          class="column-item"
        >
          <div class="svg-icon-wrapper" v-html="col.svg"></div>
          <h3 class="column-heading">{{ col.heading }}</h3>
          <p class="column-paragraph">{{ col.paragraph1 }}</p>
          <p v-if="col.paragraph2" class="column-paragraph">
            {{ col.paragraph2 }}
          </p>
          <p v-if="col.paragraph3" class="column-paragraph">
            {{ col.paragraph3 }}
          </p>
        </div>
      </div>

      <h2 class="section-title next-steps-title">
        {{ takeawaysContent.nextStepsSection.heading || "Next Steps" }}
      </h2>
      <div class="columns-grid three-columns">
        <div
          v-for="(col, index) in takeawaysContent.nextStepsSection.columns"
          :key="index"
          class="column-item"
        >
          <div class="svg-icon-wrapper" v-html="col.svg"></div>
          <p class="column-paragraph">{{ col.paragraph }}</p>
        </div>
      </div>
    </div>

    <!-- Variation 4: 2 sections. One section has a Key Takeaways from the Design Process heading and 4 paragraphs with a heading below it. The second section has an Areas for Further Improvement heading and 4 paragraphs with heading below it. -->
    <div
      v-else-if="takeawaysContent.type === 'two-sections-paragraphs'"
      class="section-block"
    >
      <h2 class="section-title">
        {{
          takeawaysContent.keyTakeaways.heading ||
          "Key Takeaways from the Design Process"
        }}
      </h2>
      <div class="paragraphs-list">
        <div
          v-for="(para, index) in takeawaysContent.keyTakeaways.paragraphs"
          :key="`key-takeaway-para-${index}`"
          class="paragraph-item"
        >
          <h3 class="paragraph-heading">{{ para.heading }}</h3>
          <p class="column-paragraph">{{ para.text }}</p>
        </div>
      </div>

      <h2 class="section-title next-steps-title">
        {{
          takeawaysContent.furtherImprovement.heading ||
          "Areas for Further Improvement"
        }}
      </h2>
      <div class="paragraphs-list">
        <div
          v-for="(para, index) in takeawaysContent.furtherImprovement
            .paragraphs"
          :key="`improvement-para-${index}`"
          class="paragraph-item"
        >
          <h3 class="paragraph-heading">{{ para.heading }}</h3>
          <p class="column-paragraph">{{ para.text }}</p>
        </div>
      </div>
    </div>

    <!-- Variation 5: Summary heading and 4 paragraphs with headings. -->
    <div
      v-else-if="takeawaysContent.type === 'summary-four-paragraphs'"
      class="section-block"
    >
      <h2 class="section-title">
        {{ takeawaysContent.summaryHeading || "Summary" }}
      </h2>
      <div class="paragraphs-list">
        <div
          v-for="(para, index) in takeawaysContent.paragraphs"
          :key="`summary-para-${index}`"
          class="paragraph-item"
        >
          <h3 class="paragraph-heading">{{ para.heading }}</h3>
          <p class="column-paragraph">{{ para.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "TakeawaysSection",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  props: {
    takeawaysContent: {
      type: Object,
      required: true,
      default: () => ({
        sectionTitle: "Takeaways & Next Steps",
        type: "two-columns-simple",
        columns: [],
        nextStepsHeading: "",
        takeawaysSection: {},
        nextStepsSection: {},
        keyTakeaways: {},
        furtherImprovement: {},
        summaryHeading: "",
        paragraphs: [],
      }),
    },
  },
};
</script>

<style scoped>
.takeaways-section-container {
  max-width: 900px;
  margin: 0 auto;
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

.next-steps-title {
  margin-top: 20px;
}

.columns-grid {
  display: grid;
  gap: 10px;
  padding: 20px 0;
}

.two-columns {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.three-columns {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.column-heading,
.paragraph-heading {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  font-family: "Nunito Sans", sans-serif;
}

.column-paragraph {
  font-size: 1rem;
  line-height: 1.5;
  color: #1e2328;
  margin-bottom: 10px;
}

.column-paragraph:last-of-type {
  margin-bottom: 0;
}

.svg-icon-wrapper {
  width: 50px;
  height: 50px;
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

.paragraphs-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
  text-align: left;
}

.paragraph-item {
  background-color: #f8faff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .takeaways-section-container {
    padding: 20px 30px;
  }
  .section-title {
    font-size: 1.3em;
  }

  .columns-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .column-item {
    padding: 20px;
  }

  .column-paragraph {
    font-size: 0.95rem;
  }

  .svg-icon-wrapper {
    width: 40px;
    height: 40px;
    margin-bottom: 15px;
  }

  .paragraphs-list {
    gap: 15px;
  }
}
</style>

