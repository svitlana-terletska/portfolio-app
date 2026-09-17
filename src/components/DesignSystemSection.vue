<template>
  <section class="design-system-section">
    <!-- Section Title -->
    <h2 class="section-title">{{ content.sectionTitle }}</h2>

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

    <!-- Intro Text -->
    <p
      v-for="(para, i) in content.introParagraphs"
      :key="'p' + i"
      class="intro-paragraph"
    >
      {{ para }}
    </p>

    <!-- ── Carousel ── -->
    <div class="carousel-wrapper">
      <button
        class="carousel-arrow carousel-arrow--prev"
        @click="prev"
        aria-label="Previous image"
      >
        &#8249;
      </button>

      <div class="carousel-track-container">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${activeIndex * slideWidth}px)` }"
        >
          <div
            v-for="(item, i) in content.carouselItems"
            :key="'slide' + i"
            class="carousel-slide"
            @click="openModal(i)"
          >
            <img
              :src="item.image"
              :alt="item.alt"
              class="carousel-img"
              draggable="false"
            />
            <p class="carousel-caption">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <button
        class="carousel-arrow carousel-arrow--next"
        @click="next"
        aria-label="Next image"
      >
        &#8250;
      </button>
    </div>

    <!-- Dots -->
    <div class="carousel-dots">
      <button
        v-for="(item, i) in content.carouselItems"
        :key="'dot' + i"
        class="dot"
        :class="{ 'dot--active': i === activeIndex }"
        @click="activeIndex = i"
        :aria-label="`Go to slide ${i + 1}`"
      />
    </div>

    <!-- ── Modal ── -->
    <Teleport to="body">
      <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
        <button class="modal-close" @click="closeModal" aria-label="Close">
          &#215;
        </button>

        <button
          class="modal-arrow modal-arrow--prev"
          @click="modalPrev"
          aria-label="Previous"
        >
          &#8249;
        </button>
        <button
          class="modal-arrow modal-arrow--next"
          @click="modalNext"
          aria-label="Next"
        >
          &#8250;
        </button>

        <div class="modal-content" @click.stop>
          <div
            class="modal-img-wrapper"
            @wheel.prevent="onWheel"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @mouseleave="onMouseUp"
            @touchstart.prevent="onTouchStart"
            @touchmove.prevent="onTouchMove"
            @touchend="onTouchEnd"
            :style="{
              cursor: isPanning ? 'grabbing' : scale > 1 ? 'grab' : 'default',
            }"
          >
            <img
              :src="content.carouselItems[modalIndex].image"
              :alt="content.carouselItems[modalIndex].alt"
              class="modal-img"
              :style="{
                transform: `scale(${scale}) translate(${panX / scale}px, ${
                  panY / scale
                }px)`,
                transition: isPanning ? 'none' : 'transform 0.2s ease',
              }"
              draggable="false"
            />
          </div>

          <p class="modal-caption">
            {{ content.carouselItems[modalIndex].description }}
          </p>

          <div class="zoom-controls">
            <button @click="zoomIn" aria-label="Zoom in">＋</button>
            <button @click="resetZoom" aria-label="Reset zoom">↺</button>
            <button @click="zoomOut" aria-label="Zoom out">－</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ── Image + Text Block ── -->
    <div v-if="content.imageTextBlock" class="image-text-block">
      <div class="image-text-block__image">
        <img
          :src="content.imageTextBlock.image"
          :alt="content.imageTextBlock.imageAlt"
          class="it-img"
        />
        <p v-if="content.imageTextBlock.imageCaption" class="it-caption">
          {{ content.imageTextBlock.imageCaption }}
        </p>
      </div>
      <div class="image-text-block__text">
        <h3 v-if="content.imageTextBlock.heading" class="it-heading">
          {{ content.imageTextBlock.heading }}
        </h3>
        <p
          v-for="(para, i) in content.imageTextBlock.paragraphs"
          :key="'it' + i"
          class="it-paragraph"
        >
          {{ para }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DesignSystemSection",
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
      slideWidth: 270, // slide width (300px) + gap (1rem ~21px)

      // Modal
      modalOpen: false,
      modalIndex: 0,

      // Zoom & pan
      scale: 1,
      panX: 0,
      panY: 0,
      isPanning: false,
      lastMouseX: 0,
      lastMouseY: 0,
      lastPinchDist: null,
    };
  },
  computed: {
    total() {
      return this.content.carouselItems.length;
    },
  },
  mounted() {
    window.addEventListener("keydown", this.onKeydown);
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("animate-in");
            el.classList.remove("animate-out");
          } else {
            el.classList.add("animate-out");
            el.classList.remove("animate-in");
          }
        });
      },
      { threshold: 0.15 }
    );
    this._observer.observe(this.$el);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onKeydown);
    if (this._observer) this._observer.disconnect();
  },
  methods: {
    // ── Carousel ──
    prev() {
      if (this.activeIndex === 0) {
        this.snapTo(this.total - 1);
      } else {
        this.activeIndex--;
      }
    },
    next() {
      if (this.activeIndex === this.total - 1) {
        this.snapTo(0);
      } else {
        this.activeIndex++;
      }
    },
    snapTo(index) {
      // Disable transition, jump instantly, then re-enable
      const track = this.$el.querySelector(".carousel-track");
      if (track) track.style.transition = "none";
      this.activeIndex = index;
      this.$nextTick(() => {
        setTimeout(() => {
          if (track) track.style.transition = "";
        }, 50);
      });
    },

    // ── Modal ──
    openModal(i) {
      this.modalIndex = i;
      this.modalOpen = true;
      this.resetZoom();
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.modalOpen = false;
      this.resetZoom();
      document.body.style.overflow = "";
    },
    modalPrev() {
      this.modalIndex = (this.modalIndex - 1 + this.total) % this.total;
      this.resetZoom();
    },
    modalNext() {
      this.modalIndex = (this.modalIndex + 1) % this.total;
      this.resetZoom();
    },
    onKeydown(e) {
      if (!this.modalOpen) return;
      if (e.key === "Escape") this.closeModal();
      if (e.key === "ArrowLeft") this.modalPrev();
      if (e.key === "ArrowRight") this.modalNext();
    },

    // ── Zoom ──
    onWheel(e) {
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      this.scale = Math.min(4, Math.max(1, this.scale + delta));
      if (this.scale === 1) this.resetPan();
    },
    zoomIn() {
      this.scale = Math.min(4, this.scale + 0.5);
    },
    zoomOut() {
      this.scale = Math.max(1, this.scale - 0.5);
      if (this.scale === 1) this.resetPan();
    },
    resetZoom() {
      this.scale = 1;
      this.resetPan();
    },
    resetPan() {
      this.panX = 0;
      this.panY = 0;
    },

    // ── Mouse pan ──
    onMouseDown(e) {
      if (this.scale <= 1) return;
      this.isPanning = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    },
    onMouseMove(e) {
      if (!this.isPanning) return;
      this.panX += e.clientX - this.lastMouseX;
      this.panY += e.clientY - this.lastMouseY;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    },
    onMouseUp() {
      this.isPanning = false;
    },

    // ── Pinch to zoom & touch pan ──
    onTouchStart(e) {
      if (e.touches.length === 2) {
        this.lastPinchDist = this.getPinchDist(e.touches);
      } else if (e.touches.length === 1 && this.scale > 1) {
        this.isPanning = true;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
      }
    },
    onTouchMove(e) {
      if (e.touches.length === 2) {
        const dist = this.getPinchDist(e.touches);
        if (this.lastPinchDist) {
          const delta = (dist - this.lastPinchDist) * 0.01;
          this.scale = Math.min(4, Math.max(1, this.scale + delta));
          if (this.scale === 1) this.resetPan();
        }
        this.lastPinchDist = dist;
      } else if (e.touches.length === 1 && this.isPanning) {
        this.panX += e.touches[0].clientX - this.lastMouseX;
        this.panY += e.touches[0].clientY - this.lastMouseY;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
      }
    },
    onTouchEnd() {
      this.lastPinchDist = null;
      this.isPanning = false;
    },
    getPinchDist(touches) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    },
  },
};
</script>

<style scoped>
/* ── Section wrapper — matches other sections ── */
.design-system-section {
  max-width: 900px;
  margin: 0 auto;
  color: #1e2328;
  text-align: center;
  /* scroll animation */
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
  font-family: "Nunito Sans", sans-serif;
  line-height: 1.6;
  color: #1e2328;
  text-align: center;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* ── Carousel ── */
.carousel-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.carousel-track-container {
  overflow: hidden;
  flex: 1;
}

.carousel-track {
  display: flex;
  gap: 10px;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.carousel-slide {
  flex: 0 0 260px;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background-color: #f8faff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-slide:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.carousel-img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  object-position: center;
  display: block;
  padding: 0.75rem;
  box-sizing: border-box;
}

.carousel-caption {
  font-size: 1rem;
  font-family: "Nunito Sans", sans-serif;
  line-height: 1.5;
  color: #1e2328;
  padding: 0.5rem 0.75rem 1rem;
  text-align: center;
}

.carousel-arrow {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #f8faff;
  font-size: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e2328;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  line-height: 1;
}

.carousel-arrow:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.18);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
}

.dot--active {
  background: #1e2328;
  transform: scale(1.3);
}

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
  z-index: 10001;
  line-height: 1;
  opacity: 0.75;
  transition: opacity 0.2s;
}

.modal-close:hover {
  opacity: 1;
}

.modal-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  transition: background 0.2s;
  line-height: 1;
}

.modal-arrow:hover {
  background: rgba(255, 255, 255, 0.22);
}
.modal-arrow--prev {
  left: 1.25rem;
}
.modal-arrow--next {
  right: 1.25rem;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-height: 90vh;
}

.modal-img-wrapper {
  width: 100%;
  max-height: 76vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  user-select: none;
}

.modal-img {
  max-width: 100%;
  max-height: 76vh;
  object-fit: contain;
  display: block;
  transform-origin: center center;
  pointer-events: none;
}

.modal-caption {
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 0.75rem;
  text-align: center;
}

.zoom-controls {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.zoom-controls button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-controls button:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* ── Image + Text Block ── */
.image-text-block {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2.5rem;
  text-align: left;
  font-size: 1.1rem;
  font-family: "Nunito Sans", sans-serif;
}

.image-text-block__image {
  flex: 0 0 45%;
  max-width: 45%;
}

.it-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  display: block;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.it-caption {
  font-size: 1rem;
  color: #1e2328;
  margin-top: 0.5rem;
  text-align: center;
}

.image-text-block__text {
  flex: 1;
}

.it-heading {
  font-family: "Philosopher", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e2328;
  margin-bottom: 0.75rem;
}

.it-paragraph {
  font-size: 1rem;
  line-height: 1.5;
  color: #1e2328;
  margin-bottom: 15px;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .design-system-section {
    padding: 20px 15px;
  }

  .intro-paragraph {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .carousel-slide {
    flex: 0 0 220px;
  }

  .carousel-wrapper {
    gap: 0.25rem;
  }

  .carousel-arrow {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
  }

  .carousel-img {
    height: 160px;
  }

  .image-text-block {
    flex-direction: column;
  }

  .image-text-block__image {
    flex: none;
    max-width: 100%;
  }

  .it-paragraph {
    font-size: 0.95rem;
    margin-bottom: 10px;
  }

  .modal-arrow--prev {
    left: 0.25rem;
  }
  .modal-arrow--next {
    right: 0.25rem;
  }
}
</style>