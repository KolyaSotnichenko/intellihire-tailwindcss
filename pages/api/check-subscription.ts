import { db } from '@/utils/firebase';

import { doc, updateDoc } from 'firebase/firestore';
// @ts-ignore
import LiqPay from 'liqpay-sdk-nodejs'

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { userOrderID, userID } = req.body;

    const unsubscribeStatus = async () => {
        const userDocRef = doc(db, `users/${userID}`);
        await updateDoc(userDocRef, {
            isPro: false,
        });
    }

    const setProStatus = async () => {
        const userDocRef = doc(db, `users/${userID}`);
        await updateDoc(userDocRef, {
          isPro: true,
        });
      };
    

    if (userOrderID) {
      try {

        const liqpay = new LiqPay(process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY, process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY);

        liqpay.api("request", {
            "action"   : "status",
            "version"  : "3",
            "order_id" : userOrderID
            }, function( json: any ){
                console.log(json.status)
            if(json.status !== 'subscribed'){
                unsubscribeStatus()
            }else{
                setProStatus()
            }
            
            });

      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
      }
    } else {
      res.status(404).json({ error: 'Subscription not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
