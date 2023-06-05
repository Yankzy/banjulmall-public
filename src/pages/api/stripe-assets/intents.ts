import { NextApiRequest, NextApiResponse } from 'next'
import { StripeService } from '../../../services/stripeService';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  if (req.method === 'POST') {
    const { operation, customer_id }: { operation: string, customer_id: string} = req.body;
    const stripeService = await StripeService.create();
    switch (operation) {
      case 'create_payment_intent':
        const customer = await stripeService.createPaymentIntent(req.body);
        
        res.status(200).json(customer.id);
        return;

      case 'update_payment_intent':
        const oldIntent = await stripeService.updatePaymentIntent(req.body);
        res.status(200).json(oldIntent.id);
        return;

      case 'setup_intent':
        const intent = await stripeService.createSetupIntent(req.body);        
        res.status(200).json({clientSecret: intent.client_secret});
        return;

      case 'payment_methods':
        const methods = await stripeService.getPaymentMethods(customer_id);
        res.status(200).json({methods: methods.data});
        return;
    };
    
  } else {
    // Handle any other HTTP method    
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
