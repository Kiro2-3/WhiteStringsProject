import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

// Modern minimalist login page component.
// Props are injected by the server-side controller (status & canResetPassword).
export default function Login({ status, canResetPassword }) {
    // useForm hook manages form state, submission, and error handling
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Handle form submission to the server
    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
            <Head title="Log in" />

            {/* Main login card container */}
            <div className="w-full max-w-md">
                {/* Header section with title and description */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
                </div>

                {/* White card with subtle shadow and border */}
                <div className="rounded-lg bg-white px-8 py-8 shadow-sm ring-1 ring-gray-200">
                    {/* Success status message */}
                    {status && (
                        <div className="mb-6 rounded-md bg-green-50 p-4">
                            <p className="text-sm font-medium text-green-800">{status}</p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email input field with placeholder */}
                        <div>
                            <InputLabel htmlFor="email" value="Email Address" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Password input field with placeholder */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Remember me checkbox for persistent login */}
                        <div className="flex items-center">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember" className="ms-2 select-none text-sm text-gray-600 cursor-pointer">
                                Keep me logged in
                            </label>
                        </div>

                        {/* Sign in button - shows loading state while processing */}
                        <PrimaryButton
                            className="w-full py-2.5 font-medium"
                            disabled={processing}
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </PrimaryButton>
                    </form>

                    {/* Footer links section - separated by border */}
                    <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                        <div className="flex items-center justify-between text-sm">
                            {/* Password reset link */}
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            )}
                            {/* Link to registration page for new users */}
                            <Link
                                href={route('register')}
                                className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Create account
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer disclaimer text */}
                <p className="mt-6 text-center text-xs text-gray-500">
                    By signing in, you agree to our terms of service
                </p>
            </div>
        </div>
    );
}
