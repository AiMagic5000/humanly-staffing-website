"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Humanly Staffing transformed our hiring process. They found us a senior developer in just 10 days who has been an incredible asset to our team.",
    author: "Sarah Chen",
    title: "CTO",
    company: "TechVenture Inc.",
    rating: 5,
  },
  {
    quote: "The quality of candidates and the speed of service exceeded our expectations. They truly understand the healthcare industry.",
    author: "Dr. Michael Roberts",
    title: "Director of Operations",
    company: "Metro Health Systems",
    rating: 5,
  },
  {
    quote: "We've partnered with Humanly Staffing for 3 years now. Their consistency in delivering top finance talent is unmatched.",
    author: "Jennifer Walsh",
    title: "VP of Human Resources",
    company: "Capital Finance Group",
    rating: 5,
  },
  {
    quote: "Their RPO services helped us scale from 50 to 200 employees in one year while maintaining quality standards.",
    author: "David Park",
    title: "CEO",
    company: "GrowthScale Technologies",
    rating: 5,
  },
  {
    quote: "The dedicated account manager made all the difference. They understood our culture and found perfect fits every time.",
    author: "Amanda Torres",
    title: "HR Director",
    company: "Precision Manufacturing Co.",
    rating: 5,
  },
  {
    quote: "From warehouse staff to logistics managers, Humanly Staffing has been our go-to partner for all staffing needs.",
    author: "Robert Kim",
    title: "Operations Manager",
    company: "Swift Distribution LLC",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Don&apos;t just take our word for it. Here&apos;s what industry leaders
            have to say about working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl bg-gray-800 p-8 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-500/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-gray-400">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
