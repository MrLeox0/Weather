const API_KEY = '2cd41f2d93b2eef71985ff0c19debd12';
function obtenerEmoji(clima) {
  clima = clima.toLowerCase();
  if (clima.includes("lluvia")) return "🌧️";
  if (clima.includes("nubes")) return "☁️";
  if (clima.includes("sol") || clima.includes("despejado")) return "☀️";
  if (clima.includes("tormenta")) return "⛈️";
  return "🌤️";
}

function obtenerClima() {
  const ciudadInput = document.getElementById("ciudad").value.trim();

  if (ciudadInput === "") {
    alert("Por favor escribe una ciudad.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadInput}&appid=${API_KEY}&units=metric&lang=es`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const humedad = data.main.humidity;
      const viento = data.wind.speed;
      const descripcion = data.weather[0].description;
      const emoji = obtenerEmoji(descripcion);

      // Mostrar en cada tarjeta
      const items = document.querySelectorAll(".p-item");
    items.forEach((item, index) => {
        item.querySelector(".Dia").textContent = index === 0 ? "Hoy" : `Día ${index + 1}`;
        item.querySelector(".emoji").textContent = emoji;
        item.querySelector(".temp").textContent = `🌡️ ${temp} °C`;
        item.querySelector(".viento").textContent = `💨 ${viento} m/s`;
        item.querySelector(".humedad").textContent = `💧 ${humedad} %`;
});

    })
    .catch(error => {
      console.error("❌ Error al obtener los datos del clima:", error);
      alert("No se pudo obtener el clima. Verifica el nombre de la ciudad.");
    });
}
window.addEventListener("DOMContentLoaded", () => {
  obtenerClima(); 
});

