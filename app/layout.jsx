import './globals.css';

export const metadata = {
  title: 'Travel with Sri Lanka | by Hobby & Tours | Luxury Expeditions',
  description: 'Experience Ceylon with Travel with Sri Lanka by Hobby & Tours. Curated private tours, misty tea trails, luxury wildlife safaris, and secluded coastal retreats in breathtaking liquid glass elegance.',
  keywords: 'Travel with Sri Lanka, Hobby & Tours, Sri Lanka tours, luxury travel, private driver Sri Lanka, Ella, Sigiriya, Yala safari',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="/api/logo" type="image/png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
