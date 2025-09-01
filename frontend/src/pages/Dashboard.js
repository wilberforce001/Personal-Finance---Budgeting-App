import { useEffect, useState } from "react";
import API from "../services/api";


const Dashboard = () => {
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    categoriesCount: 0,
  })
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("dashboard/summary");
        console.log("Dashboard API response:", data);
        setSummary(data.summary);
        setTransactions(data.recentTransactions);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>
  }
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Here's is your financial snapshot</p>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Balance</p>
          <p className="text-xl font-semibold">$ {summary?.balance ?? 0}</p>
        </div>
        <div className="bg-green-100 shadow rounded-xl p-4">
          <p className="text-gray-500">Income</p>
          <p className="text-xl font-semibold text-green-600">$ {summary?.income ?? 0}</p>
        </div>
        <div className="bg-red-100 shadow rounded-xl p-4">
          <p className="text-gray-500">Expenses</p>
          <p className="text-xl font-semibold text-red-600">$ {summary?.expenses ?? 0}</p>
        </div>
        <div className="bg-blue-100 shadow rounded-xl p-4">
          <p className="text-gray-500">Categories</p>
          <p className="text-xl font-semibold">{summary?.categoriesCount?? 0}</p>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet</p>
        ) : (
          <ul>
            {transactions.map((tx) => (
              <li key={tx._id} className="flex justify-between border-b py-2">
                <span>tx.category</span>
                <span className={tx.type === "income" ? "text-green-600" : "text-red-600"}>
                  {tx.type === "income" ? "+" : "-"}Ksh {tx.amount}
                </span>
              </li>
            ))}
          </ul>
        )
      }
      </div>
    </div>
  )
}

export default Dashboard;