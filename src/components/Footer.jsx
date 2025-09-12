import React from "react";

function Footer() {
  return (
    <footer className="py-6 bg-gray-100 text-center text-gray-600 dark:bg-gray-950 dark:text-gray-400 transition-colors">
      © {new Date().getFullYear()} NextAuthApp. All rights reserved.
    </footer>
  );
}

export default Footer;
