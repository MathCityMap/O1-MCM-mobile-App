
// https://www.npmjs.com/package/uglify-es

module.exports = {

  /**
   * mangle: uglify 2's mangle option
   */
  mangle: {
      reserved: ['InitialMigration1513274191111', 'AddImageUrlAndDownloadedFlagMigration1513679923000',
          'FailedTaskMigration1515428187000', 'AddUnlockedColumn1516037215000', 'AddCompletedColumn1519817905000',
          'HomePage', 'InfoPage', 'SettingsPage', 'ModalCmp', 'RoutesListPage', 'MapPage', 'TaskDetailPage', 'ChatPage',
          'AddVisibleColumn1526306624000', 'AddLangCodeColumn1526306730000', 'TasksMap',
          'AddDownloadDateColumn15711518720000', 'AddCompletedDateColumn15713974540000', 'AddZipMapFields15783117210000', 'AddZipMapFields15783117210000', 'AddSavedTasks16013795030000', 'AddSubtasks16026790930000', 'AddPositionField16194302450000', 'AddPathField16194302450000', 'AddZoom16225449820000']
  },

  /**
   * compress: uglify 2's compress option
   */
  compress: {
    toplevel: true,
    pure_getters: true
  }
};
