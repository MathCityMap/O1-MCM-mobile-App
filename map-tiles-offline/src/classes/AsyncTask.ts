export abstract class AsyncTask<T> {
  abstract onPreExecute()
  execute(params: T) {
    console.log("Started execute")
    this.onPreExecute()
    this.doInBackground(params)
      .then(() => {
        this.onPostExecute()
      })
      .catch((error: Error) => {
        console.error(`${this.constructor.name} error`, error.name)
        console.error(error.stack)
        this.onPostExecute()
      })
  }
  abstract async doInBackground(params: T)
  abstract onPostExecute()
}