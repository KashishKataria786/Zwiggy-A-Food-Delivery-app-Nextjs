import Link from 'next/link';

const RestaurantHeader = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold text-orange-500">
          FoodDash
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-sm text-gray-700 font-medium">
            <li>
              <Link href="/" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-orange-500 transition">
                Login/Signup
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-orange-500 transition">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default RestaurantHeader;
