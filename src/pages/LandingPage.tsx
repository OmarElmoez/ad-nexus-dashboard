import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-brand-purple">AdNexus</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-700 hover:text-brand-purple transition duration-150">Features</a>
            <a href="#platforms" className="text-gray-700 hover:text-brand-purple transition duration-150">Platforms</a>
            <a href="#pricing" className="text-gray-700 hover:text-brand-purple transition duration-150">Pricing</a>
            <Link to="/login">
              <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-light-purple">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-brand-purple hover:bg-brand-dark-purple">
                Sign up
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button variant="outline" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Updated with new ad-related image */}
      <section className="bg-gradient-to-br from-white via-brand-light-purple to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Manage All Your <span className="text-brand-purple">Ad Campaigns</span> In One Dashboard
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect your Google Ads, Meta, and LinkedIn campaigns in one place. Optimize, analyze, and scale your marketing efforts with powerful tools.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button size="lg" className="bg-brand-purple hover:bg-brand-dark-purple w-full sm:w-auto">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/testimonials">
                  <Button size="lg" variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-light-purple w-full sm:w-auto">
                    Client Opinions
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800" 
                alt="Digital Marketing Dashboard" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Campaign Management Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, manage and optimize your ad campaigns across multiple platforms.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-brand-light-purple rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Multi-Platform Integration</h3>
              <p className="text-gray-600">
                Seamlessly connect your Google Ads, Meta, and LinkedIn ad accounts in just a few clicks.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-brand-light-purple rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Unified Analytics</h3>
              <p className="text-gray-600">
                View all your campaign metrics in one place with powerful visualization and reporting tools.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-brand-light-purple rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-toggle-left"><rect width="20" height="12" x="2" y="6" rx="6" ry="6"/><circle cx="8" cy="12" r="2"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">One-Click Control</h3>
              <p className="text-gray-600">
                Enable or disable campaigns across all platforms with a single click, saving you time and effort.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-brand-light-purple rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-square"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Multi-Platform Creation</h3>
              <p className="text-gray-600">
                Create campaigns once and deploy them across multiple platforms with customized settings for each.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-brand-light-purple rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
              <p className="text-gray-600">
                Manage user permissions and roles for your team members with granular access control.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-brand-light-purple rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Alert Notifications</h3>
              <p className="text-gray-600">
                Get instant notifications about campaign performance changes or when budgets are running low.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supported Ad Platforms</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect and manage all your advertising accounts from these major platforms.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            {/* Google Ads */}
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-full shadow-md flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 512 512"><path fill="#4285F4" d="M113 145L68 313l112-61z"/><path fill="#34A853" d="M211 112v300h87V112z"/><path fill="#FBBC04" d="M113 145L0 275l68 38z"/><path fill="#EA4335" d="M359 145l-31 168l112 61z"/><path fill="#C5221F" d="M359 145l118-20l-37-38z"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Google Ads</h3>
              <p className="text-gray-600">Search, Display, Video, Shopping</p>
            </div>
            
            {/* Meta */}
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-full shadow-md flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 512 512"><path fill="#1877F2" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48c27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Meta</h3>
              <p className="text-gray-600">Facebook, Instagram, Messenger</p>
            </div>
            
            {/* LinkedIn */}
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-full shadow-md flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 448 448"><path fill="#0A66C2" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-600">Sponsored Content, Message Ads</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Updated with flex layout for consistent button positioning */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full">
              <div className="p-8 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2">Starter</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Up to 5 campaigns
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    2 platform connections
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Email support
                  </li>
                </ul>
                <Button className="w-full bg-brand-purple hover:bg-brand-dark-purple mt-auto">
                  Start Free Trial
                </Button>
              </div>
            </div>
            
            {/* Professional Plan */}
            <div className="bg-brand-light-purple rounded-lg border-2 border-brand-purple shadow-md hover:shadow-lg transition duration-300 transform scale-105 flex flex-col h-full">
              <div className="bg-brand-purple text-white py-2 px-4 rounded-t-lg text-center text-sm font-medium">
                MOST POPULAR
              </div>
              <div className="p-8 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2">Professional</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Up to 20 campaigns
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    All platform connections
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Team collaboration (3 users)
                  </li>
                </ul>
                <Button className="w-full bg-brand-purple hover:bg-brand-dark-purple mt-auto">
                  Start Free Trial
                </Button>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full">
              <div className="p-8 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$249</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Unlimited campaigns
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    All platform connections
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Custom reporting
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Dedicated support
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Team collaboration (unlimited)
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    API access
                  </li>
                </ul>
                <Button className="w-full bg-brand-purple hover:bg-brand-dark-purple mt-auto">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated to use testimonials button */}
      <section className="py-20 bg-brand-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Campaign Management?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of marketers who are saving time and improving results with our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 w-full sm:w-auto">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/testimonials">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Client Opinions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">AdNexus</h3>
              <p className="text-gray-400">
                The all-in-one platform for managing your advertising campaigns across multiple platforms.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 AdNexus. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0V16h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548V16z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
