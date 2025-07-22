'use client';

import { useState } from 'react';
import { Eye, EyeOff, Settings, Upload, Play, Pause, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('episodes');

  // Sample data for demonstration
  const [episodes, setEpisodes] = useState([
    {
      id: 1,
      title: 'The Future of AI in Everyday Life',
      description: 'Exploring how artificial intelligence is reshaping our daily routines...',
      duration: '42:30',
      status: 'published',
      publishDate: '2024-01-15',
      downloads: 1250,
      audioFile: 'episode-001.mp3'
    },
    {
      id: 2,
      title: 'Building Resilient Teams in Remote Work',
      description: 'Leadership expert shares proven strategies for maintaining team cohesion...',
      duration: '35:15',
      status: 'draft',
      publishDate: null,
      downloads: 0,
      audioFile: 'episode-002.mp3'
    }
  ]);

  const [newEpisode, setNewEpisode] = useState<{
    title: string;
    description: string;
    audioFile: File | null;
    coverImage: File | null;
    category: string;
    tags: string;
  }>({
    title: '',
    description: '',
    audioFile: null,
    coverImage: null,
    category: '',
    tags: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login - in real app, this would be proper authentication
    if (loginForm.username === 'admin' && loginForm.password === 'podcast123') {
      setIsLoggedIn(true);
    } else {
      alert('ログイン情報が正しくありません');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
  };

  const handlePublishEpisode = (id: number) => {
    setEpisodes(episodes.map(ep => 
      ep.id === id 
        ? { ...ep, status: 'published', publishDate: new Date().toISOString().split('T')[0] }
        : ep
    ));
  };

  const handleDeleteEpisode = (id: number) => {
    if (confirm('このエピソードを削除しますか？')) {
      setEpisodes(episodes.filter(ep => ep.id !== id));
    }
  };

  const handleCreateEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    const episode = {
      id: Date.now(),
      title: newEpisode.title,
      description: newEpisode.description,
      duration: '00:00',
      status: 'draft' as const,
      publishDate: null,
      downloads: 0,
      audioFile: newEpisode.audioFile?.name || 'new-episode.mp3'
    };
    setEpisodes([...episodes, episode]);
    setNewEpisode({
      title: '',
      description: '',
      audioFile: null,
      coverImage: null,
      category: '',
      tags: ''
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              管理者ログイン
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">ユーザー名</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="ユーザー名を入力"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="パスワードを入力"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800"
              >
                ログイン
              </Button>
            </form>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg text-sm text-orange-700">
              <p><strong>デモ用ログイン情報:</strong></p>
              <p>ユーザー名: admin</p>
              <p>パスワード: podcast123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-orange-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                  PodcastHub 管理画面
                </h1>
                <p className="text-sm text-gray-600">Podcast配信管理システム</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-orange-200 hover:bg-orange-50"
            >
              ログアウト
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="episodes" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              エピソード管理
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              新規作成
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              分析
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              設定
            </TabsTrigger>
          </TabsList>

          {/* Episodes Management */}
          <TabsContent value="episodes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">エピソード一覧</h2>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {episodes.length} エピソード
              </Badge>
            </div>

            <div className="grid gap-6">
              {episodes.map((episode) => (
                <Card key={episode.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{episode.title}</h3>
                          <Badge 
                            variant={episode.status === 'published' ? 'default' : 'secondary'}
                            className={episode.status === 'published' 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            }
                          >
                            {episode.status === 'published' ? '公開中' : '下書き'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">{episode.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>時間: {episode.duration}</span>
                          {episode.publishDate && <span>公開日: {episode.publishDate}</span>}
                          <span>ダウンロード: {episode.downloads}回</span>
                          <span>ファイル: {episode.audioFile}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-orange-200 hover:bg-orange-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {episode.status === 'draft' && (
                          <Button 
                            size="sm" 
                            onClick={() => handlePublishEpisode(episode.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            公開
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteEpisode(episode.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create New Episode */}
          <TabsContent value="create" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">新しいエピソードを作成</h2>
            
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <form onSubmit={handleCreateEpisode} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">エピソードタイトル *</Label>
                      <Input
                        id="title"
                        placeholder="エピソードのタイトルを入力"
                        value={newEpisode.title}
                        onChange={(e) => setNewEpisode({...newEpisode, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">カテゴリー</Label>
                      <Input
                        id="category"
                        placeholder="Technology, Business, Health など"
                        value={newEpisode.category}
                        onChange={(e) => setNewEpisode({...newEpisode, category: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">エピソード説明 *</Label>
                    <Textarea
                      id="description"
                      placeholder="エピソードの内容について詳しく説明してください"
                      rows={4}
                      value={newEpisode.description}
                      onChange={(e) => setNewEpisode({...newEpisode, description: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="audio">音声ファイル *</Label>
                      <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
                        <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">音声ファイルをドラッグ&ドロップ</p>
                        <Input
                          id="audio"
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={(e) => setNewEpisode({...newEpisode, audioFile: e.target.files?.[0] || null})}
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => document.getElementById('audio')?.click()}
                        >
                          ファイルを選択
                        </Button>
                        {newEpisode.audioFile && (
                          <p className="text-sm text-green-600 mt-2">
                            選択済み: {newEpisode.audioFile.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cover">カバー画像</Label>
                      <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
                        <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">カバー画像をアップロード</p>
                        <Input
                          id="cover"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setNewEpisode({...newEpisode, coverImage: e.target.files?.[0] || null})}
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => document.getElementById('cover')?.click()}
                        >
                          画像を選択
                        </Button>
                        {newEpisode.coverImage && (
                          <p className="text-sm text-green-600 mt-2">
                            選択済み: {newEpisode.coverImage.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">タグ</Label>
                    <Input
                      id="tags"
                      placeholder="タグをカンマ区切りで入力 (例: AI, 技術, 未来)"
                      value={newEpisode.tags}
                      onChange={(e) => setNewEpisode({...newEpisode, tags: e.target.value})}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      下書きとして保存
                    </Button>
                    <Button type="button" variant="outline">
                      プレビュー
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">分析データ</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-orange-400 to-orange-500 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">1,250</div>
                    <div className="text-orange-100">総ダウンロード数</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">89</div>
                    <div className="text-green-100">アクティブリスナー</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">4.8</div>
                    <div className="text-blue-100">平均評価</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>人気エピソード</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {episodes.filter(ep => ep.status === 'published').map((episode, index) => (
                    <div key={episode.id} className="flex items-center gap-4 p-3 rounded-lg bg-orange-50">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{episode.title}</div>
                        <div className="text-sm text-gray-600">{episode.downloads} ダウンロード</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">配信設定</h2>
            
            <div className="grid gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Podcast情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Podcast名</Label>
                      <Input defaultValue="PodcastHub" />
                    </div>
                    <div className="space-y-2">
                      <Label>ホスト名</Label>
                      <Input defaultValue="管理者" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Podcast説明</Label>
                    <Textarea 
                      defaultValue="最新のテクノロジーとビジネストレンドについて語るPodcast"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>配信設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>RSS Feed URL</Label>
                      <Input defaultValue="https://podcasthub.com/feed.xml" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>カテゴリー</Label>
                      <Input defaultValue="Technology" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>言語</Label>
                    <Input defaultValue="ja-JP" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>プラットフォーム連携</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span>Spotify</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">接続済み</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span>Apple Podcasts</span>
                      </div>
                      <Button size="sm" variant="outline">接続</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <span>Google Podcasts</span>
                      </div>
                      <Button size="sm" variant="outline">接続</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}