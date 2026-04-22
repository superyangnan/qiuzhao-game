export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/create/index',
    'pages/game/index',
    'pages/interview/index',
    'pages/ending/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#0d0d1a',
    navigationBarTitleText: '人生简历',
    navigationBarTextStyle: 'white',
    backgroundColor: '#0d0d1a',
  },
  cloud: true,
})
