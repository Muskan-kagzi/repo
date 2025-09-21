import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, Shield, Activity, AlertTriangle, Zap, BarChart3, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import heroImage from '@/assets/iage2.png';

export default function Landing() {
  const navigate = useNavigate();
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    organization: '',
    mineRegion: '',
    message: '',
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo Request Submitted",
      description: "We'll contact you within 24 hours to schedule your demo.",
    });
    setDemoForm({
      name: '',
      email: '',
      organization: '',
      mineRegion: '',
      message: '',
    });
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Real-time Risk Maps",
      description: "Interactive visualization of rockfall risk zones with live updates from sensor networks.",
      color: "text-primary",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "AI Predictions",
      description: "Advanced machine learning models analyze multiple data sources for accurate forecasting.",
      color: "text-risk-low",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Instant Alerts",
      description: "Automated notifications via SMS and email when risk thresholds are exceeded.",
      color: "text-risk-high",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "24/7 Monitoring",
      description: "Continuous monitoring with real-time data processing and analysis.",
      color: "text-warning",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Comprehensive Analytics",
      description: "Detailed reports and insights to optimize safety protocols and operations.",
      color: "text-info",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Role-based Access",
      description: "Tailored interfaces for operators, inspectors, and administrators.",
      color: "text-accent",
    },
  ];

  const stats = [
    { value: "99.7%", label: "Prediction Accuracy" },
    { value: "<2min", label: "Alert Response Time" },
    { value: "24/7", label: "Continuous Monitoring" },
    { value: "50%", label: "Incident Reduction" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-foreground">RockfallAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#technology" className="text-muted-foreground hover:text-foreground transition-colors">Technology</a>
              <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">Request Demo</a>
              <Button 
                onClick={() => navigate('/login')}
                className="bg-gradient-primary hover:opacity-90 text-white"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Open-pit mine" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Rockfall Risk Prediction<br />System
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-powered safety monitoring for open-pit mines
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-primary hover:opacity-90 text-white px-8 py-6 text-lg"
            >
              View Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-muted-foreground rotate-90" />
        </div>
      </section>

      {/* Advanced Safety Technology Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Advanced Safety Technology</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leveraging cutting-edge AI and real-time data to prevent rockfall incidents before they happen
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card hover:bg-card-hover transition-all duration-300 border-border">
                <div className="p-6">
                  <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transforming Mine Safety Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <Card className="bg-primary/10 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
            <div className="p-12 text-center">
              <Shield className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Transforming Mine Safety
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Reducing accidents, downtime, and costs with proactive rockfall prediction.
                Our system helps mining operations save lives and improve efficiency
                through intelligent risk assessment and early warning systems.
              </p>
              <Button 
                size="lg"
                variant="secondary"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary hover:bg-white/90"
              >
                Request a Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Demo Request Form */}
      <section id="demo" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Request a Demo</h2>
            <Card className="bg-card border-border">
              <form onSubmit={handleDemoSubmit} className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                    <Input
                      required
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      className="bg-input border-border"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <Input
                      required
                      type="email"
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      className="bg-input border-border"
                      placeholder="john@miningco.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Organization *</label>
                    <Input
                      required
                      value={demoForm.organization}
                      onChange={(e) => setDemoForm({ ...demoForm, organization: e.target.value })}
                      className="bg-input border-border"
                      placeholder="Mining Company Ltd."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Mine Region</label>
                    <Input
                      value={demoForm.mineRegion}
                      onChange={(e) => setDemoForm({ ...demoForm, mineRegion: e.target.value })}
                      className="bg-input border-border"
                      placeholder="e.g., Western Australia"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <Textarea
                    value={demoForm.message}
                    onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                    className="bg-input border-border min-h-[100px]"
                    placeholder="Tell us about your mining operations and safety requirements..."
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    By submitting this form, you agree to our privacy policy and consent to be contacted about our services.
                  </p>
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90 text-white"
                >
                  Submit Demo Request
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-foreground">RockfallAI</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <div className="text-sm text-muted-foreground mt-4 md:mt-0">
              © 2025 RockfallAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}