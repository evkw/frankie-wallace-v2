export interface NavigationItem {
  label: string;
  href: string;
  location?: 'left' | 'right' | null;
  isExternal?: boolean;
  isActive?: boolean;
  footerOnly?: boolean;
  subItems?: NavigationItem[];
}

export interface SocialMediaItem {
  platform: string;
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
}

export interface LinkTreeItem {
  label: string;
  copy: string;
  href: string;
}


export const linkTree: LinkTreeItem[] = [
  {
    label: 'View my Surface Pattern Portfolio',
    copy: 'Discover ready-to-license surface pattern collections for children’s apparel, fabric, and lifestyle brands.',
    href: '/gallery/surfacePattern',
  },


  {
    label: 'Shop Prints & Wall Decals ',
    copy: 'Bring my hand-painted artwork into your home — nursery wall decals, art prints, and more, available on Etsy.',
    href: 'https://www.etsy.com/shop/lovefrankieart',
  },
  {
    label: 'Commission a Custom Painting',
    copy: 'Looking for a bespoke watercolour artwork — perhaps a favourite venue, home, or keepsake piece? Let’s create something just for you.',
    href: '/contact',
  },
  {
    label: 'Join My Email List',
    copy: 'Receive gentle updates on new pattern releases, limited prints, and behind-the-scenes stories: just once a month.',
    href: '/subscribe',
  },

]

export const navigationConfig: NavigationItem[] = [
  {
    label: 'Surface Patterns',
    href: '/gallery/surfacePattern',
    location: 'left',
    isActive: true,
    // subItems: [
    //   {
    //     label: 'Surface Patterns',
    //     href: '/gallery/surfacePattern',
    //     isActive: true
    //   },
    //   {
    //     label: 'Venue Illustrations',
    //     href: '/gallery/venues',
    //     isActive: true
    //   },
    //   {
    //     label: `Children's book Illustrations`,
    //     href: '/gallery/childrensBooks',
    //     isActive: true
    //   },
    // ]
  },
  {
    label: 'Store',
    href: 'https://www.etsy.com/shop/lovefrankieart',
    location: null,
    isExternal: true,
    isActive: true,
    footerOnly: true
  },
  {
    label: 'Spoonflower',
    href: 'https://www.spoonflower.com/profiles/frankiewallaceart?sort=new',
    location: null,
    isExternal: true,
    isActive: true,
    footerOnly: true
  },

  {
    label: 'About',
    href: '/about',
    location: 'right',
    isActive: true
  },
  {
    label: 'Sample Portfolio',
    href: '/sample-portfolio',
    location: 'left',
    isActive: true
  },
  {
    label: 'Journal',
    href: '/journal',
    location: null,
    isActive: true,
    footerOnly: true
  },
  {
    label: 'Contact',
    href: '/licensing',
    location: 'right',
    isActive: true
  }
];

// Social media profiles configuration
export const socialMediaConfig: SocialMediaItem[] = [
  {
    platform: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/frankie.wallace_artist',
    icon: 'fa-brands fa-instagram',
    isActive: true
  },
  {
    platform: 'etsy',
    label: 'Etsy',
    href: 'https://www.etsy.com/shop/lovefrankieart',
    icon: 'fa-brands fa-etsy',
    isActive: true
  },
  {
    platform: 'pinterest',
    label: 'Pinterest',
    href: 'https://pinterest.com/lovefrankieartanddesigns/',
    icon: 'fa-brands fa-pinterest',
    isActive: true
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    href: 'https://facebook.com/lovefrankieartanddesigns/',
    icon: 'fa-brands fa-facebook',
    isActive: true
  }
];

// Optional: Routes that are commented out but might be used later
export const inactiveRoutes: NavigationItem[] = [
  {
    label: 'Pattern Library',
    href: '/pattern-library',
    isActive: false
  },
];

// Helper function to get active routes
export const getActiveRoutes = (footer = false): NavigationItem[] => {
  return navigationConfig.filter(route => route.isActive && (footer == false ? route.footerOnly !== true : true));
};

// Helper function to get all routes (active and inactive)
export const getAllRoutes = (): NavigationItem[] => {
  return [...navigationConfig, ...inactiveRoutes];
};

// Helper function to get active social media profiles
export const getActiveSocialMedia = (): SocialMediaItem[] => {
  return socialMediaConfig.filter(social => social.isActive);
};

// Helper function to get all social media profiles (active and inactive)
export const getAllSocialMedia = (): SocialMediaItem[] => {
  return socialMediaConfig;
}; 
