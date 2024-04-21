export interface BaseLayoutProps {
  children?: React.ReactNode;
  isAuthPage?: boolean;
  isPaddingHeader?: boolean;
  isPaddingFooter?: boolean;
  backgroundColor?: string;
}

export interface HeaderFooterProps {
  isAuthPage?: boolean;
}
