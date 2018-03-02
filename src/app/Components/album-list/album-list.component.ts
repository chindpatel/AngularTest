import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  userId: number;
  albums: any;
  skip: number = 0;
  take: number = 20;
   
  constructor(private route: ActivatedRoute, private data: DataService, private router: Router) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params["id"];

    this.data.getAlbums(this.userId, this.skip, this.take).subscribe(res=> this.albums = res);
  }

  public loadPhotos(id: number){
    this.router.navigate(['photos/'+id]);
  }
}
