import { useDispatch } from 'react-redux';
import { toggleOverlay } from '../redux/modalSlice';



const OverlayComponents = ({ ComponentToRender, visible, position }) => {
    const dispatch = useDispatch();

    let positionClasses = '';
    let transitionClasses = '';

    if (position === 'left') {
        positionClasses = 'left-0';
        transitionClasses = visible ? 'translate-x-0' : '-translate-x-full';
    } else if (position === 'right') {
        positionClasses = 'right-0'; 
        transitionClasses = visible ? 'translate-x-0' : 'translate-x-full';
    } else if (position === 'middle') {
        positionClasses = 'left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }
      
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-40 ' onClick={()=> dispatch(toggleOverlay()) }>
            {visible && (
                <div
                    onClick={(e)=> e.stopPropagation()}
                    className={`fixed ${positionClasses} h-auto w-auto bg-gray-100 z-50 rounded-xlg
                    transition-transform duration-500 ease-in-out 
                    ${transitionClasses}`}
                >
                    <ComponentToRender />
                </div>
            )}
        </div>
    );
};
  
export default OverlayComponents;