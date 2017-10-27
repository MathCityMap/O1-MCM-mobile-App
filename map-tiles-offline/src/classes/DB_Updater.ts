import { AsyncTask } from './AsyncTask'

export class DB_Updater extends AsyncTask<string> {
  onPreExecute() {
    console.log("onPreExecute ran");
  }

  onPostExecute(result?: string) {
    console.log("onPostExecute")
    if (result) {
      console.log(result);
    }
  }

  async runInBackground(args: string): Promise<string> {
    console.log("async runInBackground")
    return new Promise<string>(resolve => {
      resolve(`I've worked on ${args} and was glad to work on it`)
    })
  }
}