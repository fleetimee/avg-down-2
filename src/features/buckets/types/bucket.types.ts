export interface Bucket {
  id: string;
  user_id: string;
  coin_symbol: string;
  total_quantity: number;
  total_cost: number;
  average_price: number;
  created_at: Date;
  updated_at: Date;
}
