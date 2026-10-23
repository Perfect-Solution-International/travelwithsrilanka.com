import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const getInquiriesPath = () => path.join(process.cwd(), 'data', 'inquiries.json');

const readInquiries = () => {
  const p = getInquiriesPath();
  if (!fs.existsSync(p)) return [];
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch {
    return [];
  }
};

const writeInquiries = (data) => {
  fs.writeFileSync(getInquiriesPath(), JSON.stringify(data, null, 2), 'utf-8');
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const query = searchParams.get('q')?.toLowerCase();

    let list = readInquiries();

    if (status && status !== 'all') {
      list = list.filter(item => item.status === status);
    }

    if (query) {
      list = list.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.phone.toLowerCase().includes(query) ||
        item.country?.toLowerCase().includes(query) ||
        item.package?.toLowerCase().includes(query) ||
        item.id?.toLowerCase().includes(query)
      );
    }

    // Sort descending by creation date
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return Response.json({ success: true, count: list.length, inquiries: list });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id) return Response.json({ success: false, error: 'ID required' }, { status: 400 });

    const list = readInquiries();
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) return Response.json({ success: false, error: 'Inquiry not found' }, { status: 404 });

    if (status) list[idx].status = status;
    if (adminNotes !== undefined) list[idx].adminNotes = adminNotes;
    list[idx].updatedAt = new Date().toISOString();

    writeInquiries(list);

    return Response.json({ success: true, inquiry: list[idx] });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return Response.json({ success: false, error: 'ID required' }, { status: 400 });

    let list = readInquiries();
    const initialLen = list.length;
    list = list.filter(i => i.id !== id);

    if (list.length === initialLen) {
      return Response.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }

    writeInquiries(list);
    return Response.json({ success: true, message: `Inquiry ${id} deleted` });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
