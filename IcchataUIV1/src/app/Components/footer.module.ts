import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
@NgModule({
    declarations: [AboutUsComponent,TermsConditionsComponent,DisclaimerComponent,PrivacyPolicyComponent],
    imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [AboutUsComponent,TermsConditionsComponent,DisclaimerComponent,PrivacyPolicyComponent]
})
export class FooterModule { }