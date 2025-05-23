import {EventEmitter, Injectable} from "@angular/core";
import {TTS, TtsProvider} from "../providers/tts";
import TTSVoice = TTS.TTSVoice;
import {Storage} from "@ionic/storage";

const READ_ALOUD_STORAGE_KEY = "MCMReadAloudSettings"

@Injectable()
export class ReadAloudService {
    private _language = "en";
    // Press long on a text to activate the speech function
    private demoTexts = {
        "en": "Press long on a text to activate the speech function",
        "de": "Lange auf einen Text drücken, um die Sprachfunktion zu aktivieren",
        "it": "Premi a lungo su un testo per attivare la funzione vocale",
        "fr": "Appuyez longuement sur un texte pour activer la fonction vocale",
        "es": "Mantén pulsado un texto para activar la función de voz",
        "pl": "Naciśnij długo na tekst, aby aktywować funkcję mowy",
        "pt": "Pressione longamente um texto para ativar a função de fala",
        "sk": "Dlho stlačte text, aby ste aktivovali funkciu reči",
        "tr": "Konuşma işlevini etkinleştirmek için bir metne uzun basın",
        "zh": "长按文本以激活语音功能",
        "el": "Πατήστε παρατεταμένα σε ένα κείμενο για να ενεργοποιήσετε τη λειτουργία ομιλίας",
        "id": "Tekan lama pada teks untuk mengaktifkan fungsi bicara",
        "et": "Vajutage tekstil pikalt, et aktiveerida kõnetuvastusfunktsioon",
        "is": "Ýttu lengi á texta til að virkja talgreiningarvirkni"
    }
    private settings: ReadAloudSettings = {
        enabled: false,
        preferredVoices: {}
    };
    public interfaceTriggerEvent: EventEmitter<void> = new EventEmitter();
    public hideInterfaceEvent: EventEmitter<void> = new EventEmitter();
    get isEnabled(): boolean {
        return this.settings.enabled;
    }

    set isEnabled(val: boolean) {
        this.settings.enabled = val;
        this.persistSettings();
    }

    get language(): string {
        return this._language;
    }
    set language(lang: string) {
        this._language = lang;
    }

    availableVoices: TTSVoice[] = [];
    preferredVoices: {[key: string]: TTSVoice} = {};
    tts: TtsProvider;
    lastRead: {lang: string, text: string};

    constructor(private storage: Storage) {
    }

    async init(lang: string) {
        const settings = await this.storage.get(READ_ALOUD_STORAGE_KEY);
        if (settings) {
            this.settings = settings;
        }
        this.tts = new TtsProvider();
        this.language = lang;
        this.availableVoices = await this.tts.getVoices();
    }

    getDemoText(lang: string) {
        return this.demoTexts[lang];
    }

    getVoiceForLanguage(lang: string): TTSVoice|undefined {
        if (!lang) return;
        return this.availableVoices.find(voice => {
            if (this.settings.preferredVoices[lang]) {
                return voice.identifier === this.settings.preferredVoices[lang];
            }
            return voice.language.toLowerCase().startsWith(lang.toLowerCase());
        });
    }

    setVoiceForLanguage(lang: string, voiceId: string) {
        this.settings.preferredVoices[lang] = voiceId;
        return this.persistSettings();
    }

    getAllVoicesForLanguage(lang: string): Array<TTSVoice> {
        if (!lang) return [];
        return this.availableVoices.filter(voice => voice.language.toLowerCase().startsWith(lang.toLowerCase()));
    }

    readText(text: string, language?: string) {
        if (!this.settings.enabled) {
            return;
        }
        this.interfaceTriggerEvent.emit();
        let lang = language && language.length > 0 ? language : this.language;
        let voice = this.getVoiceForLanguage(lang);
        this.lastRead = {text, lang};
        this.tts.readAloud(text, voice);
    }

    repeatLastText() {
        this.readText(this.lastRead.text, this.lastRead.lang);
    }

    stopReading() {
        this.tts.stopReading();
    }

    resetHighlighting() {
        let selection = window.getSelection();
        let readables = document.querySelectorAll('[readable]');
        readables.forEach((readable) => {
            readable.classList.remove('active');
        })
        selection.removeAllRanges();
    }

    private async persistSettings() {
        return this.storage.set(READ_ALOUD_STORAGE_KEY, this.settings);
    }
}

type ReadAloudSettings = {
    enabled: boolean
    preferredVoices: {
        [lang: string]: string;
    }
}
