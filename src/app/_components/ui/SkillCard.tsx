import { cn } from '@/libs/functions';
import * as React from 'react';

interface SkillCardProps extends React.HTMLAttributes<HTMLElement> {}

const SkillCard = React.forwardRef<HTMLElement, SkillCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <figure
        ref={ref}
        {...props}
        className={cn(
          'border rounded-md mx-auto flex w-full max-w-7xl flex-col gap-6 p-2 justify-center items-center',
          className,
        )}
      >
        {children}
      </figure>
    );
  },
);

SkillCard.displayName = 'SkillCard';
export default SkillCard;
