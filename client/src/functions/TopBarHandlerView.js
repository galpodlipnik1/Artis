export const handleTopBarView = (name, setStatusBar, statusBar) => {
  switch (name) {
    case 'Status Bar':
      StatusBar(setStatusBar, statusBar);
      break;
  }
};

const StatusBar = (setStatusBar, statusBar) => {
  setStatusBar(!statusBar);
};
