<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="usability-study-container"
    style="font-family: 'Nunito Sans', sans-serif"
  >
    <h2 class="section-title">
      {{ usabilityContent.sectionTitle || "Usability Study Findings" }}
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
    <p class="intro-paragraph">{{ usabilityContent.introParagraph }}</p>

    <div class="findings-content-wrapper">
      <!-- Variation 1: Two-column layout with two SVG-numbered lists -->
      <div
        v-if="usabilityContent.type === 'two-column-lists'"
        class="two-column-lists-grid"
      >
        <div
          v-for="(listBlock, index) in usabilityContent.lists"
          :key="'list-col-' + index"
          class="list-column"
        >
          <h3 class="list-heading">{{ listBlock.heading }}</h3>
          <ol class="custom-numbered-list">
            <li
              v-for="(item, itemIndex) in listBlock.items"
              :key="'item-' + index + '-' + itemIndex"
            >
              {{ item }}
            </li>
          </ol>
        </div>
      </div>

      <!-- Variation 2: One-column layout with a single SVG-numbered list -->
      <div
        v-else-if="usabilityContent.type === 'one-column-list'"
        class="one-column-list-block"
      >
        <h3 class="list-heading">{{ usabilityContent.list.heading }}</h3>
        <ol class="custom-numbered-list">
          <li
            v-for="(item, index) in usabilityContent.list.items"
            :key="'single-item-' + index"
          >
            {{ item }}
          </li>
        </ol>
      </div>

      <!-- Variation 3: Two-column lists with a heading and big image below -->
      <div
        v-else-if="
          usabilityContent.type === 'two-column-lists-with-bottom-image'
        "
        class="two-column-lists-and-image-block"
      >
        <!-- Two-column lists part -->
        <div class="two-column-lists-grid">
          <div
            v-for="(listBlock, index) in usabilityContent.lists"
            :key="'list-col-bottom-img-' + index"
            class="list-column"
          >
            <h3 class="list-heading">{{ listBlock.heading }}</h3>
            <ol class="custom-numbered-list">
              <li
                v-for="(item, itemIndex) in listBlock.items"
                :key="'item-bottom-img-' + index + '-' + itemIndex"
              >
                {{ item }}
              </li>
            </ol>
          </div>
        </div>

        <!-- Heading and Big Image below the columns -->
        <div
          v-if="
            usabilityContent.bottomImages &&
            usabilityContent.bottomImages.length
          "
          class="bottom-images-container"
        >
          <div
            v-for="(imageBlock, imgIndex) in usabilityContent.bottomImages"
            :key="'bottom-img-' + imgIndex"
            class="bottom-image-section"
          >
            <h3 v-if="imageBlock.heading" class="bottom-image-heading">
              {{ imageBlock.heading }}
            </h3>
            <div v-if="imageBlock.imageUrl" class="bottom-image-wrapper">
              <img
                :src="imageBlock.imageUrl"
                :alt="imageBlock.imageAlt"
                class="bottom-image"
              />
              <p v-if="imageBlock.imageCaption" class="bottom-image-caption">
                {{ imageBlock.imageCaption }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Variation 4: Heading, Paragraph, and Image -->
      <div
        v-else-if="usabilityContent.type === 'heading-paragraph-image'"
        class="heading-paragraph-image-block"
      >
        <h3 class="block-heading">{{ usabilityContent.block.heading }}</h3>
        <p v-if="usabilityContent.block.paragraph" class="block-paragraph">
          {{ usabilityContent.block.paragraph }}
        </p>
        <div v-if="usabilityContent.block.imageUrl" class="block-image-wrapper">
          <img
            :src="usabilityContent.block.imageUrl"
            :alt="usabilityContent.block.imageAlt"
            class="block-image"
          />
          <p
            v-if="usabilityContent.block.imageCaption"
            class="block-image-caption"
          >
            {{ usabilityContent.block.imageCaption }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "UsabilityStudySection",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  props: {
    usabilityContent: {
      type: Object,
      required: true,
      default: () => ({
        sectionTitle: "Usability Study Findings",
        introParagraph:
          "This section presents the key findings and insights gathered from our usability testing sessions.",
        type: "default",
        lists: [],
        list: {},
        block: {
          heading: "",
          paragraph: "",
          imageUrl: "",
          imageAlt: "",
          imageCaption: "",
        },
        bottomImages: [],
      }),
    },
  },
};
</script>

<style scoped>
/* Main container for the entire section */
.usability-study-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
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

.intro-paragraph {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #1e2328;
  text-align: center;
  margin-bottom: 20px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.findings-content-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

/* --- Common List Styles (for custom SVG numbering) --- */
.custom-numbered-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.custom-numbered-list li {
  position: relative;
  padding-left: 30px;
  margin-bottom: 10px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #1e2328;
}

.custom-numbered-list li::before {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 18 18"><circle cx="9" cy="9" r="7" fill="%240b6cb0"/></svg>');
  display: inline-block;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

/* --- Variation 1: Two-column lists --- */
.two-column-lists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.list-column {
  background-color: #f8faff;
  border-radius: 10px;
  padding: 10px 20px 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.list-heading {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1e2328;
  margin-bottom: 10px;
  text-align: center;
}

/* --- Variation 2: One-column list --- */
.one-column-list-block {
  background-color: #f8faff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* --- Variation 3: Heading, Paragraph, Image --- */
.heading-paragraph-image-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  border-radius: 10px;
  padding: 30px;
}

.block-heading {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e2328;
  margin-bottom: 10px;
}

.block-image-wrapper {
  width: 100%;
  max-width: 900px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
}

.block-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.block-image-caption {
  font-size: 0.9rem;
  color: #1e2328;
  text-align: center;
  padding: 10px;
  background-color: #f7f7f7;
  border-top: 1px solid #eee;
}
/*Variation Specific Styles: Two-column lists with bottom image --- */
.two-column-lists-and-image-block {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.bottom-images-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
}
.bottom-image-section {
  /* Styles for each individual image block */
  width: 100%;
  text-align: center;
}

.bottom-image-heading {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e2328;
  margin-bottom: 10px;
}

.bottom-image-wrapper {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
}

.bottom-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.bottom-image-caption {
  font-size: 0.9rem;
  color: #1e2328;
  text-align: center;
  padding: 10px;
  background-color: #f7f7f7;
  border-top: 1px solid #eee;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .usability-study-container {
    margin: 30px 15px;
    padding: 20px;
  }

  .intro-paragraph {
    font-size: 1rem;
  }

  .two-column-lists-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .list-heading {
    font-size: 1.3rem;
  }

  .custom-numbered-list li {
    font-size: 0.9rem;
  }

  .block-heading {
    font-size: 1.5rem;
  }

  .block-paragraph {
    font-size: 1rem;
  }
}
</style>
