export const handleTopBarHelp = (name, navigate) => {
  switch (name) {
    case 'View Help':
      handleViewHelp();
      break;
    case 'About':
      handleAboutArtis(navigate);
      break;
  }
};

const handleViewHelp = () => {};

const handleAboutArtis = (navigate) => {
  navigate('/about');
};
