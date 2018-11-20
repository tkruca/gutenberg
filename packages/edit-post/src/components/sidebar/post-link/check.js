/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { compose, ifCondition } from '@wordpress/compose';

function PostLinkCheck( { children } ) {
	return children;
}

export default compose( [
	withSelect( ( select ) => {
		const {
			isEditedPostNew,
			getCurrentPost,
			getEditedPostAttribute,
		} = select( 'core/editor' );
		const {
			getPostType,
		} = select( 'core' );

		const { link } = getCurrentPost();
		const postTypeName = getEditedPostAttribute( 'type' );
		const postType = getPostType( postTypeName );
		return {
			isNew: isEditedPostNew(),
			postLink: link,
			isViewable: get( postType, [ 'viewable' ], false ),
		};
	} ),
	ifCondition( ( { isNew, postLink, isViewable } ) => {
		return ! isNew && postLink && isViewable;
	} ),
] )( PostLinkCheck );
