import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const getAdminData = () => {
  const filePath = path.join(process.cwd(), 'data', 'admin.json');
  if (!fs.existsSync(filePath)) {
    return { username: 'admin', password: 'admin123', name: 'General Manager' };
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const admin = getAdminData();

    if (username === admin.username && password === admin.password) {
      const sessionPayload = {
        username: admin.username,
        name: admin.name,
        role: 'superadmin',
        loggedInAt: Date.now()
      };
      const token = Buffer.from(JSON.stringify(sessionPayload)).toString('base64');

      return Response.json(
        { 
          success: true, 
          message: 'Authentication successful',
          user: { username: admin.username, name: admin.name, email: admin.email, role: 'superadmin' },
          token 
        },
        {
          headers: {
            'Set-Cookie': `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
          }
        }
      );
    }

    return Response.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map(c => {
        const [k, ...v] = c.split('=');
        return [k, v.join('=')];
      })
    );

    const token = cookies.admin_token || request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return Response.json({ authenticated: false }, { status: 401 });
    }

    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    const admin = getAdminData();

    if (payload.username === admin.username) {
      return Response.json({ 
        authenticated: true, 
        user: { username: admin.username, name: admin.name, email: admin.email, role: 'superadmin' } 
      });
    }

    return Response.json({ authenticated: false }, { status: 401 });
  } catch (err) {
    return Response.json({ authenticated: false }, { status: 401 });
  }
}

export async function DELETE() {
  return Response.json(
    { success: true, message: 'Logged out' },
    {
      headers: {
        'Set-Cookie': 'admin_token=; Path=/; HttpOnly; Max-Age=0'
      }
    }
  );
}
