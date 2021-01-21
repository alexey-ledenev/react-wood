import React, { FC, HTMLAttributes, ReactChild } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

/**
 * A tree view component.
 */
export const Wood: FC<Props> = ({ children }) => {
  return <div>{children || '🌳'}</div>;
};
