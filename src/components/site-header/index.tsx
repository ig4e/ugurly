import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { routes } from "~/config/routes";
import { ModeToggle } from "../theme-toggle";
import Auth from "./auth";
import Breadcrumbs from "./breadcrumbs";
import SheetItem from "./sheet-item";
import SiteAside from "./site-aside";

function SiteHeader() {
  return (
    <>
      <SiteAside />
      <div className="flex flex-col sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-2 sm:static sm:h-auto sm:border-0 sm:bg-background/80 sm:px-6 sm:backdrop-blur">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 144.329 107.698"
                  >
                    <g transform="translate(-1358.559 -1746.178)">
                      <path
                        d="M137.9-85.22,113.752-25.808q-6.13,14.985-14.569,21.835T78.333,2.876q-12.034,0-20.245-7.228A22.744,22.744,0,0,1,49.875-22.1q0-7.8,4.919-19.9l8.1-19.98Q67.51-73.337,67.51-77.349a7.987,7.987,0,0,0-3.179-6.4,11.767,11.767,0,0,0-7.72-2.611q-7.417,0-13.547,6.547t-6.13,14.418a11.456,11.456,0,0,0,2.119,7.341q2.119,2.649,7.417,4.692,5.6,2.195,5.6,7.114a9.007,9.007,0,0,1-3.254,7.076,11.88,11.88,0,0,1-8.1,2.838q-9.612,0-16.385-7.985A28.889,28.889,0,0,1,17.559-63.65q0-16.5,12.374-28.835t28.949-12.336q12.563,0,20.851,7.379a23.819,23.819,0,0,1,8.287,18.58q0,7.114-4.011,16.877L72.5-33.6q-2.5,6.13-2.5,9.763a8.084,8.084,0,0,0,2.535,6.168,9.275,9.275,0,0,0,6.622,2.384,11.556,11.556,0,0,0,8.666-3.557q3.444-3.557,7.152-12.791l24.9-61.228q2.649-6.66,5.449-8.552t9.763-1.892h16.348q10.444,0,10.444,7.114a9.714,9.714,0,0,1-3.633,8.136q-3.633,2.838-10.293,2.838Z"
                        transform="translate(1341 1851)"
                        fill="#fff"
                      />
                      <circle
                        cx="20.5"
                        cy="20.5"
                        r="20.5"
                        transform="translate(1381 1759)"
                        fill="#e11d48"
                      />
                    </g>
                  </svg>

                  <span className="sr-only">Ugurly</span>
                </Link>

                {routes.map((route) => (
                  <SheetItem
                    key={route.url}
                    {...route}
                    icon={<route.icon className="h-5 w-5" />}
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Breadcrumbs />

          <div className="relative ml-auto flex flex-1 grow-0 items-center gap-2">
            <Auth />
            <ModeToggle />
          </div>
        </header>
      </div>
    </>
  );
}

export default SiteHeader;
