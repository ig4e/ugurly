"use client";

import * as React from "react";

import { cn } from "~/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

interface BaseProps {
  children: React.ReactNode;
}

interface RootAdaptiveModalProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface AdaptiveModalProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = "(min-width: 768px)";

const AdaptiveModal = ({ children, ...props }: RootAdaptiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AdaptiveModal = isDesktop ? Dialog : Drawer;

  return <AdaptiveModal {...props}>{children}</AdaptiveModal>;
};

const AdaptiveModalTrigger = ({
  className,
  children,
  ...props
}: AdaptiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AdaptiveModalTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <AdaptiveModalTrigger className={className} {...props}>
      {children}
    </AdaptiveModalTrigger>
  );
};

const AdaptiveModalClose = ({
  className,
  children,
  ...props
}: AdaptiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AdaptiveModalClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <AdaptiveModalClose className={className} {...props}>
      {children}
    </AdaptiveModalClose>
  );
};

const AdaptiveModalContent = ({
  className,
  children,
  ...props
}: AdaptiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AdaptiveModalContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <AdaptiveModalContent className={className} {...props}>
      {children}
    </AdaptiveModalContent>
  );
};

const AdaptiveModalDescription = ({
  className,
  children,
  ...props
}: AdaptiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AdaptiveModalDescription = isDesktop
    ? DialogDescription
    : DrawerDescription;

  return (
    <AdaptiveModalDescription className={className} {...props}>
      {children}
    </AdaptiveModalDescription>
  );
};

const AdaptiveModalHeader = ({
  className,
  children,
  ...props
}: AdaptiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AdaptiveModalHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <AdaptiveModalHeader className={className} {...props}>
      {children}
    </AdaptiveModalHeader>
  );
};

const AdaptiveModalTitle = ({
  className,
  children,
  ...props
}: AdaptiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AdaptiveModalTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <AdaptiveModalTitle className={className} {...props}>
      {children}
    </AdaptiveModalTitle>
  );
};

const AdaptiveModalBody = ({
  className,
  children,
  ...props
}: AdaptiveModalProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const AdaptiveModalFooter = ({
  className,
  children,
  ...props
}: AdaptiveModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AdaptiveModalFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <AdaptiveModalFooter className={className} {...props}>
      {children}
    </AdaptiveModalFooter>
  );
};

export {
  AdaptiveModal,
  AdaptiveModalTrigger,
  AdaptiveModalClose,
  AdaptiveModalContent,
  AdaptiveModalDescription,
  AdaptiveModalHeader,
  AdaptiveModalTitle,
  AdaptiveModalBody,
  AdaptiveModalFooter,
};
