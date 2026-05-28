type IndustrialCardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function IndustrialCard({
  children,
  className = "",
  style,
}: IndustrialCardProps) {
  return (
    <div
      className={`rounded-lg border border-white/10 bg-[#12161b]/88 shadow-[0_22px_60px_rgba(0,0,0,0.24)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
