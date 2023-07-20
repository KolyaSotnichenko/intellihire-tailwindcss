import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Retrieve the data sent by LiqPay
    const data = req.body;
    console.log(data)
    
    // Process the payment data as needed (e.g., save it to a database, update order status, etc.)
    // ... (your code to handle the payment data)

    // Send a response back to LiqPay to acknowledge the successful processing of data
    res.status(200).json({ status: 'success' });
  } else {
    // Handle other HTTP methods if necessary
    res.status(405).end();
  }
}