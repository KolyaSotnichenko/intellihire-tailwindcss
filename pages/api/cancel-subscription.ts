import { getAuth } from 'firebase/auth';
//@ts-ignore
import LiqPay from 'liqpay';

export default function handler(req: Request, res: Response) {
  const public_key = 'sandbox_i69834742308';
  const private_key = 'sandbox_v078rEMfnp0UKkMYuGtZXtgvNizxiWf5h2Ho4onm';

  const liqpay = new LiqPay(public_key, private_key);
  const user = getAuth().currentUser

  liqpay.api(
    'request',
    {
      action: 'unsubscribe',
      version: '3',
      order_id: user?.uid
    },
  );
}
