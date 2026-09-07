import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip Studio, API, Next internals, files with extensions and generated
  // metadata images (their URLs already carry the locale segment).
  matcher: ["/((?!studio|api|_next|.*\\..*|.*opengraph-image.*|.*twitter-image.*).*)"],
};
