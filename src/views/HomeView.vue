<template>
  <div class="home-layout">
    <IntroSection
      class="left-panel"
      :video-ended="videoEnded"
      @video-ended="onVideoEnded"
    />
    <CaseStudyCards class="right-panel" :video-ended="videoEnded" />
  </div>
</template>

<script>
import IntroSection from "@/components/IntroSection.vue";
import CaseStudyCards from "@/components/CaseStudyCards.vue";

export default {
  name: "HomeView",
  components: {
    IntroSection,
    CaseStudyCards,
  },
  data() {
    return {
      videoEnded: false,
    };
  },
  methods: {
    onVideoEnded() {
      this.videoEnded = true;
    },
  },
};
</script>

<style scoped>
.home-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
  background-color: #1e2328;
}

.left-panel {
  flex: 0 0 45%;
  max-width: 45%;
  height: 100%;
  overflow: hidden;
}

.right-panel {
  flex: 0 0 55%;
  max-width: 55%;
  height: 100%;
  overflow-y: auto;
}

/* Hide scrollbar but keep functionality */
.right-panel::-webkit-scrollbar {
  width: 4px;
}
.right-panel::-webkit-scrollbar-track {
  background: transparent;
}
.right-panel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}

@media (max-width: 900px) {
  .home-layout {
    flex-direction: column;
    height: auto;
    overflow: visible;
  }

  .left-panel,
  .right-panel {
    flex: none;
    max-width: 100%;
    width: 100%;
    height: auto;
    overflow: visible;
  }
}
</style>