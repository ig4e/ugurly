import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

async function EditPage() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  redirect("/dashboard");
}

export default EditPage;
