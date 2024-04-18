"use client";

import { type Url } from "@prisma/client";
import { Clipboard, Infinity } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { getUrl } from "~/lib/get-url";

function UrlPreviewCard({ url }: { url: Url }) {
  const clsPre = ((url.clicks ?? 0) / (url.maxClicks ?? 0)) * 100;
  const clicksPrecentage = !url.maxClicks ? 0 : Math.round(clsPre);

  return (
    <Card className="h-fit min-w-max">
      <CardHeader className="pb-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="mb-1 flex items-center gap-2 rounded p-1 ps-0 text-start hover:bg-background hover:!text-primary"
                onClick={() => {
                  void navigator.clipboard.writeText(getUrl(url));
                  toast("Copied to clipboard", {
                    description: getUrl(url),
                  });
                }}
              >
                <Clipboard className="h-4 w-4" />
                <CardDescription className="max-w-64 break-before-all">
                  {getUrl({ ...url, addHostname: false })}
                </CardDescription>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Copy URL</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <CardTitle className="text-4xl">
          {url.clicks}{" "}
          <span className="text-sm text-muted-foreground">Clicks</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 py-2">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Max Clicks</span>
            <span>{url.maxClicks ?? <Infinity className="h-5 w-5" />}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Password Protected</span>
            <span>{!!url.password ? "Yes" : "No"}</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Label>{clicksPrecentage}%</Label>
        <Progress value={clicksPrecentage + 1} aria-label="25% increase" />
      </CardFooter>
    </Card>
  );
}

export default UrlPreviewCard;
