import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

// A light-themed footer with functional newsletter subscription
const Footer = () => {
  // State for newsletter email input and submission status
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Handle newsletter form submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // Simulate a subscription (e.g., API call in a real app)
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000); // Reset the success message after 3 seconds
  };

  return (
    <footer className="w-full bg-white text-gray-700 mt-10">
      <p className="h-[1px] bg-gray-700"></p>
      {/* Main Footer Content */}
      <div className="max-w-[90%] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-12 w-12 overflow-hidden">
              <img src="/logo.webp" alt="Shopizio Logo" />
            </div>
            <span className="text-xl font-bold text-gray-800">Shopizio</span>
          </div>
          <p className="text-sm leading-relaxed">
            Shopizio is your one-stop destination for the best deals on a wide
            range of products. Shop smart, save big!
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {[
              "About Us",
              "Contact Us",
              "Privacy Policy",
              "Terms of Service",
            ].map((link) => (
              <li key={link}>
                <button
                  disabled
                  className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Us
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-green-500" />
              <span>support@shopizio.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-green-500" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-green-500" />
              <span>123 Shopizio St, City, Country</span>
            </li>
          </ul>
        </div>

        {/* Social Media & Newsletter Section */}
        <div>
          {/* Social Media Links */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 mb-6">
            {[Facebook, Twitter, Instagram].map((Icon, index) => (
              <button
                key={index}
                disabled
                className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-green-100 transition-colors cursor-not-allowed"
              >
                <Icon size={18} />
              </button>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Newsletter
          </h3>
          {isSubscribed ? (
            <p className="text-sm text-green-600">
              Thank you for subscribing to our newsletter!
            </p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Shopizio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
