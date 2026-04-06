<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="design-decisions-container"
    style="font-family: 'Nunito Sans', sans-serif"
  >
    <h2 class="section-title">
      {{ designContent.sectionTitle || "Design Decisions" }}
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

    <div class="design-content-wrapper">
      <!-- Variation 1 & 4: Initial Paragraphs (with bold first sentence) -->
      <div
        v-if="designContent.paragraphs && designContent.paragraphs.length"
        class="design-paragraphs-block"
      >
        <p
          v-for="(paragraph, index) in designContent.paragraphs"
          :key="'para-' + index"
          class="design-paragraph"
        >
          <span v-html="formatBoldFirstSentence(paragraph)"></span>
        </p>
      </div>

      <!-- Variation 1 & 3 & 5: Image and Text/List Side-by-Side (Flexible Content Blocks) -->
      <div
        v-if="
          designContent.flexibleContentBlocks &&
          designContent.flexibleContentBlocks.length
        "
        class="flexible-content-grid"
      >
        <div
          v-for="(block, index) in designContent.flexibleContentBlocks"
          :key="'flex-block-' + index"
          class="flexible-content-item"
          :class="{
            'reverse-layout': block.reverseLayout,
            'standalone-image-layout': block.isStandaloneImage,
          }"
        >
          <div v-if="block">
            <!-- Main image for the flexible block (if any) -->
            <div v-if="block.imageUrl" class="flexible-image-wrapper">
              <img
                :src="block.imageUrl"
                :alt="block.imageAlt"
                class="flexible-image"
              />
            </div>

            <div
              v-if="
                block.text ||
                (block.listItems && block.listItems.length) ||
                (block.additionalImages && block.additionalImages.length) ||
                block.modalLink
              "
              class="flexible-text-content"
            >
              <h3 v-if="block.heading" class="flexible-content-heading">
                {{ block.heading }}
              </h3>

              <ul
                v-if="block.listItems && block.listItems.length"
                class="flexible-list"
              >
                <li
                  v-for="(item, itemIndex) in block.listItems"
                  :key="'flex-list-item-' + itemIndex"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <!-- Additional paragraph for Medical case -->
            <div>
              <p v-if="block.text" class="flexible-paragraph">
                {{ block.text }}
              </p>
            </div>

            <!-- Additional Images within flexible content block -->
            <div
              v-if="block.additionalImages && block.additionalImages.length"
              class="additional-images-grid"
            >
              <div
                v-for="(img, imgIndex) in block.additionalImages"
                :key="'add-img-' + index + '-' + imgIndex"
                class="additional-image-item"
              >
                <img
                  :src="img.imageUrl"
                  :alt="img.imageAlt"
                  class="additional-image"
                />
                <p v-if="img.caption" class="additional-image-caption">
                  {{ img.caption }}
                </p>
              </div>

              <!-- Modal Link -->
              <a
                v-if="block.modalLink && block.modalLink.imageUrl"
                href="#"
                @click.prevent="openModal(block.modalLink)"
                class="modal-link"
              >
                {{ block.modalLink.text || "View Details" }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Variation 1 & 2: Big Image -->
      <div
        v-if="designContent.bigImage && designContent.bigImage.imageUrl"
        class="big-image-block"
      >
        <img
          :src="designContent.bigImage.imageUrl"
          :alt="designContent.bigImage.imageAlt"
          class="big-image"
        />
        <p v-if="designContent.bigImage.caption" class="big-image-caption">
          {{ designContent.bigImage.caption }}
        </p>
      </div>

      <!-- Variation 1: Figma Prototype Link -->
      <div
        v-if="designContent.prototypeLink && designContent.prototypeLink.url"
        class="prototype-link-block"
      >
        <h4 class="prototype-heading">
          {{ designContent.prototypeLink.heading }}
        </h4>
        <a
          :href="designContent.prototypeLink.url"
          target="_blank"
          rel="noopener noreferrer"
          class="prototype-button"
        >
          View Figma Lo-Fi Prototype
        </a>
      </div>

      <!-- Variation 1, 2, 5: Feature Highlights with Wireframe Images and Descriptions -->
      <div
        v-if="
          designContent.featureHighlights &&
          designContent.featureHighlights.length
        "
        class="feature-highlights-grid"
      >
        <div
          v-for="(feature, index) in designContent.featureHighlights"
          :key="'feature-' + index"
          class="feature-card"
        >
          <template v-if="feature">
            <div class="feature-image-wrapper">
              <img
                :src="feature.imageUrl"
                :alt="feature.imageAlt"
                class="feature-image"
              />
            </div>
            <div class="feature-description-box">
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </template>
        </div>
      </div>

      <!-- Variation 4: Lo-Fidelity Prototype Section for Real Estate case-->
      <div
        v-if="
          designContent.loFidelityPrototypeSection &&
          designContent.loFidelityPrototypeSection.mainHeading
        "
        class="lo-fi-prototype-section"
      >
        <h2 class="lo-fi-main-heading">
          {{ designContent.loFidelityPrototypeSection.mainHeading }}
        </h2>
        <h3 class="lo-fi-sub-heading">
          {{ designContent.loFidelityPrototypeSection.subHeading }}
        </h3>
        <p
          v-for="(paragraph, index) in designContent.loFidelityPrototypeSection
            .paragraphs"
          :key="'lofi-para-' + index"
          class="lo-fi-paragraph"
        >
          <span v-html="formatBoldFirstSentence(paragraph)"></span>
        </p>
        <div
          v-if="designContent.loFidelityPrototypeSection.bulletedParagraph"
          class="lo-fi-bulleted-paragraph"
        >
          <p>
            {{
              designContent.loFidelityPrototypeSection.bulletedParagraph.text
            }}
          </p>
          <ul class="lo-fi-bullet-list">
            <li
              v-for="(item, index) in designContent.loFidelityPrototypeSection
                .bulletedParagraph.items"
              :key="'lofi-bullet-' + index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- The Modal Structure -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close-button" @click="closeModal">&times;</button>
        <img
          :src="currentModalImage.imageUrl"
          :alt="currentModalImage.imageAlt"
          class="modal-image"
        />
        <p v-if="currentModalImage.caption" class="modal-image-caption">
          {{ currentModalImage.caption }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "DesignDecisionsSection",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  props: {
    designContent: {
      type: Object,
      required: true,

      default: () => ({
        sectionTitle: "Design Decisions",
        paragraphs: [],
        flexibleContentBlocks: [],
        bigImage: {
          imageUrl: "",
          imageAlt: "",
          caption: "",
        },
        prototypeLink: {
          heading: "",
          url: "",
        },
        featureHighlights: [],
        loFidelityPrototypeSection: {
          mainHeading: "",
          subHeading: "",
          paragraphs: [],
          bulletedParagraph: {
            text: "",
            items: [],
          },
        },
      }),
    },
  },
  methods: {
    // Method to format the first sentence of a paragraph in bold
    formatBoldFirstSentence(paragraph) {
      if (!paragraph || typeof paragraph !== "string") {
        return "";
      }

      const match = paragraph.match(/^(.*?[.?!:;])(\s*.*)$/);

      if (match && match.length === 3) {
        const firstSentencePart = match[1].trim();
        const restOfParagraphPart = match[2].trim();

        const separator = restOfParagraphPart.length > 0 ? " " : "";

        return `<strong>${firstSentencePart}</strong>${separator}${restOfParagraphPart}`;
      }

      return `<strong>${paragraph}</strong>`;
    },
  },
};
</script>

<style scoped>
/* Base Container for the entire section */
.design-decisions-container {
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
  margin-bottom: 20px;
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

.design-content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

/* --- Paragraphs Block (Variation 1 & 4) --- */
.design-paragraphs-block {
  width: 100%;
  text-align: left;
}

.design-paragraph {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #1e2328;
  margin-bottom: 1em;
}

/* --- Flexible Content Grid (Image/Text Side-by-Side) (Variation 1, 3, 5) --- */
.flexible-content-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.flexible-content-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: left;
}

.flexible-image-wrapper {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.flexible-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.flexible-text-content {
  width: 100%;
  max-width: 400px;
}

.flexible-content-heading {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1e2328;
  margin-bottom: 10px;
  font-family: "Philosopher", sans-serif;
}

.flexible-paragraph {
  font-size: 1rem;
  line-height: 1.6;
  color: #1e2328;
  margin-bottom: 1em;
}

.flexible-list {
  list-style: disc;
  padding-left: 20px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #1e2328;
}
/* Styles for additional images within flexible content blocks */
.additional-images-grid {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
  max-width: 900px;
}

.additional-image-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.additional-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: contain;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.lo-fi-bulleted-paragraph {
  line-height: 1.6;
}

/* Modal Link Styling */
.modal-link {
  display: inline-block;
  margin-top: 15px;
  padding: 8px 15px;
  background-color: #ff98b8;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;
}

.modal-link:hover {
  background-color: #ff98b8;
}

/* Desktop layout for flexible content (side-by-side) */
@media (min-width: 769px) {
  .flexible-content-item:not(.two-images-below-text-layout) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }

  .flexible-content-item:not(.two-images-below-text-layout).reverse-layout {
    flex-direction: row-reverse;
  }

  .flexible-content-item:not(.two-images-below-text-layout)
    .flexible-image-wrapper,
  .flexible-content-item:not(.two-images-below-text-layout)
    .flexible-text-content {
    flex: 1;
    max-width: 48%;
  }

  /* Styles for the two-images-below-text-layout */
  .flexible-content-item.two-images-below-text-layout {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }

  .flexible-content-item.two-images-below-text-layout .flexible-text-content {
    max-width: 100%;
    width: 100%;
  }

  .flexible-content-item.two-images-below-text-layout .additional-images-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  /* Styles for standalone full-width image layout */
  .flexible-content-item.standalone-image-layout {
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  .flexible-content-item.standalone-image-layout .flexible-image-wrapper {
    width: 100%;
    max-width: 100%;
  }
  .flexible-content-item.standalone-image-layout .flexible-text-content {
    width: 100%;
    max-width: 100%;
    text-align: left;
  }
}

/* --- Big Image Block (Variation 1 & 2) --- */
.big-image-block {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  /* background-color: #f0f0f0; */
}

.big-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.big-image-caption {
  font-size: 0.9rem;
  color: #1e2328;
  text-align: center;
  padding: 10px;
  background-color: #f7f7f7;
  border-top: 1px solid #eee;
}

/* --- Prototype Link Block (Variation 1) --- */
.prototype-link-block {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.prototype-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e2328;
  margin-bottom: 15px;
}

.prototype-button {
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(
    42deg,
    rgba(255, 255, 153, 1) 0%,
    rgba(255, 216, 0, 1) 35%,
    rgba(102, 204, 255, 1) 80%,
    rgba(41, 86, 109, 1) 100%
  );
  background-size: 300% 300%;
  color: #1e2328;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.5s ease, background-position 0.5s ease,
    box-shadow 0.3s ease;
  animation: gradientFlow 10s ease infinite;
  transform: scale(1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.prototype-button:hover {
  transform: translateY(-3px) scale(1.02);
  background-position: 100% 50%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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

/* --- Feature Highlights Grid (Variation 1, 2, 5) --- */
.feature-highlights-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.feature-image-wrapper {
  width: 100%;
  max-width: 200px;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.feature-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.feature-description-box {
  position: relative;
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  border: 1px solid rgb(102, 204, 255);
}

.feature-description {
  font-size: 0.95rem;
  line-height: 1.4;
  color: #1e2328;
  margin: 0;
}

/* --- Lo-Fidelity Prototype Section (Variation 4) --- */
.lo-fi-prototype-section {
  width: 100%;
  text-align: left;
  padding-top: 30px;
  border-top: 1px dashed #e0e0e0;
}

.lo-fi-main-heading {
  font-weight: 700;
  color: #1e2328;
  margin-bottom: 20px;
  text-align: center;
}

.lo-fi-sub-heading {
  font-weight: 600;
  color: #1e2328;
  margin-bottom: 20px;
}

.lo-fi-paragraph {
  color: #1e2328;
  margin-bottom: 20px;
}

.lo-fi-bulleted-paragraph {
  margin-top: 20px;
}

.lo-fi-bulleted-paragraph p {
  color: #1e2328;
  margin-bottom: 10px;
}

.lo-fi-bullet-list {
  list-style: disc;
  padding-left: 25px;
  color: #1e2328;
}

/* --- Modal Styles --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #1e2328;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
}

.modal-close-button:hover {
  color: #000;
}

.modal-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 4px;
}

.modal-image-caption {
  font-size: 0.9rem;
  color: #1e2328;
  text-align: center;
  margin-top: 10px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .design-decisions-container {
    padding: 20px 30px;
  }
  .section-title {
    margin-bottom: 30px;
  }

  .design-content-wrapper {
    gap: 30px;
  }

  .design-paragraph,
  .flexible-paragraph,
  .flexible-list,
  .feature-description,
  .lo-fi-paragraph,
  .lo-fi-bulleted-paragraph p,
  .lo-fi-bullet-list li {
    font-size: 1rem;
  }

  .flexible-content-grid {
    gap: 30px;
  }

  .flexible-content-item {
    flex-direction: column;
    align-items: center;
    text-align: left;
  }

  .flexible-image-wrapper,
  .flexible-text-content {
    max-width: 100%;
  }

  .additional-images-grid {
    display: flex;
    flex-direction: column;
  }

  .feature-highlights-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .prototype-button {
    font-size: 1rem;
    padding: 10px 20px;
  }

  .lo-fi-main-heading {
    font-size: 1.6rem;
  }

  .lo-fi-sub-heading {
    font-size: 1.4rem;
  }
}
</style>