export interface Bucket {
  id: string;
  user_id: string;
  coin_symbol: string;
  total_quantity: number | null;
  total_cost: number | null;
  average_price: number | null;
  created_at: Date;
  updated_at: Date;
}
