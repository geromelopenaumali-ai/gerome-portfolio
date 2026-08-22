import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SmoothLayer } from "../components/SmoothLayer";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gerome Umali — AI Automation Specialist" },
      { property: "og:title", content: "Gerome Umali — AI Automation Specialist" },
      { name: "twitter:title", content: "Gerome Umali — AI Automation Specialist" },
      { name: "description", content: "Portfolio of Gerome Umali — builder of production-grade Claude MCP servers, AI agent systems, and autonomous multi-agent pipelines." },
      { property: "og:description", content: "Portfolio of Gerome Umali — builder of production-grade Claude MCP servers, AI agent systems, and autonomous multi-agent pipelines." },
      { name: "twitter:description", content: "Portfolio of Gerome Umali — builder of production-grade Claude MCP servers, AI agent systems, and autonomous multi-agent pipelines." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1867a718-af99-4c2b-9ebb-e39bfcb307a3/id-preview-142fc662--441a709a-ecf9-4c9a-be1d-eb90b9d32731.lovable.app-1784795826873.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1867a718-af99-4c2b-9ebb-e39bfcb307a3/id-preview-142fc662--441a709a-ecf9-4c9a-be1d-eb90b9d32731.lovable.app-1784795826873.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        href: "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Work+Sans:wght@300;400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico?v=gerome-g-circle", type: "image/x-icon", sizes: "any" },
      { rel: "icon", href: "/favicon-32.png?v=gerome-g-circle", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16.png?v=gerome-g-circle", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=gerome-g-circle", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const criticalHeroStyles = `
.v-automation-reference-figure{display:block;width:100%;margin:4px 0 0}
.v-automation-visual{position:relative;min-height:480px;overflow:hidden;border:1px solid rgba(223,230,232,.16);border-radius:4px;background:radial-gradient(circle at 51% 52%,rgba(151,183,193,.08),transparent 25%),#151719;isolation:isolate}
.v-automation-topline{position:absolute;top:18px;right:18px;left:18px;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:12px;color:rgba(207,217,219,.55);font:9px/1.4 monospace;letter-spacing:.12em;text-transform:uppercase}
.v-automation-status{color:#9bb7c1}.v-automation-status i{display:inline-block;width:5px;height:5px;margin-right:5px;border-radius:50%;background:#9bb7c1;box-shadow:0 0 9px rgba(151,183,193,.62);opacity:.72;transform:scale(.88);animation:v-control-room-reference-status 2.6s ease-in-out infinite;animation-delay:-1.3s;animation-fill-mode:both}
.v-control-room-reference{position:relative;min-height:480px;overflow:hidden}
.v-control-room-reference-stage{position:absolute;top:62px;right:22px;bottom:62px;left:22px;isolation:isolate}
.v-control-room-reference-column,.v-control-room-reference-core{position:absolute;z-index:2}
.v-control-room-reference-inputs{top:0;left:0;width:24%}.v-control-room-reference-core{top:19%;left:34%;width:25%}.v-control-room-reference-actions{top:9%;left:62%;width:19%}.v-control-room-reference-outputs{top:9%;left:84%;width:16%}
.v-control-room-reference-column-label,.v-control-room-reference-core-label{display:block;margin-bottom:11px;color:rgba(207,217,219,.55);font:8px/1.2 monospace;letter-spacing:.12em;text-transform:uppercase}
.v-control-room-reference-node-stack{display:grid;gap:10px}.v-control-room-reference-node{position:relative;display:grid;min-height:58px;grid-template-columns:minmax(0,1fr);grid-template-rows:auto auto;align-items:center;padding:9px 10px 8px;border:1px solid rgba(184,197,201,.24);border-radius:3px;background:rgba(9,11,13,.96);box-shadow:inset 0 1px 0 rgba(255,255,255,.045),inset 0 0 0 1px rgba(0,0,0,.22)}
.v-control-room-reference-node-glyph{position:absolute;top:50%;left:9px;z-index:1;color:rgba(207,217,219,.78);font:12px/1 monospace;transform:translateY(-50%)}
.v-control-room-reference-node strong,.v-control-room-reference-node small{grid-column:1;width:100%;padding-inline:13px 6px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v-control-room-reference-node strong{color:rgba(242,245,245,.92);font:600 8px/1.2 monospace;letter-spacing:.06em}.v-control-room-reference-node small{color:rgba(207,217,219,.58);font:8px/1.2 monospace}
.v-control-room-reference-core{display:flex;min-height:174px;flex-direction:column;align-items:center;justify-content:center;padding:18px 10px}.v-control-room-reference-core-label{margin-bottom:14px;text-align:center}.v-control-room-reference-core-orbit{position:relative;display:grid;width:96px;height:96px;place-items:center;border:1px dotted rgba(207,217,219,.35);border-radius:50%;background:radial-gradient(circle,rgba(151,183,193,.19),rgba(151,183,193,.035) 57%,transparent 58%);  box-shadow:0 0 0 12px rgba(151,183,193,.025),0 0 42px -12px #9bb7c1;transform:translateY(-2px);animation:v-control-room-reference-breathe 5.6s ease-in-out infinite;animation-delay:-2.8s;animation-fill-mode:both}.v-control-room-reference-core-orbit:before,.v-control-room-reference-core-orbit:after{position:absolute;border:1px solid rgba(207,217,219,.16);border-radius:50%;content:""}.v-control-room-reference-core-orbit:before{inset:18px}.v-control-room-reference-core-orbit:after{inset:35px;border-color:rgba(151,183,193,.34);background:#9bb7c1;box-shadow:0 0 16px 3px rgba(151,183,193,.72)}.v-control-room-reference-core-ring{position:absolute;inset:7px;border:1px dashed rgba(151,183,193,.28);border-radius:50%;transform:rotate(145deg);animation:v-control-room-reference-spin 13s linear infinite;animation-delay:-6.5s;animation-fill-mode:both}.v-control-room-reference-core-orbit b{position:relative;z-index:1;color:rgba(242,245,245,.92);font:600 12px/1 monospace;letter-spacing:.08em}
.v-control-room-reference-core-list{display:grid;gap:5px;width:100%;margin:16px 0 0;padding:0;list-style:none;color:rgba(207,217,219,.5);font:7px/1.2 monospace;letter-spacing:.12em;text-align:center}
.v-control-room-reference-flow{position:absolute;z-index:1;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;opacity:1;transition:none!important}.v-control-room-reference-flow-lines path{fill:none;stroke:rgba(151,183,193,.31);stroke-width:1.2;vector-effect:non-scaling-stroke}.v-control-room-reference-flow-particles circle{fill:#9bb7c1;filter:drop-shadow(0 0 5px rgba(151,183,193,.88))}.v-control-room-reference-flow-mobile{display:none}
@keyframes v-control-room-reference-status{0%,100%{opacity:.72;transform:translateY(-50%) scale(.88)}50%{opacity:1;transform:translateY(-50%) scale(1)}}@keyframes v-control-room-reference-breathe{0%,100%{transform:translateY(-2px)}50%{transform:translateY(-4px)}}@keyframes v-control-room-reference-spin{from{transform:rotate(145deg)}to{transform:rotate(505deg)}}
@media (max-width:860px) and (min-width:621px){.v-control-room-reference{min-height:560px}.v-control-room-reference-stage{right:22px;left:22px}.v-control-room-reference-core{min-height:184px}.v-control-room-reference-core-orbit{width:100px;height:100px}}
@media (max-width:620px){.v-control-room-reference{min-height:760px}.v-control-room-reference-stage{top:76px;right:24px;bottom:76px;left:24px}.v-control-room-reference-inputs{top:0;left:0;width:100%}.v-control-room-reference-core{top:37%;left:8%;width:84%;min-height:188px}.v-control-room-reference-actions{top:66%;left:0;width:48%}.v-control-room-reference-outputs{top:66%;left:52%;width:48%}.v-control-room-reference-flow{opacity:.75}.v-control-room-reference-flow-desktop{display:none}.v-control-room-reference-flow-mobile{display:block}.v-control-room-reference-node{min-height:46px;padding:7px 6px}.v-control-room-reference-node strong,.v-control-room-reference-node small{font-size:6px}.v-control-room-reference-node-glyph{font-size:10px}}
@media (prefers-reduced-motion:reduce){.v-control-room-reference-core-orbit,.v-control-room-reference-core-ring,.v-control-room-reference-node-status,.v-control-room-reference-flow-particles circle{animation:none!important}.v-control-room-reference-flow-particles{display:none}}
`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalHeroStyles }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothLayer />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>

  );
}
