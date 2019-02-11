import React from 'react';
import './add-button.scss';
import { Link } from 'react-router-dom';

// export default class AddButton extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <Link to="/addTeam" className="add-button" />
//     );
//   }
// }
const AddButton = () => <Link to="/addTeam" className="add-button" />;
export default AddButton;
