
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsPage = () => {
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      company: "TechGrowth Inc.",
      role: "Marketing Director",
      content: "AdNexus has completely transformed how we manage our ad campaigns. The unified dashboard saves us hours every week, and we've seen a 30% increase in ROI since switching.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 2,
      name: "Sarah Williams",
      company: "E-Commerce Solutions",
      role: "CEO",
      content: "The ability to control campaigns across multiple platforms from a single interface is game-changing. Our team is more efficient and our advertising budget is being used more effectively than ever before.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      name: "Michael Chen",
      company: "GrowFast Agency",
      role: "Ad Operations Manager",
      content: "We manage hundreds of campaigns for our clients, and AdNexus has made it possible to scale our business while maintaining quality. The analytics tools are particularly impressive.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 4,
      name: "Emily Davis",
      company: "Retail Innovators",
      role: "Digital Marketing Specialist",
      content: "The onboarding process was smooth, and the customer support team has been incredibly helpful. We were up and running in less than a day, and saw immediate improvements in our campaign performance.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 5,
      name: "David Wilson",
      company: "SaaS Leaders",
      role: "CMO",
      content: "I've used many ad management platforms, but AdNexus stands out for its intuitive interface and powerful automation features. It's now an essential part of our marketing stack.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 6,
      name: "Jessica Kim",
      company: "Global Retail Chain",
      role: "Head of Digital",
      content: "The analytical capabilities and reporting features have given us insights we never had before. We're now making data-driven decisions that have improved our ROAS by 45%.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-brand-light-purple to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-brand-purple">AdNexus</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-brand-purple transition duration-150">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
          Don't just take our word for it. Here's what marketing professionals and businesses have to say about AdNexus.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white hover:shadow-lg transition duration-300 h-full flex flex-col">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name}'s profile picture`}
                    className="h-12 w-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <div className="mb-4 flex-grow">
                  <svg className="h-6 w-6 text-brand-purple mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-700">{testimonial.content}</p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;

// Fix missing import
import { Link } from "react-router-dom";
