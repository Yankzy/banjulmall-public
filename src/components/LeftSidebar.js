
import { useState } from 'react';
import { TfiAngleDown, TfiAngleRight } from 'react-icons/tfi';



const LeftSidebar = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);


    const categories = [
        {
          title: 'Shop by Category',
          subcategories: ['Electronics', 'Fashion', 'Home & Kitchen', 'Toys & Games', 'Sports & Outdoors'],
        },
        {
          title: 'Best Sellers',
          subcategories: ['Electronics', 'Fashion', 'Home & Kitchen', 'Toys & Games', 'Sports & Outdoors'],
        },
        // Add more categories as needed
      ];
      
  
    const handleCategoryClick = (index) => {
      setActiveCategoryIndex(index === activeCategoryIndex ? null : index);
    };

    return (
        <div>
            <ul className="space-y-2 z-50">
                {categories.map((category, index) => (
                    <li key={index} className="border-b border-gray-300 pb-2">
                    <button
                        className="w-full flex justify-between items-center text-gray-800 font-semibold focus:outline-none"
                        onClick={() => handleCategoryClick(index)}
                    >
                        {category.title}
                        {activeCategoryIndex === index ? (
                        <TfiAngleDown className="text-xl h-4" />
                        ) : (
                        <TfiAngleRight className="text-xl h-4" />
                        )}
                    </button>
                    {activeCategoryIndex === index && (
                        <ul className="pl-4 mt-2 space-y-1">
                        {category.subcategories.map((subcategory, subIndex) => (
                            <li key={subIndex}>
                            <a href="#" className="text-gray-600 hover:text-gray-800">
                                {subcategory}
                            </a>
                            </li>
                        ))}
                        </ul>
                    )}
                    </li>
                ))}
            </ul>
        </div>
    );
  };
  
  export default LeftSidebar;
