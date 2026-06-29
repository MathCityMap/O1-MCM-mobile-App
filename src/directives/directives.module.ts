import { NgModule } from '@angular/core';
import { SafeInnerHtmlDirective } from './safe-inner-html/safe-inner-html';
import {ReadAloudDirective} from "./readable";
@NgModule({
	declarations: [SafeInnerHtmlDirective, ReadAloudDirective],
	imports: [],
	exports: [SafeInnerHtmlDirective, ReadAloudDirective]
})
export class DirectivesModule {}
