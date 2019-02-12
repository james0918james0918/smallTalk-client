import React from 'react';
import './add-button.scss';
import { Link } from 'react-router-dom';

const AddButton = () => <Link to="/addTeam" className="add-button" />;
export default AddButton;
