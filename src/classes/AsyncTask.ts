export abstract class AsyncTask<T> {
  abstract onPreExecute()
  async execute(params: T) {
    console.log("Started execute")
    this.onPreExecute()
    await this.doInBackground(params)
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