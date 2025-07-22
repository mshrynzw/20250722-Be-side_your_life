'use client';

import { useState, useEffect } from 'react';
import { Search, Play, Pause, Filter, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Sample podcast data
const podcastData = [
  {
    id: 1,
    type: 'episode',
    title: 'The Future of AI in Everyday Life',
    description: 'Exploring how artificial intelligence is reshaping our daily routines and what to expect in the next decade.',
    duration: '42:30',
    host: 'Sarah Chen',
    hostImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    coverArt: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    publishDate: '2 days ago',
    category: 'Technology',
    height: 'h-80'
  },
  {
    id: 2,
    type: 'sns',
    platform: 'twitter',
    content: 'Just finished recording an amazing episode about sustainable business practices. Can\'t wait for you all to hear it! 🎙️ #sustainability #business',
    author: 'Mark Rodriguez',
    authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    timestamp: '3h',
    height: 'h-48'
  },
  {
    id: 3,
    type: 'host',
    name: 'Dr. Emma Williams',
    bio: 'Neuroscientist turned entrepreneur. Host of "Brain Waves" podcast exploring the intersection of science and innovation.',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    expertise: ['Neuroscience', 'Innovation', 'Health'],
    episodes: 127,
    height: 'h-96'
  },
  {
    id: 4,
    type: 'episode',
    title: 'Building Resilient Teams in Remote Work',
    description: 'Leadership expert shares proven strategies for maintaining team cohesion and productivity in distributed environments.',
    duration: '35:15',
    host: 'Michael Thompson',
    hostImage: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    coverArt: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    publishDate: '1 week ago',
    category: 'Business',
    height: 'h-72'
  },
  {
    id: 5,
    type: 'featured',
    title: 'Special Series: Climate Solutions',
    description: 'A 5-part deep dive into innovative approaches to climate change with leading environmental scientists.',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    episodes: 5,
    height: 'h-64'
  },
  {
    id: 6,
    type: 'sns',
    platform: 'instagram',
    image: 'https://images.pexels.com/photos/4050437/pexels-photo-4050437.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    caption: 'Behind the scenes at our latest recording session 🎧',
    author: 'PodcastStudio',
    likes: 247,
    height: 'h-80'
  },
  {
    id: 7,
    type: 'episode',
    title: 'The Psychology of Decision Making',
    description: 'Behavioral economist breaks down the hidden factors that influence our daily choices and how to make better decisions.',
    duration: '48:22',
    host: 'Dr. Lisa Park',
    hostImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    coverArt: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    publishDate: '3 days ago',
    category: 'Psychology',
    height: 'h-84'
  },
  {
    id: 8,
    type: 'host',
    name: 'Alex Rivera',
    bio: 'Former Silicon Valley exec, now full-time podcaster covering startup culture and entrepreneurship.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    expertise: ['Startups', 'Technology', 'Entrepreneurship'],
    episodes: 89,
    height: 'h-88'
  },
  {
    id: 9,
    type: 'episode',
    title: 'Mindfulness in the Digital Age',
    description: 'Meditation teacher and app developer discuss practical techniques for staying present in our hyperconnected world.',
    duration: '38:45',
    host: 'Jessica Moon',
    hostImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    coverArt: 'https://images.pexels.com/photos/3759847/pexels-photo-3759847.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    publishDate: '5 days ago',
    category: 'Health',
    height: 'h-76'
  },
  {
    id: 10,
    type: 'sns',
    platform: 'linkedin',
    content: 'New research shows that podcast listeners have 23% better information retention compared to traditional media consumers.',
    author: 'Research Institute',
    authorImage: 'https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    engagement: '1.2k reactions',
    height: 'h-52'
  },
  {
    id: 11,
    type: 'episode',
    title: 'Quantum Computing Explained Simply',
    description: 'PhD physicist breaks down complex quantum concepts into digestible explanations for curious minds.',
    duration: '44:18',
    host: 'Dr. Robert Kim',
    hostImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    coverArt: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    publishDate: '1 day ago',
    category: 'Science',
    height: 'h-80'
  },
  {
    id: 12,
    type: 'featured',
    title: 'Newsletter Signup',
    description: 'Get weekly episode summaries and exclusive behind-the-scenes content delivered to your inbox.',
    contentType: 'newsletter',
    subscribers: '12.5k',
    height: 'h-56'
  },
  {
    id: 13,
    type: 'episode',
    title: 'The Art of Storytelling in Business',
    description: 'Award-winning filmmaker shares techniques for crafting compelling narratives that drive business results.',
    duration: '41:33',
    host: 'Maria Santos',
    hostImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    coverArt: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    publishDate: '4 days ago',
    category: 'Business',
    height: 'h-78'
  },
  {
    id: 14,
    type: 'host',
    name: 'David Chen',
    bio: 'Tech journalist and author covering emerging technologies and their societal impact.',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    expertise: ['Technology', 'Journalism', 'Future Trends'],
    episodes: 156,
    height: 'h-92'
  },
  {
    id: 15,
    type: 'sns',
    platform: 'youtube',
    title: 'Top 10 Podcast Moments This Month',
    thumbnail: 'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
    views: '45.2k views',
    duration: '12:34',
    height: 'h-64'
  },
  {
    id: 16,
    type: 'episode',
    title: 'Sustainable Fashion Revolution',
    description: 'Industry insider reveals how fashion brands are transforming their practices for a more sustainable future.',
    duration: '39:27',
    host: 'Nina Foster',
    hostImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    coverArt: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    publishDate: '6 days ago',
    category: 'Lifestyle',
    height: 'h-82'
  }
];

const categories = ['All', 'Recent', 'Popular', 'Technology', 'Business', 'Health', 'Science', 'Psychology', 'Lifestyle'];

export default function PodcastHomepage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<any>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(podcastData);

  useEffect(() => {
    let filtered = podcastData;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => 
        item.category === selectedCategory || 
        (selectedCategory === 'Recent' && item.publishDate && ['1 day ago', '2 days ago', '3 days ago'].includes(item.publishDate)) ||
        (selectedCategory === 'Popular' && item.type === 'episode')
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.host?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedCategory]);

  const handlePlay = (episode: any) => {
    if (currentlyPlaying?.id === episode.id) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(episode);
    }
  };

  const EpisodeCard = ({ episode }: { episode: any }) => (
    <Card className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden ${episode.height} relative bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-orange-900/20`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={episode.coverArt} 
          alt={episode.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Button
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 hover:bg-orange-600 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          onClick={() => handlePlay(episode)}
        >
          {currentlyPlaying?.id === episode.id ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        <Badge className="absolute top-4 right-4 bg-black/70 text-white backdrop-blur-sm">
          {episode.duration}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={episode.hostImage} />
            <AvatarFallback>{episode.host?.[0]}</AvatarFallback>
          </Avatar>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div className="font-medium">{episode.host}</div>
            <div>{episode.publishDate}</div>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {episode.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">
          {episode.description}
        </p>
        <Badge variant="secondary" className="text-xs">
          {episode.category}
        </Badge>
      </CardContent>
    </Card>
  );

  const SNSCard = ({ post }: { post: any }) => (
    <Card className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${post.height} bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.authorImage} />
            <AvatarFallback>{post.author?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-sm">{post.author}</div>
            <div className="text-xs text-gray-500">{post.platform} • {post.timestamp || post.engagement}</div>
          </div>
        </div>
        
        {post.image && (
          <div className="mb-4 -mx-6">
            <img src={post.image} alt="" className="w-full h-48 object-cover" />
          </div>
        )}
        
        {post.content && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {post.content}
          </p>
        )}
        
        {post.title && (
          <>
            <h4 className="font-semibold mb-2">{post.title}</h4>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span>{post.views}</span>
              <span>•</span>
              <span>{post.duration}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  const HostCard = ({ host }: { host: any }) => (
    <Card className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${host.height} bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-900/40 dark:to-orange-800/40`}>
      <CardContent className="p-6">
        <div className="text-center">
          <img 
            src={host.image} 
            alt={host.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-white dark:ring-gray-800 shadow-lg"
          />
          <h3 className="font-bold text-lg mb-2">{host.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {host.bio}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {host.expertise.map((skill: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            {host.episodes} episodes
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FeaturedCard = ({ item }: { item: any }) => (
    <Card className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${item.height} bg-gradient-to-br from-orange-300 to-orange-400 dark:from-orange-900/50 dark:to-orange-800/50`}>
      <CardContent className="p-6 h-full flex flex-col justify-center">
        {item.image && (
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
        )}
        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
          {item.description}
        </p>
        {item.episodes && (
          <Badge className="self-start">
            {item.episodes} episodes
          </Badge>
        )}
        {item.subscribers && (
          <div className="text-sm text-gray-500">
            {item.subscribers} subscribers
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 dark:from-orange-950 dark:via-orange-900 dark:to-orange-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-orange-900/90 backdrop-blur-xl border-b border-orange-200/50 dark:border-orange-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                PodcastHub
              </h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium hover:text-orange-600 transition-colors">Episodes</a>
                <a href="#" className="text-sm font-medium hover:text-orange-600 transition-colors">Hosts</a>
                <a href="#" className="text-sm font-medium hover:text-orange-600 transition-colors">Categories</a>
                <a href="#" className="text-sm font-medium hover:text-orange-600 transition-colors">About</a>
                <Link href="/admin" className="text-sm font-medium hover:text-orange-600 transition-colors">
                  管理画面
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search podcasts, hosts, topics..." 
                  className="pl-10 bg-white/70 dark:bg-orange-800/50 backdrop-blur-sm border-orange-200/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-[73px] z-40 bg-white/80 dark:bg-orange-900/80 backdrop-blur-xl border-b border-orange-200/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                className={`shrink-0 transition-all duration-200 ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg' 
                    : 'hover:bg-orange-100 dark:hover:bg-orange-800/50'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredData.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              {item.type === 'episode' && <EpisodeCard episode={item} />}
              {item.type === 'sns' && <SNSCard post={item} />}
              {item.type === 'host' && <HostCard host={item} />}
              {item.type === 'featured' && <FeaturedCard item={item} />}
            </div>
          ))}
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No results found. Try adjusting your search or filter.</p>
          </div>
        )}
      </main>

      {/* Floating Audio Player */}
      {currentlyPlaying && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-orange-900/95 backdrop-blur-xl border-t border-orange-200/50 dark:border-orange-700/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <img 
                src={currentlyPlaying.coverArt} 
                alt={currentlyPlaying.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{currentlyPlaying.title}</div>
                <div className="text-xs text-gray-500 truncate">{currentlyPlaying.host}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => setCurrentlyPlaying(null)}
                >
                  <Pause size={16} />
                </Button>
                <div className="text-xs text-gray-500 min-w-0">
                  {currentlyPlaying.duration}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}