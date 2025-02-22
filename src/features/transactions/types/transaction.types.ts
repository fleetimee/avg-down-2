export interface Transaction {
  id: string;
  user_id: string;
  bucket_id: string;
  quantity: number;
  price_per_coin: number;
  total_cost: number;
  transaction_date: Date;
  created_at: Date;
}
