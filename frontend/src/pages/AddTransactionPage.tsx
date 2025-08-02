import AddTransaction from "../components/AddTransaction";

export default function AddTransactionPage() {
  return (
    <div>
      <h2>Add New Transaction</h2>
      <AddTransaction onAdded={() => window.location.href = "/dashboard"} />
    </div>
  );
}
