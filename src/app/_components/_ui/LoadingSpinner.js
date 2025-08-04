
const LoadingSpinner = ({ size = 8, color = 'text-orange-500' }) => {
  return (
    <div className={`flex justify-center items-center `}>
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent  ${color} h-${size} w-${size}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
