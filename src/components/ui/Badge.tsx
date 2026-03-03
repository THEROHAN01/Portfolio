interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase rounded-md border border-border text-text-muted bg-surface/50 backdrop-blur-sm">
      {children}
    </span>
  );
}
