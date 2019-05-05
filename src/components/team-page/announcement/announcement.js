import React from 'react';
import { Icon, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './announcement.scss';

export default class Announcement extends React.Component {
  constructor(props) {
    const data = [];
    for (let i = 0; i < 20; i += 1) {
      data.push({
        id: i,
        title: `This is item ${i}`,
        description: `This is item description ${i}`,
        content: "We all have a superhero inside of us -- it just takes a bit of magic to bring it out. In 14-year-old Billy Batson's case, all he needs to do is shout out one word to transform into the adult superhero Shazam. Still a kid at heart, Shazam revels in the new version of himself by doing what any other t… MORE"
      });
    }
    super(props);
    this.state = {
      data,
      loading: false,
      hasMore: true,
    };
    this.fetchingAnnouncement = this.fetchingAnnouncement.bind(this);
  }

  fetchingAnnouncement() {
    // Set loader
    this.setState({
      loading: true
    });
    // No more data left
    if (this.state.data.length >= 20) {
      this.setState({
        loading: false,
        hasMore: false
      });
      return;
    }
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 3000);
  }

  render() {
    const { history, match, location } = this.props;
    return (
      <section className="announcement">
        <div className="announcement__tools">
          <Icon
            type="form"
            style={{
              fontSize: '4.5rem',
              color: '#fff',
            }}
            onClick={() => {
              history.push(`${match.url}/editing`, { teamId: location.state.teamId });
            }}
          />
        </div>
        <div className="announcement__list">
          { /* For the scroller of the announcement */ }
          <InfiniteScroll
            // Set this to false cuz ComponenetDidMount will do it
            initialLoad={false}
            // Set the eventlistener on the scroller
            useWindow={false}
            hasMore={!this.state.loading && this.state.hasMore}
            loadMore={this.fetchingAnnouncement}
          >
            <List
              itemLayout="vertical"
              dataSource={this.state.data}
              size="large"
              bordered
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={<span> {item.title} </span>}
                    description={item.description}
                  />
                  { item.content }
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </section>
    );
  }
}
