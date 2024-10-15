'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCreateBlogMutation, useDeleteBlogMutation, useGetAllBlogsQuery, useGetUsersBlogsQuery, useUpdateBlogMutation } from "@/lib/rtkqueryAPI/blogs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from '@clerk/nextjs'
import { Loader2, Search, Filter, BarChart2, TrendingUp, Award, ThumbsUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function EnhancedBusinessBlogPlatform() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [filterCategory, setFilterCategory] = useState('all')

  const { data: allPublicBlogs } = useGetAllBlogsQuery()
  const { data: userBlogs } = useGetUsersBlogsQuery()

  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation()
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation()
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation()

  const { isSignedIn, user } = useUser()

  const handleCreateOrUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingBlogId) {
      await updateBlog({ blog_id: editingBlogId, data: { title, description } })
      setEditingBlogId(null)
    } else {
      await createBlog({ title, description })
    }
    setTitle('')
    setDescription('')
  }

  const handleEdit = (blog: any) => {
    setEditingBlogId(blog.id)
    setTitle(blog.title)
    setDescription(blog.description)
  }

  const handleDelete = async (id: string) => {
    await deleteBlog(id)
  }

  const filteredBlogs = (blogs: any[] = []) => {
    return blogs
      .filter((blog) => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((blog) => filterCategory === 'all' || blog.category === filterCategory)
      .sort((a, b) => {
        if (sortBy === 'latest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        if (sortBy === 'popular') return b.likes - a.likes
        return 0
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-4 pt-8">
       

        <Tabs defaultValue="dashboard" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="your-blogs">Your Blogs</TabsTrigger>
            <TabsTrigger value="public-blogs">Public Blogs</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle>Business Insights</CardTitle>
                <CardDescription>Overview of your blog performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-4 bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                    <BarChart2 className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Views</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">10,234</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                    <TrendingUp className="h-10 w-10 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Engagement Rate</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">8.7%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
                    <Award className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Performing Blog</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white truncate">Business Strategies 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="your-blogs">
            {isSignedIn && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl">
                  <CardHeader>
                    <CardTitle>{editingBlogId ? 'Edit Blog' : 'Create New Blog'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateOrUpdateBlog} className="space-y-4">
                      <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                      <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="bg-white/50 dark:bg-gray-700/50"
                      />
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        type="submit" 
                        disabled={isCreating || isUpdating}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
                      >
                        {isCreating || isUpdating ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {editingBlogId ? 'Update Blog' : 'Create Blog'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search your blogs"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-gray-700/50"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence>
                    {filteredBlogs(userBlogs?.data).map((blog: any) => (
                      <motion.div
                        key={blog.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-200">
                          <CardHeader>
                            <CardTitle>{blog.title}</CardTitle>
                            <CardDescription>By {blog.username}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="line-clamp-3">{blog.description}</p>
                            <div className="mt-4 flex items-center space-x-2">
                              <ThumbsUp className="h-4 w-4 text-blue-500" />
                              <span className="text-sm text-gray-500 dark:text-gray-400">{blog.likes} Likes</span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">View</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>{blog.title}</DialogTitle>
                                  <DialogDescription>By {blog.username}</DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>{blog.description}</p>
                                </div>
                                <DialogFooter>
                                  <Button onClick={() => handleEdit(blog)}>Edit</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button variant="destructive" onClick={() => handleDelete(blog.id)} disabled={isDeleting}>
                              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="public-blogs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search public blogs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 dark:bg-gray-700/50"
                  />
                </div>
                <div className="flex space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {filteredBlogs(allPublicBlogs?.data).map((blog: any) => (
                    <motion.div
                      key={blog.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <CardHeader>
                          <CardTitle>{blog.title}</CardTitle>
                          <CardDescription>By {blog.username}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="line-clamp-3">{blog.description}</p>
                          <div className="mt-4 flex items-center space-x-2">
                            <ThumbsUp className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">{blog.likes} Likes</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">Read More</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>{blog.title}</DialogTitle>
                                <DialogDescription>By {blog.username}</DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <p>{blog.description}</p>
                              </div>
                              <DialogFooter>
                                <Button>Like</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}