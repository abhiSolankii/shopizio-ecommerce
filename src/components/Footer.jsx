import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      <div className="max-w-[90%] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-12 w-12 overflow-hidden">
              <img src="/logo.webp" alt="logo" />
            </div>
            <span className="text-xl font-bold text-white">Shopizio</span>
          </div>
          <p className="text-sm leading-relaxed">
            Shopizio is your one-stop destination for the best deals on a wide
            range of products. Shop smart, save big!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center gap-1 hover:text-green-500 transition-colors"
              >
                <ChevronRight size={16} />
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-1 hover:text-green-500 transition-colors"
              >
                <ChevronRight size={16} />
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-1 hover:text-green-500 transition-colors"
              >
                <ChevronRight size={16} />
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-1 hover:text-green-500 transition-colors"
              >
                <ChevronRight size={16} />
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Mail size={18} />
              <span>support@shopizio.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} />
              <span>123 Shopizio St, City, Country</span>
            </li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 mb-6">
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-green-500 transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-green-500 transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-green-500 transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full py-2 px-4 bg-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Shopizio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
