import React, { FC, HTMLAttributes } from 'react';
import cn from './utils/classNames';
import s from './styles/Tree.module.sass';

export const NodeContent: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...attrs
}) => (
  <div className={cn(s.node_content, className)} {...attrs}>
    {children}
  </div>
);
