import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Github, Linkedin, Mail, Code, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-forge-950">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1">
                <div className="w-full h-full rounded-full bg-forge-950 flex items-center justify-center">
                  <Code className="w-16 h-16 text-purple-400" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">About Me</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8 md:p-12 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  👋 Hello!
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm Parth Sharma, a passionate and driven Final-Year Computer Science Student at Chandigarh University, 
                  on the cusp of launching my career as a Software Engineer.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  💻 My Journey
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  With a strong foundation in C++, Data Structures & Algorithms (DSA), and Full-Stack Development, 
                  I thrive on solving complex problems and building efficient, scalable solutions. My academic journey 
                  has equipped me with hands-on experience in both frontend and backend technologies, and I'm constantly 
                  exploring new frameworks and tools to stay ahead in the ever-evolving tech landscape.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  🚀 What I Do
                </h2>
                <ul className="text-gray-300 text-lg leading-relaxed space-y-2">
                  <li>• Develop clean, optimized code with a focus on performance and usability.</li>
                  <li>• Build full-stack web applications using modern technologies.</li>
                  <li>• Solve algorithmic challenges to sharpen my problem-solving skills.</li>
                  <li>• Collaborate on projects that bridge theory and real-world impact.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  🔍 Looking Ahead
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm eager to contribute my skills to innovative tech projects, learn from industry experts, and grow 
                  as a versatile developer. Whether it's internships, open-source contributions, or networking with 
                  fellow tech enthusiasts—I'm always open to new opportunities!
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  🌟 Let's Connect!
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  If you're as passionate about technology as I am, let's collaborate, share ideas, or just chat about the latest in tech!
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="mailto:Ksparth12@gmail.com"
                    className="flex items-center space-x-2 glass rounded-xl px-4 py-3 hover:bg-white/10 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Ksparth12@gmail.com</span>
                  </a>
                  <a 
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                    href="https://linkedin.com/in/ksparth128"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 text-blue-400" />
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/ksparth12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 glass rounded-xl px-4 py-3 hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">ksparth12</span>
                  </a>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2 text-purple-400" />
                  About ThinkForge
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  ThinkForge is a project I developed to help fellow students and developers discover innovative project ideas. 
                  This platform offers AI-powered suggestions, categorized by skill development, hackathons, and resume building, 
                  making it easier for students to find meaningful projects that align with their learning goals and career aspirations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
