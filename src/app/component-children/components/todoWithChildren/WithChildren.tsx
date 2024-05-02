import React from 'react';

const WithChildren = ({ children }: { children: React.ReactNode }) => {
  console.log('With children this will not rerender');
  return <> {children}</>;
};

export default WithChildren;
