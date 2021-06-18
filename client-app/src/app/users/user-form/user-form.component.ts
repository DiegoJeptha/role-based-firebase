import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserFormService } from '../services/user-form.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });
  title$: Observable<string>;
  user$: Observable<{}>;

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService,
    private userForm: UserFormService
  ) { }

  ngOnInit() {
    this.title$ = this.userForm.title$;
    this.user$ = this.userForm.user$.pipe(
      tap(user => {
        if (user) {
          this.form.patchValue(user);
        } else {
          this.form.reset({});
        }
      })
    );
  }

  dismiss() {
    this.modal.dismiss('modal dismissed');
  }

  save() {
    const { displayName, email, role, password, uid } = this.form.value;
    this.modal.close({ displayName, email, role, password, uid });
  }

}
