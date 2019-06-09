import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActorService } from '../../../services/actor.service';

@Component({
  selector: 'app-security-form',
  templateUrl: './security-form.component.html',
  styleUrls: ['./security-form.component.css']
})
export class SecurityFormComponent implements OnInit {

  passwordResetSuccess: boolean = false;
  userMsg: String = '';
  securityForm: FormGroup;
  constructor(private fb: FormBuilder, private actorService: ActorService) {
    this.securityForm = this.fb.group({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z0-9@#$^!]{8,12}")
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z0-9@#$^!]{8,12}")
      ]),
    })
  }
  ngOnInit() {
  }
  changePassword() {
    let passwords = this.securityForm.value;
    if (passwords.newPassword == passwords.confirmPassword) {
      this.actorService.updatePassword(passwords.newPassword).subscribe(
        data => {
          this.passwordResetSuccess = true;
          this.userMsg = "Password reset successful";
          this.actorService.showLoadingScreen(false);
          this.setUserMsg(true,"Password reset successful");
          console.log("Password Changed successfully");
        },
        err => {
          this.setUserMsg(false,"Password change request failed.");
          console.log(err);
          console.log("Password Change request failed");
        }
      );
    } else {
      this.passwordResetSuccess = false;
      this.userMsg = 'Passwords don\'t match';
    }
  }


  private setUserMsg(success:any,msg:any) {
    this.passwordResetSuccess = success;
    this.userMsg = msg;
    this.actorService.showLoadingScreen(false);
  }
}
