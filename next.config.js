/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Prevent large data files from being bundled in client-side JS
    // This fixes the 25 MiB Cloudflare Pages single-file limit
    if (!isServer) {
      config.externals = config.externals || []
      config.externals.push(function ({ request }, callback) {
        if (request && /data[/\\]letters\.ts$/.test(request)) {
          return callback(null, 'commonjs ' + request)
        }
        callback()
      })
    }
    return config
  },
}

module.exports = nextConfig
