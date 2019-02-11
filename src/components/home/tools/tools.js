import React from 'react';
import Searchbar from '../search-bar/search-bar';
import AddButton from '../add-button/add-button';
import './tools.scss';

// export default class Tools extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div className="tools">
//         <Searchbar findGroups={this.props.findGroups}
//           queryMatched={this.props.queryMatched} />
//         <AddButton />
//       </div>
//     )
//   }
// }

const Tools = ({ findGroups, queryMatched }) => (
  <div className="tools">
    <Searchbar findGroups={findGroups}
               queryMatched={queryMatched} />
    <AddButton />
  </div>
);
export default Tools;
