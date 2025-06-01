
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, X } from 'lucide-react';
import { toast } from 'sonner';

const Pricing = () => {
  // Premium button handler with toast notification
  const handleButtonClick = (planName: string) => {
    if (planName === 'Premium') {
      toast.info(
        <div className="flex flex-col">
          <div className="font-bold text-lg mb-1">Coming Soon!</div>
          <p>Premium features will be available in the next update.</p>
        </div>,
        {
          duration: 5000,
          position: 'top-center',
          icon: '🚀',
          className: 'bg-gradient-to-r from-purple-500/90 to-blue-500/90 text-white',
        }
      );
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Access to basic project ideas',
        'Community support',
        '3 AI-generated suggestions per month',
        'Basic templates',
        'Email support'
      ],
      popular: false,
      buttonText: 'Get Started',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Premium',
      price: '₹299',
      period: 'per month',
      description: 'Everything you need to excel',
      features: [
        'Unlimited AI-generated project ideas',
        'Premium templates and resources',
        'Advanced difficulty filtering',
        'Priority support',
        'Exclusive community access',
        'Project collaboration tools',
        'Code review assistance'
      ],
      popular: true,
      buttonText: 'Start Premium',
      buttonVariant: 'default' as const
    },
    {
      name: 'Enterprise',
      price: '₹999',
      period: 'per month',
      description: 'For teams and organizations',
      features: [
        'Everything in Premium',
        'Team collaboration features',
        'Custom project categories',
        'Analytics dashboard',
        'White-label solutions',
        'Dedicated account manager',
        'Custom integrations'
      ],
      popular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const
    }
  ];

  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Simple, Transparent</span>
            <br />
            <span className="text-white">Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your project needs. Start free and upgrade when you're ready for more advanced features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`glass rounded-2xl p-8 relative ${
                plan.popular 
                  ? 'border-2 border-purple-500 glow' 
                  : 'border border-white/10'
              } hover:scale-105 transition-transform duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                  <span className="text-gray-300 ml-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.buttonVariant}
                className={`w-full py-3 text-lg ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white glow'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
                onClick={() => handleButtonClick(plan.name)}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300">
            All plans include a 7-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
