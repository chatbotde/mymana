import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  async redirects() {
    return [
      {
        source: "/add-money/account",
        destination: "/add-money-ach",
        permanent: false,
      },
      {
        source: "/send/to",
        destination: "/remit/compose",
        permanent: false,
      },
      {
        source: "/send/review",
        destination: "/remit/review",
        permanent: false,
      },
      {
        source: "/save/add",
        destination: "/save/amount?mode=deposit",
        permanent: false,
      },
      {
        source: "/save/withdraw",
        destination: "/save/amount?mode=withdraw",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
