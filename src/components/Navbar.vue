<template>
  <nav class="navbar">
    
    <div class="navbar-left">
      <a href="/" class="navbar-brand">
        <img src="../assets/Logo.png" alt="Peduli Kucing Logo" class="logo" />
      </a>
      
      <div :class="['nav-content-wrapper', { 'is-open': isMenuOpen }]">
          
          <ul class="navbar-links">
            <li><a href="/komunitas">Komunitas</a></li>
            <li><a href="/adopsi">Adopsi</a></li>
            <li><a href="/tentang-kami">Tentang Kami</a></li>
          </ul>

          <div class="navbar-right-mobile">
            <a href="/donasi" class="btn btn-mobile">Donasi</a>
            <a href="/login" class="btn btn-mobile">Masuk / Daftar</a>
          </div>
      </div>
    </div>
    
    <button class="hamburger-btn" @click="toggleMenu">
      &#9776; </button>
    
    <div class="navbar-right">
      <a href="/donasi" class="btn">Donasi</a>
      <a href="/login" class="btn">Masuk / Daftar</a>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style>
:root {
  --primary-color: #0b4f4a;
  --text-color: #2d2d2d;
  --bg-color: #ffffff;
}

/* --- DEKSTOP STYLES (Default) --- */

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-color);
  padding: 1.5rem 4rem; 
  font-family: 'Source Serif Pro', serif;
  width: 100%;
  box-sizing: border-box;
}
.navbar-left {
  display: flex;
  align-items: center;
}
.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);
  margin-right: 3rem;
}
.logo {
  width: 100px;
  height: 40px;
}
.nav-content-wrapper {
    display: flex;
    align-items: center;
}
.navbar-links {
  display: flex;
  list-style: none;
  gap: 3rem;
  margin: 0;
  padding : 0;
}
.navbar-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.1s;
}
.navbar-links a:hover {
  color: var(--primary-color);
}
.navbar-right {
  display: flex;
  gap: 1rem;
}
.btn {
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  font-weight: 600;
  color: #fff;
  background-color: var(--primary-color);
  transition: opacity 0.1s ease;
}
.btn:hover {
  opacity: 0.80;
}
.hamburger-btn, .navbar-right-mobile {
    display: none; 
}


/* --- MOBILE STYLES (Media Query) --- */
@media (max-width: 992px) {
    
    .navbar {
        padding: 1rem 1rem; 
    }
    
    .hamburger-btn {
        display: block; 
        background: none;
        border: none;
        font-size: 1.8rem;
        cursor: pointer;
        color: var(--primary-color);
        padding: 0.5rem;
        order: 2; 
    }
    
    .navbar-right {
        display: none; 
    }
    
    .nav-content-wrapper {
        display: none; 
        
        position: absolute;
        top: 66px; 
        left: 0;
        width: 100%;
        background-color: var(--bg-color);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        flex-direction: column;
        z-index: 100;
        transition: transform 0.3s ease-in-out;
    }
    .nav-content-wrapper.is-open {
        display: flex; 
    }
    
    .navbar-links {
        flex-direction: column;
        gap: 0; 
        width: 100%;
        border-bottom: 1px solid #f3f4f6;
        padding-top: 0.5rem;
    }
    .navbar-links li {
        padding: 0.75rem 1rem;
    }
    .navbar-links li:hover {
        background-color: #f9fafb;
    }
    .navbar-links a {
        display: block;
        font-weight: 600;
    }
    
    .navbar-right-mobile {
        display: flex; 
        flex-direction: column;
        gap: 0.75rem;
        padding: 1rem;
        width: 100%;
        align-items: center;
    }
    .btn-mobile {
        width: 90%; 
        text-align: center;
    }
}
</style>