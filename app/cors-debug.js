// cors-debug.js
// Ejecuta este código en la consola del navegador para diagnosticar el problema

// Prueba 1: Verificar si el backend responde a peticiones simples
console.log("=== TEST 1: Verificar si el backend responde ===");
fetch("http://creixem-backend-82880309907.europe-west1.run.app/healthz", {
  method: "GET",
  mode: "no-cors" // Intentar con no-cors primero para ver si al menos hay respuesta
})
.then(response => {
  console.log("✅ El servidor responde (modo no-cors)");
  console.log("Tipo de respuesta:", response.type);
})
.catch(error => {
  console.error("❌ Error conectando con el servidor:", error);
});

// Prueba 2: Verificar qué URL funciona (HTTP vs HTTPS)
console.log("\n=== TEST 2: Probar HTTP vs HTTPS ===");
const urls = [
  "http://creixem-backend-82880309907.europe-west1.run.app/healthz",
  "https://creixem-backend-82880309907.europe-west1.run.app/healthz"
];

urls.forEach(url => {
  console.log(`Probando: ${url}`);
  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" }
  })
  .then(response => {
    console.log(`✅ URL ${url} funciona!`);
    console.log("Status:", response.status);
    console.log("Tipo:", response.type);
  })
  .catch(error => {
    console.error(`❌ URL ${url} falla:`, error);
  });
});

// Prueba 3: Verificar si hay redirección
console.log("\n=== TEST 3: Verificar redirecciones ===");
fetch("https://creixem-backend-82880309907.europe-west1.run.app/healthz", {
  method: "GET",
  mode: "cors",
  redirect: "manual" // Esto nos permite detectar redirecciones
})
.then(response => {
  console.log("Respuesta con redirect:manual:");
  console.log("- Type:", response.type);
  console.log("- Status:", response.status);
  console.log("- URL:", response.url);
  
  if (response.type === "opaqueredirect") {
    console.log("⚠️ Se detectó redirección - este es probablemente el problema");
  }
})
.catch(error => {
  console.error("Error en prueba de redirección:", error);
});

// Prueba 4: Simular la petición OPTIONS (preflight)
console.log("\n=== TEST 4: Simular preflight OPTIONS ===");
fetch("http://creixem-backend-82880309907.europe-west1.run.app/agents", {
  method: "OPTIONS",
  headers: {
    "Access-Control-Request-Method": "POST",
    "Access-Control-Request-Headers": "Content-Type",
    "Origin": "http://localhost:3000"
  }
})
.then(response => {
  console.log("Respuesta OPTIONS:");
  console.log("- Status:", response.status);
  response.headers.forEach((value, key) => {
    if (key.startsWith("access-control")) {
      console.log(`- ${key}: ${value}`);
    }
  });
})
.catch(error => {
  console.error("❌ Error en preflight:", error);
  console.log("Esto confirma que hay un problema con OPTIONS");
});

// Prueba 5: Hacer una petición POST directa pero simplificada
console.log("\n=== TEST 5: POST directo simplificado ===");
fetch("http://creixem-backend-82880309907.europe-west1.run.app/agents", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "test": "data"
  }),
  mode: "cors"
})
.then(response => {
  console.log("POST resultado:");
  console.log("- Status:", response.status);
  console.log("- OK:", response.ok);
})
.catch(error => {
  console.error("❌ Error en POST:", error);
});

console.log("\n== Instrucciones ==");
console.log("Ejecuta este script en la consola del navegador");
console.log("Revisa los resultados para identificar qué prueba falla");
console.log("Esto nos ayudará a determinar la solución exacta");