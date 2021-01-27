const portalTransition = {
  duration: 0.5,
};

export const portalTransitionVariants = {
  initial: { opacity: 0, transition: portalTransition },
  enter: { opacity: 1, transition: portalTransition },
  exit: { opacity: 0, transition: portalTransition },
};
