import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Form Isian',
    icon: 'folder-add-outline',
    children: [
      {
        title: 'Form Objektif',
        link: '/indeks/formObjektif',
        icon: 'folder-outline',
      },
      {
        title: 'Form Persepsi Int Polres',
        link: '/indeks/formPIP',
        icon: 'folder-outline',
      },
      {
        title: 'Form Persepsi Ekst Polres',
        link: '/indeks/formPIP',
        icon: 'folder-outline',
      },
      {
        title: 'List Polres',
        link: '/pages/list-polres/smart-table',
        icon: 'folder-outline',
      },
      {
        title: 'List Satfung',
        link: '/pages/list-satfung/smart-table',
        icon: 'folder-outline',
      },
    ]
  },
];
