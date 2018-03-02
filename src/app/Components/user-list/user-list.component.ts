import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { User } from '../../Types/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[];

  constructor(private data: DataService, private router: Router) { 
  }

  ngOnInit() {
    this.data.getUsers().subscribe(res => this.users = res);
  }

  public loadAlbum(id: number){
    this.router.navigate(['album/'+id]);
  }

}
