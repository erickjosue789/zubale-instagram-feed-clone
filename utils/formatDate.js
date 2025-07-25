import moment from 'moment';

export const formatDate = (date) => {
  const now = moment();
  const postDate = moment(date);

  const diffMinutes = now.diff(postDate, 'minutes');
  const diffHours = now.diff(postDate, 'hours');
  const diffDays = now.diff(postDate, 'days');

  if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  }

  if (postDate.year() === now.year()) {
    return postDate.format('MMMM D'); 
  }

  return postDate.format('MMMM D, YYYY'); 
};
