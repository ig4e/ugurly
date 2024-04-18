import { notFound, redirect } from "next/navigation";
import { H2 } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { UrlForm } from "./form";

export const fetchCache = "force-no-store";
export const revalidate = 0;

async function EditUrl({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  const url = await api.url.get({ id: params.id }).catch((err) => {
    console.error(err);
    notFound();
  });

  return (
    <div className="space-y-6">
      <H2>Edit URL</H2>
      <UrlForm
        id={url.id}
        url={url.url}
        maxClicks={url.maxClicks ?? undefined}
        password={url.password ?? undefined}
        slug={url.slug ?? undefined}
      />
    </div>
  );
}

export default EditUrl;
