import React, { FC, HTMLAttributes } from 'react';
import cn from './utils/classNames';
import s from './styles/Tree.module.sass';

export const NodeLabel: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...attrs
}) => (
  <div className={cn(s.node_label, className)} {...attrs}>
    {children}
  </div>
);
