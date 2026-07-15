import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import ApprovalRequest from '@/lib/models/ApprovalRequest';
import Product from '@/lib/models/Product';
import BDA from '@/lib/models/BDA';
import { cache } from '@/lib/cache';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();
    const { status, feedback } = body; // 'approved' or 'rejected'

    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
    }

    const appReq = await ApprovalRequest.findOne({ id });
    if (!appReq) {
      return NextResponse.json({ success: false, message: 'Approval request not found' }, { status: 404 });
    }

    appReq.status = status;
    appReq.feedback = feedback || '';
    await appReq.save();

    if (status === 'approved') {
      const data = appReq.data;

      // Apply changes based on request type
      if (appReq.type === 'product') {
        if (appReq.action === 'create') {
          // Verify product uniqueness or generate custom slug
          const newProd = new Product({
            ...data,
            status: 'approved' // Automatically active once admin approves
          });
          await newProd.save();
        } else if (appReq.action === 'update') {
          await Product.findOneAndUpdate(
            { id: appReq.targetId },
            { $set: data }
          );
        } else if (appReq.action === 'delete') {
          await Product.findOneAndDelete({ id: appReq.targetId });
        }
        // Invalidate cache
        await cache.invalidatePrefix('products:');
      } else if (appReq.type === 'bda') {
        if (appReq.action === 'create') {
          const newBda = new BDA({
            ...data,
            status: 'Approved'
          });
          await newBda.save();
        } else if (appReq.action === 'update') {
          await BDA.findOneAndUpdate(
            { id: appReq.targetId },
            { $set: { status: 'Approved', ...data } }
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Request successfully ${status}`,
      request: appReq
    });
  } catch (error: any) {
    console.error('Update approval status error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
