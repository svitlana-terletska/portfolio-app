<template>
  <section
    ref="target"
    :class="isVisible ? 'animate-in' : 'animate-out'"
    class="description-section"
  >
    <div class="description-wrapper">
      <div class="description-container">
        <!-- Text Section (Table) -->
        <dl class="description-list">
          <div
            v-for="(item, index) in descriptionData.tableData"
            :key="index"
            class="description-row"
          >
            <dt>{{ item.label }}</dt>
            <dd class="list-text">{{ item.value }}</dd>
          </div>
        </dl>

        <!-- Image Section -->
        <div class="description-image">
          <img
            :src="descriptionData.imageSrc"
            :alt="descriptionData.imageAlt"
          />

          <!-- Hi-Fi prototype link -->
          <div
            v-if="prototypeLinks && prototypeLinks.length"
            class="prototype-links"
          >
            <a
              v-for="(link, index) in prototypeLinks.filter((l) =>
                l.linkText.includes('Prototype')
              )"
              :key="index"
              :href="link.url"
              target="_blank"
              class="prototype-button"
            >
              {{ link.linkText }}
            </a>

            <!-- Walkthrough -->
            <a
              v-for="(link, index) in prototypeLinks.filter((l) =>
                l.linkText.toLowerCase().includes('walkthrough')
              )"
              :key="'walkthrough-' + index"
              :href="link.url"
              target="_blank"
              class="prototype-button"
            >
              {{ link.linkText }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useIntersectionObserver } from "@/composables/useIntersectionObserver";

export default {
  name: "DescriptionSection",
  setup() {
    const { isVisible, target } = useIntersectionObserver();
    return {
      isVisible,
      target,
    };
  },
  props: {
    descriptionData: {
      type: Object,
      required: true,
      validator: (value) => {
        return (
          Object.prototype.hasOwnProperty.call(value, "tableData") &&
          Array.isArray(value.tableData) &&
          Object.prototype.hasOwnProperty.call(value, "imageSrc") &&
          typeof value.imageSrc === "string" &&
          Object.prototype.hasOwnProperty.call(value, "imageAlt") &&
          typeof value.imageAlt === "string"
        );
      },
    },
    prototypeLinks: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style scoped>
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
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.description-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  font-family: "Nunito Sans", sans-serif;
  line-height: 1.6;
  font-size: 1.1rem;
}

.description-list {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  padding: 25px;
}

.description-row {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 10px;
}

.description-row:last-child {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
}

dt {
  font-weight: bold;
  color: #1e2328;
  flex: 0 0 120px;
  margin-right: 20px;
}

dd {
  flex: 1;
  color: #1e2328;
  line-height: 1.6;
  margin-left: 0;
}

.description-image {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  text-align: center;
  border-radius: 8px;
  padding: 20px;
}

.description-image img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  display: block;
  margin: 0 auto;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .description-container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .description-list,
  .description-image {
    width: 90%;
    min-width: unset;
  }
}

.prototype-links {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.prototype-button {
  display: inline-block;
  width: 200px;
  padding: 12px;
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
  font-family: "Nunito Sans", sans-serif;
}

.prototype-button:hover {
  transform: translateY(-3px) scale(1.02);
  background-position: 100% 50%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
