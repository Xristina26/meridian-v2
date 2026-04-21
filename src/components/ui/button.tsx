import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] transition-transform active:scale-[0.98]",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white",
      secondary: "bg-white/10 text-white hover:bg-white/20",
      ghost: "hover:bg-white/5 text-slate-400 hover:text-white",
      link: "text-indigo-400 underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 rounded-xl px-3",
      lg: "h-14 rounded-2xl px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
