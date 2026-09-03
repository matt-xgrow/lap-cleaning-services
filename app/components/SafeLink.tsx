import type { AnchorHTMLAttributes, ReactNode } from "react";
import NextLink from "next/link";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

export default function SafeLink({ href, children, ...props }: Props) {
  return <NextLink href={href} prefetch={false} {...props}>{children}</NextLink>;
}
