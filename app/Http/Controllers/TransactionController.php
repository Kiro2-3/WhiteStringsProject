<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    // 1. Show the Dashboard
    public function index()
    {
        $user = Auth::user();
        
        $transactions = $user->transactions()->orderBy('entry_date', 'desc')->get();
        
        $totalIncome = $user->transactions()->where('type', 'income')->sum('amount');
        $totalExpense = $user->transactions()->where('type', 'expense')->sum('amount');

        $chartData = $user->transactions()
            ->where('type', 'expense')
            ->selectRaw('category, sum(amount) as total')
            ->groupBy('category')
            ->get();

        return Inertia::render('Dashboard', [
            'transactions' => $transactions,
            'summary' => [
                'income' => $totalIncome,
                'expense' => $totalExpense,
                'balance' => $totalIncome - $totalExpense
            ],
            'chartData' => $chartData
        ]);
    }

    // 2. Save a new Transaction
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense',
            'category' => 'required|string',
            'entry_date' => 'required|date',
        ]);

        Auth::user()->transactions()->create($validated);

        return redirect()->back();
    }

    // 3. Delete a Transaction (Only one copy allowed!)
    public function destroy(Transaction $transaction)
    {
        if ($transaction->user_id !== Auth::id()) {
            abort(403);
        }

        $transaction->delete();

        return redirect()->back();
    }
}