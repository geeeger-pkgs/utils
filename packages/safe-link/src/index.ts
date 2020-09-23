const safeLink = (): string => {
  const location = window.location;
  return location.protocol + '//' + location.host + location.pathname;
};

export default safeLink;
