import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: '🔐',
      title: 'Self-Sovereign Identity',
      description: 'Own your digital identity with DID technology. No platform can control or censor your authentic self.'
    },
    {
      icon: '🌍',
      title: 'Cultural Connection',
      description: 'Connect with the global Black Diaspora. Share stories, traditions, and experiences that matter.'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Curation',
      description: 'Culturally-aware AI that understands context, nuance, and promotes authentic community voices.'
    },
    {
      icon: '⚡',
      title: 'Decentralized Social',
      description: 'Built on AT Protocol. Your data, your community, your rules. True social media freedom.'
    }
  ];

  const stats = [
    { label: 'Active Communities', value: '50+', icon: '🏘️' },
    { label: 'Cultural Posts', value: '10K+', icon: '📝' },
    { label: 'Global Reach', value: '25 Countries', icon: '🌎' },
    { label: 'Languages', value: '12+', icon: '🗣️' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section 
        className="text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-nukie-red via-nukie-gold to-nukie-green bg-clip-text text-transparent">
            Scroll Your Culture
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The first decentralized social platform built for the global Black Diaspora. 
          Share your story, connect with your community, own your identity.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {user ? (
            <Link to="/timeline">
              <Button size="lg" className="text-lg px-8 py-4">
                🚀 Go to Timeline
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-4">
                  ✊🏾 Join the Movement
                </Button>
              </Link>
              <Link to="/timeline">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                  👀 Explore First
                </Button>
              </Link>
            </>
          )}
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
          >
            <Card className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-nukie-gold">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-nukie-gold to-cultural-sunset bg-clip-text text-transparent">
            Built Different
          </span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.2 }}
            >
              <Card hover={false}>
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-nukie-gold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <Card className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Own Your Digital Story?
          </h2>
          <p className="text-white/80 mb-6">
            Join thousands of creators, artists, activists, and community builders 
            who are defining the future of social media.
          </p>
          {!user && (
            <Link to="/auth">
              <Button size="lg">
                🌟 Create Your Identity
              </Button>
            </Link>
          )}
        </Card>
      </motion.section>
    </div>
  );
};

export default HomePage;