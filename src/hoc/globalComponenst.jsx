import React, { useState } from 'react';
import Loading from '../components/Loading';
import { MainContext } from '../contexts/MainContext';

const WraperUtilities = ({ children }) => {
	const [loading, setLoading] = useState(false);

	return (
		<React.Fragment>
			<MainContext.Provider value={{ setLoading }}>
				{children}
				{loading && <Loading open={loading} />}
			</MainContext.Provider>
		</React.Fragment>
	);
};

export default WraperUtilities;
