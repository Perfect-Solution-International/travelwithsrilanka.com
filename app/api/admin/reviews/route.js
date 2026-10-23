import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const getReviewsPath = () => path.join(process.cwd(), 'data', 'reviews.json');

const readReviews = () => {
  const p = getReviewsPath();
  if (!fs.existsSync(p)) return [];
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch {
    return [];
  }
};

const writeReviews = (data) => {
  fs.writeFileSync(getReviewsPath(), JSON.stringify(data, null, 2), 'utf-8');
};

export async function GET() {
  try {
    const list = readReviews();
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return Response.json({ success: true, count: list.length, reviews: list });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) return Response.json({ success: false, error: 'ID and status required' }, { status: 400 });

    const list = readReviews();
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return Response.json({ success: false, error: 'Review not found' }, { status: 404 });

    list[idx].status = status;
    list[idx].updatedAt = new Date().toISOString();

    writeReviews(list);
    return Response.json({ success: true, review: list[idx] });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return Response.json({ success: false, error: 'ID required' }, { status: 400 });

    let list = readReviews();
    list = list.filter(r => r.id !== id);

    writeReviews(list);
    return Response.json({ success: true, message: `Review ${id} deleted` });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
