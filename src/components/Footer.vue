<template>
  <footer class="footer">
    <div class="container">
      <div class="row gy-4 text-center text-md-start">
        <!-- Enlaces -->
        <div class="col-12 col-md-4">
          <h5 class="footer-title">Explora</h5>
          <ul class="list-unstyled footer-links">
            <li>
              <router-link to="/" class="d-flex align-items-center justify-content-center justify-content-md-start">
                <i class="bi bi-house-door me-2"></i>Inicio
              </router-link>
            </li>
            <li>
              <router-link to="/servicios" class="d-flex align-items-center justify-content-center justify-content-md-start">
                <i class="bi bi-grid me-2"></i>Servicios
              </router-link>
            </li>
            <li>
              <router-link to="/sobre-nosotros" class="d-flex align-items-center justify-content-center justify-content-md-start">
                <i class="bi bi-people me-2"></i>Sobre Nosotros
              </router-link>
            </li>
            <li>
              <router-link to="/contactanos" class="d-flex align-items-center justify-content-center justify-content-md-start">
                <i class="bi bi-envelope me-2"></i>Contáctanos
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Redes sociales -->
        <div class="col-12 col-md-4">
          <h5 class="footer-title">Nuestras redes sociales</h5>
          <div class="d-flex justify-content-center justify-content-md-start gap-4">
            <a href="https://www.instagram.com/axowebdigital/" class="social-icon-link"><i class="bi bi-instagram"></i></a>
            <a href="https://x.com/AxoWeb" class="social-icon-link"><i class="bi bi-twitter"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61576092148011&mibextid=qi2Omg&rdid=Bt3VHdkfI21fy0sf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15ZUmjNasM%2F%3Fmibextid%3Dqi2Omg#" class="social-icon-link"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-icon-link"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>

        <!-- Logo -->
        <div class="col-12 col-md-4 text-center text-md-end">
          <div class="d-flex justify-content-center justify-content-md-end mb-3">
            <router-link to="/" class="footer-logo rounded-circle bg-white p-2 d-flex align-items-center justify-content-center">
              <img
                src="https://i.pinimg.com/736x/88/4a/8e/884a8ed8ebfa49841a40ab82b1b70965.jpg"
                alt="AxoWeb Logo"
                class="rounded-logo-footer"
              />
            </router-link>
          </div>
          <p class="company-name">Axo Web Digital</p>
          <p class="copyright-text">© 2024 Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #1d3557;
  color: #fff;
  padding: 40px 0;
}

.footer-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #fff;
}

.social-icon-link {
  font-size: 1.6rem;
  color: #ccc;
  transition: color 0.3s;
}

.social-icon-link:hover {
  color: #fff;
}

.footer-logo {
  width: 70px;
  height: 70px;
  overflow: hidden;
}

.rounded-logo-footer {
  width: 100%;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
}

.company-name {
  font-weight: bold;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .footer {
    text-align: center;
  }
}
</style>
