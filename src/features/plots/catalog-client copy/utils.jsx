export const createParams = (isUser, _category, _status, _role, _page) => {
  if (isUser) {
    return {
      status: _status || 'E',
      role: _role || 'All',
      page: _page,
    };
  }

  return {
    status_all: _status || 'All',
    topic_all: _category || 'All',
    page: _page,
  };
};
