import { useHistory } from 'react-router-dom';

import './index.scss';

const Page2 = () => {
	const history = useHistory();

	const handleToPage = () => history.push('/page1');

	return (
		<div className="page2">
			this is Page2 component!
			<button onClick={handleToPage}>to Page1</button>
		</div>
	);
};

export default Page2;
