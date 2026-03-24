<?php

namespace App\Http\Controllers\BankAccount;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;


class BankAccountController
{

    /**
     * Store a new bank account for the user.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'bank_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'account_name' => 'required|string|max:255',
            'branch' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $user = $request->user();
        $user->bankAccounts()->create($validated);

        return redirect()->route('bank-accounts.index');
    }
    /**
     * Show the Bank Accounts page.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $bankAccounts = $user->bankAccounts()->latest()->get();
        return Inertia::render('BankAccounts', [
            'auth' => ['user' => $user],
            'bankAccounts' => $bankAccounts,
        ]);
    }
}
