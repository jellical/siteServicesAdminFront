import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

interface PageProps {
  title: string,
  className?: string
}

const Page: FunctionComponent<PageProps> = (
    {
      children,
      title = '',
      className
    }) =>
{
  return (
    <div className={className}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  )
}


export default Page;
