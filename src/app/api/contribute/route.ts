import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const tier = formData.get('tier') as string;
    const content = formData.get('content') as string;
    const paymentMethod = formData.get('paymentMethod') as string;
    const image = formData.get('image') as File | null;

    if (!tier || !content || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const tierPrices: Record<string, number> = {
      small: 2,
      medium: 6,
      big: 12,
      picture: 18,
    };

    const contribution = {
      _type: 'contribution',
      tier,
      content,
      paymentMethod,
      amount: tierPrices[tier] || 0,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    const result = await client.create(contribution);

    return NextResponse.json({ 
      success: true, 
      id: result._id,
      message: 'Contribution submitted. Complete payment to finalize.'
    });
  } catch (error) {
    console.error('Contribution error:', error);
    return NextResponse.json(
      { error: 'Failed to create contribution' },
      { status: 500 }
    );
  }
}
