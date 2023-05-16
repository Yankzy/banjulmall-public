import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { checkoutData } from '../data';
import { Formik, Form, Field } from 'formik';
import { toggleAddressModal } from '../redux/modalSlice';
import AddAddress from './AddAddress';
import { useDispatch, useSelector } from 'react-redux';
import OverlayComponents from './OverlayComponents';
import { ulid } from 'ulid';
import { updateAddress } from '../redux/userSlice';
import { useEffect } from 'react';


const Accordion = () => {
	const [data, setData] = useState(checkoutData);
	const [expanded, setExpanded] = useState(false);
	const addresses = [
		{
			id: 1,
			fullName: 'Yankuba Ebrihima Jarranka Morow Kuyateh',
			streetAddress: 'No. 20, Presidential Highway',
			streetAddress2: 'Kanifing Municipality',
			city: 'Kanifing',
			region: 'Kanifing',
			country: 'The Gambia',
			lastUsed: '2023-01-14T23:05:56.385Z'
		},
	];

	const dispatch = useDispatch();
	
	useEffect(() => {
	  	dispatch(updateAddress(
			{
				id: "01H0GJVDG9DR31SYJDH2G84E6E",
				fullName: 'Yankuba Ebrihima Jarranka Morow Kuyateh',
				streetAddress: 'No. 20, Presidential Highway',
				streetAddress2: 'Kanifing Municipality',
				city: 'Kanifing',
				region: 'Kanifing',
				country: 'The Gambia',
				lastUsed: '2023-01-14T23:05:56.385Z'
			}
	  	));
	}, [])
	
	const addressModalIsVisible = useSelector(({ modal }) => modal.addressModalIsVisible);
	const address = useSelector(({ user }) => user.address);
	const sortedAddresses = [...address]?.sort((a, b) => Date.parse(b.lastUsed) - Date.parse(a.lastUsed));
	const onSubmit = async (values, actions) => {
		// Handle form submission logic here
		console.log(values);

		// Reset form after submission
		actions.resetForm();
	};

	const initialValues = {
		fullName: '',
	  	streetAddress: '',
	  	streetAddress2: '',
	  	city: '',
		region: '',
		phone: '',
	  	country: 'The Gambia',
		id: ulid(),
		selectedAddress: sortedAddresses[0]?.id
  };


	const headerInfor = (title) => {
		return (
			<header
				onClick={() => setExpanded(!expanded)}
				className={`flex p-4 cursor-pointer justify-between w-full`}
			>
				<h4 className='text-lg  font-bold'>{title}</h4>
				<button className='text-lg'>
					{expanded ? <FaChevronUp /> : <FaChevronDown />}
				</button>
			</header>
		);
	};



	return (
		<div className='flex flex-col justify-between w-full'>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					enableReinitialize
				>
				{({ values, setFieldValue }) => (
					<Form>
						{headerInfor('1.  Delivery Address')}
						<div className="flex flex-col border border-gray-200 rounded-lg shadow-sm w-[90%] items-center justify-center mx-10">
							{expanded && sortedAddresses?.map(({id, fullName, streetAddress, streetAddress2, city, region, country}) => (
								<div key={id}>
									<div className={`flex flex-1 p-3 text-sm m-3 ${values.selectedAddress === id ? 'bg-[#FCF5EE] border rounded-lg shadow-sm' : ''}`}>
										<Field 
											type="radio" 
											name="selectedAddress"
											value={id} 
											className='mr-2' 
											onChange={(e) => {
												setFieldValue("selectedAddress", id);
											}}
										/>
										<p>
											<span className='font-semibold'>{fullName}</span>
											<span>, {streetAddress}, {streetAddress2}, {city}, {region}, {country}. </span>
											<span 
												className='text-bm_teal-dark cursor-pointer hover:text-red-500 hover:underline'
												
											>Edit address</span>
										</p>
									</div>
								</div>
							))}
							{expanded && (
								<div className='flex flex-1 p-3 text-sm m-3 items-center justify-start w-full'>
									<FaPlus className='mr-2 text-gray-300 text-xl cursor-pointer' onClick={() => dispatch(toggleAddressModal())}/>
									<p className='text-bm_teal-dark hover:text-red-500 hover:underline cursor-pointer' onClick={() => dispatch(toggleAddressModal())}> Add new address </p>
								</div>

							)}
						</div>
						{/* <button type="submit">Submit</button> */}
					</Form>
				)}
				</Formik>
				{addressModalIsVisible && <OverlayComponents ComponentToRender={AddAddress} visible={addressModalIsVisible} position="middle" />}
		</div>
	);

};

export default Accordion;
