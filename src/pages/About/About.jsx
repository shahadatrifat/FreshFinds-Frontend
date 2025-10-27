import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/hero2.jpg"; // Hero image
import missionImage from "../../assets/hero5.jpg"; // Team image
import { 
  Heart, 
  Users, 
  Award, 
  Leaf, 
  Target,
  TrendingUp,
  Shield,
  Sparkles,
  CheckCircle,
  Star
} from "lucide-react";

const About = () => {
  const coreValues = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Every product is carefully selected and verified to meet the highest quality standards.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Leaf,
      title: "100% Organic",
      description: "We prioritize organic, sustainable, and locally-sourced products for healthier living.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction and wellbeing drive everything we do. We're here for you.",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Complete transparency in sourcing, pricing, and delivery. No hidden surprises.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Supporting local vendors and farmers while building a stronger community.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "Always improving our platform and services to serve you better.",
      color: "from-orange-500 to-yellow-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "100+", label: "Local Vendors", icon: Award },
    { number: "5,000+", label: "Products Listed", icon: Sparkles },
    { number: "99%", label: "Satisfaction Rate", icon: Star }
  ];

  const teamMembers = [
    { name: "Sarah Johnson", role: "Founder & CEO", image: "/assets/team.jpg" },
    { name: "Michael Chen", role: "Head of Operations", image: "/assets/hero1.jpg" },
    { name: "Emily Rodriguez", role: "Vendor Relations", image: "/assets/hero2.jpg" }
  ];

  return (
    <div className="bg-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <img
          src={heroImg}
          alt="About FreshFinds"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 via-emerald-800/50 to-emerald-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-900/30 rounded-full blur-3xl" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
          >
            <Heart className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-lora text-beige font-bold"
          >
            Our Story
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-offwhite max-w-3xl leading-relaxed"
          >
            Connecting communities with fresh, organic products from trusted local vendors. 
            Building a healthier, more sustainable future together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span className="text-white text-sm">Est. 2024</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span className="text-white text-sm">100% Organic</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span className="text-white text-sm">Community First</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow text-center  transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-1">
                {stat.number}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto py-20 px-4 sm:px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              <Target className="w-4 h-4" />
              <span>Our Mission</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700 font-lora">
              Bringing Fresh, Local & Organic to Your Doorstep
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              FreshFinds was born from a simple idea: everyone deserves access to fresh, 
              organic products from trusted local sources. We've built a platform that 
              connects communities with amazing vendors, ensuring quality, transparency, 
              and sustainability in every transaction.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Every product on our platform is carefully vetted, every vendor is thoroughly 
              verified, and every delivery is handled with care. We're not just a marketplace—we're 
              your partner in healthy, sustainable living.
            </p>

            <div className="space-y-3 pt-4">
              {[
                "Supporting local farmers and artisans",
                "Reducing carbon footprint through local sourcing",
                "Promoting organic and sustainable practices",
                "Building stronger, healthier communities"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow">
              <img
                src={missionImage}
                alt="Our Mission"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-charcoal">100% Organic Certified</p>
                    <p className="text-sm text-gray-600">Quality you can trust</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gradient-to-b from-beige/30 via-white to-beige/20 py-20 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>What Drives Us</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700 font-lora mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These principles guide everything we do, from vendor selection to customer service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow transition-all hover:-translate-y-1 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-emerald-700 transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto py-20 px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            <span>Our Team</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700 font-lora mb-4">
            Meet the People Behind FreshFinds
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Passionate individuals dedicated to bringing you the best fresh, organic products
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow transition-all hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-charcoal mb-1 group-hover:text-emerald-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                  
                  <div className="mt-4 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <div className="w-2 h-2 bg-emerald-200 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center p-8 bg-gradient-to-br from-emerald-50 to-mint/30 rounded-2xl border border-emerald-200"
        >
          <h3 className="text-2xl font-bold text-charcoal mb-3">Want to Join Our Team?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate people who share our vision of 
            building healthier, more sustainable communities.
          </p>
          <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105">
            <Users className="w-5 h-5" />
            <span className="text-beige">View Open Positions</span>
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;