import { cn } from '@/libs/functions';
import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          'border rounded-md mx-auto flex w-full max-w-7xl flex-col gap-6 p-2 justify-center items-center',
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
export default Card;
