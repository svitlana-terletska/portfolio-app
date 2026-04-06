<template>
  <div class="case-studies-page">
    <header class="page-header">
      <h1 class="page-title">Case Studies</h1>
      <p class="page-subtitle">A collection of my UX design work</p>
      <div class="header-line"></div>
    </header>

    <div class="cards-grid">
      <router-link
        v-for="(study, index) in allCaseStudies"
        :key="study.link"
        :to="study.link"
        class="case-card"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="card-thumb">
          <img :src="study.image" :alt="study.title" class="thumb-img" />
        </div>
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
  name: "CaseStudiesView",
  data() {
    return {
      allCaseStudies: [
        {
          title: "Vacation Planner Mobile App",
          description:
            "A vacation planner app that helps users organize trips, save places, and view distances from their hotel or current location for smarter, time-efficient travel decisions.",
          image: new URL("@/assets/Vacation2.png", import.meta.url).href,
          link: "/case-study/vacation",
        },
        {
          title: "Budgeting App and Website",
          description:
            "Designed a budgeting tool that integrates with user accounts, supports goal setting, and offers flexible, visual budgeting options for diverse financial needs.",
          image: new URL("@/assets/Budgeting.png", import.meta.url).href,
          link: "/case-study/budgeting",
        },
        {
          title: "Rabbitry Responsive Website",
          description:
            "Designed a user-friendly, responsive website to simplify bunny adoption and educate users on proper care.",
          image: new URL("@/assets/Rabbitry2.png", import.meta.url).href,
          link: "/case-study/rabbitry",
        },
        {
          title: "Real Estate Mobile Application",
          description:
            "A real estate platform that streamlines home search with location insights, commute data, and smart filters for faster, informed decisions.",
          image: new URL("@/assets/realestate-mockup.png", import.meta.url)
            .href,
          link: "/case-study/real-estate",
        },
        {
          title: "Medical Treatment Cost Feature ",
          description:
            "Redesigned an insurance platform to improve cost transparency, accuracy, and user experience in estimating medical expenses.",
          image: new URL("@/assets/medical-caseStudy.png", import.meta.url)
            .href,
          link: "/case-study/medical",
        },
      ],
    };
  },
};
</script>

<style scoped>
.case-studies-page {
  min-height: 100vh;
  background-color: #1e2328;
  padding: 7rem 4rem 4rem;
  box-sizing: border-box;
}

/* ── Header ── */
.page-header {
  margin-bottom: 3rem;
  animation: fadeUp 0.6s ease-out forwards;
}

.page-title {
  font-family: "Philosopher", serif;
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.92);
  margin: 0 0 0.4rem;
}

.page-subtitle {
  font-family: "Nunito Sans", sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0 0 1.5rem;
}

.header-line {
  height: 1px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.15), transparent);
}

/* ── Grid ── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

/* ── Card ── */
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

  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.5s ease-out forwards;

  transition: border-color 0.25s ease, transform 0.25s ease,
    box-shadow 0.25s ease;
}

.case-card:hover {
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
}

.case-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-style: solid;
  border-width: 0 24px 24px 0;
  border-color: transparent rgba(102, 204, 255, 0.3) transparent transparent;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.case-card:hover::after {
  opacity: 1;
}

/* ── Thumbnail ── */
.card-thumb {
  width: 100%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.02);
  box-sizing: border-box;
}

.thumb-img {
  max-width: 100%;
  max-height: 160px;
  width: auto;
  height: auto;
  display: block;
  transition: transform 0.4s ease;
  filter: brightness(0.92);
}

.case-card:hover .thumb-img {
  transform: scale(1.03);
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
  font-size: 0.62rem;
  color: rgba(102, 204, 255, 0.6);
  letter-spacing: 0.1em;
  font-weight: 700;
}

.card-title {
  font-family: "Philosopher", serif;
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
  margin: 0;
  line-height: 1.3;
}

.card-desc {
  font-family: "Nunito Sans", sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
  margin: 0;
  flex: 1;
}

.card-cta {
  font-family: "Nunito Sans", sans-serif;
  font-size: 0.7rem;
  color: rgba(102, 204, 255, 0.5);
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
  transition: color 0.2s ease;
}

.case-card:hover .card-cta {
  color: rgba(102, 204, 255, 0.9);
}

/* ── Animation ── */
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .case-studies-page {
    padding: 5rem 1.25rem 2rem;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>