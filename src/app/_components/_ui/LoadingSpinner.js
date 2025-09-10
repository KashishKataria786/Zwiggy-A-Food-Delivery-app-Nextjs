
const LoadingSpinner = ({ size , color = 'text-orange-500' }) => {
  return (
    <div className={`flex justify-center items-center `}>
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent  ${color} h-[50px] w-[50px]`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
