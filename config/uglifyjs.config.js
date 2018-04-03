
// https://www.npmjs.com/package/uglify-es

module.exports = {

  /**
   * mangle: uglify 2's mangle option
   */
  mangle: {
      reserved: ['InitialMigration1513274191111', 'AddImageUrlAndDownloadedFlagMigration1513679923000',
          'FailedTaskMigration1515428187000', 'AddUnlockedColumn1516037215000', 'AddCompletedColumn1519817905000',
          'HomePage', 'InfoPage', 'SettingsPage', 'ModalCmp']
  },

  /**
   * compress: uglify 2's compress option
   */
  compress: {
    toplevel: true,
    pure_getters: true
  }
};