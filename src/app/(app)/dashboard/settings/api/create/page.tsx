import { redirect } from "next/navigation";
import { H2 } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";
import { UrlForm } from "./form";

async function Create() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <H2>Create API Key</H2>
      <UrlForm></UrlForm>
    </div>
  );
}

export default Create;
