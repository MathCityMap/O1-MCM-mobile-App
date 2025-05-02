import TTSVoice = TTS.TTSVoice;
import IOptions = TTS.IOptions;

export declare namespace TTS {
    interface IOptions {
        /** text to speak */
        text: string;
        /** cancel, boolean: true/false */
        identifier: string;
        /** voice identifier (iOS / Android) from getVoices */
        locale?: string;
        /** speed rate, 0 ~ 1 */
        rate?: number;
        /** pitch, 0 ~ 1 */
        pitch?: number;
        /** cancel, boolean: true/false */
        cancel?: boolean;
        /** iOS ONLY: a voice URI (DEPRECATED, use identifier) **/
        voiceURI?: string;
    }
    interface TTSVoice {
        /** Voice name */
        name: string;
        /** Language **/
        language: string;
        /** identifier string */
        identifier: string;
    }

    function speak(options: IOptions): Promise<void>;
    function speak(text: string): Promise<void>;
    function stop(): Promise<void>;
    function checkLanguage(): Promise<string>;
    function openInstallTts(): Promise<void>;
    function getVoices(): Promise<TTSVoice[]>;
}

abstract class TTSDeclaration {
    abstract speak(options: IOptions): Promise<void>;
    abstract speak(text: string): Promise<void>;
    abstract stop(): Promise<void>;
    abstract checkLanguage(): Promise<string>;
    abstract openInstallTts(): Promise<void>;
    abstract getVoices(): Promise<TTSVoice[]>;
}

/*
  Generated class for the TtsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class TtsProvider {

    tts: TTSDeclaration;
  constructor() {
    this.tts = (<any>window).TTS;
  }

  async getVoices(): Promise<TTSVoice[]> {
    try {
      return await this.tts.getVoices();
    } catch (e) {
      console.warn("Fetching voices failed, trying again");
      await new Promise((resolve) => {
        setTimeout(resolve, 10000);
      });
      return this.getVoices();
    }
  }

  async readAloud(text: string, voice: TTSVoice) {
      return this.tts.speak({
          text: text,
          identifier: voice.identifier,
          cancel: true
      });
  }

  stopReading() {
      this.tts.stop();
  }

}
