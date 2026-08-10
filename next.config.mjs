import createMDX from '@next/mdx';

const withMDX = createMDX({});

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  poweredByHeader: false,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
});
