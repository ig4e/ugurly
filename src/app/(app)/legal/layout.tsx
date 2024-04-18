import React, { type ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="prose lg:prose-xl dark:prose-invert prose-neutral max-w-full md:max-w-[80%]">
      {children}
    </div>
  );
}

export default layout;
