import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if session exists
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      } else {
        // Get the current site URL
        const siteUrl = window.location.origin;
        
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
            emailRedirectTo: 'https://think-forge-mu.vercel.app/auth'
          }
        });

        if (error) throw error;
        
        toast.success('Account created successfully! Please check your email to confirm your account.');
        // Don't navigate to dashboard yet since they need to confirm email first
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forge-950 flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="glass rounded-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">ThinkForge</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join ThinkForge'}
            </h1>
            <p className="text-gray-300">
              {isLogin ? 'Sign in to continue your journey' : 'Start your journey with us'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="fullName" className="text-gray-300 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required={!isLogin}
                  className="mt-2 bg-white/5 border-white/10 text-white rounded-xl"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-gray-300 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 bg-white/5 border-white/10 text-white rounded-xl"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2 bg-white/5 border-white/10 text-white rounded-xl"
                placeholder="Enter your password"
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
