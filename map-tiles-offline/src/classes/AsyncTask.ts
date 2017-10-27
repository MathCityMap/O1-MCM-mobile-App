
export class AsyncTask<T> {
  onPreExecute() { }

  async runInBackground(args: T): Promise<T> {
    return new Promise<T>(resolve => { resolve(args) })
  }

  onPostExecute(result?: T) { }

  runOnPostExecuteInMainThread(result?: T) {
    // don't know if we need this
    this.onPostExecute(result);
  }

  execute(args: T) {
    this.onPreExecute();
    this.runInBackground(args).then(resolve => {
      this.runOnPostExecuteInMainThread(resolve)
    })
  }
}