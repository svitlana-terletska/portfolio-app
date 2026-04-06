<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="mockup-gallery-container"
    style="font-family: 'Nunito Sans', sans-serif"
  >
    <h2 class="section-title">
      {{ galleryContent.sectionTitle || "Mockup Gallery" }}
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

    <p v-if="galleryContent.introParagraph" class="intro-paragraph">
      {{ galleryContent.introParagraph }}
    </p>

    <div class="gallery-content-wrapper">
      <!-- Layout Variation 1 & 2: Text Block + Two Images in a row, with optional bottom big image -->
      <template
        v-if="galleryContent.type === 'text-images-grid-and-bottom-image'"
      >
        <div class="text-images-sections-grid">
          <div
            v-for="(section, index) in galleryContent.sections"
            :key="'section-ti-' + index"
            class="text-images-section"
          >
            <!-- Text Block -->
            <div class="text-block">
              <h3
                v-if="section.textBlock && section.textBlock.heading"
                class="text-block-heading"
              >
                {{ section.textBlock.heading }}
              </h3>
              <p
                v-for="(paragraph, pIndex) in section.textBlock.paragraphs"
                :key="'text-para-' + index + '-' + pIndex"
                class="text-block-paragraph"
              >
                {{ paragraph }}
              </p>
              <ul
                v-if="
                  section.textBlock &&
                  section.textBlock.listItems &&
                  section.textBlock.listItems.length
                "
                class="text-block-list"
              >
                <li
                  v-for="(item, liIndex) in section.textBlock.listItems"
                  :key="'text-list-item-' + index + '-' + liIndex"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <!-- Two Images with Headings -->
            <div class="images-block">
              <div
                v-for="(image, imgIndex) in section.images"
                :key="'image-ti-' + index + '-' + imgIndex"
                class="image-with-heading"
              >
                <h4 v-if="image.heading" class="image-heading">
                  {{ image.heading }}
                </h4>
                <div v-if="image.imageUrl" class="image-wrapper">
                  <img
                    :src="image.imageUrl"
                    :alt="image.imageAlt"
                    class="responsive-image"
                  />
                  <p v-if="image.imageCaption" class="image-caption">
                    {{ image.imageCaption }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Big Image below all sections -->
        <div
          v-if="
            galleryContent.bottomImage && galleryContent.bottomImage.imageUrl
          "
          class="bottom-big-image-block"
        >
          <div class="bottom-image-wrapper">
            <img
              :src="galleryContent.bottomImage.imageUrl"
              :alt="galleryContent.bottomImage.imageAlt"
              class="bottom-image"
            />
            <p
              v-if="galleryContent.bottomImage.imageCaption"
              class="bottom-image-caption"
            >
              {{ galleryContent.bottomImage.imageCaption }}
            </p>
          </div>
        </div>
      </template>

      <!-- Layout Variation 3 & 4: Image on left, Text Block with SVG/Paragraph pairs on right -->
      <template v-else-if="galleryContent.type === 'image-text-svg-list'">
        <div class="image-text-svg-sections">
          <div
            v-for="(section, index) in galleryContent.sections"
            :key="'section-its-' + index"
            class="image-text-svg-section"
          >
            <div class="image-half">
              <div v-if="section.imageUrl" class="image-wrapper">
                <img
                  :src="section.imageUrl"
                  :alt="section.imageAlt"
                  class="responsive-image"
                />
                <p v-if="section.imageCaption" class="image-caption">
                  {{ section.imageCaption }}
                </p>
              </div>
            </div>
            <div class="text-half">
              <div class="text-block">
                <h3
                  v-if="section.textBlock && section.textBlock.heading"
                  class="text-block-heading"
                >
                  {{ section.textBlock.heading }}
                </h3>
                <div
                  v-for="(item, itemIndex) in section.textBlock.svgParagraphs"
                  :key="'svg-para-' + index + '-' + itemIndex"
                  class="svg-paragraph-item"
                >
                  <div
                    v-if="item.svgContent"
                    class="svg-icon"
                    v-html="item.svgContent"
                  ></div>
                  <p class="text-block-paragraph">{{ item.paragraph }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "MockupGallery",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  props: {
    galleryContent: {
      type: Object,
      required: true,
      default: () => ({
        sectionTitle: "Mockup Gallery",
        introParagraph: "",
        type: "default", // 'text-images-grid-and-bottom-image', 'image-text-svg-list'
        sections: [],
        bottomImage: {
          imageUrl: "",
          imageAlt: "",
          imageCaption: "",
        },
      }),
    },
  },
  methods: {
    // A simple SVG for the bullet. You can customize this.
    getSvgBullet() {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`;
    },
  },
};
</script>

<style scoped>
/* Main container for the entire section */
.mockup-gallery-container {
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

.gallery-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* --- Common Image and Text Styles --- */
.image-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.responsive-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.image-caption {
  font-size: 0.9rem;
  color: #1e2328;
  text-align: center;
  padding: 0 10px;
  background-color: #f7f7f7;
}

.text-block-heading {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e2328;
  margin-bottom: 15px;
}

.text-block-paragraph {
  font-size: 1rem;
  line-height: 1.6;
  color: #1e2328;
  margin-bottom: 1em;
}

.text-block-list {
  list-style: disc;
  padding-left: 20px;
  font-size: 1rem;
  line-height: 1.6;
  color: #1e2328;
}

/* --- Layout Variation 1 & 2: Text Block + Two Images Grid --- */
.text-images-sections-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.text-images-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
}

.text-block {
  flex: 1;
  max-width: 100%;
  text-align: left;
}

.images-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.image-with-heading {
  text-align: center;
  width: 100%;
}

.image-heading {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e2328;
  margin-bottom: 10px;
}

/* Desktop layout for text-images-section */
@media (min-width: 769px) {
  .text-images-section {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .text-block,
  .images-block {
    flex: 1;
    max-width: 100;
  }

  .images-block {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .image-with-heading {
    flex: 1 1 calc(50% - 10px);
    max-width: calc(50% - 10px);
  }
}

/* --- Bottom Big Image Block (for Variation 1 & 2) --- */
.bottom-big-image-block {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
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
  background-color: #f2f2f2;
}

/* --- Layout Variation 3 & 4: Image on Left, Text with SVG/Paragraphs on Right --- */
.image-text-svg-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-text-svg-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
  border-radius: 10px;
}

.image-half,
.text-half {
  width: 100%;
}

.svg-paragraph-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.svg-icon {
  flex-shrink: 0;
  width: 40;
  height: 40;
  color: #2b6cb0;
  margin-right: 5px;
}

/* Desktop layout for image-text-svg-section */
@media (min-width: 769px) {
  .image-text-svg-section {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }

  .image-half,
  .text-half {
    flex: 1;
    max-width: 100%;
  }
}

/* Responsive Adjustments for overall container */
@media (max-width: 768px) {
  .mockup-gallery-container {
    padding: 20px 30px;
  }

  .section-title {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  .intro-paragraph {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .gallery-content-wrapper {
    gap: 40px;
  }

  .text-images-sections-grid,
  .image-text-svg-sections {
    gap: 40px;
  }

  .text-images-section,
  .image-text-svg-section {
    flex-direction: column;
    gap: 20px;
    padding: 15px;
  }

  .text-block-heading,
  .image-heading,
  .block-heading {
    font-size: 1.3rem;
  }

  .text-block-paragraph,
  .text-block-list li,
  .image-caption,
  .bottom-image-caption {
    font-size: 0.9rem;
  }
}
</style>
