import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
const uri = process.env.CLOUDINARY_URL;
if (uri) {
  try {
    const cleanUri = uri.replace('cloudinary://', '');
    const [credentials, cloudNameWithParams] = cleanUri.split('@');
    const [apiKey, apiSecret] = credentials.split(':');
    const cloudName = cloudNameWithParams.split('?')[0];

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true
    });
  } catch (error) {
    console.error('Cloudinary config error in upload route:', error);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({
        success: false,
        message: 'No file uploaded'
      }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using upload_stream
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'nafshe_uploads' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to upload file'
    }, { status: 500 });
  }
}
