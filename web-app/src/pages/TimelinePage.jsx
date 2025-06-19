import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useSocial } from '../context/SocialContext';

const TimelinePage = () => {
  const { user } = useAuth();
  const { posts, createPost, likePost, repost, loading } = useSocial();
  const [postContent, setPostContent] = useState('');
  const [culturalTags, setCulturalTags] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setIsPosting(true);
    const tags = culturalTags.split(',').map(tag => tag.trim()).filter(Boolean);
    
    const result = await createPost(postContent, null, tags);
    if (result.success) {
      setPostContent('');
      setCulturalTags('');
    }
    setIsPosting(false);
  };

  const PostCard = ({ post }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card hover={false}>
        {/* Post Header */}
        <div className="flex items-start space-x-3 mb-4">
          <img
            src={post.author.avatar}
            alt={post.author.displayName}
            className="w-12 h-12 rounded-full border-2 border-nukie-gold/30"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white">
                {post.author.displayName}
              </h3>
              <span className="text-nukie-gold text-sm">
                @{post.author.handle}
              </span>
              <span className="text-white/50 text-sm">
                •
              </span>
              <span className="text-white/50 text-sm">
                {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
              </span>
            </div>
            <p className="text-white/70 text-xs mt-1">
              DID: {post.author.did.substring(0, 20)}...
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-white/90 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Cultural Tags */}
        {post.culturalTags && post.culturalTags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.culturalTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-nukie-purple/30 text-nukie-gold text-sm rounded-full border border-nukie-purple/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => likePost(post.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                post.isLiked 
                  ? 'text-nukie-red bg-nukie-red/20' 
                  : 'text-white/70 hover:text-nukie-red hover:bg-nukie-red/10'
              }`}
            >
              <span>{post.isLiked ? '❤️' : '🤍'}</span>
              <span className="text-sm">{post.likes}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => repost(post.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                post.isReposted 
                  ? 'text-nukie-green bg-nukie-green/20' 
                  : 'text-white/70 hover:text-nukie-green hover:bg-nukie-green/10'
              }`}
            >
              <span>🔄</span>
              <span className="text-sm">{post.reposts}</span>
            </motion.button>

            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white/70 hover:text-cultural-ocean hover:bg-cultural-ocean/10 transition-colors">
              <span>💬</span>
              <span className="text-sm">{post.replies}</span>
            </button>
          </div>

          <button className="text-white/50 hover:text-white/70 transition-colors">
            <span>📤</span>
          </button>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Timeline Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-nukie-gold to-cultural-sunset bg-clip-text text-transparent">
            Your Timeline
          </span>
        </h1>
        <p className="text-white/70">
          Stay connected with your community and culture
        </p>
      </motion.div>

      {/* Post Creation */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="flex items-start space-x-3">
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-12 h-12 rounded-full border-2 border-nukie-gold/30"
                />
                <div className="flex-1">
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="What's happening in your culture today? 🌍"
                    className="input w-full h-24 resize-none"
                    maxLength={280}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-white/50">
                      {postContent.length}/280
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={culturalTags}
                  onChange={(e) => setCulturalTags(e.target.value)}
                  placeholder="Cultural tags (e.g., AfroFuturism, CaribbeanCooking, Ubuntu)"
                  className="input w-full"
                />
                <p className="text-xs text-white/50 mt-1">
                  Separate multiple tags with commas
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📷</span>
                  <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🎵</span>
                  <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📍</span>
                </div>
                <Button
                  type="submit"
                  disabled={!postContent.trim() || isPosting}
                  loading={isPosting}
                  size="sm"
                >
                  {isPosting ? 'Posting...' : 'Share Your Story'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Posts Feed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-nukie-gold/30 border-t-nukie-gold rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading your timeline...</p>
          </div>
        ) : posts.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-2">Your timeline is growing!</h3>
            <p className="text-white/70">
              Follow creators and communities to see their posts here.
            </p>
          </Card>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TimelinePage;