import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <ThreeDots
        height='80'
        width='80'
        color='#1B1525'
        radius='9'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClassName=''
        visible={true}
      />
    </div>
  );
};

export default Loader;
