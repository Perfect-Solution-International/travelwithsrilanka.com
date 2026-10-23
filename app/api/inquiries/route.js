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

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, country, date, travelers, package: pkg, notes } = body;

    if (!name || !email || !phone) {
      return Response.json({ success: false, error: 'Name, email, and phone are required.' }, { status: 400 });
    }

    const list = readInquiries();
    const newId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInquiry = {
      id: newId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country: country ? country.trim() : 'Unspecified',
      date: date || 'Flexible',
      travelers: Number(travelers) || 2,
      package: pkg || 'Custom Tour',
      notes: notes ? notes.trim() : '',
      status: 'pending',
      estimatedValue: (Number(travelers) || 2) * 850,
      createdAt: new Date().toISOString()
    };

    list.unshift(newInquiry);
    writeInquiries(list);

    return Response.json({ success: true, message: 'Inquiry received successfully', inquiry: newInquiry });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
