import db from '@/lib/db';
import { PoolConnection } from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { userID: string } }) {
  let mysql: PoolConnection | null = null;

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

export async function PUT(req: Request, { params }: { params: { userID: string } }) {
  let mysql: PoolConnection | null = null;

  const { name, phone } = await req.json();

  try {
    if (!params.userID) return new NextResponse('Unauthorized', { status: 401 });

    mysql = await db.getConnection();
    const [rows, fields] = await mysql.execute('Update customer SET name=?, phone=? where id = ?', [
      name,
      phone,
      params.userID,
    ]);

    const [newRecord] = await mysql.query('SELECT * FROM customer WHERE id = ?', [params.userID]);
    const customer = Array.isArray(newRecord) ? newRecord[0] : undefined;
    return NextResponse.json(customer);
  } catch (error) {
    console.log('[UPDATEUSER]', error);
    return new NextResponse('Internal Error', { status: 500 });
  } finally {
    if (mysql) {
      mysql.release();
    }
  }
}
