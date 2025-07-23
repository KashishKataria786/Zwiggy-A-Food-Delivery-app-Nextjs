
const RestaurantSignup = () => {
  return (
  <div className="w-full max-w-4xl bg-white">
    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Restaurant Sign Up</h1>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      <div>
        <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email address</label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm text-gray-700 mb-1">Password</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="••••••••"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="restaurantName" className="block text-sm text-gray-700 mb-1">Restaurant Name</label>
        <input
          type="text"
          id="restaurantName"
          placeholder="e.g., Bombay Bistro"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm text-gray-700 mb-1">City</label>
        <input
          type="text"
          id="city"
          placeholder="e.g., Mumbai"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm text-gray-700 mb-1">Full Address</label>
        <input
          type="text"
          id="address"
          placeholder="Street, Area, Zip Code"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm text-gray-700 mb-1">Contact Number</label>
        <input
          type="text"
          id="contact"
          placeholder="e.g., 9876543210"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>
    </form>

    <button
      type="submit"
      className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition duration-200"
    >
      Register
    </button>

    <p className="text-sm text-center text-gray-500 mt-6">
      Already registered?{" "}
      <a href="#" className="text-orange-500 hover:underline font-medium">
        Login here
      </a>
    </p>
  </div>


  )
}

export default RestaurantSignup
