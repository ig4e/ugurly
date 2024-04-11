import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <div className="pb-4 pt-4 sm:pt-6">{children}</div>;
}

export default layout;
