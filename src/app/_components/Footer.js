
const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
  <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
    {/* Brand */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Offverse</h3>
      <p>Your trusted partner in restaurant onboarding and food delivery tech.</p>
    </div>

    {/* Links */}
    <div>
      <h4 className="font-medium text-gray-800 mb-2">Company</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
        <li><a href="#" className="hover:text-orange-500 transition">Careers</a></li>
        <li><a href="#" className="hover:text-orange-500 transition">Blog</a></li>
        <li><a href="#" className="hover:text-orange-500 transition">Press</a></li>
      </ul>
    </div>

    {/* Help */}
    <div>
      <h4 className="font-medium text-gray-800 mb-2">Support</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:text-orange-500 transition">Help Center</a></li>
        <li><a href="#" className="hover:text-orange-500 transition">Contact Us</a></li>
        <li><a href="#" className="hover:text-orange-500 transition">Cancellation</a></li>
        <li><a href="#" className="hover:text-orange-500 transition">Report Issue</a></li>
      </ul>
    </div>

    {/* Social + App */}
    <div>
      <h4 className="font-medium text-gray-800 mb-2">Connect</h4>
      {/* <div className="flex space-x-4 mb-4">
        <a href="#"><img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" /></a>
        <a href="#"><img src="/icons/instagram.svg" alt="Instagram" className="h-5 w-5" /></a>
        <a href="#"><img src="/icons/twitter.svg" alt="Twitter" className="h-5 w-5" /></a>
      </div> */}
      <p className="text-xs text-gray-400">© 2025 Offverse. All rights reserved.</p>
    </div>
  </div>
</footer>

  )
}

export default Footer
