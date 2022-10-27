export const createParams = (isUser, _category, _status, _role, _page) => {
  return {
    status_all: _status || 'All',
    topic_all: _category || 'All',
    page: _page,
  };
};
