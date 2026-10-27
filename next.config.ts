import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/products/sch-series/sch130e-1950-1800", destination: "/products/sch-series/sch130e-2200-1800", permanent: true },
      { source: "/products/sch-series/sch30d-1950-1800", destination: "/products/sch-series/sch30e-1950-1850", permanent: true },
      { source: "/products/stc-series/scd30-2000-600", destination: "/products/scd-series/scd30-1850-400", permanent: true },
      { source: "/zh/products/sch-series/sch130e-1950-1800", destination: "/zh/products/sch-series/sch130e-2200-1800", permanent: true },
      { source: "/zh/products/sch-series/sch30d-1950-1800", destination: "/zh/products/sch-series/sch30e-1950-1850", permanent: true },
      { source: "/zh/products/stc-series/scd30-2000-600", destination: "/zh/products/scd-series/scd30-1850-400", permanent: true },
    ];
  },
  images: {
    qualities: [60, 75],
  },
};

export default nextConfig;
