import React from 'react';
import ReactQuill from 'react-quill';
import { Icon } from 'antd';
import { PostsService } from '../../services/index';
import 'react-quill/dist/quill.snow.css';
import './editor.scss';

const postsService = new PostsService();

// For custom toolbar
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['code-block', 'image', 'link'],
  ],
};


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.extractTitle = this.extractTitle.bind(this);
  }

  // For extracting the title
  extractTitle() {
    const searchTerm = '<h1>';
    const searchTermEnd = '</h1>';
    const firstIndex = this.state.text.search(searchTerm);
    const lastIndex = this.state.text.search(searchTermEnd);
    // No heading is found
    if (firstIndex === -1) {
      this.setState({ title: 'Default heading' });
    } else {
      this.setState({ title: this.state.text.slice(firstIndex + 4, lastIndex) });
    }
    console.log(this.state.title);
  }

  handleChange(value) {
    console.log(value);
    this.setState({ text: value });
    this.extractTitle();
  }

  render() {
    const { location } = this.props;
    return (
      <section className="editor">
        <ReactQuill value={this.state.text}
                    onChange={this.handleChange}
                    placeholder="Put a heading first and that will be the title of this post!"
                    modules={modules}
                    className="editor__textarea"
        />
        <div className="editor__submit-btn">
          <Icon
            type="upload"
            style={{
              fontSize: '4.5rem',
              color: '#fff',
            }}
            onClick={async () => {
              try {
                const res = await postsService.uploadAnnouncement({
                  teamId: location.state.teamId,
                  title: this.state.title,
                  content: this.state.text,
                });
                console.log(res.data);
              } catch (err) {
                console.log(err);
              }
            }}
          />
        </div>
      </section>
    );
  }
}
