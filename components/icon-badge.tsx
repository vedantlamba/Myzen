import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground hover:bg-muted/80",
        success: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      },
      iconVariant: {
        default: "text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "px-4 py-2 text-sm rounded-md",
        sm: "px-2.5 py-1.5 text-xs rounded",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-neutral-500 hover:text-neutral-700 transition-colors",
      success: "text-green-600 hover:text-green-700 transition-colors",
    },
    size: {
      default: "w-5 h-5",
      sm: "w-4 h-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};