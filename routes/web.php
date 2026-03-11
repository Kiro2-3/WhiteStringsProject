<?php

use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Transaction\TransactionController;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    // if the user is logged in send them directly to the dashboard
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// This route calls the "index" method in your TransactionController
Route::get('/dashboard', [TransactionController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {

        // Recent Transactions page (dedicated)
        Route::get('/transactions/recent', [TransactionController::class, 'recent'])
            ->name('transactions.recent');

        // Export transactions as CSV
        Route::get('/transactions/export-csv', [TransactionController::class, 'exportCsv'])
            ->name('transactions.export-csv');
    
    // Add Transaction page
    Route::get('/transactions/add', function () {
        $user = Auth::user();

        $categories = $user->categories()->orderBy('name')->pluck('name');

        if ($categories->isEmpty()) {
            $categories = $user->transactions()->select('category')->distinct()->pluck('category');
        }

        return Inertia::render('AddTransaction', [
            'categories' => $categories,
            'standalone' => true,
        ]);
    })->name('transactions.add');

    // Categories page
    Route::get('/categories', function () {
        $user = Auth::user();
        $categories = $user->categories()->orderBy('name')->get(['id', 'name']);

        return Inertia::render('Categories', [
            'auth'       => ['user' => $user],
            'categories' => $categories,
        ]);
    })->name('categories.index');

    // Store a new standalone category
    Route::post('/categories', function (\Illuminate\Http\Request $request) {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $category = Category::firstOrCreate([
            'user_id' => $user->id,
            'name'    => $validated['name'],
        ]);

        return response()->json([
            'id'   => $category->id,
            'name' => $category->name,
        ]);
    })->name('categories.store');

    // Update a category
    Route::put('/categories/{category}', function (\Illuminate\Http\Request $request, Category $category) {
        if ($category->user_id !== Auth::id()) 
    {
            abort(403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $category->update(['name' => $validated['name']]);

        return response()->json([
            'id'   => $category->id,
            'name' => $category->name,
        ]);
    })->name('categories.update');

    // Delete a category
    Route::delete('/categories/{category}', function (Category $category) {
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted.');
    })->name('categories.destroy');

    // Transaction routes: store (create), show (display edit form), update (save changes), and delete
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');

    // Show the edit form for a specific transaction
    Route::get('/transactions/{transaction}/edit', [TransactionController::class, 'show'])->name('transactions.edit');

    // Update the transaction with new data
    Route::put('/transactions/{transaction}', [TransactionController::class, 'update'])->name('transactions.update');

    // Delete a transaction
    Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy'])->name('transactions.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
