interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="px-3 py-1 text-xs font-mono rounded-full border border-border text-text-muted bg-surface">
      {children}
    </span>
  );
}
