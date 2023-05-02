import { useSelector, useDispatch } from 'react-redux';
import { toggleOverlay } from '../redux/modalSlice';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';



const OverlayComponents = () => {
    const { 
        leftSidebarIsVisible, 
        rightSidebarIsVisible, 
    } = useSelector(({modal}) => modal);
    
    const dispatch = useDispatch();
      
  
    return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-40 ' onClick={()=> dispatch(toggleOverlay()) }>
        {leftSidebarIsVisible && (
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-100 z-50 
                transform transition-transform duration-500 ease-in-out 
                ${leftSidebarIsVisible ? 'translate-x-0' : '-translate-x-full'}`}
                onClick={(e)=> e.stopPropagation()}
            >
                <LeftSidebar />
            </div>
        )}

        {rightSidebarIsVisible && (
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-100 z-50
                transform transition-transform duration-500 ease-in-out
                ${rightSidebarIsVisible ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e)=> e.stopPropagation()}
            >
                <RightSidebar />
            </div>
        )}

    </div>
    );
};
  
export default OverlayComponents;