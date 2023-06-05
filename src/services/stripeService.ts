import { formatAmountForStripe } from '../utils/stripeHelpers'
import Stripe from 'stripe'


if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY not found in environment');
}

interface PaymentIntentCreateBody {
  amount: number;
  description?: string;
  customer_id: string,
}

interface PaymentIntentUpdateBody {
  payment_intent_id: string;
  amount: number;
}

interface CustomerCreateBody {
  name: string;
  email: string;
}

interface CustomerUpdateBody {
  customer_id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: Stripe.AddressParam;

}

export class StripeService {
  private stripe: Stripe;

  static async create(): Promise<StripeService> {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY not found in environment');
    }

    return new StripeService();
  }

  private constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
        apiVersion: '2022-11-15',
        maxNetworkRetries: 3,
        timeout: 1000,
        telemetry: true,
    });
  }

  /**
   * Get payment methods.
   */
  async getPaymentMethods(customer_id: string): Promise<Stripe.ApiList<Stripe.PaymentMethod>> {

    return await this.stripe.paymentMethods.list({
      customer: customer_id,
      type: 'card',
    });
  }


  /**
   * Create a new payment intent.
   */
  async createPaymentIntent(body: PaymentIntentCreateBody): Promise<Stripe.PaymentIntent> {
    const { amount, description, customer_id } = body;

    // Get payment methods
    const paymentMethods = await this.getPaymentMethods(customer_id);


    const params: Stripe.PaymentIntentCreateParams = {
      amount: formatAmountForStripe(amount, 'usd'),
      currency: 'usd',
      description: description || '',
      automatic_payment_methods: {enabled: true},
      confirm: true,
      off_session: true,
      payment_method: paymentMethods.data[0].id,
      customer: customer_id,
    }

    try {
      return this.stripe.paymentIntents.create(params);
    } catch (error) {
      console.error('Error creating payment intent', error);
      throw error;
    }
  }

  /**
   * Update an existing payment intent.
   */
  async updatePaymentIntent(body: PaymentIntentUpdateBody): Promise<Stripe.PaymentIntent> {
    const { payment_intent_id, amount } = body;

    if (!payment_intent_id) {
      throw new Error('Payment intent ID required.');
    }

    const params: Stripe.PaymentIntentUpdateParams = {
      amount: formatAmountForStripe(amount, "usd"),
    }

    try {
      return this.stripe.paymentIntents.update(payment_intent_id, params);
    } catch (error) {
      console.error(`Error updating payment intent ${payment_intent_id}`, error);
      throw error;
    }
  }

  /**
   * Create setupIntent.
   */
    async createSetupIntent(body: CustomerUpdateBody): Promise<Stripe.SetupIntent> {
      const { customer_id } = body;
        
      try {
        // update customer's address
        const customer = await this.updateCustomer(body);
        const params: Stripe.SetupIntentCreateParams = {
          customer: customer_id,
          automatic_payment_methods: {enabled: true},
        }
        return this.stripe.setupIntents.create(params);
      } catch (error) {
          console.error('Error creating setup intent', error);
          throw error;
      }
    }

  /**
   * Create a new customer.
   */
  async createCustomer(body: CustomerUpdateBody): Promise<Stripe.Customer> {
    const { fullName, email } = body;

    const params: Stripe.CustomerCreateParams = {
      name: fullName,
      email: email,
    }

    try {
      return this.stripe.customers.create(params);
    } catch (error) {
      console.error('Error creating customer', error);
      throw error;
    }
  }

  /**
   * Update an existing customer.
   */
  async updateCustomer(body: CustomerUpdateBody): Promise<Stripe.Customer> {
    const { customer_id, fullName, email, phone, address } = body;

    if (!customer_id) {
      throw new Error('Customer ID required.');
    }

    const params: Stripe.CustomerUpdateParams = {
      name: fullName,
      email: email,
      phone,
      address,
    };

    try {
      return this.stripe.customers.update(customer_id, params);
    } catch (error) {
      console.error(`Error updating customer ${customer_id}`, error);
      throw error;
    }
  }
}
