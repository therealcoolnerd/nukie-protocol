import React from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useSocial } from '../context/SocialContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const { posts } = useSocial();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const userPosts = posts.filter(post => post.author.handle === user.handle);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-32 h-32 rounded-full border-4 border-nukie-gold/50"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-nukie-green rounded-full border-4 border-white flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl font-bold text-white mb-2"
              >
                {user.displayName}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-nukie-gold text-lg mb-2"
              >
                @{user.handle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-nukie-purple/20 rounded-lg p-3 mb-4"
              >
                <p className="text-white/80 text-sm font-mono">
                  🔐 DID: {user.did}
                </p>
              </motion.div>

              {user.bio && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-white/80 mb-4"
                >
                  {user.bio}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-6 text-center md:text-left"
              >
                <div>
                  <div className="text-2xl font-bold text-nukie-gold">{user.posts || userPosts.length}</div>
                  <div className="text-white/70 text-sm">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-nukie-gold">{user.followers}</div>
                  <div className="text-white/70 text-sm">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-nukie-gold">{user.following}</div>
                  <div className="text-white/70 text-sm">Following</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-nukie-gold">
                    {new Date(user.joinedAt).getFullYear()}
                  </div>
                  <div className="text-white/70 text-sm">Joined</div>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col space-y-3"
            >
              <Button variant="secondary" size="sm">
                ✏️ Edit Profile
              </Button>
              <Button variant="ghost" size="sm">
                📤 Share Profile
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Cultural Identity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <h2 className="text-xl font-semibold text-nukie-gold mb-4">
            🌍 Cultural Identity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl mb-2">🌍</div>
              <div className="text-sm text-white/70">Heritage</div>
              <div className="font-medium">Global Diaspora</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl mb-2">🗣️</div>
              <div className="text-sm text-white/70">Languages</div>
              <div className="font-medium">English, More</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-sm text-white/70">Interests</div>
              <div className="font-medium">Art, Music, Tech</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Posts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <h2 className="text-xl font-semibold text-nukie-gold mb-6">
            📝 Your Posts
          </h2>
          
          {userPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✍🏾</div>
              <h3 className="text-lg font-semibold mb-2">Start sharing your story</h3>
              <p className="text-white/70 mb-6">
                Your posts will appear here. Share your culture, thoughts, and experiences!
              </p>
              <Button variant="primary">
                ✨ Create Your First Post
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <p className="text-white/90 mb-3">{post.content}</p>
                  {post.culturalTags && post.culturalTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.culturalTags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-nukie-purple/30 text-nukie-gold text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm text-white/50">
                    <span>
                      {new Date(post.timestamp).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-4">
                      <span>❤️ {post.likes}</span>
                      <span>🔄 {post.reposts}</span>
                      <span>💬 {post.replies}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfilePage;