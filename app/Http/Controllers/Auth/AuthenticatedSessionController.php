<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Controller responsible for handling login/logout of existing users.
 *
 * The routes pointing at these methods are defined in `routes/auth.php`.
 * We again return Inertia responses since the frontend is React-powered.
 */
class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * A small bit of data is passed to the page so the component knows
     * whether the "Forgot your password?" link should be shown and can
     * display any status message flashed in the session.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            // Helper to decide if password reset is available
            'canResetPassword' => Route::has('password.request'),
            // Pass any flash status (e.g. "Password reset link sent").
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * The LoginRequest class encapsulates validation and the actual
     * attempt to log the user in (via $request->authenticate()).
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // Perform authentication; a failed attempt will throw and redirect
        $request->authenticate();

        // Regenerate the session ID to protect against session fixation.
        $request->session()->regenerate();

        // Redirect back to intended page or dashboard if none.
        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session (log the user out).
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Log the user out of the web guard.
        Auth::guard('web')->logout();

        // Invalidate the session and regenerate CSRF token.
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // After logout send user to home page.
        return redirect('/');
    }
}
