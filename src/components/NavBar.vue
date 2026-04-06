<template>
  <nav
    class="navbar"
    :class="{
      'navbar-hidden': !isVisible,
      'navbar-scrolled': !isAtTop,
    }"
  >
    <router-link to="/" class="logo-link">
      <img
        src="@/assets/my-logo.svg"
        alt="Logo"
        class="logo"
        :class="{ 'logo-scrolled': !isAtTop }"
      />
      <span class="logo-name" :class="{ 'logo-name-scrolled': !isAtTop }">
        Svitlana Terletska
      </span>
    </router-link>

    <ul class="nav-links">
      <li><router-link to="/case-studies">Case Studies</router-link></li>
      <li><router-link to="/graphics">Graphics</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      lastScrollY: 0,
      isVisible: true,
      isAtTop: true,
      scrollThreshold: 110, // How many pixels to scroll before hiding/showing the navbar
      colorChangeScrollThreshold: 83, // New: How many pixels to scroll before changing color/background
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollY = window.scrollY;

      if (
        currentScrollY > this.lastScrollY &&
        currentScrollY > this.scrollThreshold
      ) {
        this.isVisible = false;
      } else if (
        currentScrollY < this.lastScrollY ||
        currentScrollY <= this.scrollThreshold
      ) {
        this.isVisible = true;
      }

      this.isAtTop = currentScrollY <= this.colorChangeScrollThreshold;

      this.lastScrollY = currentScrollY;
    },
  },
};
</script>

<style scoped>
.navbar {
  font-family: "Philosopher", sans-serif;
  font-weight: 400;
  font-style: normal;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;

  /* Default state (at top of page) */
  background: rgba(255, 255, 255, 0.1);
  box-shadow: none; /* No shadow */
  border-bottom: 1px solid rgba(255, 255, 255, 0.62);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  /* Add transitions for smooth hide/show, and also for background/box-shadow/border */
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out,
    background 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    border-color 0.3s ease-in-out;
}

/* State when the navbar is scrolled down (and visible) */
.navbar.navbar-scrolled {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

/* Class applied when the navbar should be hidden */
.navbar-hidden {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}

/* Default link color when at top of page */
.nav-links a {
  position: relative;
  text-decoration: none;
  color: #fff;
  padding-bottom: 4px;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

/* Link color when scrolled down and navbar is visible */
.navbar-scrolled .nav-links a {
  color: #1e2328;
}

.logo-link {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  width: auto;
  /* Add a filter for color change. This assumes a white logo. */
  filter: brightness(100%);
  transition: filter 0.3s ease;
}
.logo-name {
  color: #fff;
  margin-left: 1rem;
  text-decoration: none;
}
.logo-name-scrolled {
  color: #1e2328;
}

/* Logo color when scrolled down and navbar is visible */
.logo-scrolled {
  filter: brightness(0) invert(0);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

/*Nav links animation*/
.nav-links li {
  position: relative;
}

/* Underline as a dot-to-line animation */
.nav-links a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 3px;
  width: 3px;
  background: linear-gradient(
    42deg,
    rgba(255, 255, 153, 1) 0%,
    rgba(255, 216, 0, 1) 35%,
    rgba(102, 204, 255, 1) 80%,
    rgba(41, 86, 109, 1) 100%
  );
  border-radius: 50%;
  transition: width 0.4s ease, border-radius 0.3s ease, left 0.4s ease,
    transform 0.4s ease;
  opacity: 0;
}

.nav-links a:hover::after {
  width: 100%;
  left: 0;
  transform: translateX(0);
  border-radius: 0;
  opacity: 1;
}

/* Responsive stacking on smaller screens */
@media (max-width: 768px) {
  .nav-links {
    gap: 1rem;
  }
}
.navbar {
  padding: 1rem 1rem;
}
</style>
