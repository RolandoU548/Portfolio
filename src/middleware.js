export function onRequest({ url, request, redirect }) {
  if (url.pathname === "/") {
    const langHeader = request.headers.get("accept-language");
    const lang = langHeader?.split(",")[0].split("-")[0] || "es";
    return redirect(lang === "en" ? "/en" : "/es", 302);
  }
  return; // 👈 importante
}
