export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      // badge: {
      //   variant: 'info',
      //   text: 'NEW',
      // },
    },
    {
      name: 'Noticeboard',
      url: '/noticeboard',
      icon: 'icon-bell',
      badge: {
        variant: 'info',
        text: '5',
      },
    },
    {
      name: 'OFFICE',
      url: '/office',
      icon: 'icon-people',
      children: [
        {
          name: 'About',
          url: '/office/about',
          icon: 'icon-people',
        },
        {
          name: 'Department',
          url: '/office/department',
          icon: 'icon-people',
        },
        {
          name: 'Designation',
          url: '/office/designations',
          icon: 'icon-people',
        },
        {
          name: 'Policies & Procedures',
          url: '/office/policies',
          icon: 'icon-people',
        },
        {
          name: 'Org. Charts',
          url: '/office/org-charts',
          icon: 'icon-people',
        },
        {
          name: 'Scheduling',
          url: '/office/scheduling',
          icon: 'icon-people',
        },
        {
          name: 'Official Docs',
          url: '/office/docs',
          icon: 'icon-people',
        },
      ]
    },
    {
      title: true,
      name: 'PEOPLE',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Employees',
      url: '/supports',
      icon: 'icon-drop',
    },
    {
      name: 'Clients',
      url: '/supports',
      icon: 'icon-drop',
    },
    {
      name: 'Supports',
      url: '/supports',
      icon: 'icon-drop',
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: "noopener" },
    },
    {
      name: 'Feedback',
      url: '/feedback',
      icon: 'icon-layers',
      variant: 'danger',
      attributes: { target: '_blank', rel: "noopener" },
    },
  ],
};
