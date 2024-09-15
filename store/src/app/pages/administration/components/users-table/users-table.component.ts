import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import {
  CreateUser,
  UpdateUser,
  User,
} from 'src/app/shared/interfaces/user.interface';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { FilterService } from '../../services/filter.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  currentPageUsers: User[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  startIndex: number = 0;
  isPriceAscending: boolean = true;
  isNameAscending: boolean = true;
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private filterService: FilterService,
    private modal: MatDialog,
    private userHttp: UserHttpService
  ) {}

  ngOnInit(): void {
    this.resetFilter();

    this.userHttp.getList<User[]>().subscribe((data) => {
      this.loading$.next(!data.length), console.log(data);

      (this.users = data), this.pageHandler(data), this.arrowHandler();
    });
  }

  sortByPrice(): void {
    this.filterService.sortByPrice();
  }
  sortByName(): void {
    this.filterService.sortByName();
  }

  pageHandler(data: User[]): void {
    (this.totalPages = Math.ceil(data.length / 5)),
      (this.currentPageUsers = this.users.slice(0, 5)),
      (this.currentPage = 1),
      (this.startIndex = 0);
  }

  arrowHandler(): void {
    this.isPriceAscending = this.filterService.ascendingPrice;
    this.isNameAscending = this.filterService.ascendingName;
  }

  resetFilter(): void {
    this.filterService.filterByText('');
  }

  nextPage(): void {
    if (this.currentPage >= Math.ceil(this.users.length / 5)) {
      return;
    }

    this.currentPage++;
    this.currentPageUsers = this.users.slice(
      (this.startIndex += 5),
      5 * this.currentPage
    );
  }

  prevPage(): void {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage--;
    this.currentPageUsers = this.users.slice(
      (this.startIndex -= 5),
      5 * this.currentPage
    );
  }

  add() {
    let addDialog = this.modal.open(UserModalComponent, {
      height: '447px',
      width: '570px',
      data: {
        title: 'Add User ',
        delete: false,
      },
    });

    addDialog.afterClosed().subscribe((data) => {
      let createdUser: CreateUser = {
        username: data.username,
        password: data.password,
      };
      this.userHttp.create<CreateUser>(createdUser).subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  editProduct(id: string) {
    let editDialog = this.modal.open(UserModalComponent, {
      height: '347px',
      width: '570px',
      data: {
        title: ' Edit User',
        delete: false,
        edit: true,
        id: id,
      },
    });

    editDialog.afterClosed().subscribe((data) => {
      console.log(data);
      let updatedUser: UpdateUser = {
        password: data.password,
      };

      this.userHttp.update<UpdateUser>(updatedUser, id).subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  deleteProduct(id: string, name: string) {
    let deleteDialog = this.modal.open(UserModalComponent, {
      height: '200px',
      width: '570px',
      data: {
        title: `Delete User "${name}" ?`,
        delete: true,
        id: id,
      },
    });

    deleteDialog.afterClosed().subscribe((data) => {
      this.userHttp.delete(data).subscribe(() => {
        this.ngOnInit();
      });
    });
  }
}
