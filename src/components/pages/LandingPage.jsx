import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link as ScrollLink } from 'react-scroll';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ExamManagementLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const NavItem = ({ to, children, isScrolled }) => (
    <ScrollLink
      to={to}
      smooth={true}
      duration={500}
      className={`text-xl transition px-2 py-1 rounded cursor-pointer ${
        isScrolled 
          ? 'text-blue-600 hover:bg-blue-100' 
          : 'text-white hover:bg-blue-300'
      }`}
      onClick={closeMenu}
    >
      {children}
    </ScrollLink>
  );

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 text-white">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className={`text-3xl font-bold ${isScrolled ? 'text-blue-600' : 'text-white'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Kaagada
          </motion.div>
          <div className="hidden md:flex space-x-8">
            <NavItem to="features" isScrolled={isScrolled}>Features</NavItem>
            <NavItem to="exams" isScrolled={isScrolled}>Exams</NavItem>
            <NavItem to="workflow" isScrolled={isScrolled}>Workflow</NavItem>
            <NavItem to="pricing" isScrolled={isScrolled}>Pricing</NavItem>
            <NavItem to="contact" isScrolled={isScrolled}>Contact Us</NavItem>
          </div>
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" size="lg" className={`font-semibold ${
                    isScrolled 
                      ? 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white' 
                      : 'text-white border-white hover:bg-white hover:text-blue-600 bg-blue-600/30'
                  }`}>Profile</Button>
                </Link>
                <Button 
                  size="lg" 
                  className={`font-semibold ${
                    isScrolled
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-blue-600 hover:bg-blue-100'
                  }`}
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={`font-semibold ${
                    isScrolled 
                      ? 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white' 
                      : 'text-white border-white hover:bg-white hover:text-blue-600 bg-blue-600/30'
                  }`}
                  onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                >
                  Sign Up
                </Button>
                <Button 
                  size="lg" 
                  className={`font-semibold ${
                    isScrolled
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-blue-600 hover:bg-blue-100'
                  }`}
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </Button>
              </>
            )}
          </div>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className={isScrolled ? 'text-blue-600' : 'text-white'}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={`w-[300px] sm:w-[400px] ${isScrolled ? 'bg-white text-blue-600' : 'bg-blue-800 text-white'}`}>
              <nav className="flex flex-col space-y-4 mt-8">
                <NavItem to="features" isScrolled={isScrolled}>Features</NavItem>
                <NavItem to="workflow" isScrolled={isScrolled}>Workflow</NavItem>
                <NavItem to="exams" isScrolled={isScrolled}>Exams</NavItem>
                <NavItem to="pricing" isScrolled={isScrolled}>Pricing</NavItem>
                <NavItem to="contact" isScrolled={isScrolled}>Contact Us</NavItem>
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={closeMenu}>
                      <Button variant="outline" size="lg" className={`font-semibold w-full ${
                        isScrolled 
                          ? 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white' 
                          : 'text-white border-white hover:bg-white hover:text-blue-600 bg-blue-600/30'
                      }`}>Profile</Button>
                    </Link>
                    <Button 
                      size="lg" 
                      className={`font-semibold w-full ${
                        isScrolled
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-white text-blue-600 hover:bg-blue-100'
                      }`}
                      onClick={() => logout({ returnTo: window.location.origin })}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className={`font-semibold w-full ${
                        isScrolled 
                          ? 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white' 
                          : 'text-white border-white hover:bg-white hover:text-blue-600 bg-blue-600/30'
                      }`}
                      onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                    >
                      Sign Up
                    </Button>
                    <Button 
                      size="lg" 
                      className={`font-semibold w-full ${
                        isScrolled
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-white text-blue-600 hover:bg-blue-100'
                      }`}
                      onClick={() => loginWithRedirect()}
                    >
                      Login
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Create and Manage Exams with Ease</h1>
              <p className="text-2xl mb-10 text-blue-200">Empower your teaching with our intuitive exam platform. Create, organize, and distribute MCQs effortlessly.</p>
              <div className="space-x-6">
                <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 text-xl px-8 py-4 font-bold shadow-lg">Get Started</Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600 text-xl px-8 py-4 font-semibold bg-blue-600/30">Learn More</Button>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative group overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:rounded-lg">
                <img 
                  src="/heropng.png" 
                  alt="Exam Management Platform" 
                  className="w-full h-auto transition-all duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-3xl font-bold mb-4">Exam Management Platform</h3>
                    <p className="text-xl">Streamline your exam creation process</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="py-20 bg-white text-blue-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Streamline Your Exam Creation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Comprehensive Question Bank", icon: "📚", description: "Access thousands of pre-made MCQs across various subjects." },
                { title: "Custom Question Creator", icon: "✏️", description: "Design your own unique questions with our intuitive editor." },
                { title: "Smart Exam Builder", icon: "🧠", description: "Organize questions, customize layouts, and add watermarks easily." }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="bg-blue-50 border-none shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="text-5xl mb-4">{feature.icon}</div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Exam Types */}
        <section id="exams" className="py-20 bg-gray-100 text-blue-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Exams We Support</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { name: "JEE", icon: "🎓" },
                { name: "KCET", icon: "📚" },
                { name: "NEET", icon: "🏥" },
                { name: "11th/12th", icon: "🏫" },
                { name: "Others", icon: "📝" }
              ].map((exam, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white border-none shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
                    <CardContent className="pt-6">
                      <div className="text-5xl mb-4">{exam.icon}</div>
                      <h3 className="text-xl font-semibold">{exam.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className="py-20 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Create Exams in 4 Simple Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1️⃣", title: "Select Questions", description: "Choose from our vast question bank or create your own." },
                { step: "2️⃣", title: "Customize", description: "Tailor questions and add your personal touch." },
                { step: "3️⃣", title: "Organize", description: "Structure your exam with our intuitive drag-and-drop interface." },
                { step: "4️⃣", title: "Export & Share", description: "Generate professional PDFs and distribute with ease." }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
                    <CardHeader>
                      <div className="text-6xl font-bold text-yellow-400 mb-4">{step.step}</div>
                      <CardTitle className="text-2xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-gray-100 text-blue-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Choose Your Perfect Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Basic", price: "$9", period: "mo", features: ["100 question bank access", "10 custom questions/month", "5 exams/month", "PDF export"] },
                { title: "Pro", price: "$19", period: "mo", features: ["Unlimited question bank", "Unlimited custom questions", "Unlimited exams", "Advanced analytics"] },
                { title: "Enterprise", price: "Custom", period: "", features: ["Everything in Pro", "Dedicated support", "Custom integrations", "Personalized training"] }
              ].map((plan, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className={`flex flex-col ${index === 1 ? 'bg-blue-600 text-white scale-105 shadow-xl' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className="text-2xl mb-2">{plan.title}</CardTitle>
                      <p className="text-4xl font-bold mb-1">{plan.price}<span className="text-xl font-normal">/{plan.period}</span></p>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="p-6 mt-auto">
                      <Button className={`w-full text-lg py-3 font-semibold ${
                        index === 1 
                          ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg' 
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                      }`}>
                        {index === 2 ? "Contact Sales" : "Get Started"}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section id="contact" className="py-20 bg-gray-200 text-blue-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Reach Out to Us</h3>
                <p className="text-lg mb-4">We are here to help you with any questions or support you need.</p>
                <p className="text-lg mb-2"><strong>Email:</strong> support@exampro.com</p>
                <p className="text-lg mb-2"><strong>Phone:</strong> +1 234 567 890</p>
                <p className="text-lg"><strong>Address:</strong> Benagluru, India</p>
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-lg mb-2" htmlFor="name">Name</label>
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg" type="text" id="name" name="name" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg mb-2" htmlFor="email">Email</label>
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg" type="email" id="email" name="email" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg mb-2" htmlFor="message">Message</label>
                    <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg" id="message" name="message" rows="4" required></textarea>
                  </div>
                  <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition">About Us</a></li>
                <li><a href="#" className="hover:text-blue-300 transition">Careers</a></li>
                <li><a href="#" className="hover:text-blue-300 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition">Features</a></li>
                <li><a href="#" className="hover:text-blue-300 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-300 transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition">Blog</a></li>
                <li><a href="#" className="hover:text-blue-300 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-300 transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-300 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-300 transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-blue-800 text-center">
            <p>&copy; 2024 ExamPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExamManagementLandingPage;