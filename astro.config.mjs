import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.date-fns.org",
  integrations: [mdx(), sitemap(), tailwind()],
  redirects: {
    "/post/ecmascript-modules-in-date-fns-v2-i1v007ou81rm": "/v2-esm",
    "/post/unicode-tokens-in-date-fns-v2-sreatyki91jg": "/v2-unicode-tokens",
    "/post/fp-in-date-fns-v2-3vlg53s8y5d3i": "/v2-fp",
    "/post/date-fns-v2-goals-and-values-3q4uj0mon4lhp": "/v2-goals-and-values",
    "/post/v2-api-design-stick-to-javascript-behavior-whenever-possible-3aaps6i6yjkg3":
      "/v2-api-design",
    "/post/v2-api-design-stick-to-existing-standards-2dpigcwprs69u/":
      "/v2-api-standards",
    "/post/v200-alpha26-is-out-2rizgx9wk2g1t/": "/v2-0-0-alpha-26/",
    "/post/v130-is-out-m35nqh4m13r7/": "/v1-30-0/",
    "/post/we-cut-date-fns-v2-minimal-build-size-down-to-300-bytes-and-now-its-the-smallest-date-library-18f2nvh2z0yal/":
      "/300-bytes",
  },
});
