<template>
  <section class="persona-section-container">
    <h2 class="section-title">User Personas</h2>

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

    <div class="personas-grid">
      <div
        v-for="(persona, index) in personas"
        :key="index"
        class="persona-card"
      >
        <h3 class="persona-name">{{ persona.name }}</h3>

        <div class="persona-image-wrapper">
          <img :src="persona.image" :alt="persona.name" class="persona-image" />

          <!-- Problem Statement Note -->
          <div class="problem-statement-note">
            <h4 class="note-heading">{{ persona.problemStatementHeading }}</h4>
            <p class="note-description">
              {{ persona.problemStatementDescription }}
            </p>
          </div>
        </div>

        <div class="persona-actions">
          <!-- Journey Map Button (conditionally rendered) -->
          <button
            v-if="persona.journeyMapUrl"
            @click="
              openModal(
                persona.journeyMapUrl,
                'Journey Map for ' + persona.name
              )
            "
            class="action-button journey-map-button"
            aria-label="View Journey Map"
          >
            View Journey Map
          </button>

          <!-- Empathy Map Button (conditionally rendered) -->
          <button
            v-if="persona.empathyMapUrl"
            @click="
              openModal(
                persona.empathyMapUrl,
                'Empathy Map for ' + persona.name
              )
            "
            class="action-button empathy-map-button"
            aria-label="View Empathy Map"
          >
            View Empathy Map
          </button>
        </div>
      </div>
    </div>

    <!-- Image Modal Component -->
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

export default {
  name: "PersonaSection",
  components: {
    ImageModal,
  },
  props: {
    personas: {
      type: Array,
      required: true,
      default: () => [],
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
/* Main container for the entire persona section */
.persona-section-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  color: #1e2328;
}

/* General section title styling */
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

/* Grid for displaying personas*/
.personas-grid {
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
}

/* Individual persona card styling */
.persona-card {
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.persona-name {
  font-weight: 700;
  color: #1e2328;
  font-family: "Philosopher", sans-serif;
}

/* Wrapper for persona image and problem statement note */
.persona-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding-top: 180px;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
}

.persona-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  object-fit: cover;
}

/* Problem Statement Note Styling (similar to sticky note, but static) */
.problem-statement-note {
  position: absolute;
  top: 10px;
  right: 10px;

  color: #1e2328;
  border-radius: 6px;
  padding: 10px 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  background: rgba(255, 255, 255, 0.1);

  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(15.3px);
  border: 1px solid rgba(255, 255, 255, 1);

  transform: rotate(3deg);
  z-index: 5;
  max-width: 350px;
  text-align: left;
  font-size: 1rem;
  line-height: 1.2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.problem-statement-note:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
}

.note-heading {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 5px;
  color: #1e2328;
  font-family: "Nunito Sans", sans-serif;
}
.note-description {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #1e2328;
  margin-bottom: 0;
  font-family: "Nunito Sans", sans-serif;
}

/* Action buttons for Journey/Empathy Maps */
.persona-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

/*buttons*/
.action-button {
  margin: 10px;
  padding: 0.5rem 1rem;
  color: #1e2328;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  border: none;
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
  transition: transform 0.5s ease, background-position 0.5s ease,
    color 0.3s ease;
}

/* Looping animated background for buttons */
.action-button {
  animation: gradientFlow 10s ease infinite;
  transform: scale(1.05);
  background-size: 300% 300%;
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
.action-button:hover {
  border: 1px solid #fff;
  background: rgb(102, 204, 255);
  transform: translateY(-2px) scale(1.05);
  color: #fff;
}

.action-button:focus {
  box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.5);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .persona-section-container {
    margin: 20px;
    padding: 15px;
  }

  .section-title {
    margin-bottom: 0;
  }

  .persona-card {
    padding: 20px;
  }

  .persona-name {
    font-size: 1.2rem;
    margin-bottom: 0;
  }

  .persona-image-wrapper {
    max-width: 100%;
  }

  .problem-statement-note {
    max-width: 250px;
    padding: 8px 12px;
    font-size: 0.8rem;
    top: 110px;
    right: 8px;
  }

  .note-heading {
    font-size: 1rem;
  }

  .note-description {
    font-size: 0.75rem;
  }

  .action-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}
@media (max-width: 768px) {
  .persona-section-container {
    margin: 10px;
  }
  .problem-statement-note {
    top: 60px;
    max-width: 320px;
    padding: 8px 10px;
  }
  .persona-image-wrapper {
    padding-top: 250px;
  }
  .persona-card {
    padding: 10px;
  }
}
</style>