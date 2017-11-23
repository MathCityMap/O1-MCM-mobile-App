export abstract class AsyncTask<T> {
  abstract async onPreExecute()
  async execute(params: T) {
    console.log("Started execute")
    await this.onPreExecute()
    try {
    await this.doInBackground(params)
    } catch (error) {
      console.error(`${this.constructor.name} error`, error.name)
      console.error(error.stack)
    }
      // .then(() => {
        await this.onPostExecute()
      // })
      // .catch((error: Error) => {
      //   console.error(`${this.constructor.name} error`, error.name)
      //   console.error(error.stack)
      //   this.onPostExecute()
      // })
  }
  abstract async doInBackground(params: T)
  abstract async onPostExecute()
}