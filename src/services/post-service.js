import { posts } from './axios-service';

export class PostsService {
  uploadAnnouncement(announcementObj) {
    return posts.post('/announcement', announcementObj);
  }
}
