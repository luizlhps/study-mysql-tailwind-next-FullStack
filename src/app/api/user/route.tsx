import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit');
  const skip = searchParams.get('skip');

  let mysql: PoolConnection | null = null;
  try {
    mysql = await db.getConnection();
    const [newRecord, fieldss] = await mysql.query('SELECT * FROM customer ORDER BY id DESC LIMIT ? OFFSET ?', [
      Number(limit),
      (Number(skip) - 1) * Number(limit) ,
    ]);

    const [ count] = await mysql.query('SELECT COUNT(id) AS id FROM customer')
    const totalcount = Array.isArray(count) && 'id' in count[0] ? count[0].id : null
    const customer = newRecord;
    return NextResponse.json({customer: customer, total: totalcount, page:skip ,limit:limit});
  } catch (error) {
    console.log('[GETUSER]', error);
    return new NextResponse('Internal Error', { status: 500 });
  } finally {
    if (mysql) {
      mysql.release();
    }
  }
}

export async function POST(req: Request) {
  let mysql: PoolConnection | null = null;

  try {
    const { name, phone } = await req.json();
    mysql = await db.getConnection();
    const [rows, fields] = await mysql.execute('INSERT INTO customer (name, phone) VALUES (?, ?)', [name, phone]);
    const insertId = 'insertId' in rows ? rows.insertId : undefined;

    const [newRecord] = await mysql.query('SELECT * FROM customer WHERE id = ?', [insertId]);
    const customer = Array.isArray(newRecord) ? newRecord[0] : undefined;

    return NextResponse.json(customer);
  } catch (error) {
    console.log('[POSTUSER]', error);
    return new NextResponse('Internal Error', { status: 500 });
  } finally {
    if (mysql) {
      mysql.release();
    }
  }
}
