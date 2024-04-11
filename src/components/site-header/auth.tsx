import Image from "next/image";
import Link from "next/link";
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
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
  );
}

export default Auth;
