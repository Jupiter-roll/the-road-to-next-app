import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

const upsertSubscription = async (
  subscription: Stripe.Subscription
) => {
  await prisma.stripeCustomer.update({
    where: {
      customerId: subscription.customer as string,
    },
    data: {
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      productId: subscription.items.data[0].price.product as string,
      priceId: subscription.items.data[0].price.id as string,
    },
  });
};

const handleSubscriptionCreated = async (
  subscription: Stripe.Subscription
) => {
  await upsertSubscription(subscription);
};

const handleSubscriptionUpdated = async (
  subscription: Stripe.Subscription
) => {
  await upsertSubscription(subscription);
};

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return new NextResponse('Missing Webhook Secret', {
      status: 500,
    });
  }

  if (!signature) {
    return new NextResponse('Missing Stripe Signature', {
      status: 400,
    });
  }

  let event: Stripe.Event | null = null;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case 'customer.subscription.created':
        handleSubscriptionCreated(event.data.object);
        break;
      case 'customer.subscription.updated':
        handleSubscriptionUpdated(event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }

    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse('Invalid Stripe Signature', {
      status: 400,
    });
  }
}
