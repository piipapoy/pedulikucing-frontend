<template>
  <Navbar />

  <RouterView />

  </template>

<script>
// Pake Options API biar konsisten sama Navbar.vue lo
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue' // Pastiin path ini bener
// import Footer from './components/Footer.vue'

export default {
  components: {
    RouterView,
    Navbar,
    // Footer
  }
}
</script>

<style>
/* CSS Global lo bisa ditaro di sini atau di file .css terpisah
  (misal: import './assets/main.css')
/* Di dalem <style> di App.vue */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Source Serif Pro', serif;
  background-color: #f8f9fa; /* <-- INI DIA LATAR BELAKANG ABU-ABUNYA */
}

:root {
  --primary-color: #0b4f4a; 
  --text-color: #2d2d2d;
  --bg-color: #ffffff;
  --bg-color-light: #f8f9fa;
}
</style>