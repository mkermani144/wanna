import { connect } from 'react-redux';

import IdeaList from './IdeaList';

const mapStateToProps = state => ({ state });

const IdeaListContainer = connect(mapStateToProps, null)(IdeaList);

export default IdeaListContainer;
