import { cn } from "@/lib/utils";

import type { ElementType, HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export function Container({ as: Tag = "div", className, ...props }: ContainerProps) {
  const Comp = Tag as React.ElementType;
  return <Comp className={cn("container", className)} {...props} />;
}
