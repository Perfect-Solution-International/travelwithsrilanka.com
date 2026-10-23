import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { currentPassword, newUsername, newPassword, newName } = body;

    const filePath = path.join(process.cwd(), 'data', 'admin.json');
    const admin = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (currentPassword !== admin.password) {
      return Response.json({ success: false, error: 'Current password does not match' }, { status: 400 });
    }

    if (newUsername && newUsername.trim()) {
      admin.username = newUsername.trim();
    }
    if (newPassword && newPassword.trim()) {
      admin.password = newPassword.trim();
    }
    if (newName && newName.trim()) {
      admin.name = newName.trim();
    }
    admin.updatedAt = new Date().toISOString();

    fs.writeFileSync(filePath, JSON.stringify(admin, null, 2), 'utf-8');

    return Response.json({ success: true, message: 'Admin credentials updated successfully', user: admin });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
