import { NextApiRequest, NextApiResponse } from 'next'
import { formatAmountForStripe } from '../../../utils/stripeHelpers'
import Stripe from 'stripe'
import { StripeService } from '../../../services/stripeService';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
  maxNetworkRetries: 3,
  // timeout: 1000,
  telemetry: true,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fullName, email } = req.body;
  
  if (req.method === 'POST') {
    // create stripe customer
    const stripeService = await StripeService.create();
    const customer = await stripeService.createCustomer({
      name: fullName,
      email,
    });
    
    res.status(200).json(customer.id);
    return;
    // const { amount, payment_intent_id }: { amount: number, payment_intent_id: string } = JSON.parse(req.body);
    
    // // Validate the amount that was passed from the client.
    // if (amount && !(amount >= 0 && amount <= 10_000)) {
    //   res.status(500).json({ statusCode: 400, message: 'Invalid amount.' })
    //   return
    // }

    // if (payment_intent_id) {
    //   try {
    //     const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
    //     // If PaymentIntent has been created, just update the amount.
    //     if (current_intent) {
    //       console.log('current_intent', current_intent.id);
          
    //       const updated_intent = await stripe.paymentIntents.update(
    //         payment_intent_id,
    //         {
    //           amount: formatAmountForStripe(amount, "usd"),
    //         }
    //       )

    //       // res.status(200).json(updated_intent)
    //       res.status(200).json({ clientSecret: updated_intent.client_secret, id: updated_intent.id });
    //       return
    //     }
    //   } catch (err) {
    //     if ((err as any).code !== 'resource_missing') {
    //       console.log('Error when retrieving PaymentIntent:', err);
    //       const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    //       res.status(500).json({ statusCode: 500, message: errorMessage })
    //       return
    //     }
    //   }
    // }

    // try {
    //   // Create PaymentIntent from body params.
    //   const params: Stripe.PaymentIntentCreateParams = {
    //     amount: formatAmountForStripe(amount, 'usd'),
    //     currency: 'usd',
    //     // payment_method_types: ['card'],
    //     description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? '',
    //     automatic_payment_methods: {
    //       enabled: true,
    //     },
        
    //   }

    //   const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params)
    //   res.status(200).json({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id });
    // } catch (e) {
    //   res.status(400).json({ error: { message: e.message } });
    // }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
