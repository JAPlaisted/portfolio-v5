import { FaChevronDown } from 'react-icons/fa';

const ScrollDown = () => {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const isMobile = window.innerWidth <= 1024;

  return (
    <div
      onClick={scrollToNextSection}
      style={{
        display: isMobile ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        zIndex: 1000,
        width: '100px',
        height: 'auto',
        backgroundColor: 'transparent',
      }}
    >
      <FaChevronDown style={{ color: 'white', fontSize: '24px' }} />
    </div>
  );
};

export default ScrollDown;