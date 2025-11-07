<template>
  <nav class="navbar">
    <div class="navbar-left">
      <a href="/" class="navbar-brand">
        <img src="../assets/Logo.png" alt="Peduli Kucing Logo" class="logo" />
      </a>
      <ul class="navbar-links">
        <li><a href="/komunitas">Komunitas</a></li>
        <li><a href="/adopsi">Adopsi</a></li>
        <li><a href="/tentang-kami">Tentang Kami</a></li>
      </ul>
    </div>
    <div class="navbar-right">
      <a href="/donasi" class="btn">Donasi</a>
      <a href="/login" class="btn">Masuk / Daftar</a>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar'
}
</script>
<style>
:root {
  --primary-color: #0b4f4a;
  --text-color: #2d2d2d;
  --bg-color: #ffffff;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-color);
  padding: 2rem 4rem;
  font-family: 'Source Serif Pro', serif;
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
</style>
