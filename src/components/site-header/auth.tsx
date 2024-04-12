import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { getServerAuthSession } from "~/server/auth";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

async function Auth() {
  const session = await getServerAuthSession();

  if (!session || !session?.user)
    return (
      <Link href="/api/auth/signin">
        <Button>Sign In</Button>
      </Link>
    );

  const { user } = session;

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full md:hidden"
          >
            <Image
              src={user.image ?? `https://avatar.vercel.sh/nextjs`}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
              unoptimized
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>My Account</DrawerTitle>
          </DrawerHeader>

          <div className="space-y-2 px-4">
            <Link href={"/api/auth/signout"}>
              <Button
                className="flex w-full items-center gap-4"
                variant="secondary"
              >
                <LogOut className="h-4 w-4" />

                <span className="first-letter:uppercase">Logout</span>
              </Button>
            </Link>
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="hidden overflow-hidden rounded-full md:flex"
          >
            <Image
              src={user.image ?? `https://avatar.vercel.sh/nextjs`}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
              unoptimized
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/api/auth/signout"}>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default Auth;
