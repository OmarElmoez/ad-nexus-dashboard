
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthStore } from "@/store/useAuthStore";
import { Checkbox } from "@/components/ui/checkbox";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  const navigate = useNavigate();
  const { register, error, clearError, isLoading } = useAuthStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    clearError();
    setPasswordError("");
    
    // Validation
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    
    if (!agreeTerms) {
      return; // Button should be disabled anyway
    }
    
    // Submit registration
    await register(email, password, name);
    
    // If registration successful, navigate to dashboard
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1080" 
          alt="Digital Marketing Dashboard" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/80 to-transparent flex items-center">
          <div className="px-8 md:px-16 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join AdNexus Today</h1>
            <p className="text-xl opacity-90 mb-8">
              Create an account and unlock the full potential of your advertising campaigns.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <p>Free 14-day trial, no credit card required</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <p>Connect all your ad platforms</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <p>Actionable analytics and insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/">
              <h1 className="text-4xl font-bold text-brand-purple">AdNexus</h1>
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          </div>
          
          <Card className="shadow-lg border-t-4 border-t-brand-purple">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Enter your details to create an account</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">
                    Must be at least 8 characters long
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-gray-50"
                  />
                  {passwordError && (
                    <p className="text-xs text-red-500">{passwordError}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms} 
                    onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <a href="/terms" className="text-brand-purple hover:underline">
                      terms of service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-brand-purple hover:underline">
                      privacy policy
                    </a>
                  </label>
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!agreeTerms || isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="font-semibold text-brand-purple hover:text-brand-dark-purple hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <div className="text-sm text-center">
                <p className="mb-4 text-gray-600">or continue with</p>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
