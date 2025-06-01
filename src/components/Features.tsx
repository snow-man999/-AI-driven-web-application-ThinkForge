
import { Monitor, Zap, Trophy, Sparkles, Brain, Target } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Monitor,
      title: 'Skill Development',
      description: 'Practice-focused projects that help you master new technologies and programming concepts.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Hackathon Ready',
      description: 'Fast-paced, innovative ideas perfect for competitive programming and hackathon events.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Resume Builders',
      description: 'Impressive projects that showcase your skills and make your portfolio stand out.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Leveraging Google Gemini AI to generate personalized project ideas based on your goals.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Tailored Difficulty',
      description: 'Projects matched to your skill level with clear progression paths.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Sparkles,
      title: 'Premium Content',
      description: 'Exclusive, highly curated project ideas for premium subscribers.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Everything You Need</span>
            <br />
            <span className="text-white">To Build Amazing Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the perfect project idea with our comprehensive suite of features designed for modern developers and students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform flex items-center justify-center shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gradient transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
