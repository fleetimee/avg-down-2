import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "../types/transaction.types";
import { formatDate, formatPrice } from "@/lib/utils";

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price per coin</TableHead>
          <TableHead>Total cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{formatDate(transaction.transaction_date)}</TableCell>
            <TableCell>{transaction.quantity}</TableCell>
            <TableCell>{formatPrice(transaction.price_per_coin)}</TableCell>
            <TableCell>{formatPrice(transaction.total_cost)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
