<template>
  <div class="case-studies-panel">
    <div class="panel-header do-animate">
      <h2 class="panel-label">Case Studies</h2>
      <div class="header-line"></div>
    </div>

    <div class="cards-grid">
      <router-link
        v-for="(study, index) in displayedStudies"
        :key="study.link"
        :to="study.link"
        class="case-card do-animate"
        :style="{ animationDelay: `${2.5 + index * 2.1}s` }"
      >
        <!-- Thumbnail -->
        <div class="card-thumb">
          <img :src="study.image" :alt="study.title" class="thumb-img" />
        </div>

        <!-- Content -->
        <div class="card-body">
          <span class="card-index">0{{ index + 1 }}</span>
          <h3 class="card-title">{{ study.title }}</h3>
          <p class="card-desc">{{ study.description }}</p>
          <span class="card-cta">View Case Study →</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CaseStudyCards",

  data() {
    return {
      allCaseStudies: [
        {
          title: "Vacation Planner App",
          description:
            "A mobile app helping users organize trips, save places, and view distances for smarter, time-efficient travel decisions.",
          image: new URL("@/assets/vacation-thumbnail.png", import.meta.url)
            .href,
          link: "/case-study/vacation",
        },
        {
          title: "Budgeting App & Website",
          description:
            "A budgeting tool with account integration, goal setting, and flexible visual budgeting for diverse financial needs.",
          image: new URL("@/assets/budgeting-thumbnail.png", import.meta.url)
            .href,
          link: "/case-study/budgeting",
        },
        {
          title: "Rabbitry Responsive Website",
          description:
            "A user-friendly, responsive website to simplify bunny adoption and educate users on proper care.",
          image: new URL("@/assets/rabbitry-thumbnail.png", import.meta.url)
            .href,
          link: "/case-study/rabbitry",
        },
        {
          title: "Real Estate Mobile App",
          description:
            "A platform streamlining home search with location insights, commute data, and smart filters for faster decisions.",
          image: new URL("@/assets/realestate-thumbnail.png", import.meta.url)
            .href,
          link: "/case-study/real-estate",
        },
      ],
    };
  },
  computed: {
    displayedStudies() {
      return this.allCaseStudies.slice(0, 4);
    },
  },
};
</script>

<style scoped>
/*  Panel  */
.case-studies-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 1.5rem 2.5rem;
  box-sizing: border-box;
  background-color: #1e2328;
  overflow-y: auto;
}

/* ── Header ── */
.panel-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  opacity: 0;
}

.panel-header.do-animate {
  animation: fadeIn 0.6s ease-out forwards;
  animation-delay: 1s;
}

.panel-label {
  font-family: "Philosopher", serif;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
  white-space: nowrap;
  margin: 0;
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.15), transparent);
}

/*  2×2 Grid  */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  flex: 1;
  min-height: 0;
}

/* ── Card base — hidden until video ends ── */
.case-card {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  position: relative;

  /* Starts invisible; animationDelay set via :style */
  opacity: 0;
  transform: translateY(24px);

  transition: border-color 0.25s ease, transform 0.25s ease,
    box-shadow 0.25s ease;
}

/* Animate in only when .do-animate is added */
.case-card.do-animate {
  animation: cardReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* Prevent hover transform from clashing with entry animation */
.case-card.do-animate:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
}

/* Corner accent on hover */
.case-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 28px 28px 0;
  border-color: transparent rgba(102, 204, 255, 0.35) transparent transparent;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.case-card:hover::after {
  opacity: 1;
}

@keyframes cardReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Thumbnail ── */
.card-thumb {
  height: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.thumb-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

.case-card:hover .thumb-img {
  transform: scale(1.04);
  filter: brightness(1);
}

/* ── Card Body ── */
.card-body {
  flex: 1;
  padding: 0.9rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.card-index {
  font-family: "Nunito Sans", sans-serif;
  font-size: 0.65rem;
  color: rgba(102, 204, 255, 0.6);
  letter-spacing: 0.1em;
  font-weight: 700;
}

.card-title {
  font-family: "Philosopher", serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
  margin: 0;
  line-height: 1.3;
}

.card-desc {
  font-family: "Nunito Sans", sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-cta {
  font-family: "Nunito Sans", sans-serif;
  font-size: 0.7rem;
  color: rgba(102, 204, 255, 0.5);
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-top: auto;
  transition: color 0.2s ease;
}

.case-card:hover .card-cta {
  color: rgba(102, 204, 255, 0.9);
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* ── Scrollbar ── */
.case-studies-panel::-webkit-scrollbar {
  width: 4px;
}
.case-studies-panel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .case-studies-panel {
    height: auto;
    padding: 2rem 1.25rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .card-thumb {
    height: 200px;
  }
}

@media (max-width: 1200px) {
  .card-title {
    font-size: 0.82rem;
  }

  .card-desc {
    font-size: 0.7rem;
  }
}
</style>