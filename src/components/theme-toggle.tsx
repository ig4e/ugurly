"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";

const modes = ["light", "dark", "system"] as const;

export function ModeToggle() {
  const desktop = "(min-width: 768px)";
  const isDesktop = useMediaQuery(desktop);

  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  if (!isDesktop)
    return (
      <Drawer onOpenChange={setOpen} open={open}>
        <DrawerTrigger asChild>
          <Button size="icon" variant="outline">
            <SunIcon className="block h-[1.2rem] w-[1.2rem] dark:hidden" />
            <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] dark:block" />
            <span className="sr-only">Select theme</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select theme</DrawerTitle>
          </DrawerHeader>

          <div className="space-y-2 px-4">
            {modes.map((mode) => {
              let ModeIcon: typeof SunIcon;

              switch (mode) {
                case "light":
                  ModeIcon = SunIcon;
                  break;
                case "dark":
                  ModeIcon = MoonIcon;
                  break;
                default:
                  ModeIcon = DesktopIcon;
                  break;
              }

              return (
                <Button
                  className="flex w-full items-center gap-4"
                  key={mode}
                  onClick={() => {
                    setTheme(mode);
                    setTimeout(() => {
                      setOpen(false);
                    }, 200);
                  }}
                  variant="secondary"
                >
                  <ModeIcon className="h-4 w-4" />

                  <span className="first-letter:uppercase">{mode}</span>
                </Button>
              );
            })}
          </div>

          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Select theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
          className="flex w-full items-center gap-2"
        >
          <SunIcon className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
          className="flex w-full items-center gap-2"
        >
          <MoonIcon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
          }}
          className="flex w-full items-center gap-2"
        >
          <DesktopIcon className="h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
