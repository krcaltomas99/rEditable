import React, {Component} from 'react';
import {EditorState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, {defaultSuggestionsFilter} from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import mentions from '../../mentions';
import './rEditorStyles.scss';
import './mentionStyles.scss';

export default class rEditor extends Component {

	constructor(props) {
		super(props);

		this.mentionPlugin = createMentionPlugin({
			// theme: mentionStyles,
			mentionComponent: (mentionProps) => <MentionComponent props={mentionProps}/>,
		})
	}

	state = {
		editorState: EditorState.createEmpty(),
		suggestions: mentions,
	};

	onChange = (editorState) => {
		this.setState({
			editorState,
		});
	};

	onSearchChange = ({value}) => {
		this.setState({
			suggestions: defaultSuggestionsFilter(value, mentions),
		});
	};

	onAddMention = () => {
		// get the mention object selected
	}

	focus = () => {
		this.editor.focus();
	};

	render() {
		const {MentionSuggestions} = this.mentionPlugin;
		const plugins = [this.mentionPlugin];

		return (
			<div className={'editor ' + (this.props.className ? this.props.className : '')} onClick={this.focus}>
				<Editor
					editorState={this.state.editorState}
					onChange={this.onChange}
					plugins={plugins}
					ref={(element) => {
						this.editor = element
					}}
				/>
				<MentionSuggestions
					onSearchChange={this.onSearchChange}
					suggestions={this.state.suggestions}
					onAddMention={this.onAddMention}
					entryComponent={Entry}
				/>
			</div>
		);
	}
}

const Entry = (props) => {

	const {
		mention,
		searchValue,
		isFocused,
		...parentProps
	} = props;

	return (
		<div {...parentProps}>
			<div className='mentionSuggestionsEntryContainer'>
				<div className='mentionSuggestionsEntryContainerLeft'>
					<img
						src={mention.avatar}
						className='mentionSuggestionsEntryAvatar'
						role="presentation"
					/>
				</div>

				<div className='mentionSuggestionsEntryContainerRight'>
					<div className='mentionSuggestionsEntryText'>
						{mention.name}
					</div>

					<div className='mentionSuggestionsEntryTitle'>
						{mention.title}
					</div>
				</div>
			</div>
		</div>
	);
};

const MentionComponent = ({props}) => {
	const style = {
		color: 'blue'
	}

	return (
		<span className='a-like' style={style}>
			@{props.children}
		</span>
	)
}