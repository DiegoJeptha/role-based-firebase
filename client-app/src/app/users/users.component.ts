import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { User } from './models/user';
import { UserFormService } from './services/user-form.service';
import { UserService } from './services/user.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;
  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private userForm: UserFormService,
    private modal: NgbModal,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.users$ = this.userService.users$;

    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user.uid))
    );
  }

  create() {
    this.userForm.create();
    const modalRef = this.modal.open(UserFormComponent);
    modalRef.result.then(user => {
      this.userService.create(user).subscribe(_ => {
        console.log('user created');
      });
    }).catch(err => {

    });
  }

  edit(userToEdit) {
    this.userForm.edit(userToEdit);
    const modalRef = this.modal.open(UserFormComponent);
    // once user form pop up is closed, we get the value as a result
    modalRef.result.then(user => {
      this.userService.edit(user).subscribe(_ => {
        console.log('user edited');
      });
    }).catch(err => {

    });

  }
}
