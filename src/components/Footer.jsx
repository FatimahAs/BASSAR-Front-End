import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, ArrowUp } from "lucide-react";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      <footer className="bg-[#1d1a33] text-yellow-200 p-8 text-sm mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-semibold text-yellow-400 mb-2">Contact Us</h4>
            <p>
              Email:{" "}
              <a
                href="mailto:support@safepath.com"
                className="underline text-yellow-300"
              >
                support@safepath.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+1234567890" className="underline text-yellow-300">
                +1 (234) 567-890
              </a>
            </p>
            <p>Address: 123 Safety Road, Alert City, SP 10001</p>
          </div>

          <div>
            <h4 className="font-semibold text-yellow-400 mb-2">Legal</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-yellow-400 mb-2">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-yellow-400"
              >
                <Facebook />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-yellow-400"
              >
                <Twitter />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-yellow-400"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        <div dir="ltr" className="text-center mt-6 text-yellow-300">
          &copy; {new Date().getFullYear()} بّصار
        </div>

        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-10 transform transition-all duration-500 ease-in-out 
            ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            } 
            bg-yellow-400 text-[#272343] p-3 rounded-full shadow hover:bg-yellow-300 cursor-pointer`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </footer>
    </div>
  );
}

export default Footer;
