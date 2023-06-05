import { NextApiRequest, NextApiResponse } from 'next'
import { StripeService } from '../../../services/stripeService';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  if (req.method === 'POST') {
    const { operation, customer_id }: { operation: string, customer_id?: string} = req.body;
    const stripeService = await StripeService.create();
    switch (operation) {
      case 'create':
        const customer = await stripeService.createCustomer(req.body);
        
        res.status(200).json(customer.id);
        return;

      case 'update':
          if (!customer_id) throw new Error('Customer ID required.');
          const customerUpdate = await stripeService.updateCustomer(req.body);
          res.status(200).json(customerUpdate.id);
          return;
    };
    
  } else {
    // Handle any other HTTP method    
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
