import { H2 } from "~/components/ui/typography";
import { UrlForm } from "./form";

function Create() {
  return (
    <div className="space-y-6">
      <H2>Shorten URL</H2>
      <UrlForm></UrlForm>
    </div>
  );
}

export default Create;
