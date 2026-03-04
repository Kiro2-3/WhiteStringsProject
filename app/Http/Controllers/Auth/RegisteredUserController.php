<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Controller responsible for handling new user registrations.
 *
 * The methods below correspond to the GET and POST routes defined
 * in `routes/auth.php`.  Each method contains inline comments
 * so you can follow the registration flow step‑by‑step.
 */
class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * When a guest browser navigates to GET /register we return an
     * Inertia response that renders the React component located at
     * `resources/js/Pages/Auth/Register.jsx`.
     */
    public function create(): Response
    {
        // Render the Inertia page named "Auth/Register".
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * This method is triggered by POST /register. It validates the
     * incoming form data, creates a new user record, fires the
     * Registered event (used for things like email verification),
     * logs the user in and redirects them to the dashboard page.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate the request data. ValidationException is automatically
        // thrown if the rules fail, which will redirect back with errors.
        $request->validate([
            // A human readable name, required and max 255 characters.
            'name' => 'required|string|max:255',
            // Email must be unique within the users table.
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            // Password must be confirmed (match password_confirmation) and
            // follow Laravel's default strength rules.
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Create the user in the database. Hash the password before storing.
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Fire the Registered event so any listeners (e.g. sending a
        // verification email) are executed.
        event(new Registered($user));

        // Immediately log the newly created user in using the default
        // "web" authentication guard.
        Auth::login($user);

        // Redirect to the dashboard route. We pass absolute: false so the
        // helper returns a relative URI (works nicely behind proxies).
        return redirect(route('dashboard', absolute: false));
    }
}
