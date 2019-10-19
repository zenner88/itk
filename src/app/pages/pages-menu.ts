import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Master',
    icon: 'browser-outline',
    children: [
      {
        title: 'Master Indikator',
        link: '/pages/master-indikator/smart-table',
      },
      {
        title: 'Master Indikator Satfung',
        link: '/pages/master-i-s/smart-table',
      },
      // {
      //   title: 'Master Indikator Satfung Details',
      //   link: '/pages/master-indikator-satfung-obyektif/smart-table',
      // },
      {
        title: 'Master Periode',
        link: '/pages/master-periode/smart-table',
      },
      {
        title: 'Master Satfung',
        link: '/pages/master-satfung/smart-table',
      },
      // {
      //   title: 'Master Satfung Prinsip',
      //   link: '/pages/master-satfung-prinsip/smart-table',
      // },
      {
        title: 'Master Satker',
        link: '/pages/master-satker/smart-table',
      },
    ],
  },
  // {
  //   title: 'Referensi',
  //   icon: 'edit-2-outline',
  //   children: [
  //     {
  //       title: 'Referensi Jenis Data',
  //       link: '/pages/ref-jenis-data/smart-table',
  //     },
  //     {
  //       title: 'Referensi Pangkat',
  //       link: '/pages/ref-pangkat/smart-table',
  //     },
  //     {
  //       title: 'Referensi Prinsip',
  //       link: '/pages/ref-prinsip/smart-table',
  //     },
  //     {
  //       title: 'Referensi Satfung',
  //       link: '/pages/ref-satfung/smart-table',
  //     },
  //     {
  //       title: 'Referensi Satker',
  //       link: '/pages/ref-satker/smart-table',
  //     },
  //     {
  //       title: 'Referensi Tipe Polres',
  //       link: '/pages/ref-tipe-polres/smart-table',
  //     },
  //   ],
  // },
  {
    title: 'Transaksi',
    icon: 'browser-outline',
    children: [
      {
        title: 'Transaksi Penilaian',
        link: '/pages/trn-penilaian/smart-table',
      },
      {
        title: 'Transaksi Benchmarking',
        link: '/pages/trn-benchmarking/smart-table',
      },
      {
        title: 'Transaksi Penilaian Indikator',
        link: '/pages/trn-penilaian-indikator/smart-table',
      },
      {
        title: 'Transaksi Penilaian Satfung',
        link: '/pages/trn-penilaian-satfung/smart-table',
      },
    ],
  },
  {
    title: 'System',
    icon: 'lock-outline',
    children: [
      {
        title: 'System Akses',
        link: '/pages/sys-akses/smart-table',
      },
      {
        title: 'System Kelompok',
        link: '/pages/sys-kelompok/smart-table',
      },
      {
        title: 'System Kelompok Pengguna',
        link: '/pages/sys-kelompok-pengguna/smart-table',
      },
      {
        title: 'System Menu',
        link: '/pages/sys-menu/smart-table',
      },
      {
        title: 'System Pengguna',
        link: '/pages/sys-pengguna/smart-table',
      },
    ],
  },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
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
        title: 'Form Persepsi Internal Polres',
        link: '/indeks/formPIP',
        icon: 'folder-outline',
      },
      {
        title: 'Form Persepsi Eksternal Polres',
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
  {
    title: 'Validasi',
    icon: 'folder-add-outline',
    children: [
      {
        title: 'Kasatfung',
        link: '/indeks/validasiFormObjektif',
        icon: 'folder-outline',
      },
      {
        title: 'Kapolres',
        link: '/indeks/validasiFormObjektif',
        icon: 'folder-outline',
      },
      {
        title: 'Pokja ITK',
        link: '/indeks/validasiFormObjektif',
        icon: 'folder-outline',
      },
    ]
  }
  
  
  // {
  //   title: 'Public Home',
  //   link: '/public/home',
  //   icon: 'home-outline',
  // },
];
