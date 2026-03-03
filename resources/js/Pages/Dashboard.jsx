import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ auth, transactions, summary, chartData }) {
    
    // Inertia Form Hook
    const { data, setData, post, processing, reset, errors } = useForm({
        description: '',
        amount: '',
        type: 'expense',
        category: 'Food',
        entry_date: new Date().toISOString().split('T')[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('transactions.store'), {
            onSuccess: () => reset(),
        });
    };

    const pieData = {
        labels: chartData.map(item => item.category),
        datasets: [{
            data: chartData.map(item => item.total),
            backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        }]
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12 px-4 max-w-7xl mx-auto space-y-6">
                
                {/* 1. Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
                        <p className="text-gray-500">Total Income</p>
                        <p className="text-2xl font-bold text-green-600">${summary.income}</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow border-l-4 border-red-500">
                        <p className="text-gray-500">Total Expenses</p>
                        <p className="text-2xl font-bold text-red-600">${summary.expense}</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
                        <p className="text-gray-500">Balance</p>
                        <p className="text-2xl font-bold">${summary.balance}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 2. Add Transaction Form */}
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="font-bold mb-4 text-lg">Add Transaction</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <input type="text" placeholder="Description" className="w-full border-gray-300 rounded" 
                                value={data.description} onChange={e => setData('description', e.target.value)} />
                            {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}

                            <div className="flex gap-4">
                                <input type="number" placeholder="Amount" className="w-full border-gray-300 rounded" 
                                    value={data.amount} onChange={e => setData('amount', e.target.value)} />
                                <select className="border-gray-300 rounded" value={data.type} onChange={e => setData('type', e.target.value)}>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            <div className="flex gap-4">
                                <select className="w-full border-gray-300 rounded" value={data.category} onChange={e => setData('category', e.target.value)}>
                                    <option value="Food">Food</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Leisure">Leisure</option>
                                </select>
                                <input type="date" className="border-gray-300 rounded" 
                                    value={data.entry_date} onChange={e => setData('entry_date', e.target.value)} />
                            </div>

                            <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                Save Transaction
                            </button>
                        </form>
                    </div>

                    {/* 3. The Pie Chart */}
                    <div className="bg-white p-6 rounded shadow flex flex-col items-center">
                        <h3 className="font-bold mb-4 text-lg">Expense Breakdown</h3>
                        {chartData.length > 0 ? (
                            <div className="w-full max-w-xs"><Pie data={pieData} /></div>
                        ) : (
                            <p className="text-gray-400 mt-10">Add an expense to see the chart</p>
                        )}
                    </div>
                </div>
   {/* 4. Transaction History Table */}
<div className="bg-white p-6 rounded shadow overflow-x-auto">
    <h3 className="font-bold mb-4 text-lg">Recent Transactions</h3>
    <table className="w-full text-left border-collapse">
        <thead>
            <tr className="border-b bg-gray-50">
                <th className="p-3 text-sm font-semibold text-gray-700">Date</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Description</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Category</th>
                <th className="p-3 text-sm font-semibold text-gray-700 text-right">Amount</th>
                {/* Action Column Header */}
                <th className="p-3 text-sm font-semibold text-gray-700 text-center">Action</th>
            </tr>
        </thead>
        <tbody>
            {transactions.length > 0 ? transactions.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-sm text-gray-600">{t.entry_date}</td>
                    <td className="p-3">
                        <div className="font-medium text-gray-900">{t.description}</div>
                        <div className="text-xs text-gray-400 uppercase">{t.type}</div>
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                            {t.category}
                        </span>
                    </td>
                    <td className={`p-3 text-right font-bold ${
                        t.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {t.type === 'income' ? '+' : '-'}${t.amount}
                    </td>
                    
                    {/* The Delete Button Cell */}
                    <td className="p-3 text-center">
                        <button 
                            onClick={() => {
                                if(confirm('Are you sure you want to delete this?')) {
                                    router.delete(route('transactions.destroy', t.id))
                                }
                            }}
                            className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all"
                            title="Delete Transaction"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </td>
                </tr>
            )) : (
                <tr>
                    <td colSpan="5" className="p-10 text-center text-gray-400">
                        No transactions found yet.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>
            </div>
        </AuthenticatedLayout>
    );
}