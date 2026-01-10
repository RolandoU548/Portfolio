import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_DQ-fSE6W.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_9dA0eL8C.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/rolando/Desktop/Portfolio/","cacheDir":"file:///home/rolando/Desktop/Portfolio/node_modules/.astro/","outDir":"file:///home/rolando/Desktop/Portfolio/dist/","srcDir":"file:///home/rolando/Desktop/Portfolio/src/","publicDir":"file:///home/rolando/Desktop/Portfolio/public/","buildClientDir":"file:///home/rolando/Desktop/Portfolio/dist/client/","buildServerDir":"file:///home/rolando/Desktop/Portfolio/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"fallback","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://rolandouzcategui.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/rolando/Desktop/Portfolio/src/pages/[lang]/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/rolando/Desktop/Portfolio/src/components/Projects.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/[lang]/index@_@astro":"pages/_lang_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C2C9JwpX.mjs","/home/rolando/Desktop/Portfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BWlnUKVx.mjs","/home/rolando/Desktop/Portfolio/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/home/rolando/Desktop/Portfolio/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_Y1lyIrkJ.mjs","/home/rolando/Desktop/Portfolio/src/components/Header.tsx":"_astro/Header.D6Zc0FXx.js","/home/rolando/Desktop/Portfolio/src/components/Skills.js":"_astro/Skills.Bm9qDSkW.js","@astrojs/react/client.js":"_astro/client.BPIbHqJh.js","/home/rolando/Desktop/Portfolio/src/components/Home.astro?astro&type=script&index=0&lang.ts":"_astro/Home.astro_astro_type_script_index_0_lang.BpKSQlHV.js","/home/rolando/Desktop/Portfolio/src/components/Contact.astro?astro&type=script&index=0&lang.ts":"_astro/Contact.astro_astro_type_script_index_0_lang.Cn2idOA9.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/rolando/Desktop/Portfolio/src/components/Home.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\".parent\"),c=document.querySelector(\".right-shadow\"),n=document.querySelector(\".left-shadow\");e&&c&&n&&e.addEventListener(\"mousemove\",s=>{const t=e.getBoundingClientRect(),o=(s.clientX-t.left)/t.width;c.style.opacity=`${o}`,n.style.opacity=`${1-o}`});"],["/home/rolando/Desktop/Portfolio/src/components/Contact.astro?astro&type=script&index=0&lang.ts","(function(){const a=document.querySelector(\"#contact\"),r=a?.dataset.copied,l=a?.dataset.error;document.querySelectorAll(\".mail-bubble\").forEach(s=>{const e=s;e.addEventListener(\"click\",()=>{const n=e.dataset.email||\"rolandou548@gmail.com\";navigator.clipboard.writeText(n).then(()=>alert(r)).catch(t=>{console.error(\"Error al copiar\",t),alert(l)})})}),document.querySelector(\"form\")?.addEventListener(\"submit\",async function(s){s.preventDefault();const e=this,n={name:e.elements.namedItem(\"name\")?.value||\"\",email:e.elements.namedItem(\"email\")?.value||\"\",subject:e.elements.namedItem(\"subject\")?.value||\"\",message:e.elements.namedItem(\"message\")?.value||\"\",lang:a?.dataset.lang||\"en\"};try{const o=await(await fetch(void 0,{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(n)})).json();o.success?(alert(\"Message sent successfully!\"),e.reset()):alert(\"Error: \"+(o.message||\"Failed to send message\"))}catch(t){alert(\"Failed to send message. Please try again later.\"),console.error(t)}})})();"]],"assets":["/_astro/index.CWPjTSwP.css","/c2.jpg","/dibuart.jpg","/favicon.svg","/robots.txt","/sero.jpg","/smart-pago-movil.jpg","/_astro/Header.D6Zc0FXx.js","/_astro/Skills.Bm9qDSkW.js","/_astro/client.BPIbHqJh.js","/_astro/index.BVOCwoKb.js","/_astro/utils.DP06mUib.js","/logos/astro.svg","/logos/css.svg","/logos/express.svg","/logos/fabric.svg","/logos/firebase.svg","/logos/framer-motion.svg","/logos/handsontable.svg","/logos/html.svg","/logos/i18next.svg","/logos/javascript.svg","/logos/mongodb.svg","/logos/nextjs.svg","/logos/nodejs.svg","/logos/prisma.svg","/logos/react.svg","/logos/reactHookForm.svg","/logos/redux.svg","/logos/sass.svg","/logos/shadcn.svg","/logos/tailwind.svg","/logos/typescript.svg"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-always","locales":["en","es"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"uJnQy7hdltgeljFxYhsOnET7otPB9o2Wyr0wyoBprrQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
