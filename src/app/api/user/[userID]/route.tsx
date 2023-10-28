import db from '@/lib/db';
import { PoolConnection } from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { userID: string } }) {
  let mysql: PoolConnection | null = null;

  console.log(params.userID);
  try {
    if (!params.userID) return new NextResponse('Unauthorized', { status: 401 });

    mysql = await db.getConnection();
    const [] = await mysql.query('DELETE FROM customer where id = ?', [params.userID]);

    return NextResponse.json('Deleted');
  } catch (error) {
    console.log('[DELETEUSER]', error);
    return new NextResponse('Internal Error', { status: 500 });
  } finally {
    if (mysql) {
      mysql.release();
    }
  }
}
