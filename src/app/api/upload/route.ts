import { NextRequest, NextResponse } from 'next/server';
import { supabase, insertImage } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const prompt = formData.get('prompt') as string;
    const category = formData.get('category') as string;
    const tags = formData.get('tags') as string;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Upload image to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, file);
    
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
    
    // Get public URL for the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);
    
    // Save image metadata to database
    const imageData = {
      url: publicUrl,
      prompt,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      width: 0, // Would need to extract from image
      height: 0 // Would need to extract from image
    };
    
    const { data: savedImage, error: insertError } = await insertImage(imageData);
    
    if (insertError) {
      console.error('Error saving image metadata:', insertError);
      return NextResponse.json({ error: 'Failed to save image metadata' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data: savedImage });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}