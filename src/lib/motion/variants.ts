export const menuButtonTopVariants = {
  closed: {
    rotate: 0,
  },
  open: {
    rotate: 45,
    y: 3.5,
  },
};

export const menuButtonBottomVariants = {
  closed: {
    rotate: 0,
  },
  open: {
    rotate: -45,
    y: -3.5,
  },
};

export const menuItemVariants = {
  open: {
    x: "0%",
    opacity: 1,
    transition: {
      when: "beforeChildren",
      type: "just",
      bounce: 0,
    },
  },
  closed: {
    x: "-110%",
    opacity: 0,
    transition: {
      when: "afterChildren",
      type: "just",
      bounce: 0,
    },
  },
};

export const menuItemContentVariants = {
  open: {
    y: "0%",
    opacity: 1,
  },
  closed: {
    y: "25%",
    opacity: 0,
  },
};
