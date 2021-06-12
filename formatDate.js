function formatDate (date = new Date()) {
  return (date).toLocaleDateString() + ' ' + (date).toLocaleTimeString();
}

export default formatDate;
