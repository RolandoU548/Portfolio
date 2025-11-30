export const onRequest = ({ request, redirect }) => {
  // Obtenemos el idioma preferido del navegador
  const lang =
    request.headers.get("accept-language")?.split(",")[0].split("-")[0] || "en";

  const url = new URL(request.url);
  if (url.pathname === "/") {
    // Redirigimos automáticamente al idioma detectado
    if (lang === "en") {
      return redirect("/en", 302);
    } else {
      return redirect("/es", 302);
    }
  }
};
