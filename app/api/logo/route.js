import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rootDir = process.cwd();
  const transparentPath = path.join(rootDir, 'public', 'logo-transparent.png');
  const logoPath = path.join(rootDir, 'public', 'logo.png');

  const pathToServe = fs.existsSync(transparentPath) ? transparentPath : logoPath;

  if (fs.existsSync(pathToServe)) {
    const fileBuffer = fs.readFileSync(pathToServe);
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }

  return new Response('Logo not found', { status: 404 });
}
