
const RestaurantLogin = () => {
  return (
   <div className="w-full max-w-sm">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Login</h1>

    <form className="space-y-4 text-left">
      <div>
        <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition duration-200"
      >
        Login
      </button>
    </form>

    <p className="text-sm text-center text-gray-500 mt-6">
      New to the app?{" "}
      <a href="#" className="text-orange-500 hover:underline font-medium">Create an account</a>
    </p>
  </div>
  )
}

export default RestaurantLogin
