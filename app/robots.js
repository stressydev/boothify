export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://boothify.app/sitemap.xml',
    host: 'https://boothify.app',
  };
}
