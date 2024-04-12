import { ModeToggle } from "../theme-toggle";
import Auth from "./auth";
import Breadcrumbs from "./breadcrumbs";
import SiteSheet from "./sheet";
import SiteAside from "./site-aside";

function SiteHeader() {
  return (
    <>
      <SiteAside />
      <div className="flex flex-col sm:pl-14 sticky top-0 z-30 ">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 py-2 sm:static sm:h-auto sm:border-0 sm:bg-background/80 sm:px-6 sm:backdrop-blur">
          <SiteSheet />
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
