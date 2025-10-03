import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ 
      success: false, 
      message: 'Supabase client not initialized. Check your environment variables.' 
    });
  }

  try {
    // Test the connection by fetching the count of images
    const { count, error } = await supabase
      .from('images')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({ 
        success: false, 
        message: 'Error connecting to Supabase',
        error: error.message
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to Supabase!',
      imageCount: count || 0
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}