export const showLoaderOntheTargetlink = (linkList, key) => {
  return linkList.map((link) => {
    if (link.shortLink == key) {
      return { ...link, isSpinning: true };
    } else {
      return link;
    }
  });
};

export const removeLoaderFromtheTargetlink = (linkList, key) => {
  return linkList.map((link) => {
    if (link.shortLink == key) {
      return { ...link, isSpinning: false };
    } else {
      return link;
    }
  });
};

export const addNewLinkToState = (userLinks, newLink) => {
  if (userLinks.length == 0) {
    return [newLink];
  } else {
    return [newLink, ...userLinks];
  }
};

export const removeTargetLinkFromState = (userLinks, targetLink) => {
  const updatedLinks = userLinks.filter((el) => el.shortLink != targetLink);
  return updatedLinks;
};
