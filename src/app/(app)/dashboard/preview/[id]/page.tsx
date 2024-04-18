import { notFound } from "next/navigation";
import { H2, H3 } from "~/components/ui/typography";
import { api } from "~/trpc/server";
import { UrlForm } from "./form";
import UrlPreviewCard from "./url-preview-card";

export const fetchCache = "force-no-store";
export const revalidate = 0;

async function PreviewURL({ params }: { params: { id: string } }) {
  const url = await api.url.getPreview({ id: params.id }).catch((err) => {
    console.error(err);
    notFound();
  });

  return (
    <div className="space-y-4 lg:space-y-6">
      <H2>URL Preview</H2>
      <div className="lg:grid flex flex-col-reverse gap-8 lg:grid-cols-8">
        <div className="lg:col-span-6">
          <UrlForm
            id={url.id}
            url={url.url}
            maxClicks={url.maxClicks ?? undefined}
            password={url.password ?? undefined}
            slug={url.slug ?? undefined}
          />
        </div>
        <div className="space-y-4 lg:col-span-2">
          <H3 className="hidden lg:block">URL Stats</H3>
          <UrlPreviewCard url={url} />
        </div>
      </div>
    </div>
  );
}

export default PreviewURL;
