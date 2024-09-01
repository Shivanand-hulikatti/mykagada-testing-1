'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, User, FileText, Book, Users, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom'
import Roadmap from './Roadmap'
import { useAuth0 } from '@auth0/auth0-react';

export default function HomePage() {
  const [username, setUsername] = useState('Educator')
  const navigate = useNavigate();
  const { logout, user } = useAuth0();

  useEffect(() => {
    // Update username from Auth0 user object
    if (user && user.name) {
      setUsername(user.name)
    }
  }, [user])

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  }

  const handleEditProfile = () => {
    navigate('/profile');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors duration-300">MyKagada</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors duration-300">Create Exam</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 transition-colors duration-300">
                  <User className="h-5 w-5 text-blue-600" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleEditProfile}>View Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-shadow duration-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome back, {username}!</h2>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create a New Exam
            </Button>
          </div>
        </motion.div>

        {/* Exam Types */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Supported Exam Types</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {['JEE', 'NEET', 'KCET', '11th', '12th', 'More'].map((exam) => (
              <Card 
                key={exam} 
                className="hover:shadow-md transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 group"
              >
                <CardContent className="flex items-center justify-center h-28 p-2">
                  <span className="text-lg font-medium text-blue-700 group-hover:text-blue-800 transition-colors duration-300">{exam}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section> 

        {/* How It Works */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h3>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <Roadmap />
            </CardContent>
          </Card>
        </motion.section>

        {/* Quick Actions */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-blue-600 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <CardTitle>Create New Exam</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Start creating a new exam with our intuitive exam builder.</p>
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300">
                <PlusCircle className="mr-2 h-4 w-4" />
                Start Creating
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-gray-700 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <CardTitle>View Question Bank</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Access and manage your comprehensive question bank.</p>
              <Button variant="secondary" className="bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-300">
                <FileText className="mr-2 h-4 w-4" />
                Browse Questions
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">MyKagada</h4>
              <p className="text-sm text-gray-300">Empowering educators with comprehensive exam management tools.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-sm text-gray-300">Email: support@MyKagada.com</p>
              <p className="text-sm text-gray-300">Phone: +1 (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} MyKagada. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}