import Stripe from "stripe";
import { NextResponse } from "next/server";

// 初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request: Request, response: Response) {
  const { title, price, productId, userId } = await request.json();

  try {
    // チェックアウトセッションの作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        productId: productId,
      },
      client_reference_id: userId,
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: title,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/product/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}`,
    });
    return NextResponse.json({
      checkout_url: session.url,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}
