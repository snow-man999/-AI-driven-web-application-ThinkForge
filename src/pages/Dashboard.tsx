import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, LogOut, Monitor, Trophy, Sparkles, Home, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Database } from '@/integrations/supabase/types';

// Saved project data structure from DB
interface SavedProject {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  // TODO: Add additional fields as needed from DB schema
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectType: '',
    institution: '',
    prompt: ''
  });
  const [ideas, setIdeas] = useState<string[]>([]);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const navigate = useNavigate();
  
  // Gemini API key loaded from .env file
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    // Verify user session exists
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      
      // Load user's saved projects
      fetchSavedProjects(session.user.id);
    };

    checkAuth();

    // Auth state listener - redirects if logged out
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate('/auth');
        } else {
          setUser(session.user);
          fetchSavedProjects(session.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Grab user's saved projects from DB
  const fetchSavedProjects = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('saved_projects' as any)
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      
      if (data) {
        setSavedProjects(data as any as SavedProject[]);
      }
    } catch (error: any) {
      console.error('Error fetching saved projects:', error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Call Gemini to generate project ideas
  const generateIdeasWithGemini = async (prompt: string, projectType: string) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Generate 3 distinct project ideas for a ${projectType} project with the following requirements: ${prompt}. Each idea should be a concise paragraph. Start each idea with 'Project Idea #X:' on a new line, where X is the idea number. For example:\nProject Idea #1: ...\nProject Idea #2: ...\nProject Idea #3: ...`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 768,
      }
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Parse Gemini's response text
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Split response into individual project ideas
      const ideas = generatedText.split(/\nProject Idea #\d+:/)
        .map(idea => idea.trim())
        .filter(idea => idea.length > 0);
      
      return ideas;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  const generateIdeas = async () => {
    if (!formData.projectType || !formData.prompt) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Hit Gemini API for fresh ideas
      const generatedIdeas = await generateIdeasWithGemini(formData.prompt, formData.projectType);
      
      setIdeas(generatedIdeas);
      toast.success('Project ideas generated successfully!');
    } catch (error) {
      toast.error('Failed to generate ideas. Please try again.');
      console.error('Error generating ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = [
    { value: 'skill-development', label: 'Skill Development', icon: Monitor },
    { value: 'hackathon', label: 'Hackathon Ready', icon: Zap },
    { value: 'resume-builder', label: 'Resume Builder', icon: Trophy }
  ];

  // Save project to DB
  const saveProject = async (idea: string) => {
    try {
      // Let DB auto-generate UUID
      const projectToInsert = {
        content: idea,
        user_id: user.id,
        // DB will timestamp with current time
      };
      
      // Insert and return the new project with all fields
      const { data: insertedData, error } = await supabase
        .from('saved_projects' as any) 
        .insert(projectToInsert as any)
        .select(); // Return the newly created record

      console.log('[ThinkForge] Supabase save attempt:', { insertedData, error, projectToInsert });

      if (error) {
        console.error('[ThinkForge] Error saving project to Supabase:', error);
        toast.error(`Failed to save project: ${error.message}`);
        return; 
      }
      
      // Response comes back as an array with our new project
      if (insertedData && insertedData.length > 0) {
        const savedProjectFromDb = insertedData[0] as any as SavedProject;
        console.log('[ThinkForge] Supabase insert successful, returned project:', savedProjectFromDb);
        
        // Add the new project to state
        setSavedProjects(prevProjects => [...prevProjects, savedProjectFromDb]);
        toast.success('Project saved successfully!');
      } else {
        // Shouldn't happen if DB transaction worked
        console.error('[ThinkForge] Supabase insert succeeded but no data returned.', insertedData);
        toast.error('Project saved, but failed to update list. Please refresh.');
      }

    } catch (error: any) { 
      console.error('[ThinkForge] Error in saveProject function:', error.message);
      toast.error('Failed to save project. Please try again.');
    }
  };

  // Remove project from DB
  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('saved_projects' as any)
        .delete()
        .match({ id: projectId });

      if (error) {
        console.error('[ThinkForge] Error deleting project from Supabase:', error);
        toast.error(`Failed to delete project: ${error.message}`);
        return;
      }

      // Remove deleted project from UI
      setSavedProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
      toast.success('Project deleted successfully!');
      console.log('[ThinkForge] Project deleted successfully, ID:', projectId);

    } catch (error: any) {
      console.error('[ThinkForge] Error in deleteProject function:', error.message);
      toast.error('Failed to delete project. Please try again.');
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-forge-950 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-forge-950">
      {/* Header - keep existing header */}
      <header className="border-b border-white/10 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/assets/lightbulb-logo.svg" 
                  alt="ThinkForge Logo" 
                  className="w-10 h-10 object-contain" 
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gradient leading-none">ThinkForge</span>
                <span className="text-xs text-gray-400 leading-none">AI Projects</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.user_metadata?.full_name || user.email}</span>
              <Link to="/">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, <span className="text-gradient">{user.user_metadata?.full_name || 'Creator'}</span>
          </h1>
          <p className="text-xl text-gray-300">
            Let's create something amazing today with AI-powered project ideas.
          </p>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-forge-900/50 border border-white/10 rounded-xl p-1">
            <TabsTrigger value="generate" className="data-[state=active]:bg-gradient-to-r from-purple-500 to-blue-500 data-[state=active]:text-white rounded-lg">
              Generate Ideas
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-gradient-to-r from-purple-500 to-blue-500 data-[state=active]:text-white rounded-lg">
              Saved Projects
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass border-white/10 col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                    Project Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Project Type *</Label>
                      <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent className="bg-forge-900 border-white/10">
                          {projectTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value} className="text-white hover:bg-white/10">
                              <div className="flex items-center">
                                <type.icon className="w-4 h-4 mr-2" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="institution" className="text-gray-300 mb-2 block">
                        College/Institution Name
                      </Label>
                      <Input
                        id="institution"
                        value={formData.institution}
                        onChange={(e) => handleInputChange('institution', e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="Enter your college or institution name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="prompt" className="text-gray-300 mb-2 block">
                      Describe Your Requirements *
                    </Label>
                    <Textarea
                      id="prompt"
                      value={formData.prompt}
                      onChange={(e) => handleInputChange('prompt', e.target.value)}
                      className="bg-white/5 border-white/10 text-white min-h-[120px]"
                      placeholder="Tell us about your skills, interests, technologies you want to use, or specific requirements for your project..."
                    />
                  </div>

                  <Button
                    onClick={generateIdeas}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3"
                  >
                    {loading ? 'Generating Ideas...' : 'Generate Project Ideas'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass border-white/10 h-fit">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Projects Generated</span>
                    <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">{ideas.length}</Badge>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Projects Saved</span>
                    <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">{savedProjects.length}</Badge>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Account Type</span>
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">Free</Badge>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-white/10 text-white hover:bg-white/10"
                      onClick={() => navigate('/#pricing')}
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {ideas.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">
                  Your Personalized <span className="text-gradient">Project Ideas</span>
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {ideas.map((idea, index) => (
                    <Card key={index} className="glass border-white/10 hover:border-purple-500/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          Project Idea {index + 1}
                          <div className="ml-auto flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-white/10 text-white hover:bg-white/10"
                              onClick={() => saveProject(idea)}
                            >
                              Save
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 leading-relaxed">{idea}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Saved Projects</CardTitle>
              </CardHeader>
              <CardContent>
                {savedProjects.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {savedProjects.map((project) => (
                      <Card key={project.id} className="bg-white/5 border-white/10">
                        <CardContent className="pt-6 flex flex-col">
                          <p className="text-gray-300 leading-relaxed flex-grow">{project.content}</p>
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteProject(project.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-300">You haven't saved any projects yet. Generate some ideas and save them to see them here!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Web Development</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-gray-300">
                        <li>• React.js Documentation</li>
                        <li>• Modern CSS Techniques</li>
                        <li>• Full Stack Development Guide</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Mobile Development</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-gray-300">
                        <li>• React Native Fundamentals</li>
                        <li>• Flutter UI Design</li>
                        <li>• Mobile App Architecture</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
