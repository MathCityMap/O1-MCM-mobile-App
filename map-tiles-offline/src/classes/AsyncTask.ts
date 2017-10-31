export abstract class AsyncTask<T> {
  abstract onPreExecute()
  execute(params: T) {
    console.log("Started execute")
    this.onPreExecute()
    this.doInBackground(params)
      .then(this.onPostExecute)
      .catch((error: Error) => {
        console.log(`${this.constructor.name} error`, error.name)
      })
  }
  abstract async doInBackground(params: T)
  abstract onPostExecute()
}