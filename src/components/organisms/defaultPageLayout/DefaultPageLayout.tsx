import React from "react";
import { PageLayoutContainer } from "./styles";

interface DefaultPageLayoutProps {
  children: React.ReactElement;
}

const DefaultPageLayout = ({ children }: DefaultPageLayoutProps) => {
  return <PageLayoutContainer>{children}</PageLayoutContainer>;
};

export default DefaultPageLayout;
