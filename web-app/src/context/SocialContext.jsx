import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SocialContext = createContext();

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

export const SocialProvider = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample cultural posts for demo
  const samplePosts = [
    {
      id: '1',
      author: {
        handle: 'afrofuturist',
        displayName: 'Afrofuturist Queen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=afrofuturist',
        did: 'did:key:z6MkAfrofuturist123'
      },
      content: 'Just dropped some new Afrofuturist art inspired by Octavia Butler! 🎨✨ The intersection of technology and spirituality in Black imagination is everything! #AfroFuturism #BlackArt',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      likes: 47,
      reposts: 12,
      replies: 8,
      media: null,
      culturalTags: ['AfroFuturism', 'BlackArt', 'SpiritualTech']
    },
    {
      id: '2',
      author: {
        handle: 'carribean_chef',
        displayName: 'Island Chef Marcus',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chef',
        did: 'did:key:z6MkCarribean456'
      },
      content: 'Teaching my daughter how to make my grandmother\'s curry goat recipe today 🇯🇲 Passing down these flavors is passing down our history. Food is culture, culture is love! #CaribbeanCooking #FamilyTraditions',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      likes: 89,
      reposts: 23,
      replies: 15,
      media: null,
      culturalTags: ['CaribbeanCooking', 'FamilyTraditions', 'JamaicanCulture']
    },
    {
      id: '3',
      author: {
        handle: 'ubuntu_philosopher',
        displayName: 'Ubuntu Wisdom',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ubuntu',
        did: 'did:key:z6MkUbuntu789'
      },
      content: '\"I am because we are.\" Ubuntu philosophy reminds us that our humanity is interconnected. In a world pushing individualism, let\'s remember our collective strength 🤝🏾 #Ubuntu #AfricanPhilosophy #Community',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      likes: 156,
      reposts: 42,
      replies: 28,
      media: null,
      culturalTags: ['Ubuntu', 'AfricanPhilosophy', 'Community']
    }
  ];

  const createPost = async (content, media = null, culturalTags = []) => {
    if (!user) return { success: false, error: 'Must be logged in to post' };
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newPost = {
        id: Date.now().toString(),
        author: {
          handle: user.handle,
          displayName: user.displayName,
          avatar: user.avatar,
          did: user.did
        },
        content,
        timestamp: new Date().toISOString(),
        likes: 0,
        reposts: 0,
        replies: 0,
        media,
        culturalTags,
        isOwn: true
      };
      
      setPosts(prev => [newPost, ...prev]);
      return { success: true, post: newPost };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const repost = async (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, reposts: post.reposts + 1, isReposted: !post.isReposted }
        : post
    ));
  };

  // Load sample posts on mount
  useEffect(() => {
    setPosts(samplePosts);
  }, []);

  const value = {
    posts,
    loading,
    createPost,
    likePost,
    repost,
  };

  return (
    <SocialContext.Provider value={value}>
      {children}
    </SocialContext.Provider>
  );
};