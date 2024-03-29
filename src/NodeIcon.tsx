import React, { FC, HTMLAttributes } from 'react';
import cn from './utils/classNames';
import AngleRight from './svg/AngleRight';
import s from './styles/Tree.module.sass';

export interface INodeIconProps extends HTMLAttributes<HTMLDivElement> {
  isParent?: boolean;
  expanded?: boolean;
  iconClassName?: string;
}

export const NodeIcon: FC<INodeIconProps> = ({
  isParent,
  expanded,
  iconClassName,
  className,
  children,
  ...attrs
}) => {
  if (isParent !== true && !children) {
    return null;
  }
  return (
    <div className={cn(s.node_icon, className)} {...attrs}>
      {children || (
        <AngleRight
          className={cn(s.parent_svg, expanded && s.expanded, iconClassName)}
        />
      )}
    </div>
  );
};
